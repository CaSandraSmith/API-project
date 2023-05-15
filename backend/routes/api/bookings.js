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

let checkBookingExists = async (req, res, next) => {
    let booking = await Booking.findByPk(req.params.bookingId);

    if (!booking) {
        res.status(404);
        return res.json({
            "message": "Booking couldn't be found"
        })
    };
    next()
}

router.delete('/:bookingId', checkBookingExists, async (req, res)=> {
    let currentUSer = req.user.id
    let booking = await Booking.findByPk(req.params.bookingId);
    let spot = await Spot.findByPk(booking.spotId)

    if (currentUSer !== booking.userId && currentUSer !== spot.ownerId) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        })
    };

    let start = new Date(booking.startDate.toDateString()).getTime()
    let today = new Date(new Date().toDateString()).getTime()

    if (start < today) {
        res.status(403);
        return res.json({
            "message": "Bookings that have been started can't be deleted"
        })
    };

    await booking.destroy();

    res.json({
        "message": "Successfully deleted"
    })
})

router.put("/:bookingId", requireAuth, checkBookingExists, async (req, res) => {
    let booking = await Booking.findByPk(req.params.bookingId);

    if (booking.userId !== req.user.id) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
        })
    };

    let { startDate, endDate } = req.body

    //this gives me a day earlier than it should
    let start = new Date(booking.startDate.toDateString()).getTime();
    let end = new Date(booking.endDate.toDateString()).getTime();

    let formatStart = new Date(new Date(startDate).toDateString()).getTime();
    let formatEnd = new Date(new Date(endDate).toDateString()).getTime();

    if (formatEnd <= formatStart) {
        res.status(400);
        return res.json({
            "message": "Bad Request",
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    };

    let today = new Date(new Date().toDateString()).getTime()

    if (end <= today) {
        res.status(403);
        return res.json({
            "message": "Past bookings can't be modified"
        })
    };

    let allBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId,
            endDate: {
                [Op.gte]: startDate
            },
            id: {
                [Op.not]: booking.id
            }
        }
    });

    let errors = {}
    errors.message = "Sorry, this spot is already booked for the specified dates"
    errors.errors = []
    for (let booking of allBookings) {
        let firstDay = new Date(booking.startDate.toDateString()).getTime();
        let lastDay = new Date(booking.endDate.toDateString()).getTime();

        if (formatStart >= firstDay && formatStart <= lastDay) {
            errors.errors.push("Start date conflicts with an existing booking")
        }
        if (formatEnd >= firstDay && formatEnd <= lastDay) {
            errors.errors.push("End date conflicts with an existing booking")
        }

        if (formatStart <= firstDay && lastDay <= formatEnd) {
            errors.errors.push("Start date conflicts with an existing booking")
            errors.errors.push("End date conflicts with an existing booking")
        }
        
        if (errors.errors.length) {
            res.status(403);
            return res.json(errors)
        };
    };


    booking.startDate = startDate;
    booking.endDate = endDate;

    await booking.save()

    res.json(booking)
})

router.get("/current", requireAuth, async (req, res) => {
    let bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: {
            model: Spot,
            attributes: [
                "id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"
            ]
        }
    });

    let formatedBookings = []

    for (let booking of bookings) {
        let previewImageUrl = await SpotImage.findOne({
            where: {
                spotId: booking.Spot.id,
                preview: true
            },
            attributes: ['url']
        });

        booking = booking.toJSON()

        if (previewImageUrl) {
            booking.Spot.previewImage = previewImageUrl.url
        } else {
            booking.Spot.previewImage = null
        }

        formatedBookings.push(booking)
    }

    res.json({ Bookings: formatedBookings })
})

module.exports = router;