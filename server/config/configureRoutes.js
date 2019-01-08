const defaultRoute = require('../routes/defaultRoute');
const userRoute = require('../routes/usersRoute');

module.exports = server => {
    server.use('/alive', defaultRoute);
    server.use('/api/user', userRoute);
}
