/**
 * loading服务
 * 不能在变更检测钩子中创建。
 * 作者： 方楚群（Evan）
 * 版权申明：版权归方楚群个人所有，仅供学习参考，不得商用。
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `<div class="weui-loading_toast "><div class="weui-mask_transparent"></div><div class="weui-toast weui-animate-fade-in"><i class="weui-loading weui-icon_toast"></i><p class="weui-toast__content">{{title}}</p></div></div>`,
  styles: [`.weui-mask, .weui-mask_transparent {position: fixed;z-index: 1000;top: 0;right: 0;left: 0;bottom: 0;}  .weui-animate-fade-in {-webkit-animation: c ease .3s forwards;animation: c ease .3s forwards;}  .weui-toast {position: fixed;z-index: 5000;width: 90px;top: 35%;left: 0;right: 0;margin: auto;background: rgba(0, 0, 0, .7);text-align: center;border-radius: 5px;color: #fff;}  .weui-icon_toast.weui-loading {margin: 12px 0 0;width: 45px;height: 45px;vertical-align: baseline;}  .weui-toast__content {margin: 0 0 12px;font-size: 14px;}  @-webkit-keyframes a { 0% {-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0)} to {-webkit-transform: translateZ(0);transform: translateZ(0)} }  @keyframes a { 0% {-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0)} to {-webkit-transform: translateZ(0);transform: translateZ(0)} }  .weui-animate-slide-up {-webkit-animation: a ease .3s forwards;animation: a ease .3s forwards}  @-webkit-keyframes b { 0% {-webkit-transform: translateZ(0);transform: translateZ(0)} to {-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0)} }  @keyframes b { 0% {-webkit-transform: translateZ(0);transform: translateZ(0)} to {-webkit-transform: translate3d(0, 100%, 0);transform: translate3d(0, 100%, 0)} }  .weui-animate-slide-down {-webkit-animation: b ease .3s forwards;animation: b ease .3s forwards}  @-webkit-keyframes c { 0% {opacity: 0} to {opacity: 1} }  @keyframes c { 0% {opacity: 0} to {opacity: 1} }  .weui-animate-fade-in {-webkit-animation: c ease .3s forwards;animation: c ease .3s forwards}  @-webkit-keyframes d { 0% {opacity: 1} to {opacity: 0} }  @keyframes d { 0% {opacity: 1} to {opacity: 0} }  .weui-animate-fade-out {-webkit-animation: d ease .3s forwards;animation: d ease .3s forwards}  .weui-agree {display: block;padding: .5em 15px;font-size: 13px}  .weui-agree a {color: #586c94}  .weui-agree__text {color: #999}  .weui-agree__checkbox {-webkit-appearance: none;appearance: none;outline: 0;font-size: 0;border: 1px solid #d1d1d1;background-color: #fff;border-radius: 3px;width: 13px;height: 13px;position: relative;vertical-align: 0;top: 2px}  .weui-agree__checkbox:checked:before {font-family: weui;font-style: normal;font-weight: 400;font-variant: normal;text-transform: none;text-align: center;speak: none;display: inline-block;vertical-align: middle;text-decoration: inherit;content: "\\EA08";color: #09bb07;font-size: 13px;position: absolute;top: 50%;left: 50%;-webkit-transform: translate(-50%, -48%) scale(.73);transform: translate(-50%, -48%) scale(.73)}  .weui-agree__checkbox:disabled {background-color: #e1e1e1}  .weui-agree__checkbox:disabled:before {color: #adadad}  .weui-loading {width: 20px;height: 20px;display: inline-block;vertical-align: middle;-webkit-animation: e 1s steps(12) infinite;animation: e 1s steps(12) infinite;background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;background-size: 100%;}  .weui-loading.weui-loading_transparent {background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect xmlns='http://www.w3.org/2000/svg' width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.56)' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.5)' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.43)' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.38)' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.32)' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.28)' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.25)' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.2)' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.17)' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.14)' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.1)' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='rgba(255,255,255,.03)' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E")}  @-webkit-keyframes e { 0% {-webkit-transform: rotate(0deg);transform: rotate(0deg)} to {-webkit-transform: rotate(1turn);transform: rotate(1turn)} }  @keyframes e { 0% {-webkit-transform: rotate(0deg);transform: rotate(0deg)} to {-webkit-transform: rotate(1turn);transform: rotate(1turn)} }`]
})
export class LoadingComponent  {
  private data: string = null;
  constructor() { }
  @Input()
  set title(data: string) {
    this.data = data ? data : 'loading...';
  }
  get title(): string {
    return this.data;
  }
}

@Injectable()
export class LoadingService {
  private popup: any;
  private hostView: any;
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }
  public showLoading(title?: string): void {
    const popup = document.createElement('popup-component');
    const factory = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
    const popupComponentRef = factory.create(this.injector, [], popup);
    this.applicationRef.attachView(popupComponentRef.hostView);
    popupComponentRef.instance.title = title;
    document.body.appendChild(popup);
    this.popup = popup;
    this.hostView = popupComponentRef.hostView;
  }
  public hideLoading(): void {
    document.body.removeChild(this.popup);
    this.applicationRef.detachView(this.hostView);
  }
}
