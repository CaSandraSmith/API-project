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
        startDate: '2023-01-17',
        endDate: '2023-01-25'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-03-01',
        endDate: '2023-03-06'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2023-02-22',
        endDate: '2023-02-28'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
