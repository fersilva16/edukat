import knex from '~/infra/knex';

import api from '../../api';

describe('Sessions', () => {
  beforeEach(async () => {
    await knex.truncate();
  });

  it('should be run nice', async () => {
    const response = await api()
      .post('/sessions')
      .send({
        email: 'admin@edukat.com.br',
        password: 'admin',
      });

    expect(response.status).toBe(200);
  });
});
