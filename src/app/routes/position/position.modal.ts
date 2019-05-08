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
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="posid">职位ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="posid" placeholder="请输入职位ID" id="posid" />
                <nz-form-explain *ngIf="validateForm.get('posid')?.dirty && validateForm.get('posid')?.errors">
                  请输入职位ID
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="posname">职位名称</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="posname" placeholder="请输入职位名称" id="posname" />
                <nz-form-explain *ngIf="validateForm.get('posname')?.dirty && validateForm.get('posname')?.errors">
                  请输入职位名称
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="comments">描述</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="comments" placeholder="请输入描述" id="comments" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="parentid">直属上级</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="parentid" placeholder="请输入直属上级" id="parentid" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="ismanage">是否管理职位</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="ismanage" placeholder="请输入是否管理职位" id="ismanage" />
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
export class PositionDetilsModal {

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
    
    if(!this.validateForm.value.posid){
      return;
    }
    if(!this.validateForm.value.posname){
      return;
    }
    this.ok(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      
	posid: [this.form.posid, [Validators.required]],
	
      
	posname: [this.form.posname, [Validators.required]],
	
      
	
	comments: [this.form.comments],
      
	
	parentid: [this.form.parentid],
      
	
	ismanage: [this.form.ismanage],
      
      //company: [this.form.company, [Validators.required]],
    });
    if(this.form.departname){
      this.title = this.form.departname;
    }
  }
}
