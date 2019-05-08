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
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="rightid">Right Id</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="rightid" placeholder="请输入Right Id" id="rightid" />
                <nz-form-explain *ngIf="validateForm.get('rightid')?.dirty && validateForm.get('rightid')?.errors">
                  请输入Right Id
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="roleid">角色ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="roleid" placeholder="请输入角色ID" id="roleid" />
                <nz-form-explain *ngIf="validateForm.get('roleid')?.dirty && validateForm.get('roleid')?.errors">
                  请输入角色ID
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="menufuncid">菜单功能ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="menufuncid" placeholder="请输入菜单功能ID" id="menufuncid" />
                <nz-form-explain *ngIf="validateForm.get('menufuncid')?.dirty && validateForm.get('menufuncid')?.errors">
                  请输入菜单功能ID
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
export class RoleRightDetilsModal {

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
    
    if(!this.validateForm.value.rightid){
      return;
    }
    if(!this.validateForm.value.roleid){
      return;
    }
    if(!this.validateForm.value.menufuncid){
      return;
    }
    this.ok(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      
	rightid: [this.form.rightid, [Validators.required]],
	
      
	roleid: [this.form.roleid, [Validators.required]],
	
      
	menufuncid: [this.form.menufuncid, [Validators.required]],
	
      
      //company: [this.form.company, [Validators.required]],
    });
    if(this.form.departname){
      this.title = this.form.departname;
    }
  }
}
