import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorHandlerComponent } from './errorHandler/errorHandler.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' }, // 根路径默认跳转至首页
  { path: 'index', component: IndexComponent, pathMatch: 'full'},
  { path: 'error', component: ErrorHandlerComponent }, // error页面
  { path: '**', component: ErrorHandlerComponent  } // 404找不到页面跳转error页面
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    preloadingStrategy: PreloadAllModules // 预加载所有懒加载模块
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
