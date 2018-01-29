import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';

export class CustomMiddleware {

    public static default(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {

            const token: string = CustomMiddleware.getAuthenticationToken(req);

            if (token) {
                const decodedToken: any = jsonwebtoken.verify(token, '=H6gMEL2h-8-UD6j');

                req['user'] = decodedToken.userName;

            }

        } catch (err) {

        }

        next();
    }

    public static hasToBeAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction): void {
        if (!req['user']) {
            res.status(401).end();
            return;
        }

        next();
    }

    private static getAuthenticationToken(req: express.Request): string {
        const authorizationHeader: string = req.get('Authorization');

        const splittedAuthorizationHeader: string[] = authorizationHeader.split(' ');

        if (splittedAuthorizationHeader.length !== 2) {
            return null;
        }

        return splittedAuthorizationHeader[1];
    }

}