require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
global.__basedir = __dirname;
var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
app.use(cors(corsOptions));

// api routes
app.use('/users', require('./users/users.controller'));
app.use(express.urlencoded({ extended: true }));


const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));