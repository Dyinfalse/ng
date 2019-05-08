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
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="logid">登陆记录Id</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="logid" placeholder="请输入登陆记录Id" id="logid" />
                <nz-form-explain *ngIf="validateForm.get('logid')?.dirty && validateForm.get('logid')?.errors">
                  请输入登陆记录Id
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="userid">用户id</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="userid" placeholder="请输入用户id" id="userid" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="ip">登录IP</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="ip" placeholder="请输入登录IP" id="ip" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="hostname">登录主机名</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="hostname" placeholder="请输入登录主机名" id="hostname" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="hostuser">登录主机用户</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="hostuser" placeholder="请输入登录主机用户" id="hostuser" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="location">登录位置</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="location" placeholder="请输入登录位置" id="location" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="logintime">登陆时间</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="logintime" placeholder="请输入登陆时间" id="logintime" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="exittime">退出时间</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="exittime" placeholder="请输入退出时间" id="exittime" />
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
export class LogLoginDetilsModal {

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
    
    if(!this.validateForm.value.logid){
      return;
    }
    this.ok(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      
	logid: [this.form.logid, [Validators.required]],
	
      
	
	userid: [this.form.userid],
      
	
	ip: [this.form.ip],
      
	
	hostname: [this.form.hostname],
      
	
	hostuser: [this.form.hostuser],
      
	
	location: [this.form.location],
      
	
	logintime: [this.form.logintime],
      
	
	exittime: [this.form.exittime],
      
      //company: [this.form.company, [Validators.required]],
    });
    if(this.form.departname){
      this.title = this.form.departname;
    }
  }
}
