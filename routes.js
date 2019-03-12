const routes = require('next-routes')();

routes
    .add('/:address', '/show')
    .add('/admin/new', '/admin/new')
    .add('/user/new', '/user/new')
    .add('/:address/transection', '/transection')
    .add('/admin/:address/get', '/admin/get');

module.exports = routes;