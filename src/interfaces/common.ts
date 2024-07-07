import { IGenericErrorMessage } from './error';

export type IGenericResponse<T, U = undefined> = {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: T;
  cartCalculation?: U;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};
