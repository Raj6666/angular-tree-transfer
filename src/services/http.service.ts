import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {
  private isLoading = false;

  constructor(private http: HttpClient) {
  }

  /** 是否正在加载中 */
  get loading(): boolean {
    return this.isLoading;
  }

  parseParams(params: any): HttpParams {
    let ret = new HttpParams();
    for (const key in params) {
      if (key !== null) {
        const data = params[key];
        ret = ret.set(key, data);
      }
    }
    return ret;
  }

  begin() {
    setTimeout(() => (this.isLoading = true));
  }

  end() {
    setTimeout(() => (this.isLoading = false));
  }

  /**
   * GET：返回一个 `T` 类型
   */
  get<T>(url: string,
         params?: any,
         options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      reportProgress?: boolean;
      responseType: 'json';
      withCredentials: boolean;
    }): Observable<T>;

  /**
   * GET：返回一个 `string` 类型
   */
  get(url: string,
      params: any,
      options: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    }): Observable<string>;

  /**
   * GET：返回一个 `JSON` 类型
   */
  get(url: string,
      params: any,
      options: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }): Observable<HttpResponse<Object>>;

  /**
   * GET：返回一个 `JSON` 类型
   */
  get<T>(url: string,
         params: any,
         options: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }): Observable<HttpResponse<T>>;

  /**
   * GET：返回一个 `any` 类型
   */
  get(url: string,
      params?: any,
      options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }): Observable<any>;

  /**
   * GET 请求
   */
  get(url: string,
      params: any,
      options: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }): Observable<any> {
    return this.request(
      'GET',
      url,
      Object.assign(
        {
          params,
        },
        options
      )
    );
  }

  // region: post
  /**
   * POST：返回一个 `string` 类型
   */
  post(url: string,
       body: any,
       params: any,
       options: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body';
      reportProgress?: boolean;
      responseType: 'text';
      withCredentials?: boolean;
    }): Observable<string>;

  /**
   * POST：返回一个 `JSON` 类型
   */
  post(url: string,
       body: any,
       params: any,
       options: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }): Observable<HttpResponse<Object>>;

  /**
   * POST：返回一个 `JSON` 类型
   */
  post<T>(url: string,
          body?: any,
          params?: any,
          options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe: 'response';
      reportProgress?: boolean;
      responseType?: 'json';
      withCredentials?: boolean;
    }): Observable<T>;

  /**
   * POST：返回一个 `any` 类型
   */
  post(url: string,
       body?: any,
       params?: any,
       options?: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }): Observable<any>;

  /**
   * POST 请求
   */
  post(url: string,
       body: any,
       params: any,
       options: {
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body' | 'events' | 'response';
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }): Observable<any> {
    const headers = Object.assign({
      'Content-Type': 'application/x-www-form-urlencoded'
    }, options ? options.headers : {});
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      body = this.parseParams(body);
    }
    return this.request(
      'POST',
      url,
      Object.assign(
        {
          body,
          params,
        },
        Object.assign(headers, options)
      )
    );
  }

  /**
   * `request` 请求
   *
   * @param method 请求方法类型
   * @param url URL地址
   * @param options 参数
   */
  request(method: string,
          url: string,
          options: {
      body?: any;
      headers?: HttpHeaders | { [header: string]: string | string[] };
      observe?: 'body' | 'events' | 'response';
      params?: HttpParams | { [param: string]: string | string[] };
      reportProgress?: boolean;
      responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
      withCredentials?: boolean;
    }): Observable<any> {
    this.begin();
    if (options) {
      if (options.params) { options.params = this.parseParams(options.params); }
    }
    return this.http.request(method, url, options).pipe(
      tap(() => {
        this.end();
      }),
      catchError(res => {
        this.end();
        return [];
      })
    );
  }

}

