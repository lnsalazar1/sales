const express   = require('express');
const morgan    = require('morgan');
const config    = require('./config');
const clients   = require('./modules/clients/routes');
const users     = require('./modules/users/routes');
const auth      = require('./modules/auth/routes');
const errors    = require('./network/errors');
const cors      = require('cors');

const app = express();

const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
    /*origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }*/
  };

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOptions));


//config
app.set('port', config.app.port);


//routes
app.use('/api/clients', clients);
app.use('/api/users', users);
app.use('/api/auth', auth);

//additions
app.use(errors);



module.exports = app;
