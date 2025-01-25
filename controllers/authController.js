const passport = require('passport');
const { Users } = require('../models'); 
const bcrypt = require('bcryptjs');

// login
exports.login = async (req, res) => {
    try {
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
            return res.status(400).send("Email is already in use.");
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
        return res.status(400).send("Email and Password are required!");
    }

    // Authenticate user using passport
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Something went wrong. Please try again.");
        }
        if (!user) {
            return res.status(401).send(info.message || "Invalid email or password.");
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
                return res.redirect('/user/dashboard');
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
