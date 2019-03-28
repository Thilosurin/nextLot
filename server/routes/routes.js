const routes = require('next-routes')();

routes
    .add('/profile', '/profile')
    .add('/:address', '/show')
    .add('/:address/transection', '/transection')
    // .add('/admin/period', '/admin/period')
    // .add('/admin/user', '/admin/user')
    // .add('/admin/reward', '/admin/reward')
    .add('/admin/:address/reward', '/admin/reward');

module.exports = routes;