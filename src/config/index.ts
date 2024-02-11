import { database } from './database';
import { app } from './app';
import { jwt } from './jwt';

export default () => ({
  database,
  jwt,
  app,
});
