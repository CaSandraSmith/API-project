'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages'

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
        spotid: 1,
        url: 'https://untappedcities.com/wp-content/uploads/2019/10/Empire-State-Building-102nd-Floor-Observatory-Floor-to-Ceiling-Windows-360-Degree-View-NYC-007.jpg',
        preview: true
      },
      {
        spotid: 2,
        url: 'https://static.wikia.nocookie.net/harrypotter/images/f/fc/GrimmauldPlace_WB_F5_FrontOfGrimmualdPlace_Image_100615_Land.jpg/revision/latest?cb=20161017204708',
        preview: true
      },
      {
        spotid: 3,
        url: 'https://www.housedigest.com/img/gallery/heres-where-you-can-visit-the-cullens-house-from-twilight/l-intro-1651765830.jpg',
        preview: true
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
