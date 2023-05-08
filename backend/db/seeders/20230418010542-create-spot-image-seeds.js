'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages'

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://untappedcities.com/wp-content/uploads/2019/10/Empire-State-Building-102nd-Floor-Observatory-Floor-to-Ceiling-Windows-360-Degree-View-NYC-007.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1635350926/vo3dmtkwizvc7df9ltgr.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Empire_State_Building_86th_floor.jpg/2560px-Empire_State_Building_86th_floor.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.ytimg.com/vi/vv8jY-8OUiw/maxresdefault.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/736x/07/dc/a1/07dca13586677ac5a36936dc6c9c2dc4.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://t3.ftcdn.net/jpg/05/52/75/84/360_F_552758489_AHMo5ImvyKBMxQ4ncKsFxfc7dXOP1XYd.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://www.housedigest.com/img/gallery/heres-where-you-can-visit-the-cullens-house-from-twilight/l-intro-1651765830.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://images.prismic.io/skylab/1c246bfe9ddcfc1cc7f51b8d9a775a27fc3cdb06_skylab_hoke_02.jpg?auto=compress,format',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/originals/9b/1f/5c/9b1f5c510e7e03cb6fb3040bb7f727ad.jpg',
        preview: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
