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
        startDate: new Date('2023-01-17'),
        endDate: new Date('2023-01-25')
      },
      {
        spotId: 1,
        userId: 2,
        startDate: new Date('2023-03-14'),
        endDate: new Date('2023-03-20')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2023-09-17'),
        endDate: new Date('2023-09-23')
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date('2023-03-01'),
        endDate: new Date('2023-03-06')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2023-03-08'),
        endDate: new Date('2023-03-10')
      },
      {
        spotId: 2,
        userId: 3,
        startDate: new Date('2023-10-17'),
        endDate: new Date('2023-10-18')
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date('2023-02-22'),
        endDate: new Date('2023-02-28')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2023-02-12'),
        endDate: new Date('2023-02-18')
      },
      {
        spotId: 3,
        userId: 1,
        startDate: new Date('2023-11-26'),
        endDate: new Date('2023-11-28')
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
