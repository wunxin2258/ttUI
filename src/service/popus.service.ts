/**
 * 弹窗服务
 * 不能在变更检测钩子中创建。
 * 作者： 方楚群（Evan）
 * 版权申明：版权归方楚群个人所有，仅供学习参考，不得商用。
 */
import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Type } from '@angular/core';
class PopupReturnData {
  isConfirm?: boolean; // 是否是确认事件
  data?: object; // 窗口的回调数据
}

@Injectable()
export class PopupService {
  constructor(private injector: Injector,
              private applicationRef: ApplicationRef,
              private componentFactoryResolver: ComponentFactoryResolver) {}
  showAsComponent(popusComponent: Type<any>, popupData: object): Promise<object> {
    // Create element
    const popup = document.createElement('popup-scomponent');
    // Create the component and wire it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(popusComponent);
    const popupComponentRef = factory.create(this.injector, [], popup);
    // Attach to the view so that the change detector knows to run
    this.applicationRef.attachView(popupComponentRef.hostView);
    console.log(popupComponentRef)
    // Set the message
    popupComponentRef.instance.popusData = popupData;
    // Add to the DOM
    document.body.appendChild(popup);
    // Listen to the close event
    return new Promise((resolve, reject) => {
      popupComponentRef.instance.closed.subscribe((popupReturnData: PopupReturnData) => {
        if (popupReturnData) {
          if (popupReturnData.isConfirm) {
            resolve(popupReturnData.data); // 设定关闭时返回true，执行。
          } else {
            reject(popupReturnData.data); // 设定关闭时返回false，执行。
          }
        }
        document.body.removeChild(popup);
        this.applicationRef.detachView(popupComponentRef.hostView);
      });
    });
  }
}
