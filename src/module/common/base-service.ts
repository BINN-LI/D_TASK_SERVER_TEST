import { HttpStatus } from '@nestjs/common';
import { IError } from '../common/response-class';
import { IResObj } from '../common/response-class';
import { IResObjList } from '../common/response-class';

export class BaseService<T> {
  constructor() {}
  resObj(data: T): IResObj<T> {
    return new IResObj(200, false, 'success', data);
  }

  resList(data: any): IResObjList<T> {
    return new IResObjList(200, false, 'success', data);
  }

  resError(message: string): IError {
    return new IError(HttpStatus.BAD_REQUEST, message);
  }
}
