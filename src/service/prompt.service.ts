/**
 * 弹窗提示服务(依赖弹窗服务)
 * 不能在变更检测钩子中创建。
 * 作者： 方楚群（Evan）
 * 版权申明：版权归方楚群个人所有，仅供学习参考，不得商用。
 */
import { Injectable, Component, EventEmitter, Input, Output } from '@angular/core';
import { PopupService } from './popus.service';

// alert参数
class AlertParams {
  title: string; // 标题
  content: string; // 内容
  confirmText: string; // 确定按钮
  cancelText?: string;  // 取消按钮
}
// alert提示组件
@Component({
  selector: 'app-alert',
  template: `<div class="alert-box"><div class="alert-center"><div class="alert-title">{{data.title}}</div><div class="alert-content">{{data.content}}</div><div class="alert-btn"><div class="btn cancel" *ngIf="data.cancelText" (click)="cancel()">{{data.cancelText}}</div><div class="btn confirm" (click)="confirm()">{{data.confirmText || '确认'}}</div></div></div></div>`,
  styles: [`.alert-box{position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.2);z-index: 1000;margin: 0;}  .alert-center{position: absolute;left: 0;right: 0;top: 35%;background: #fff;margin: auto;border-radius: 4px;width: 80%;max-width: 640px;max-height: 450px;overflow: hidden;text-align: center;}  .alert-title{padding: 20px 25px 8px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;font-size: 17px;color: #333;font-weight: 400;line-height: 28px;}  .alert-content{min-height: 40px;padding: 0 20px 10px;font-size: 15px;color: #999;line-height: 24px;word-wrap: break-word;word-break: break-all;}  .alert-btn{display: flex;position: relative;line-height: 48px;font-size: 18px;}  .btn{display: block;position: relative;-webkit-box-flex: 1;-webkit-flex: 1;-ms-flex: 1;flex: 1;text-decoration: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);cursor: pointer;}  .alert-btn:after{content: " ";position: absolute;left: 0;top: 0;right: 0;border-top: 1px solid #e5e5e5;color: #D5D5D6;-webkit-transform: scaleY(0.5);-ms-transform: scaleY(0.5);transform: scaleY(0.5);}  .confirm{color: rgba(70,125,185,1);}  .cancel{color: rgba(51,51,51,1);}  .cancel:after{content: " ";position: absolute;top: 0;right: 0;bottom: 0;width: 1px;border-right: 1px solid #e5e5e5;color: #D5D5D6;-webkit-transform: scaleX(0.5);-ms-transform: scaleX(0.5);transform: scaleX(0.5);}`]
})
export class AlertComponent  {
  public data: AlertParams;
  @Input()
  set popusData(data: AlertParams) {
    this.data = data;
  }
  @Output()
  closed = new EventEmitter();
  public confirm() {
    this.closed.next({isConfirm: true, data: null});
  }
  public cancel() {
    this.closed.next({isConfirm: false, data: null});
  }
}

// toast参数
class ToastParams {
  content: string; // 内容
  timeout?: number; // 多长时间关闭时间（毫秒）
}
// toast提示组件
@Component({
  selector: 'app-toast',
  template: `<div class="toast"><div class="toast-text">{{data.content}}</div></div>`,
  styles: [`.toast{position: fixed;z-index: 1000;left: 0;right: 0;top: 35%;margin: auto;max-width: 220px;max-height: 120px;overflow: hidden;text-align: center;}  .toast-text{display: inline-block;padding: 8px 12px;min-width: 120px;background: rgba(0,0,0,0.8);font-size: 16px;color: #fff;border-radius: 4px;}`]
})
export class ToastComponent  {
  public data: ToastParams;
  @Output()
  closed = new EventEmitter();
  @Input()
  set popusData(data: ToastParams) {
    this.data = data;
    setTimeout(() => {
      this.closed.next();
    }, data.timeout || 2000);
  }
}

// 服务 - 注册各种弹窗方法
@Injectable()
export class PromptService {
  constructor(
    private  popupService: PopupService
  ) {
  }
  // alert提示方法
  public alert(alertParams: AlertParams) {
     return  this.popupService.showAsComponent(AlertComponent, alertParams).finally(() => {});
  }
  // toast提示方法
  public toast(toastParams: ToastParams) {
    this.popupService.showAsComponent(ToastComponent, toastParams);
  }
}
