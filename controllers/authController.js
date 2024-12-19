
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

// login now
exports.loginNow = async(req,res)=>{
    try {
        const {email,password}=req.body;
        // login logic
        
        return res.redirect('/admin/dashboard');
    }catch(error){
        res.status(500).send("Error");
    }
}