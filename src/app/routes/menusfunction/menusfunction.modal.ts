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
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="menufuncid">功能 Id</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="menufuncid" placeholder="请输入功能 Id" id="menufuncid" />
                <nz-form-explain *ngIf="validateForm.get('menufuncid')?.dirty && validateForm.get('menufuncid')?.errors">
                  请输入功能 Id
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="menuid">菜单ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="menuid" placeholder="请输入菜单ID" id="menuid" />
                <nz-form-explain *ngIf="validateForm.get('menuid')?.dirty && validateForm.get('menuid')?.errors">
                  请输入菜单ID
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="menufuncname">菜单功能名称</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="menufuncname" placeholder="请输入菜单功能名称" id="menufuncname" />
                <nz-form-explain *ngIf="validateForm.get('menufuncname')?.dirty && validateForm.get('menufuncname')?.errors">
                  请输入菜单功能名称
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="menufuncurl">URL</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="menufuncurl" placeholder="请输入URL" id="menufuncurl" />
                <nz-form-explain *ngIf="validateForm.get('menufuncurl')?.dirty && validateForm.get('menufuncurl')?.errors">
                  请输入URL
                </nz-form-explain>
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
export class MenusFunctionDetilsModal {

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
    
    if(!this.validateForm.value.menufuncid){
      return;
    }
    if(!this.validateForm.value.menuid){
      return;
    }
    if(!this.validateForm.value.menufuncname){
      return;
    }
    if(!this.validateForm.value.menufuncurl){
      return;
    }
    this.ok(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      
	menufuncid: [this.form.menufuncid, [Validators.required]],
	
      
	menuid: [this.form.menuid, [Validators.required]],
	
      
	menufuncname: [this.form.menufuncname, [Validators.required]],
	
      
	menufuncurl: [this.form.menufuncurl, [Validators.required]],
	
      
      //company: [this.form.company, [Validators.required]],
    });
    if(this.form.departname){
      this.title = this.form.departname;
    }
  }
}
