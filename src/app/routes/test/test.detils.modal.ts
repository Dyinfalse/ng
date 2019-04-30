import { Component, Input } from '@angular/core'
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
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="company">公司ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="company" id="company" />
                <nz-form-explain *ngIf="validateForm.get('company')?.dirty && validateForm.get('company')?.errors">
                  请输入公司id
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="parentid">上级部门ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="parentid" id="parentid" />
                <nz-form-explain *ngIf="validateForm.get('parentid')?.dirty && validateForm.get('parentid')?.errors">
                  请输入上级部门ID
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="departname">部门名称</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="departname" id="departname" />
                <nz-form-explain *ngIf="validateForm.get('departname')?.dirty && validateForm.get('departname')?.errors">
                  请输入部门名称
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="comments">描述</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="comments" id="comments" />
                <nz-form-explain *ngIf="validateForm.get('comments')?.dirty && validateForm.get('comments')?.errors">
                  请输入描述
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>

            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="ischarge">是否管理部门</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="ischarge" id="ischarge" />
                <nz-form-explain *ngIf="validateForm.get('ischarge')?.dirty && validateForm.get('ischarge')?.errors">
                  请输入是否管理部门
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
export class TestDetilsModal {

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
    if(!this.validateForm.value.departname){
      return;
    }
    this.ok(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      departid: [this.form.departid],
      company: [this.form.company, [Validators.required]],
      parentid: [this.form.parentid, [Validators.required]],
      // departname: [null, [Validators.required, this.confirmationValidator]],
      departname: [this.form.departname, [Validators.required]],
      comments: [this.form.comments, [Validators.required]],
      ischarge: [this.form.ischarge, [Validators.required]]
    });
    if(this.form.departname){
      this.title = this.form.departname;
    }
  }
}
