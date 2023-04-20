const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { json } = require('sequelize');

router.delete('/:imageId', requireAuth, async (req, res) => {
    let image = await SpotImage.findByPk(req.params.imageId);

    if (!image) {
        res.status(404);
        return res.json({
            "message": "Spot Image couldn't be found"
          })
    }

    let spot = await Spot.findByPk(image.spotId)
    if (req.user.id !== spot.ownerId) {
        res.status(403);
        return res.json({
            "message": "Forbidden"
          })
    };

    await image.destroy()
    res.json({
        "message": "Successfully deleted"
    })
})

module.exports = router;