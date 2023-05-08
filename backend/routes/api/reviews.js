const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { json } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

let checkReviewOwner = async (req, res, next) => {
    let review = await Review.findByPk(req.params.reviewId);

    if (req.user.id !== review.userId) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        })
    }
    next()
};

let checkReviewId = async (req, res, next) => {
    let review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found"
          })
    }
    next()
};

const checkReviewInput = [
    check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),

    check('stars')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isInt({min: 1, max: 5})
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
];

router.delete("/:reviewId", requireAuth, checkReviewId, checkReviewOwner, async (req, res) => {
    let review = await Review.findByPk(req.params.reviewId);

    await review.destroy()

    res.json({
        "message": "Successfully deleted"
      })
});

router.put("/:reviewId", requireAuth, checkReviewId, checkReviewOwner, checkReviewInput, async (req, res) => {
    let reviewId = req.params.reviewId;
    let currentReview = await Review.findByPk(reviewId);
    let {review, stars} = req.body;

    currentReview.review = review;
    currentReview.stars = stars;

    await currentReview.save();

    res.json(currentReview)
})

router.post("/:reviewId/images", requireAuth, checkReviewId,  checkReviewOwner,  async (req, res) => {
    let reviewId = req.params.reviewId;

    let reviewImages = await ReviewImage.findAll({
        where: {reviewId}
    });

    if (reviewImages.length >= 10) {
        res.status(403);
        return res.json(    {
            "message": "Maximum number of images for this resource was reached"
          })
    }

    let {url} = req.body;

    let newImage = await ReviewImage.create({
        reviewId,
        url
    })

    let image = await ReviewImage.findByPk(newImage.id, {
        attributes: ['id', 'url']
    })

    res.json(image)
});

router.get("/current", requireAuth, async (req, res) => {
    // console.log("req.user.id", req.user.id)
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
        if (previewImageUrl) {
            review.Spot.previewImage = previewImageUrl.url
        } else {
            review.Spot.previewImage = null
        }

        formatedReviews.push(review)
    }

    res.json({Reviews: formatedReviews})
});

module.exports = router;