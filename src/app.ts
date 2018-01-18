import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import * as path from 'path';
import * as yargs from 'yargs';
import { config } from './config';
import { Profile } from './entities/profile';
import { User } from './entities/user';
import { BaseRouter } from './routes/base';
import { ProfileRouter } from './routes/profile';
import { UsageRouter } from './routes/usage';
import { UserRouter } from './routes/user';

const argv = yargs.argv;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(cookieParser());

function customMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const decodedToken: any = jsonwebtoken.verify(req.get('Authorization').split(' ')[1], '=H6gMEL2h-8-UD6j');

        req['user'] = decodedToken.username;

    } catch (err) {

    }

    next();
}

function requireUser(req: express.Request, res: express.Response, next: express.NextFunction) {

    try {
        const decodedToken: any = jsonwebtoken.verify(req.get('Authorization').split(' ')[1], '=H6gMEL2h-8-UD6j');

        if (!decodedToken) {
            res.status(401).end();
            return;
        }

        req['user'] = decodedToken.username;

        next();

    } catch (err) {
        res.status(400).end();
        return;
    }

}

app.get('/api/database/sync', customMiddleware, BaseRouter.sync);

app.route('/api/profile')
    .get(customMiddleware, ProfileRouter.get)
    .post(requireUser, ProfileRouter.post)
    .put(requireUser, ProfileRouter.put);

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

BaseRouter.getUserService().find('developersworkspace@gmail.com').then((user: User) => {
    if (!user) {
        BaseRouter.getUserService().create(new User('developersworkspace@gmail.com', '12345678')).then((user: User) => {
            return BaseRouter.getProfileService().create(Profile.getProfileBarendErasmus(), user.username);
        }).then((profile: Profile) => {

        });
    }
});
