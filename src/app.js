require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnetion } = require('./database/config');

const app = express();

app.use(express.json());

app.use(cors());

dbConnetion();

app.listen(process.env.PORT, () => {
	console.log(`Server on port ${process.env.PORT}`);
});
