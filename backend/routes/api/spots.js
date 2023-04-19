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

router.get('/:spotId/reviews', async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found"
          })
    };

    let reviews = await Review.findAll({
        where: {spotId: req.params.spotId},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    res.json({Reviews: reviews})
})

const checkInput = [
    check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Street address is required"),

    check('city')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("City is required"),

    check('state')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("State is required"),

    check('country')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Country is required"),

    check('lat')
    .exists({ checkFalsy: true })
    .isFloat({max: 90, min: -90})
    .notEmpty()
    .withMessage("Latitude is not valid"),

    check('lng')
    .exists({ checkFalsy: true })
    .isFloat({max: 180, min: -180})
    .notEmpty()
    .withMessage("Longitude is not valid"),

    check('name')
    .exists({ checkFalsy: true })
    .notEmpty()
    .isLength({min: 1, max: 50})
    .withMessage("Name must be less than 50 characters"),

    check('description')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Description is required"),

    check('price')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Price per day is required"),
    handleValidationErrors
]

let validateUser = async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId)

    if (req.user.id !== spot.ownerId) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        });
    }
    next()
}

let checkSpotExists = async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found"
          })
    }

    next()
}

router.delete("/:spotId", requireAuth, checkSpotExists, validateUser, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);

    await spot.destroy()

    res.json({
        "message": "Successfully deleted"
    });
})

router.put("/:spotId", requireAuth, checkSpotExists, validateUser, checkInput, async (req, res) => {
    let spot = await Spot.findByPk(req.params.spotId);

    let {address, city, state, country, lat, lng, name, description, price} = req.body;

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    res.json(spot);
})

router.post("/:spotId/images", requireAuth, checkSpotExists, validateUser, async (req, res) => {
    let {url, preview} = req.body;

    let newImage = await SpotImage.create({spotId: req.params.spotId, url, preview})

    let imageResult = await SpotImage.findByPk(newImage.id, {
        attributes: ['id', 'url', 'preview']
    });

    res.json(imageResult)
})

router.post("/", requireAuth, checkInput, async(req, res) => {

    let {address, city, state, country, lat, lng, name, description, price} = req.body

    let newSpot = Spot.build({ ownerId: req.user.id,
        address, city, state, country, lat, lng, name, description, price
    });

    await newSpot.save()

    res.status(201)
    res.json(newSpot)
});

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

        //i had to add this conditional because when building the spots I got an error because I don't post to spot Images at the same time that I build a new spot
        if (spot.SpotImages.length) {
            spot.previewImage = spot.SpotImages[0].url
        }

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