/* eslint-disable no-undef */
import { NextFunction, Request, Response } from 'express';

const requestLog = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
  console.log(`${req.method} ${req.path}`);
  next();
};

export { requestLog };