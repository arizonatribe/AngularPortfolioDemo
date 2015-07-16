var express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    utilities = require('./../server/services/utilities.js');

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(function(req, res, next) {
    utilities.setHeaders(res);
    next();
  });

  require('../server/routes/auth.routes.js')(app);
  require('../server/routes/companies.routes.js')(app);
  require('../server/routes/jobs.routes.js')(app);
  require('../server/routes/messages.routes.js')(app);

  app.use(express.static('./public'));

  return app;
};
