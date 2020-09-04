import 'reflect-metadata';

import './container';
import './logger/redis';
import './logger/knex';
import './logger/next';

import initialize from './initialize';

initialize();
