import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import * as path from 'path';
import * as yargs from 'yargs';
import { config } from './config';
import { BaseRouter } from './routes/base';
import { ProfileRouter } from './routes/profile';
import { UsageRouter } from './routes/usage';
import { UserRouter } from './routes/user';

const argv = yargs.argv;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

function customMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const decodedToken: any = jsonwebtoken.verify(req.get('Authorization').split(' ')[1], '=H6gMEL2h-8-UD6j');

        req['user'] = decodedToken.userName;

    } catch (err) {

    }

    next();
}

function requireUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {

        if (!req['user']) {
            res.status(401).end();
            return;
        }

        next();

    } catch (err) {
        res.status(400).end();
        return;
    }

}

app.get('/api/database/sync', customMiddleware, BaseRouter.sync);

app.route('/api/profile')
    .get(customMiddleware, ProfileRouter.get)
    .post(customMiddleware, requireUser, ProfileRouter.post)
    .put(customMiddleware, requireUser, ProfileRouter.put);

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
