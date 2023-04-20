'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Bookings'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        startDate: new Date (2023, 0, 17),
        endDate: new Date(2023, 0, 25)
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date(2023, 2, 1),
        endDate: new Date (2023, 2, 6)
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date(2023, 1, 22),
        endDate: new Date (2023, 1, 28)
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
