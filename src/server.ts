import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import expressPlayground from 'graphql-playground-middleware-express';
import graphqlHTTP from 'express-graphql';
import { PORT } from './utils/config';
import * as database from './config/database';
import schema from './schema';

const app = express();

app.use(helmet());
app.use(cors());

database.connect().catch((err: Error) => {
  console.log(err);
  process.exit(1);
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use('/expressPlayground', expressPlayground({ endpoint: '/graphql' }));

app.listen(PORT, () => console.log('Running!!!'));
