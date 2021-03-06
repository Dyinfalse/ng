import { Component } from '@angular/core'
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';

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
            <div class="modal-title">分配权限</div>
        </div>
        <div class="modal-body">
          <p>用户名称：{{form.userid}}</p>
          <div>
            <nz-transfer
              [nzDataSource]="list"
              nzShowSearch
              [nzOperations]="['to right', 'to left']"
              [nzListStyle]="{ 'width.px': 250, 'height.px': 300 }"
              [nzRender]="render"
              [nzFooter]="footer"
              (nzSelectChange)="select($event)"
              (nzChange)="change($event)"
            >
              <ng-template #render let-item> {{ item.title }}-{{ item.description }} </ng-template>
              <ng-template #footer let-direction>
                <button nz-button (click)="reload(direction)" [nzSize]="'small'" style="float: right; margin: 5px;">
                  reload
                </button>
              </ng-template>
            </nz-transfer>
          </div>
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
export class UserRoleDistributionModal {

  constructor(private modal: NzModalRef, public msg: NzMessageService) { }

  list: Array<{ key: string; title: string; description: string; direction: string }> = [];
  //   弹窗入参
  form:any;

  getData(): void {
    const ret: Array<{ key: string; title: string; description: string; direction: string }> = [];
    for (let i = 0; i < 20; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : ''
      });
    }
    this.list = ret;
  }

  reload(direction: string): void {
    this.getData();
    this.msg.success(`your clicked ${direction}!`);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

  cancel() {
    this.modal.destroy();
  }

  ok() {

  }

  /**
   * 提交表单
   */
  submitForm(): void {

  }

  ngOnInit(): void {
    this.getData();
  }
}
