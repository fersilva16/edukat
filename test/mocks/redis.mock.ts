import rewiremock from 'rewiremock';

const RedisMock = require('ioredis-mock');

rewiremock('ioredis').with(RedisMock);
