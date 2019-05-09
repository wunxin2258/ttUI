import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../../service/popus.service';
import { PopusComponent } from '../../components/popus/popus.component';
import { LoadingService } from '../../../service/loading.service';
import { PromptService } from '../../../service/prompt.service';
import { HttpService } from '../../http/http.service';
import { API } from '../../../config/api';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private popupService: PopupService,
    private loadingService: LoadingService,
    private promptService: PromptService,
    private http: HttpService
  ) {
    // setTimeout(() => {
    //   // toast 提示
    //   this.promptService.toast({
    //     content: '加载完毕咯！',
    //     timeout: 2000
    //   });
    // }, 1000);
    // alert提示
    // this.promptService.alert({
    //   title: '提示',
    //   content: '明天五一放假啦',
    //   cancelText: '取消',
    //   confirmText: '确定'
    // });
    this.http.get(API.TEST).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
    // 弹窗服务实例
    // this.popupService.showAsComponent(PopusComponent, {}).then(data => {
    //   console.log(data);
    // });
  }

}
