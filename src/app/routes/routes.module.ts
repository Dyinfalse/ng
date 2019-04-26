import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';

// dashboard pages
// test
import { TestComponent } from './test/test.component';
import { TestDetilsModal } from './test/test.detils.modal';
// 富文本编辑器
import { MyeditorComponent } from '../tinymce';
import { TestTinymceComponent } from './testTinymce/testTinymce.component';

import { DashboardV1Component } from './dashboard/v1/v1.component';
import { DashboardAnalysisComponent } from './dashboard/analysis/analysis.component';
import { DashboardMonitorComponent } from './dashboard/monitor/monitor.component';
import { DashboardWorkplaceComponent } from './dashboard/workplace/workplace.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
import { CallbackComponent } from './callback/callback.component';

const COMPONENTS = [
  MyeditorComponent,
  TestComponent,
  TestTinymceComponent,
  DashboardV1Component,
  DashboardAnalysisComponent,
  DashboardMonitorComponent,
  DashboardWorkplaceComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  UserLockComponent,
  CallbackComponent
];
const COMPONENTS_NOROUNT = [
  TestDetilsModal
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
