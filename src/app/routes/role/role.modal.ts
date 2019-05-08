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
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="roleid">角色ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="roleid" placeholder="请输入角色ID" id="roleid" />
                <nz-form-explain *ngIf="validateForm.get('roleid')?.dirty && validateForm.get('roleid')?.errors">
                  请输入角色ID
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="rolename">角色名称</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="rolename" placeholder="请输入角色名称" id="rolename" />
                <nz-form-explain *ngIf="validateForm.get('rolename')?.dirty && validateForm.get('rolename')?.errors">
                  请输入角色名称
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="roledesc">描述</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="roledesc" placeholder="请输入描述" id="roledesc" />
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
export class RoleDetilsModal {

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
    
    if(!this.validateForm.value.roleid){
      return;
    }
    if(!this.validateForm.value.rolename){
      return;
    }
    this.ok(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      
	roleid: [this.form.roleid, [Validators.required]],
	
      
	rolename: [this.form.rolename, [Validators.required]],
	
      
	
	roledesc: [this.form.roledesc],
      
      //company: [this.form.company, [Validators.required]],
    });
    if(this.form.departname){
      this.title = this.form.departname;
    }
  }
}
