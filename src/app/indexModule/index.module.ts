import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';

import { IndexComponent } from './index/index.component';
import { PopusComponent } from '../components/popus/popus.component';

import { PopupService } from '../../service/popus.service';
import { LoadingService } from '../../service/loading.service';
import { PromptService } from '../../service/prompt.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorProviders } from '../http/interceptor-barrel';
import { HttpService } from '../http/http.service';

@NgModule({
  declarations: [IndexComponent, PopusComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    HttpClientModule
  ],
  providers: [
    PopupService,
    LoadingService,
    PromptService,
    HttpInterceptorProviders,
    HttpService
  ],
  entryComponents: [PopusComponent]
})
export class IndexModule { }
