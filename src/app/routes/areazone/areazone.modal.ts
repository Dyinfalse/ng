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
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="areaid">区域ID</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="areaid" placeholder="请输入区域ID" id="areaid" />
                <nz-form-explain *ngIf="validateForm.get('areaid')?.dirty && validateForm.get('areaid')?.errors">
                  请输入区域ID
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
            <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzRequired nzFor="areaname">区域名称</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="areaname" placeholder="请输入区域名称" id="areaname" />
                <nz-form-explain *ngIf="validateForm.get('areaname')?.dirty && validateForm.get('areaname')?.errors">
                  请输入区域名称
                </nz-form-explain>
              </nz-form-control>
            </nz-form-item>
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="parentid">上级区域</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="parentid" placeholder="请输入上级区域" id="parentid" />
              </nz-form-control>
            </nz-form-item>
		
	    <nz-form-item>
              <nz-form-label [nzSm]="5" [nzXs]="24" nzFor="postcode">邮编</nz-form-label>
              <nz-form-control [nzSm]="19" [nzXs]="24">
                <input nz-input formControlName="postcode" placeholder="请输入邮编" id="postcode" />
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
export class AreazoneDetilsModal {

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
    
    if(!this.validateForm.value.areaid){
      return;
    }
    if(!this.validateForm.value.areaname){
      return;
    }
    this.ok(this.validateForm.value);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      
	areaid: [this.form.areaid, [Validators.required]],
	
      
	areaname: [this.form.areaname, [Validators.required]],
	
      
	
	parentid: [this.form.parentid],
      
	
	postcode: [this.form.postcode],
      
	
	note: [this.form.note],
      
      //company: [this.form.company, [Validators.required]],
    });
    if(this.form.departname){
      this.title = this.form.departname;
    }
  }
}
