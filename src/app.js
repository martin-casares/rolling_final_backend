require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnetion } = require('./database/config');
const authRouter = require('./router/authRouter');

const app = express();

app.use(express.json());

app.use(cors());

dbConnetion();

app.use('/api', authRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server on port ${process.env.PORT}`);
});
