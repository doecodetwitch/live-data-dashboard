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
    db.collection('stats_day').add({
      date: '05-09-2022',
      market: 'Germany',
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
    });
    db.collection('stats_day').add({
      date: '06-09-2022',
      market: 'Japan',
      sales: {
        all: 300,
        new: 200,
        mobile: 100
      },
      user: {
        all: 18000,
        new: 15000,
        registered: 400
      },
      metrics: {
        conversion: 2.9,
        avg_order: 20,
        bouce_rate: 80
      },
      currency: 'JPY'
    });
    db.collection('stats_day').add({
      date: '07-09-2022',
      market: 'Japan',
      sales: {
        all: 800,
        new: 500,
        mobile: 400
      },
      user: {
        all: 20000,
        new: 12000,
        registered: 1900
      },
      metrics: {
        conversion: 3.0,
        avg_order: 20,
        bouce_rate: 80
      },
      currency: 'JPY'
    });
    
    console.log('database seed was successful');
  } catch (error) {
    console.log(error, 'database seed failed');
  }
}

getSeedData();

