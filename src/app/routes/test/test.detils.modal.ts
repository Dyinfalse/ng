import { Component, Input } from '@angular/core'
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  template: `
        <div class="modal-header">
            <div class="modal-title">{{record.no}}</div>
        </div>
        <p>参数：{{ record | json }}</p>
        <div class="modal-footer">
            <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="cancel()">
            Cancel
            </button>
            <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="ok()">
            OK
            </button>
        </div>
    `
})
export class TestDetilsModal {

  constructor(private modal: NzModalRef) { }

//   弹窗入参
  @Input()
  record:any;

  cancel() {
    this.modal.destroy();
  }

  ok() {
    this.modal.close(`new time: ${+new Date()}`);
    this.cancel();
  }

  ngOnInit() {
      
  }
}
