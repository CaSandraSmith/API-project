'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Spots'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 4,
        address: '12 Grimmauld Place',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        name: 'Grimmauld Place',
        description: 'Perfect location for those who want to explore downtown London.',
        price: 200
      },
      {
        ownerId: 5,
        address: '1514 Brooklyn Heights, Apt 74',
        city: 'Brooklyn',
        state: 'NY',
        country: 'USA',
        name: "Capsicle's Oasis",
        description: 'See New York from the view of its oldest living resident.',
        price: 152
      },
      {
        ownerId: 6,
        address: '1007 Mountain Drive',
        city: 'Gotham',
        state: 'NY',
        country: 'USA',
        name: 'Wayne Manor',
        description: 'Oasis away from the bustle of the city.',
        price: 300
      },
      {
        ownerId: 6,
        address: '1008 Mountain Drive',
        city: 'Gotham',
        state: 'NY',
        country: 'USA',
        name: 'Bat Cave',
        description: 'Roomy, underground cave with training area and pool.',
        price: 350
      },
      {
        ownerId: 7,
        address: '1514 Weeping Angel Way',
        city: 'London',
        state: 'England',
        country: 'UK',
        name: 'The Tardis',
        description: 'Much bigger in the inside than it.',
        price: 148
      },
      {
        ownerId: 8,
        address: '500 Phoenix Ave.',
        city: 'Westchester County',
        state: 'NY',
        country: 'USA',
        name: 'Gray Cottage',
        description: 'Cozy cottage in upstate NY.',
        price: 120
      },
      {
        ownerId: 9,
        address: '6 Avenger Ave',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        name: "Avengers Tower",
        description: "Skyscraper located in the heart of Midtown Manhattan.",
        price: 500
      },
      {
        ownerId: 9,
        address: '151 Beachside Lane',
        city: 'Malibu',
        state: 'CA',
        country: 'USA',
        name: 'Malibu Retreat',
        description: 'Located right along the beach.',
        price: 550
      },
      {
        ownerId: 10,
        address: '164 Mayfield St.',
        city: 'Queens',
        state: 'NY',
        country: 'USA',
        name: "Spider's Web",
        description: "Studio apartment on the outskirts of Queens.",
        price: 245
      },
      {
        ownerId: 11,
        address: '221B Baker Street',
        city: 'London',
        state: 'England',
        country: 'UK',
        name: "Slueth's Hideaway",
        description: 'Roomy apartment located in a quiet neighborhood, while also less than 10 minutes walking distance from downtown London.',
        price: 299
      },
      {
        ownerId: 12,
        address: '62 Mockingbird Way',
        city: 'Boston',
        state: 'MA',
        country: 'USA',
        name: 'Hometown Hut',
        description: 'Cozy, colonial-style home located in a Boston suburb.',
        price: 200
      },
      {
        ownerId: 12,
        address: '23 Landed Blvd',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        name: 'Space Pad',
        description: "Live like you're in outerspace.",
        price: 250
      },
      {
        ownerId: 13,
        address: '48 Star Ln',
        city: 'Seattle',
        state: 'WA',
        country: 'USA',
        name: 'Warrior Rest',
        description: 'Best place in the city to put your feet up and relax while also being able to partake in night life.',
        price: 148
      },
      {
        ownerId: 14,
        address: '4 Forest Rd.',
        city: 'Kalispell',
        state: 'MT',
        country: 'USA',
        name: 'Forest Hideout',
        description: 'Hide away from the world on this property. Perfectly placed in the most remote parts of Montana.',
        price: 130
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options)
  }
};