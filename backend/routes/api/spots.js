const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { json } = require('sequelize');


router.get("/", async (req, res) => {
    let spots = await Spot.findAll({
        include: [
            {model: Review},
            {model: SpotImage}
        ]
    });
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
    
    res.json({Spots: spotsCopy})
})

module.exports = router;