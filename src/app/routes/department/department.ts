import { AppConfig } from '@shared';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper  } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { DepartmentDetilsModal } from './department.modal';

@Component({
  templateUrl: './department.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentComponent implements OnInit {
  /**
   * 列表筛选条件
   */
  query: any = {
    keyword: '',
    page: 1,
    size: 10
  };
  
  /**
   * 分页总数
   */
  total:number = 13;
  /**
   * 分页配置
   */
  stPage = {
    front: false,
    placement: 'left'
  }

  /**
   * post Form
   */
  form: any = {
    
    departid: '',
    company: '',
    parentid: '',
    departname: '',
    comments: '',
    ischarge: '',
  }
  /**
   * 表格数据
   */
  data: any[] = [];
  /**
   * 加载状态
   */
  loading: boolean = false;

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
    
    {
      title: '部门ID',
      index: 'departid'
    },
    {
      title: '公司ID',
      index: 'company'
    },
    {
      title: '上级部门ID',
      index: 'parentid'
    },
    {
      title: '部门名称',
      index: 'departname'
    },
    {
      title: '描述',
      index: 'comments'
    },
    {
      title: '是否管理部门',
      index: 'ischarge'
    },
    {
      title: '操作',
      buttons: [
        {
            text: '编辑',
            icon: 'edit',
            type: 'modal',
            modal: {
                component: DepartmentDetilsModal,
                params: record => {return {form: record}},
                size: this.appConfig.ModalWidth
            },
            click: (record: any, modal: any) => {
              console.log(modal)
              if(modal){
                this.loading = true;
                modal = this.buildParam(modal);
                this.http
                .put('/department/' + modal.departid, { ...modal })
                .subscribe(() => {
                  this.msg.success(`编辑成功`);
                  this.getData();
                });
              }
            }
        },
        {
          text: '删除',
          type: 'del',
          click: (item: any) => {
            this.remove(item);
          },
        },
      ],
    },
  ];

  /**
   * 多选选中Ids
   */
  selectedRows: STData[] = [];

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef
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
      .get('/department', this.query)
      .pipe(
        map((list: any) =>{
            return list;
        }),
        tap(() => (this.loading = false)),
      )
      .subscribe(res => {
        this.total = res.total;
        this.data = res.data;
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
        this.cdr.detectChanges();
        break;
      case 'filter':
        this.getData();
        break;
      case 'pi':
        this.query.page = e.pi;
        this.getData();
        break;
    }
  }


  /**
   * 指定删除
   */
  remove(row:any) {
    this.http
      .delete('/department/' + row.departid)
      .subscribe(() => {
        this.getData();
        this.st.clearCheck();
        this.msg.success(`删除${row.departname}`)
      });
  }

  /**
   * 批量删除
   */
  removeAll() {
    this.http
      .delete('/department', { id: 1 })
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
  add() {
    this.modal
      .static(DepartmentDetilsModal, {form: this.form}, this.appConfig.ModalWidth)
      .subscribe((modalRes) => {
        if(modalRes){
          this.loading = true;
          modalRes = this.buildParam(modalRes);
          this.http
          .post('/department', { ...modalRes })
          .subscribe(() => {
            this.msg.success(`新建成功`)
            this.getData()
          });
        }
      });
  }
  /**
   * 处理param
   */
  buildParam(form: any){
    let params:any = {};
    if(form.departid){params.departid = parseInt(form.departid);}if(form.company){params.company = parseInt(form.company);}if(form.parentid){params.parentid = parseInt(form.parentid);}if(form.departname){params.departname = form.departname}if(form.comments){params.comments = form.comments}if(form.ischarge){params.ischarge = parseInt(form.ischarge);}
    return params;
  }
  /**
   * 刷新数据
   */
  reset() {
    // wait form reset updated finished
    setTimeout(() => this.getData());
  }
}
