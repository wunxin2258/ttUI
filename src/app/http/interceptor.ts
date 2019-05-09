/**
 * 请求拦截服务
 */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../../service/loading.service';
import { PromptService } from '../../service/prompt.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private promptService: PromptService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // 添加请求头部
    this.loadingService.showLoading();
    // 请求头部设置
    req.headers.set('Content-type', 'application/json;charset=utf-8');
    req.headers.set('Access-Control-Request-Headers', 'content-type,xfilecategory,xfilename,xfilesize');
    let tips = '';
    return next.handle(req).pipe(
      tap(
        // 当成功响应时; 忽略其他事件
        event => {},
        // 请求失败; 错误是一个HttpErrorResponse
        error => {
          tips = '未知错误';
          switch (error.status) {
            case 401:
              tips = '登陆超时，重新登陆';
              break;
            case 404:
              tips = '资源不存在';
              break;
            case 406:
              tips = '头部无携带token';
              break;
            case 412:
              tips = '秘钥失效';
              break;
            case 415:
              tips = '请求type有误';
              break;
            case 500:
              tips = '服务器异常';
              break;
          }
        }
      ),
      // 请求完成调用
      finalize(() => {
        this.loadingService.hideLoading();
        if (tips) {
          this.promptService.alert({
            title: '提示',
            content: tips,
            confirmText: '关闭'
          });
        }
      })
    );
  }
}
