import { Request, Response } from 'express';

export default () => ({
  render(request: Request, response: Response) {
    response.status(200).send();
  },

  getRequestHandler() {
    return (request: Request, response: Response) => response.status(200).send();
  },
});
