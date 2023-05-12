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
      },
      {
        spotId: 9,
        url: 'https://images.thedirect.com/media/photos/A1CF3288-83BD-4C93-A486-1B84FB112B04.jpg',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://cdna.artstation.com/p/assets/images/images/003/194/842/large/bin8-lee-11893829-983732274991729-5302702142491070617-o.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://tgr.com.ph/img/blogs/full/marvel-penthouse-interior-ideas-from-the-stark-tower.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://i.ytimg.com/vi/zo0J7utIULE/maxresdefault.jpg',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://static01.nyt.com/images/2014/11/13/garden/20141113-BATHROOM-slide-MAH7/20141113-BATHROOM-slide-MAH7-superJumbo.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/1e/Tony_Stark%27s_Mansion.png',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://assets.hgtv.ca/wp-content/uploads/2021/12/Iron-Man-house12.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://images.luxuo.com/2018/09/Tony-Starks-Actual-House-for-Sale-The-Razor-House-California-6-930x620.jpg?strip=all&lossy=1&quality=75&ssl=1',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://bosshunting.com.au/wp-content/uploads/2020/03/tony-starks-house.jpg',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://assets.hgtv.ca/wp-content/uploads/2021/12/Iron-Man-house17.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://i.pinimg.com/originals/ac/90/16/ac9016772ab1ce51b29d07d98b7c6b6a.jpg',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://i.pinimg.com/564x/35/8a/27/358a27a1093a07745ea19b98e716674e.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://t4.ftcdn.net/jpg/02/13/98/05/360_F_213980591_7pPOKSRgKMy4nAlrhfUN2AbiQ4AD5bY2.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://imgs.6sqft.com/wp-content/uploads/2015/10/20045030/77-Perry-Street-2.jpg',
        preview: false
      },
      {
        spotId: 11,
        url: 'https://media.istockphoto.com/id/991654342/photo/new-york-city-overhead-view-of-historic-buildings-along-59th-street-with-the-midtown-manhattan.jpg?s=612x612&w=0&k=20&c=LanWtE6UWity6KHa_wawqyliDwugS9Iom1haE7yjwYo=',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://www.completehome.com.au/wp-content/uploads/2015/07/Hgate_library_3_high_res1.jpg',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://www.thenordroom.com/wp-content/uploads/2022/04/dark-blue-bedroom-niches-nordrom.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://www.brownstoner.com/wp-content/uploads/2013/03/british-style-031913.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://s.wsj.net/public/resources/images/OB-YX072_1hodsu_H_20130913044202.jpg',
        preview: false
      },
      {
        spotId: 12,
        url: 'https://www.period-homes.com/.image/c_fit%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_620/MTQ0NjI0ODQwMTcyMjUwNTMx/burke-residence-nyc-9.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://www.bostonmagazine.com/wp-content/uploads/sites/2/2018/11/cambridge-mansion-1.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://i.pinimg.com/736x/36/3d/84/363d84a29f4cd4e9b087dcb916d1001f.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://www.bostondesignguide.com/sites/default/files/LLL.kitchen_0.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://i.pinimg.com/550x/17/12/61/171261a4bbec3abe9045edaca28e18e6.jpg',
        preview: false
      },
      {
        spotId: 13,
        url: 'https://st.hzcdn.com/simgs/pictures/bedrooms/charming-cape-cod-renovation-knight-architects-llc-img~35412cf2009932a8_14-4523-1-bb07fff.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://cyreneseattle.com/assets/images/cache/banner_floorplans1-39e893e450d587f882bcea0c8636d689.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://images.squarespace-cdn.com/content/v1/5c4f405925bf02bc0e2e1b21/1552833246175-7XMVH2ITBTOBV79S4532/TWO_BED.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://lexingtonseattle.com/wp-content/uploads/Lexington-4-of-51-1.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://images1.apartments.com/i2/XR3X-qOU4gkCSCc536d--F-Q_sQRdH14pg72FGtxAy4/111/cyrene-seattle-wa-primary-photo.jpg',
        preview: false
      },
      {
        spotId: 14,
        url: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_3237,w_3750,x_0,y_1763/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/NQS_MS_LENORA_View_08_Northwest_Deck_skbsyz.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://sineathconstruction.com/wp-content/uploads/2020/08/cabin-woods-view-sineath.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://cdn.onekindesign.com/wp-content/uploads/2016/12/Log-Cabin-Style-Bedrooms-01-1-Kindesign.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2020/08/Spacious-contemporary-and-modern-cabin-interior-design-for-an-open-plan-living-and-dining-area.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://www.decorilla.com/online-decorating/wp-content/uploads/2022/02/log-cabin-living-room-interior-design-Edwards-Smith.jpg',
        preview: false
      },
      {
        spotId: 15,
        url: 'https://www.visitmysmokies.com/wp-content/uploads/2020/09/Feature-Photo-Pearly-Gates-1.png',
        preview: false
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};
