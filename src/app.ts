import * as express from 'express';
import * as path from 'path';
import * as yargs from 'yargs';
import * as jsonwebtoken from 'jsonwebtoken';
import { config } from './config';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { BaseRouter } from './routes/base';
import { ProfileRouter } from './routes/profile';
import { UserRouter } from './routes/user';

const argv = yargs.argv;
const app = express();

// Configures body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors());

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

app.get('/api/database/sync', BaseRouter.sync);

app.route('/api/profile')
    .get(requireUser, ProfileRouter.get)
    .post(requireUser, ProfileRouter.post)
    .put(requireUser, ProfileRouter.put);

app.route('/api/user')
    .get(UserRouter.get)
    .post(UserRouter.post)

app.use('/api/docs', express.static(path.join(__dirname, './../apidoc')));
app.use('/api/coverage', express.static(path.join(__dirname, './../coverage/lcov-report')));

app.listen(argv.port || 3000, () => {
    console.log(`listening on port ${argv.port || 3000}`);
});
