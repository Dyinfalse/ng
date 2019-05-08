import { AppConfig } from '@shared';
import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient, ModalHelper  } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import { STComponent, STColumn, STData, STChange } from '@delon/abc';
import { UserDetilsModal } from './user.modal';

@Component({
  templateUrl: './user.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
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
    
    userid: '',
    department: '',
    posid: '',
    username: '',
    gender: '',
    useraccount: '',
    password: '',
    phone: '',
    areazone: '',
    address: '',
    mobile: '',
    email: '',
    postcode: '',
    iselogin: '',
    birth: '',
    lastlogin: '',
    lastupdatepwd: '',
    isactive: '',
    note: '',
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
      title: '用户Id',
      index: 'userid'
    },
    {
      title: '部门ID',
      index: 'department'
    },
    {
      title: '职位ID',
      index: 'posid'
    },
    {
      title: '用户名称',
      index: 'username'
    },
    {
      title: '性别',
      index: 'gender'
    },
    {
      title: '用户帐号',
      index: 'useraccount'
    },
    {
      title: '密码',
      index: 'password'
    },
    {
      title: '电话',
      index: 'phone'
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
      title: '手机',
      index: 'mobile'
    },
    {
      title: 'Email',
      index: 'email'
    },
    {
      title: '邮编',
      index: 'postcode'
    },
    {
      title: '是否允许外网登录',
      index: 'iselogin'
    },
    {
      title: '生日',
      index: 'birth'
    },
    {
      title: '最近登陆时间',
      index: 'lastlogin'
    },
    {
      title: '最近修改密码时间',
      index: 'lastupdatepwd'
    },
    {
      title: '是否有效',
      index: 'isactive'
    },
    {
      title: '备注',
      index: 'note'
    },
    {
      title: '操作',
      buttons: [
        {
            text: '编辑',
            icon: 'edit',
            type: 'modal',
            modal: {
                component: UserDetilsModal,
                params: record => {return {form: record}},
                size: this.appConfig.ModalWidth
            },
            click: (record: any, modal: any) => {
              console.log(modal)
              if(modal){
                this.loading = true;
                modal = this.buildParam(modal);
                this.http
                .put('/user/' + modal.userid, { ...modal })
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
      .get('/user', this.query)
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
      .delete('/user/' + row.userid)
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
      .delete('/user', { id: 1 })
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
      .static(UserDetilsModal, {form: this.form}, this.appConfig.ModalWidth)
      .subscribe((modalRes) => {
        if(modalRes){
          this.loading = true;
          modalRes = this.buildParam(modalRes);
          this.http
          .post('/user', { ...modalRes })
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
    if(form.userid){params.userid = parseInt(form.userid);}if(form.department){params.department = parseInt(form.department);}if(form.posid){params.posid = parseInt(form.posid);}if(form.username){params.username = form.username}if(form.gender){params.gender = parseInt(form.gender);}if(form.useraccount){params.useraccount = form.useraccount}if(form.password){params.password = form.password}if(form.phone){params.phone = form.phone}if(form.areazone){params.areazone = parseInt(form.areazone);}if(form.address){params.address = form.address}if(form.mobile){params.mobile = form.mobile}if(form.email){params.email = form.email}if(form.postcode){params.postcode = form.postcode}if(form.iselogin){params.iselogin = parseInt(form.iselogin);}if(form.isactive){params.isactive = parseInt(form.isactive);}if(form.note){params.note = form.note}
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
