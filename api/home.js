import express from 'express';
var router = express.Router();

router.get("/", function(req, res, next) {
    res.status(200).json({
        home : "Home page"
    });
});

export default router;