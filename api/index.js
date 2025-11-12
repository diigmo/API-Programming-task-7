import express from 'express';
var router = express.Router();

router.get("/", function(req, res, next) {
    res.status(200).json({
        hello : "Hello World!"
    });
});

export default router;