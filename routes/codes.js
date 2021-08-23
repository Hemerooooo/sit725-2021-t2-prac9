var express = require("express");
var router = express.Router();
var Controllers = require("../controllers");


router.get('/', (req, res) => {
    Controllers.codesController.getCodes(res);
    // get codes from database
    //getCodes(res)

})

router.post('/', (req, res) => {
    Controllers.codesController.createCode(req.body, res);
    /*console.log('New code posted')
    console.log('body', req.body)
    let code = req.body;
    res.send(req.body)*/
    //insertCode(code, res)
})


module.exports = router;