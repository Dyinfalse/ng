import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { yuan } from '@shared';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.less']
})
export class TestComponent implements OnInit {

  constructor(
      private http:HttpClient
  ) { }
  // yuan:any = yuan(0);
  content:any = {};

  ngOnInit() {
     /**
      * 发送一个请求
      */
    //   this.http.post('company/department/list')
    //   .subscribe(data => {
    //   console.log(data);
    //   this.content = data.toString();
    // })
  }

}
