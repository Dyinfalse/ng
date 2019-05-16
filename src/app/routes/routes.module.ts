import { NgModule } from '@angular/core';

import { SharedModule } from '@shared';
import { RouteRoutingModule } from './routes-routing.module';

// dashboard pages
// html
import { AreazoneComponent } from './areazone/areazone';
import { CompanyComponent } from './company/company';
import { DepartmentComponent } from './department/department';
import { LogLoginComponent } from './loglogin/loglogin';
import { LogPasswordComponent } from './logpassword/logpassword';
import { MenusComponent } from './menus/menus';
import { MenusFunctionComponent } from './menusfunction/menusfunction';
import { PositionComponent } from './position/position';
import { RoleComponent } from './role/role';
import { RoleRightComponent } from './roleright/roleright';
import { TradeComponent } from './trade/trade';
import { UserComponent } from './user/user';
import { UserRoleComponent } from './userrole/userrole';
// modal
import { AreazoneDetilsModal } from './areazone/areazone.modal';
import { CompanyDetilsModal } from './company/company.modal';
import { DepartmentDetilsModal } from './department/department.modal';
import { LogLoginDetilsModal } from './loglogin/loglogin.modal';
import { LogPasswordDetilsModal } from './logpassword/logpassword.modal';
import { MenusDetilsModal } from './menus/menus.modal';
import { MenusFunctionDetilsModal } from './menusfunction/menusfunction.modal';
import { PositionDetilsModal } from './position/position.modal';
import { RoleDetilsModal } from './role/role.modal';
import { RoleRightDetilsModal } from './roleright/roleright.modal';
import { TradeDetilsModal } from './trade/trade.modal';
import { UserDetilsModal } from './user/user.modal';
import { UserRoleDetilsModal } from './userrole/userrole.modal';
import { UserRoleDistributionModal } from './userrole/userrole.distribution.modal';
// 富文本编辑器
import { MyeditorComponent } from '../tinymce';
import { TestTinymceComponent } from './testTinymce/testTinymce.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { UserLockComponent } from './passport/lock/lock.component';
import { CallbackComponent } from './callback/callback.component';

const COMPONENTS = [
  AreazoneComponent,
  MyeditorComponent,
  CompanyComponent,
  DepartmentComponent,
  LogLoginComponent,
  LogPasswordComponent,
  MenusComponent,
  MenusFunctionComponent,
  PositionComponent,
  RoleComponent,
  RoleRightComponent,
  TradeComponent,
  UserComponent,
  UserRoleComponent,
  TestTinymceComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  UserLockComponent,
  CallbackComponent
];
// 弹窗
const COMPONENTS_NOROUNT = [
  AreazoneDetilsModal,
  CompanyDetilsModal,
  DepartmentDetilsModal,
  LogLoginDetilsModal,
  LogPasswordDetilsModal,
  MenusDetilsModal,
  MenusFunctionDetilsModal,
  PositionDetilsModal,
  RoleDetilsModal,
  RoleRightDetilsModal,
  TradeDetilsModal,
  UserDetilsModal,
  UserRoleDetilsModal,
  UserRoleDistributionModal
];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
