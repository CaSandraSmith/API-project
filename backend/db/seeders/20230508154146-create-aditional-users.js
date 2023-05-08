'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName:'Harry',
        lastName: 'Potter',
        email: 'voldemortsucks@hogwarts.com',
        username: 'lightningHead',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Steve',
        lastName: 'Rogers',
        email: 'fromicetoearth@avengers.org',
        username: 'captainUSA',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Bruce',
        lastName: 'Wayne',
        email: 'totallybats@wayne.io',
        username: 'notBatman',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Doctor',
        lastName: 'Who',
        email: 'timeyWimey@space.com',
        username: 'timeLord',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jean',
        lastName: 'Gray',
        email: 'phoenix@x-men.org',
        username: 'DarkPhoenix',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Tony',
        lastName: 'Stark',
        email: 'stark@stark.org',
        username: 'ironman',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Peter',
        lastName: 'Parker',
        email: 'whospeter@noone.org',
        username: 'spiderfan',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sherlock',
        lastName: 'Holmes',
        email: 'consultant@private.com',
        username: 'privateeye',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Carol',
        lastName: 'Danvers',
        email: 'defender@space.org',
        username: 'captaimMarvel',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ben',
        lastName: 'Gates',
        email: 'historybuff@declaration.org',
        username: 'gateslegacy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Fran',
        lastName: 'Fine',
        email: 'thenanny@nanny.com',
        username: 'mrsSheffield',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Diana',
        lastName: 'Prince',
        email: 'amazonian@warrior.org',
        username: 'wonderwoman',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['lightningHead', 'captainUSA', 'notBatman', 'timeLord', 'DarkPhoenix', 'ironman', 'spiderfan', 'privateeye', 'captaimMarvel', 'gateslegacy', 'mrsSheffield', 'wonderwoman'] }
    }, {});
  }
};