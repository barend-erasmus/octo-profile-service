import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import * as yargs from 'yargs';
import { config } from './config';
import { CustomMiddleware } from './middleware/custom-middleware';
import { BaseRouter } from './routes/base';
import { ProfileRouter } from './routes/profile';
import { UsageRouter } from './routes/usage';
import { UserRouter } from './routes/user';

const argv = yargs.argv;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

app.get('/api/database/sync', CustomMiddleware.default, BaseRouter.sync);

app.route('/api/profile')
    .get(CustomMiddleware.default, ProfileRouter.get)
    .post(CustomMiddleware.default, CustomMiddleware.hasToBeAuthenticated, ProfileRouter.post)
    .put(CustomMiddleware.default, CustomMiddleware.hasToBeAuthenticated, ProfileRouter.put);

app.route('/api/usage/counts')
    .get(UsageRouter.counts);

app.route('/api/user')
    .get(UserRouter.get)
    .post(UserRouter.post);

app.use('/api/docs', express.static(path.join(__dirname, './../apidoc')));
app.use('/api/coverage', express.static(path.join(__dirname, './../coverage/lcov-report')));

app.listen(argv.port || 3000, () => {
    console.log(`listening on port ${argv.port || 3000}`);
});
