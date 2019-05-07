import { AppConfig } from '@shared';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper  } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { CompanyDetilsModal } from './company.modal';

@Component({
  templateUrl: './company.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyComponent implements OnInit {
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

    comid: '',
    parentid: '',
    companyname: '',
    areazone: '',
    address: '',
    trade: '',
    kindcode: '',
    size: '',
    phone: '',
    fax: '',
    homepage: '',
    isactive: '',
    comment: '',
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
      title: '公司ID',
      index: 'comid'
    },
    {
      title: '上级公司ID',
      index: 'parentid'
    },
    {
      title: '公司名称',
      index: 'companyname'
    },
    {
      title: '区域ID',
      index: 'areazone'
    },
    {
      title: '地址',
      index: 'address'
    },
    {
      title: '行业ID',
      index: 'trade'
    },
    {
      title: '公司性质',
      index: 'kindcode'
    },
    {
      title: '规模',
      index: 'size'
    },
    {
      title: '电话',
      index: 'phone'
    },
    {
      title: '传真',
      index: 'fax'
    },
    {
      title: '主页',
      index: 'homepage'
    },
    {
      title: '是否有效',
      index: 'isactive'
    },
    {
      title: '备注',
      index: 'comment'
    },
    {
      title: '操作',
      buttons: [
        {
            text: '编辑',
            icon: 'edit',
            type: 'modal',
            modal: {
                component: CompanyDetilsModal,
                params: record => {return {form: record}},
                size: this.appConfig.ModalWidth
            },
            click: (record: any, modal: any) => {
              console.log(modal)
              if(modal){
                this.loading = true;
                modal = this.buildParam(modal);
                this.http
                .put('/company/' + modal.comid, { ...modal })
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
      .get('/company', this.query)
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
      .delete('/company/' + row.comid)
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
      .delete('/company', { id: 1 })
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
      .static(CompanyDetilsModal, {form: this.form}, this.appConfig.ModalWidth)
      .subscribe((modalRes) => {
        if(modalRes){
          this.loading = true;
          modalRes = this.buildParam(modalRes);
          this.http
          .post('/company', { ...modalRes })
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
    if(form.comid){params.comid = parseInt(form.comid);}
    if(form.parentid){params.parentid = parseInt(form.parentid);}
    if(form.companyname){params.companyname = form.companyname}
    if(form.areazone){params.areazone = parseInt(form.areazone);}
    if(form.address){params.address = form.address}
    if(form.trade){params.trade = parseInt(form.trade);}
    if(form.kindcode){params.kindcode = parseInt(form.kindcode);}
    if(form.size){params.size = parseInt(form.size);}
    if(form.phone){params.phone = form.phone}
    if(form.fax){params.fax = form.fax}
    if(form.homepage){params.homepage = form.homepage}
    if(form.isactive){params.isactive = parseInt(form.isactive);}
    if(form.comment){params.comment = form.comment}
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
