import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    templateUrl: './errorHandler.component.html',
    styleUrls: ['./errorHandler.component.scss']
})
export class ErrorHandlerComponent  implements OnInit{
  constructor(
    private http: HttpService,
    public  activeRoute: ActivatedRoute,
    private message: NzMessageService,
  ) {}
  text = '该页面不存在';
  isShowButton = false;

  ngOnInit() {
    // 获取路由返回的参数
    this.activeRoute.queryParams.subscribe(params => {
      if (params['text'] !== undefined) {
        localStorage.clear();
        this.text = params['text'];
        this.isShowButton = true;
      }
    });
    this.message.create('error', this.text);
  }

  return() {
    // 返回登录页
    window.location.href = '/';
  }
}

