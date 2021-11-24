const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const app = express();
const cors = require('cors');
const { checkUser, requireAuth } = require('./middleware/auth.middleware');
console.log(process.env.CLIENT_URL);
const corsOptions = {
	origin: process.env.CLIENT_URL,
	credentials: true,
	allowedHeaders: ['sessionId', 'Content-Type'],
	exposedHeaders: ['sessionId'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	preflightContinue: false,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/****************CORS**********************/
app.use(cors(corsOptions));

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
	res.status(200).send(res.locals.user._id);
});

// routes
app.use('/api/user', userRoutes);

//server
app.listen(process.env.PORT, function () {
	console.log(`listening on port ${process.env.PORT}`);
});
