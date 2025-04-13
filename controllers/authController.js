const passport = require('passport');
const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const { sendEmail } = require("../config/mailer");

// login
exports.login = async (req, res) => {
    try {
        if (res.locals.user) {
            return res.redirect('/');
        }
        res.render('auth/login');
    } catch (error) {
        res.status(500).send("Error");
    }
};

// register
exports.register = async (req, res) => {
    try {
        res.render('auth/register');
    } catch (error) {
        res.status(500).send("Error");
    }
};

// Handle registration form submission
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        // Validate that passwords match
        if (password !== confirmPassword) {
            return res.status(400).send("Passwords do not match.");
        }

        // Check if email is already registered
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            res.render('auth/register', { message: 'Email already registered !' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await Users.create({
            name,
            email,
            password: hashedPassword,
            role: 'user', // default role
        });

        // Redirect to login page
        res.redirect('/auth/login');
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Error registering user.");
    }
};


// login now
exports.loginNow = (req, res, next) => {
    const { email, password } = req.body;
    // Check if email and password were provided
    if (!email || !password) {
        res.render('auth/login', { message: 'Email and password are required !' });

    }

    // Authenticate user using passport
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            res.render('auth/login', { message: 'Email and password are required !' });

        }
        if (!user) {
            res.render('auth/login', { message: 'Invalid email or password !' });
        }

        // Log the user in by storing the user in the session
        req.login(user, (err) => {
            if (err) {
                return res.status(500).send("Error logging in.");
            }
            if (user.role == 'admin') {
                return res.redirect('/admin/dashboard');
            } else if (user.role == 'doctor') {
                return res.redirect('/doctor/dashboard');
            } else if (user.role == 'hospital') {
                return res.redirect('/hospital/dashboard');
            }
            else {
                // return back 
                res.redirect('back');

                // return res.redirect('/user/dashboard');
            }
        });
    })(req, res, next);
};

// Logout function
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error logging out.");
        }
        res.redirect('/auth/login');
    });
};

// forgot password
exports.forgotPassword = async (req, res) => {
    try {
        res.render('auth/forgot-password');
    } catch (error) {
        res.status(500).send("Error");
    }
};

// forgot password otp 
exports.forgotPasswordSubmit = async (req, res) => {
    try {
        console.log(req.body);
        const { email } = req.body;

        const user = await Users.findOne({ where: { email } });

        if (!user) {
            res.render('auth/forgot-password', { message: 'User not found !' });

        }

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        user.otp = otp;
        await user.save();
        console.log(user.otp);
        // Send OTP to user's email
        const subject = 'Password Reset OTP';
        const text = `Your OTP for password reset is: ${otp}`;
        const htmlcontetn = `
            <p>Your OTP for password reset is: ${otp}</p>
        `;

        // Send email to admin
        try {
            await sendEmail(email, subject, text, htmlcontetn);
        } catch (error) {
            console.error("Error sending email:", error);
        }

        res.status(200).send("OTP sent successfully.");
    } catch (error) {
        res.status(500).send("Error");
    }
}
// resert password
exports.resetPassword = async (req, res) => {
    try {
        // get user
        const { email, otp, newPassword } = req.body;
        console.log(req.body);

        // Check if email is already registered
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            res.render('auth/forgot-password', { message: 'User not found !' });

        }

        // Check if OTP is correct
        if (user.otp !== otp) {
            res.render('auth/forgot-password', { message: 'Invalid OTP !' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(newPassword, 10);


        // Update user's password
        user.password = hashedPassword;
        await user.save();

        // Redirect to login page
        res.redirect('/auth/login');
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Error");
    }
}


exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body; 

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            res.redirect('back', { message: 'Passwords do not match !' });
        }

        // Check if current password is correct
        const user = await Users.findOne({ where: { id: req.user.id } });
        if (!user) {
            res.redirect('back', { message: 'User not found !' });
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) {
            res.redirect('back', { message: 'Current password is incorrect !' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        // Redirect to login page
        res.redirect('back');
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send("Error");
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { name, contact, address, description, speciality } = req.body;
        const image = req.file ? req.file.filename : null;


        // Find the user
        const user = await Users.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).send("User not found!");
        }

        // Update user details
        user.name = name || user.name;
        user.contact = contact || user.contact;
        user.address = address || user.address;
        user.image = image || user.image;
        user.description = description || user.description;
        user.speciality = speciality || user.speciality;

        await user.save();
       
        req.flash('success', 'User details updated successfully!');
        res.redirect('back');
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).send("Error updating user details");
    }
};