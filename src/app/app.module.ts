import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from '../service/loading.service';
import { AlertComponent, ToastComponent } from '../service/prompt.service';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    AlertComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LoadingComponent, AlertComponent, ToastComponent]
})
export class AppModule { }
