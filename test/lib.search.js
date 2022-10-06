'use strict';

const gplay = require('../index');
const assertValidApp = require('./common').assertValidApp;
const assert = require('chai').assert;

describe('Search method', () => {
  it('should fetch a valid application list', () => {
    return gplay.search({ term: 'Panda vs Zombies' })
      .then((apps) => apps.map(assertValidApp));
  });

  it('should validate the results number', function () {
    const count = 5;
    return gplay.search({
      term: 'vr',
      num: count
    })
      .then((apps) => {
        apps.map(assertValidApp);
        assert(apps.length === count, `should return ${count} items but ${apps.length} returned`);
      });
  });

  // preregister tend to have some fields missing, increasing chances of failure
  // by searching "preregister" we have more chances of getting some in the results
  it('should search for pre register', () =>
    gplay.search({ term: 'preregister', num: 10 })
      .then((apps) => apps.map(assertValidApp)));

  it('should search for clash of clans', async () => {
    // this.timeout(10000);
    await gplay.search({ term: 'clash of clans', num: 250 })
      .then((apps) => {
        apps.map(assertValidApp);
        assert(apps.length > 0, 'should return at least one result');
        assert(apps.length > 50, 'should return at least 50 results - pagination works'); 
      });
  }
  );

  it('should search for waze', async () => {
    await gplay.search({ term: 'waze', num: 250 })
      .then((apps) => {
        apps.map(assertValidApp);
        assert(apps.length > 0, 'should return at least one result');
        assert(apps.length > 50, 'should return at least 50 results - pagination works');
      });
  }
  );

  it('should search for facebook', async () => {
    await gplay.search({ term: 'facebook', num: 250 })
      .then((apps) => {
        apps.map(assertValidApp);
        assert(apps.length > 0, 'should return at least one result');
        assert(apps.length > 50, 'should return at least 50 results - pagination works');
        console.log(`Number of results: ${apps.length}`);
      });
  }
  );
  
  it('should search for forex', async () => {
    await gplay.search({ term: 'forex', num: 250 })
      .then((apps) => {
        apps.map(assertValidApp);
        assert(apps.length > 0, 'should return at least one result');
        assert(apps.length > 10, 'should return at least 50 results - pagination works');
        console.log(`Number of results: ${apps.length}`);
      });
  }
  );

  it('should search for book with 250 apps', async () => {
    await gplay.search({ term: 'clash mini', num: 250 })
      .then((apps) => {
        apps.map(assertValidApp);
        assert(apps.length > 0, 'should return at least one result');
        assert(apps.length > 50, 'should return at least 50 results - pagination works');
      });
  }
  );

  it('should search for facebook with fullDetail', () =>
    gplay.search({ term: 'facebook', num: 10, fullDetail: true })
      .then((apps) => apps.map(assertValidApp))).timeout(5 * 1000);

  it('should fetch multiple pages of distinct results', () =>
    gplay.search({ term: 'panda', num: 55 })
      .then((apps) => {
        assert.equal(apps.length, 55, 'should return as many apps as requested');
      }));

  it('should fetch multiple pages of when not starting from cluster of subsections', () =>
    gplay.search({ term: 'panda', num: 65 })
      .then((apps) => {
        assert.equal(apps.length, 65, 'should return as many apps as requested');
      }));
});
