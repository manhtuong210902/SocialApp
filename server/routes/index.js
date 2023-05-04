const authRouter = require('./auth');
const postRouter = require('./post');
const commentRouter = require('./comment');
const infoRouter = require('./info');
const photoRouter = require('./photo');
const searchRouter = require('./search');

function routes(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/posts', postRouter);
    app.use('/api/comments', commentRouter);
    app.use('/api/infos', infoRouter);
    app.use('/api/photos', photoRouter);
    app.use('/api/search', searchRouter);
}

module.exports = routes;
