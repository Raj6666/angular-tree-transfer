/*
 * @Descripttion: 
 * @version: 
 * @Author: Husiyuan
 * @Date: 2020-06-19 21:28:44
 * @LastEditors: Husiyuan
 * @LastEditTime: 2020-06-19 21:33:13
 */ 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
// components
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ErrorHandlerComponent } from './errorHandler/errorHandler.component';
// modules
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
// services
import { SimpleHttpInterceptor } from '../services/interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonService } from '../services/common.service';
import { HttpService } from '../services/http.service';
import { MyTreeService } from '../services/my-tree.service';
// mock
import { DelonMockModule } from '@delon/mock';
import * as MOCKDATA from '../mock';
import { environment } from '../environments/environment';
const MOCKMODULE = !environment.production ? [ DelonMockModule.forRoot({ data: MOCKDATA, log: true }) ] : [];
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgZorroAntdModule,
    ...MOCKMODULE
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: SimpleHttpInterceptor, multi: true},
    CommonService,
    HttpService,
    MyTreeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
