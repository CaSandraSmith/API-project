'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'ReviewImages'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'https://www.travelandleisure.com/thmb/oudFUI0CRxlBNyL7pPXlbYlFftc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Empire-State-Building-observatory-1-ESBVIEWS1019-58c97df9db014ce59356f8f3bd9a627b.jpg'
      },
      {
        reviewId: 1,
        url: 'image url'
      },
      {
        reviewId: 2,
        url: 'image url'
      },
      {
        reviewId: 3,
        url: 'image url'
      },
      {
        reviewId: 3,
        url: 'image url'
      },      {
        reviewId: 3,
        url: 'image url'
      },
      {
        reviewId: 4,
        url: 'image url'
      },
      {
        reviewId: 5,
        url: 'image url'
      },
      {
        reviewId: 6,
        url: 'image url'
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
