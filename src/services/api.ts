import axios from 'axios';

import appConfig from '~/config/app';

export default axios.create({
  baseURL: appConfig.baseUrl,

  validateStatus: () => true,
});
