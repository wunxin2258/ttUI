/**
 * 请求服务方法(暂未实现业务的封装)
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PATH } from '../../config/api';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient
  ) {}
  get(url: string, options?: any): Observable<any> {
    return this.http.get(PATH + url, options);
  }
  post(url: string, body: object, options?: any): Observable<any> {
    return this.http.post(PATH + url, body, options);
  }
}
