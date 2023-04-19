const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { json } = require('sequelize');

router.get("/current", requireAuth, async (req, res) => {
    console.log("req.user.id", req.user.id)
    let reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: [
                    "id", "ownerId", "address", "city", "state","country", "lat", "lng", "name", "price"
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    let formatedReviews = []

    for (let review of reviews) {
        let previewImageUrl = await SpotImage.findOne({
            where: {
                spotId: review.Spot.id,
                preview: true
            },
            attributes: ['url']
        });
        review = review.toJSON()
        review.Spot.previewImage = previewImageUrl.url
        formatedReviews.push(review)
    }

    res.json({Reviews: formatedReviews})
})

module.exports = router;