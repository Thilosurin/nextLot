const routes = require('next-routes')();

routes
    .add('/:address', '/show')
    .add('/:address/transection', '/transection')
    .add('/admin/new', '/admin/new')
    .add('/admin/:address/get', '/admin/get');

module.exports = routes;