const controller = {
    getFavicon: function (req, res) {
        res.status(204);
    },

    getError: function(req,res){
        res.render('error', {
            errormessage: req.params.error
        })
    }
    // getIndex: function (req, res) {

    //     // render `../views/index.hbs`
    //     // res.render('index');
    //     if(req.user){
    //         res.redirect('/home');
    //     }
    //     else{
    //         res.render('index');
    //     }
    // }
}
module.exports = controller;