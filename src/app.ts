// Imports
import * as express from 'express';
import * as path from 'path';
import * as yargs from 'yargs';
import { config } from './config';

// Imports middleware
import * as bodyParser from 'body-parser';

// Imports routes
import { ProfileRouter } from './routes/profile';
import { BaseRouter } from './routes/base';

const argv = yargs.argv;
const app = express();

// Configures body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

// function requireUser(req: express.Request, res: express.Response, next: express.NextFunction) {
//     if (!req.user) {
//         const options: any = {

//             failureRedirect: '/',
//             prompt: 'select_account',
//             scope: ['profile'],
//             session: true,
//             state: encodeURIComponent(req.url),
//             successRedirect: '/ui/survey/list',
//         };

//         passport.authenticate('google', options)(req, res, next);
//         return;
//     }

//     next();
// }

app.get('/api/database/sync', BaseRouter.sync);

app.get('/api/profile', ProfileRouter.get);

app.use('/api/docs', express.static(path.join(__dirname, './../apidoc')));
app.use('/api/coverage', express.static(path.join(__dirname, './../coverage/lcov-report')));

app.listen(argv.port || 3000, () => {
    console.log(`listening on port ${argv.port || 3000}`);
});
