const defaultRoute = require('../routes/defaultRoute');

module.exports = server => {
    server.use('/alive', defaultRoute);
}
