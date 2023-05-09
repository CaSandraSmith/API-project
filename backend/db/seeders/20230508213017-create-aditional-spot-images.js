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
        url: 'https://yourbrooklynguide.com/wp-content/uploads/2021/08/view-of-the-world-trade-center-from-the-empire-state-building-observatory.jpg',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://i.insider.com/580f7112362ca41d008b4943?width=600&format=jpeg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://tinybeans.com/wp-content/uploads/2021/11/best-cozy-cabins-near-seattle-skykomish-cabin.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://www.thespruce.com/thmb/YpcR0CiAc6Qy6l_vl7HpJbQ9R4Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/andrea-davis-IWfe63thJxk-unsplash-ed2a4a77a0bb40bc8b4247355480977e.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://blog.stkimg.com/media/2021/07/15161538/Edwards-House-Twilight-1024x683.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://homedesignlover.com/wp-content/uploads/2011/12/5-seating-area.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://static.wikia.nocookie.net/harrypotter/images/f/fc/GrimmauldPlace_WB_F5_FrontOfGrimmualdPlace_Image_100615_Land.jpg/revision/latest?cb=20161017204708',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://i.pinimg.com/originals/94/db/05/94db05fb4c43f8efa04780cafea54640.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://www.homenish.com/wp-content/uploads/2020/12/Gothic-Bedroom-Decor-Ideas.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://www.thesimsresource.com/scaled/2735/w-920h-690-2735344.jpg',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://media.cntraveler.com/photos/5cca03b465d9557526194543/master/w_1600%2Cc_limit/hagrids-hut.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://blogmedia.localize.city/blog/wp-content/uploads/2020/03/what-is-prewar-apartment-nyc.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://i.pinimg.com/originals/bf/fe/57/bffe578f624b3ea8c5947e2ee62a9b10.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://cmsmedia.remodelista.com/wp-content/uploads/2020/11/frederick-tang-eastern-parkway-brooklyn-apartment-kitchen-1536x1066.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/peerspace-inc/image/upload/sony7ke3o1z31oggjq0k.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://imgs.6sqft.com/wp-content/uploads/2017/11/27083938/719-carroll-street-1.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://miro.medium.com/v2/resize:fit:640/1*0ZajHBkV09OjIYLsvr81lQ.jpeg',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://3.bp.blogspot.com/-Z0CjcJWgi9k/WYnOf2H721I/AAAAAAABN-c/djuk8klOw-4Dg-AlUSi_J7ySK_2c5q51ACLcBGAs/s1600/20663719_10155768901403933_4509925688079686348_n.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://gothamtrending.files.wordpress.com/2011/09/wayne-manor-entrance-interiors-osterly-park-the-dark-knight-rises.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/C6SCVCJFM5FINHB4KEIEX6CYNA.jpg',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://i.pinimg.com/736x/d2/b9/51/d2b9510deef3d6573e9bfa5345465996.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.home-designing.com/wp-content/uploads/2020/07/round-skylight.jpg',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://i.pinimg.com/474x/f6/e5/53/f6e5536cd6fe7c5378103c8d014a8c3c.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://cdn.home-designing.com/wp-content/uploads/2016/06/dark-home-theater-inspiration.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://elitehts.com/wp-content/uploads/2018/12/batcave_home_theater_2-1024x563.jpg',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://www.thepinnaclelist.com/wp-content/uploads/2020/06/19-Cascading-Courts-Luxury-House-Faber-Drive-Singapore.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/750x/12/23/cf/1223cfd25ca3047f33d28366a24ddb04.jpg',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Tardis_BBC_Television_Center.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/564x/81/b9/f7/81b9f7af1edc2537ee82fef0ec89007d.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://secure.img1-cg.wfcdn.com/im/14587818/resize-h350%5Ecompr-r85/3740/37405929/Boler+78.8%27%27+Dining+Table.jpg',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://i.pinimg.com/736x/bd/2e/ca/bd2ecaa4de735d0839e830669090a985.jpg',
        preview: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
