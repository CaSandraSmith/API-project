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

const checkInput = [
    check('address')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Address is required"),

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
    .withMessage("Price is required"),
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
]

let formatBooking = async (newBooking) => {
    let formattedBooking = await Booking.findByPk(newBooking.id, {
        include: {
            model: Spot,
            attributes: [
                "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"
            ],
            include: {
                model: User,
                as: "Owner",
                attributes: ["firstName", "lastName"]
            }
        }
    })

    formattedBooking = formattedBooking.toJSON()

    let previewImageUrl = await SpotImage.findOne({
        where: {
            spotId: formattedBooking.Spot.id,
            preview: true
        },
        attributes: ['url']
    });


    if (previewImageUrl) {
        formattedBooking.Spot.previewImage = previewImageUrl.url
    } else {
        formattedBooking.Spot.previewImage = null
    }

    return formattedBooking
}


router.post('/:spotId/bookings', requireAuth, checkSpotExists, async (req, res) => {
    let spotId = req.params.spotId;
    let userId = req.user.id
    let spot = await Spot.findByPk(spotId);

    if (spot.ownerId === userId) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        });
    }

    let {startDate, endDate} = req.body;

    let newBooking = await Booking.build({
        spotId,
        userId,
        startDate,
        endDate
    })

    //this gives me a day earlier than it should
    let start = new Date (newBooking.startDate.toDateString()).getTime();
    let end = new Date (newBooking.endDate.toDateString()).getTime();

    if (start >= end) {
        res.status(400);
        return res.json({
            "message": "Bad Request",
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
        })
    };

    let allBookings = await Booking.findAll({
        where: {
            spotId,
            endDate: {
                [Op.gte]: startDate
            }
        }
    });

    let errors = {}
    errors.message = "Sorry, this spot is already booked for the specified dates"
    errors.errors = []
    for (let booking of allBookings) {
        let firstDay = new Date(booking.startDate.toDateString()).getTime();
        let lastDay = new Date(booking.endDate.toDateString()).getTime();

        if (start >= firstDay && start <= lastDay) {
            errors.errors.push("Start date conflicts with an existing booking")
        }

        if (end >= firstDay && end <= lastDay) {
            errors.errors.push("End date conflicts with an existing booking")
        }
        if (start <= firstDay && lastDay <= end) {
            errors.errors.push("Start date conflicts with an existing booking")
            errors.errors.push("End date conflicts with an existing booking")
        }
        
        if (errors.errors.length) {
            res.status(403);
            return res.json(errors)
        }
    }


    await newBooking.save()

    let formatedBooking = await formatBooking(newBooking)

    res.json(formatedBooking)
});

router.post("/:spotId/reviews", requireAuth, checkSpotExists, checkReviewInput, async (req, res) => {
    let spotId = req.params.spotId;
    let userId = req.user.id
    let userReviews = await Review.findAll({
        where: {
            spotId,
            userId
        }
    })

    if (userReviews.length) {
        res.status(500);
        return res.json({
            "message": "User already has a review for this spot"
          })
    }

    let {review, stars} = req.body;

    let newReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    });

    res.status(201);
    res.json(newReview);
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

router.get("/:spotId/bookings", requireAuth, checkSpotExists , async (req, res) => {
    let spotId = req.params.spotId
    let spot = await Spot.findByPk(spotId);
    let bookings

    if (spot.ownerId === req.user.id) {
        bookings = await Booking.findAll({
            where: {spotId},
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })
    } else {
        bookings = await Booking.findAll({
            where: {spotId},
            attributes: ['spotId', 'startDate', 'endDate']
        })
    }

    res.json({Bookings: bookings})
})

router.get('/:spotId/reviews', checkSpotExists, async (req, res) => {
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

router.get("/:spotId/images", checkSpotExists, async (req, res) => {
    let spotImages = await SpotImage.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['id', 'url', 'preview']
    })

    res.json({"Spot Images": spotImages})
})

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
    let pagination = {}
    let {page, size, maxLat, minLat, maxLng, minLng, minPrice, maxPrice} = req.query;
    
    page = parseInt(page)
    size = parseInt(size)

    if (!page || page < 1 || page > 10 || !Number.isInteger(page)) page = 1;
    if (!size || size < 1 || size > 20 || !Number.isInteger(page)) size = 20;

    pagination.offset = size * (page - 1) 
    pagination.limit = size;

    let errorResponses = {}
    errorResponses.message = "Bad Request";

    let errors = {}
    let where = {}
    if (maxLat) {
        if (isNaN(maxLat)){
            errors.maxLat = "Maximum latitude is invalid"
        } else {
            where.lat = {[Op.lte]: maxLat}
        }
    };
    if (minLat) {
        if (isNaN(minLat)){
            errors.minLat = "Minimum latitude is invalid"
        } else {
            where.lat = {[Op.gte]: minLat}
        }
    };

    if (minLng) {
        if (isNaN(minLng)){
            errors.minLng = "Minimum longitude is invalid"
        } else {
            where.lng = {[Op.gte]: minLng}
        }
    };
    if (maxLng){
        if (isNaN(maxLng)){
            errors.maxLng = "Maximum longitude is invalid"
        } else {
            where.lng = {[Op.lte]: maxLng}
        }
    }

    if (minPrice) {
        if (isNaN(minPrice) || minPrice < 0){
            errors.minPrice = "Minimum price must be greater than or equal to 0"
        } else {
            where.price = {[Op.gte]: minPrice}
        }
    }
    if (maxPrice) {
        if (isNaN(maxPrice) || maxPrice < 0){
            errors.minPrice = "Maximum price must be greater than or equal to 0"
        } else {
            where.price = {[Op.lte]: maxPrice}
        }
    }

    if (Object.keys(errors).length) {
        errorResponses.errors = errors
        res.status(400);
        return res.json(errorResponses)
    }

    let spots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ],
        where,
        ...pagination
    });

    let spotsCopy = await formatSpots(spots)

    res.json({
        Spots: spotsCopy,
        page,
        size
    })
});

module.exports = router;