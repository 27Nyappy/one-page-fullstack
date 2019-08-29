require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;

const DATABASE_URL = process.env.DATABASE_URL;
const client = new Client(DATABASE_URL);

// call connect
client.connect()
    // provide success/failure log based on connection working
    .then(() => console.log('connected to db', DATABASE_URL))
    .catch(err => console.error('connection error', err));

// listen for errors on the connection and log them
client.on('error', err => {
    console.error('\n**** DATABASE ERROR ****\n\n', err);
});

// export so other modules (files) can use
module.exports = client;