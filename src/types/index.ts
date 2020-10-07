import { Request, Response } from 'express';
import type { GetServerSidePropsContext as NextGetServerSidePropsContext } from 'next';

export type GetServerSidePropsContext = NextGetServerSidePropsContext & {
  req: Request;
  res: Response;
};

export type { GetServerSidePropsResult } from 'next';
