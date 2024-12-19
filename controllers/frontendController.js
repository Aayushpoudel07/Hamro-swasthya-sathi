
// landing page
exports.index = async (req, res) => {
    try {
        res.render('frontend/index');
    } catch (error) {
        res.status(500).send("Error");
    }
};



// about page
exports.about = async (req, res) => {
    try {
        res.render('frontend/about');
    } catch (error) {
        console.log(error)
        res.status(500).send("Error");
    }
};
