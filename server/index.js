const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const Ad = require('./models/ad');

const adRoutes = require('./routes/ads'),
      userRoutes = require('./routes/users'),
      shelterRoutes = require('./routes/shelter');

mongoose.connect(config.DB_URI).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

const app = express();

app.use(bodyParser.json());

app.use('/api/v1/ads', adRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/shelter', shelterRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, function () {
    console.log('I am running');
});
