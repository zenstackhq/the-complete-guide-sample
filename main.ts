import { PrismaClient } from '@prisma/client';
import { enhance } from '@zenstackhq/runtime';
import RESTHandler from '@zenstackhq/server/api/rest';
import { ZenStackMiddleware } from '@zenstackhq/server/express';
import express, { Request } from 'express';
import swaggerUI from 'swagger-ui-express';

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

function getUser(req: Request) {
    if (req.headers['x-user-id']) {
        return { id: parseInt(req.headers['x-user-id'] as string) };
    } else {
        return undefined;
    }
}

app.use(
    '/api/rpc',
    ZenStackMiddleware({
        getPrisma: (req) => enhance(prisma, { user: getUser(req) }),
    })
);

app.use(
    '/api/rest',
    ZenStackMiddleware({
        handler: RESTHandler({ endpoint: 'http://localhost:3000/api/rest' }),
        getPrisma: (req) => enhance(prisma, { user: getUser(req) }),
    })
);

app.use(
    '/api/docs',
    swaggerUI.serve,
    swaggerUI.setup(require('./todo-api.json'))
);

app.listen(3000, () =>
    console.log('🚀 Server ready at: http://localhost:3000')
);
