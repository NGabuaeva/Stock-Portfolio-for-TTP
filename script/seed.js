'use strict';

const db = require('../server/db');
const { User } = require('../server/db/models');

async function seed() {
  try {
    await db.sync({ force: true });
    console.log('db synced!');

    const users = await Promise.all([
      User.create({
        name: 'Gingrface',
        email: 'gingerface@email.com',
        password: '123',
      }),
      User.create({
        name: 'Pepper',
        email: 'pepper@email.com',
        password: '123',
      }),
    ]);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
  } catch (err) {
    console.log(err);
  }
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, if we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

//  export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
