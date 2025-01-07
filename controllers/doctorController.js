// doctor dashboard
exports.dashboard = async (req, res) => {
    try {
        res.render('doctor/dashboard');
    } catch (error) {
        res.status(500).send("Error");
    }
};