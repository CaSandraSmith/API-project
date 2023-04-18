const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { json } = require('sequelize');


let formatSpots = function (spots) {
    let spotsCopy = []
    
    spots.forEach(spot => {
        let reviewCount = spot.Reviews.length;
        let sum = 0;
        
        for (let review of spot.Reviews) {
            sum += review.stars
        };
        
        let avgRating = sum / reviewCount;
        
        spot = spot.toJSON();
        spot.avgRating = avgRating;
        spot.previewImage = spot.SpotImages[0].url

        delete spot.Reviews
        delete spot.SpotImages

        spotsCopy.push(spot)
    });

    return spotsCopy
}

router.get('/current', requireAuth, async (req, res) => {
    let currentUserSpots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {model: Review},
            {model: SpotImage}
        ]
    });

    let userSpots = await formatSpots(currentUserSpots)

    res.json({Spots: userSpots})
});

router.get("/:spotId", async (req, res) => {
    let currentSpot = await Spot.findByPk(req.params.spotId, {
        include: [
            {model: Review},
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                as: 'Owner'
            }
        ]
    });

    if (!currentSpot) {
        res.status(404);
        return res.json(
            {
                "message": "Spot couldn't be found"
            }
        )
    }
    currentSpot = currentSpot.toJSON();

    let numReviews = currentSpot.Reviews.length;
    let sumReviews = 0
    
    currentSpot.Reviews.forEach(spot => {
        sumReviews += spot.stars
    })

    currentSpot.numReviews = numReviews
    currentSpot.avgStarRating = sumReviews / numReviews;

    delete currentSpot.Reviews

    res.json(currentSpot)
})

router.get("/", async (req, res) => {
    let spots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ]
    });

    let spotsCopy = await formatSpots(spots)
    
    res.json({Spots: spotsCopy})
});

module.exports = router;