const Ad = require('./models/ad');
const User = require('./models/user');
const Shelter = require('./models/shelter');

const fakeDbData = require('./data.json');

class FakeDb {
    constructor() {
        this.ads = fakeDbData.ads;

        this.shelters = fakeDbData.shelters;
    }

    async cleanDb() {
        await User.remove({});
        await Shelter.remove({});
        await Ad.remove({});
    }

    pushAdsToDb() {
      const shelter = new Shelter(this.shelters[0]);

        this.ads.forEach((ad) => {
            const newAd = new Ad(ad);
            newAd.shelter = shelter;

            shelter.ads.push(newAd);

            newAd.save();
        });
        
        shelter.save();
    }

    async seedDb() {
        await this.cleanDb();
        this.pushAdsToDb();
    }
}

module.exports = FakeDb;