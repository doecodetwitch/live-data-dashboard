const admin = require('firebase-admin'); // required
// const { faker } = require('@faker-js/faker');

// initialization
const projectId = 'live-data-dashboard';
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
admin.initializeApp({ projectId });

const db = admin.firestore();

// seed function
function getSeedData() {
  try {
    [...Array(10).keys()].map(() =>
      db.collection('stats_day').add({
        date: '25.08.2022',
        sales: {
          all: 999,
          new: 800,
          mobile: 900
        },
        user: {
          all: 20000,
          new: 19000,
          registered: 900
        },
        metrics: {
          conversion: 2.9,
          avg_order: 20,
          bouce_rate: 80
        },
        currency: 'EUR'
      })
    );
    console.log('database seed was successful');
  } catch (error) {
    console.log(error, 'database seed failed');
  }
}

getSeedData();

