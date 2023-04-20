'use strict';

const review = require('../models/review');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Reviews'

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      userId: 3,
      review: "Good views, but overally expensive.",
      stars: 3
     },
     {
      spotId: 1,
      userId: 2,
      review: "Really high up.",
      stars: 3
     },
     {
      spotId: 2,
      userId: 1,
      review: "Great location, but extremely hard to find.",
      stars: 4
     },
     {
      spotId: 2,
      userId: 3,
      review: "Love it!!",
      stars: 5
     },
     {
      spotId: 3,
      userId: 2,
      review: "Looooove the location, great if you want to be surrounded by nature, but I'm not sure why my window keeps coming open at night.",
      stars: 4
     },
     {
      spotId: 3,
      userId: 1,
      review: "Very far from everything else, but the view is amazing",
      stars: 3
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
