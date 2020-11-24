import rewiremock from 'rewiremock';

rewiremock('next').with(() => ({
  prepare: () => Promise.resolve(),
  render: () => Promise.resolve(),
  getRequestHandler: () => () => Promise.resolve(),
}));
