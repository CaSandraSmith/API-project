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
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
     {
      spotId: 1,
      userId: 3,
      review: "Good views, but overally expensive.",
      stars: 3
     },
     {
      spotId: 2,
      userId: 1,
      review: "Great location, but doesn't have a lot of natural light and is extremely hard to find.",
      stars: 3
     },
     {
      spotId: 3,
      userId: 1,
      review: "Looooove the location, great if you want to be surrounded by nature, but I'm not sure why my window keeps coming open at night.",
      stars: 4
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(options)
  }
};
