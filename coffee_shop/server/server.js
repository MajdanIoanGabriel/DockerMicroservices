//  server.js

var express = require('express');
var morgan = require('morgan');

module.exports.start = (options) => {

  return new Promise((resolve, reject) => {

    //  Make sure we have a port provided.
    if(!options.port) throw new Error("A server must be started with a port.");

    //  Create the app, add some logging.
    var app = express();
    app.use(morgan('dev'));

    //  Add the APIs to the app.
    require('../services/coffeelist')(app, options);
    require('../services/search')(app, options);
    require('../services/coffeecart')(app, options);
    require('../services/addtocart')(app, options);
    require('../services/removefromcart')(app, options);
    require('../services/totalprice')(app, options);

    //  Start the app, creating a running server which we return.
    var server = app.listen(options.port, () => {
      resolve(server);
    });

  });
};