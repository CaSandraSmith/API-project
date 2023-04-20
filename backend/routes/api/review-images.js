const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { Booking } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');
const { json } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.delete('/:imageId', requireAuth, async (req, res) => {
    let image = await ReviewImage.findByPk(req.params.imageId);

    if (!image) {
        res.status(404);
        return res.json({
            "message": "Review Image couldn't be found"
          })
    };

    let review = await Review.findByPk(image.reviewId);

    if (review.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        });
    };

    await image.destroy();
    res.json({
        "message": "Successfully deleted"
    });
})

module.exports = router;