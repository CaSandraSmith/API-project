'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'ReviewImages'

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
        reviewId: 1,
        url: 'https://www.travelandleisure.com/thmb/oudFUI0CRxlBNyL7pPXlbYlFftc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Empire-State-Building-observatory-1-ESBVIEWS1019-58c97df9db014ce59356f8f3bd9a627b.jpg'
      },
      {
        reviewId: 2,
        url: 'https://i.pinimg.com/originals/6a/75/d8/6a75d8efd3e63103695a32ccc7a45858.jpg'
      },
      {
        reviewId: 3,
        url: 'https://i.pinimg.com/originals/79/dc/c5/79dcc5fe6c0154248877cabd75cf4e3e.jpg'
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
