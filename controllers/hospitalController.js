// hospital dashboard
exports.dashboard = async (req, res)=> {
    try {
        res.render('hospital/dashboard');
    } catch (error) {
        res.status(500).send("Error");
    }
};

