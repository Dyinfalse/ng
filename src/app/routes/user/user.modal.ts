import { Component } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * @text [主键]
 * ```html
 * <nz-form-item>
 *  <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="no">部门ID</nz-form-label>
 *   <nz-form-control [nzSm]="19" [nzXs]="24">
 *       <input type="number" nz-input [(ngModel)]="form.departid" name="departid" placeholder="请输入部门ID" id="no">
 *   </nz-form-control>
 * </nz-form-item> 
 * ```
 */
@Component({
  template: `
        <div class="modal-header">
            <div class="modal-title">{{title}}</div>
        </div>
        <div class="modal-body">
          <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
            
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="userid">用户Id</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="userid" placeholder="请输入用户Id" id="userid" />
                <nz-form-explain *ngIf="validateForm.get('userid')?.dirty && validateForm.get('userid')?.errors">
                  请输入用户Id
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="department">部门ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="department" placeholder="请输入部门ID" id="department" />
                <nz-form-explain *ngIf="validateForm.get('department')?.dirty && validateForm.get('department')?.errors">
                  请输入部门ID
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="posid">职位ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="posid" placeholder="请输入职位ID" id="posid" />
                <nz-form-explain *ngIf="validateForm.get('posid')?.dirty && validateForm.get('posid')?.errors">
                  请输入职位ID
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="username">用户名称</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="username" placeholder="请输入用户名称" id="username" />
                <nz-form-explain *ngIf="validateForm.get('username')?.dirty && validateForm.get('username')?.errors">
                  请输入用户名称
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="gender">性别</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="gender" placeholder="请输入性别" id="gender" />
              </nz-form-control>
            </nz-form-item>
		
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="useraccount">用户帐号</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="useraccount" placeholder="请输入用户帐号" id="useraccount" />
                <nz-form-explain *ngIf="validateForm.get('useraccount')?.dirty && validateForm.get('useraccount')?.errors">
                  请输入用户帐号
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="password">密码</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="password" placeholder="请输入密码" id="password" />
                <nz-form-explain *ngIf="validateForm.get('password')?.dirty && validateForm.get('password')?.errors">
                  请输入密码
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="phone">电话</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="phone" placeholder="请输入电话" id="phone" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="areazone">区域ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="areazone" placeholder="请输入区域ID" id="areazone" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="address">地址</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="address" placeholder="请输入地址" id="address" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="mobile">手机</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="mobile" placeholder="请输入手机" id="mobile" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="email">Email</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="email" placeholder="请输入Email" id="email" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="postcode">邮编</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="postcode" placeholder="请输入邮编" id="postcode" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="iselogin">是否允许外网登录</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="iselogin" placeholder="请输入是否允许外网登录" id="iselogin" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="birth">生日</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="birth" placeholder="请输入生日" id="birth" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="lastlogin">最近登陆时间</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="lastlogin" placeholder="请输入最近登陆时间" id="lastlogin" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="lastupdatepwd">最近修改密码时间</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="lastupdatepwd" placeholder="请输入最近修改密码时间" id="lastupdatepwd" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="isactive">是否有效</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="isactive" placeholder="请输入是否有效" id="isactive" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="note">备注</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="note" placeholder="请输入备注" id="note" />
              </nz-form-control>
            </nz-form-item>
		
          </form>
        </div>
        <div class="modal-footer">
            <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="cancel()">
            关闭
            </button>
            <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="submitForm()">
            确认
            </button>
        </div>
    `
})
export class UserDetilsModal {

  constructor(private modal: NzModalRef, private fb: FormBuilder) { }

  //   弹窗入参
  form:any;

  title: string = '新建';

  validateForm: FormGroup;


  /**
   * 自定义校验
   */
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  cancel() {
    this.modal.destroy();
  }

  ok(validateFormValue:any) {
    this.modal.close(validateFormValue);
    this.cancel();
  }

  /**
   * 提交表单
   */
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    
    if(!this.validateForm.value.userid){
      return;
    }
    if(!this.validateForm.value.department){
      return;
    }
    if(!this.validateForm.value.posid){
      return;
    }
    if(!this.validateForm.value.username){
      return;
    }
    if(!this.validateForm.value.useraccount){
      return;
    }
    if(!this.validateForm.value.password){
      return;
    }
    this.ok(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      
	userid: [this.form.userid, [Validators.required]],
	
      
	department: [this.form.department, [Validators.required]],
	
      
	posid: [this.form.posid, [Validators.required]],
	
      
	username: [this.form.username, [Validators.required]],
	
      
	
	gender: [this.form.gender],
      
	useraccount: [this.form.useraccount, [Validators.required]],
	
      
	password: [this.form.password, [Validators.required]],
	
      
	
	phone: [this.form.phone],
      
	
	areazone: [this.form.areazone],
      
	
	address: [this.form.address],
      
	
	mobile: [this.form.mobile],
      
	
	email: [this.form.email],
      
	
	postcode: [this.form.postcode],
      
	
	iselogin: [this.form.iselogin],
      
	
	birth: [this.form.birth],
      
	
	lastlogin: [this.form.lastlogin],
      
	
	lastupdatepwd: [this.form.lastupdatepwd],
      
	
	isactive: [this.form.isactive],
      
	
	note: [this.form.note],
      
      //company: [this.form.company, [Validators.required]],
    });
    if(this.form.departname){
      this.title = this.form.departname;
    }
  }
}
