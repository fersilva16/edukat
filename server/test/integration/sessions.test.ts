import api from '~/test/api';
import truncateAll from '~/test/utils/truncateAll';

describe('Sessions', () => {
  beforeEach(async () => {
    await truncateAll();
  });

  it('should be login user', async () => {
    const response = await api.post('/sessions')
      .send({
        email: 'admin@edukat.com.br',
        password: 'admin',
      });

    expect(response.status).toBe(200);

    expect(response.body)
      .toBeObject();
  });
});
