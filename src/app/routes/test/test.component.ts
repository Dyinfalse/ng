import { AppConfig } from '@shared';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { TestDetilsModal } from './test.detils.modal';
import { MyeditorComponent } from '../../tinymce/tinymce.component';

@Component({
  templateUrl: './test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {
  /**
   * 列表筛选条件
   */
  q: any = {
    pi: 2,
    ps: 20,
    sorter: '',
    status: null,
    statusList: [],
    keyword: ''
  };
  /**
   * 表格数据
   */
  data: any[] = [];
  /**
   * 加载状态
   */
  loading = false;

  @ViewChild('st')
  st: STComponent;
  /**
   * 项目配置
   */
  appConfig:any = AppConfig;
  /**
   * 表格基本配置
   * index 展示映射字段
   */
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: '用户名称', index: 'no' },
    { title: '性别', index: 'description' },
    {
      title: '用户账号',
      index: 'callNo',
      type: 'number',
    },
    {
      title: '电话',
      index: 'description',
    },
    {
      title: '地址',
      index: 'description',
    },
    {
      title: '手机',
      index: 'description',
    },
    {
      title: 'Email',
      index: 'description',
    },
    {
      title: '邮编',
      index: 'description',
    },
    {
      title: '最近登录时间',
      index: 'description',
    },
    {
      title: '操作',
      buttons: [
        {
            text: '编辑',
            icon: 'edit',
            type: 'modal',
            modal: {
                component: TestDetilsModal,
                size: this.appConfig.ModalWidth
            },
            click: (record: any, modal: any) => {
                console.log(111)
            }
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => this.msg.success(`删除${item.no}`),
        },
      ],
    },
  ];

  /**
   * 多选选中Ids
   */
  selectedRows: STData[] = [];
  /**
   * 业务变量
   */
  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getData();
  }
  /**
   * 获取数据
   */
  getData() {
    this.loading = true;
    this.http
      .get('/rule', this.q)
      .pipe(
        map((list: any[]) =>{
            if(list) {
                return list.map(i => {
                  return i;
                })
            }
        }),
        tap(() => (this.loading = false)),
      )
      .subscribe(res => {
        this.data = res;
        this.cdr.detectChanges();
      });
  }
  /**
   * 表格多选change
   * 筛选change
   */
  stChange(e: STChange) {
    switch (e.type) {
      case 'checkbox':
        this.selectedRows = e.checkbox;
        // this.totalCallNo = this.selectedRows.reduce((total, cv) => total + cv.callNo, 0);
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }


  /**
   * 指定删除
   */
  remove(row:any) {
    this.http
      .delete('/rule', { id: row.id })
      .subscribe(() => {
        this.getData();
        this.st.clearCheck();
      });
  }

  /**
   * 批量删除
   */
  removeAll() {
    this.http
      .delete('/rule', { nos: this.selectedRows.map(i => i.no).join(',') })
      .subscribe(() => {
        this.getData();
        this.st.clearCheck();
      });
  }
  /**
   * 审批
   */
  approval() {
    this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
  }
  /**
   * 新建
   */
  add(tpl: TemplateRef<{}>) {
    this.modalSrv.create({
      nzTitle: '新建用户',
      nzContent: tpl,
      nzWidth: this.appConfig.ModalWidth,
      nzOnOk: () => {
        this.loading = true;
        this.http
          .post('rule', { description: this.description })
          .subscribe(() => this.getData());
      },
    });
  }

  keyupHandlerFunction(event){
      console.log(event)
  }

  /**
   * 刷新数据
   */
  reset() {
    // wait form reset updated finished
    setTimeout(() => this.getData());
  }
}
