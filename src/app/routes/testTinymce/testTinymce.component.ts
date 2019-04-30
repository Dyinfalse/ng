import {
    Component,
    OnInit
} from '@angular/core';
@Component({
    templateUrl: `./testTinymce.component.html`
})
export class TestTinymceComponent implements OnInit {

    htmlResult: string;
    editorId:string = 'test-editorId';
    template: string = `
        <div>
            <p>这里记录过去一周，我看到的值得分享的东西，每周五发布。</p>
            <p>欢迎投稿，或推荐你自己的项目，请前往 GitHub 的&nbsp;<a href="https://github.com/ruanyf/weekly" target="_blank" rel="noopener">ruanyf/weekly</a> 提交 issue。</p>
            <p><img title="" src="https://www.wangbase.com/blogimg/asset/201904/bg2019042601.jpg" alt="" width="302" height="170" /></p>
            <p>日本东京最近举行了一次<a href="https://m2.people.cn/r/MV8wXzEyMzQwNTM2XzIwNDU3NV8xNTUwNDg0MzIx" target="_blank" rel="noopener">"DNA 相亲会"</a>。参加活动的男女互不认识，婚介公司根据双方 DNA 的相配程度，介绍他们见面。</p>
            <p>这种相亲的依据是，根据 DNA 测序，如果基因高度相似或者互补，那么双方很可能就是相配的。报道说，参加者都认可这种想法，觉得比起其他方法，这样找相亲对象，可能效率更高一点，更可能找到合适的人，以后分手的可能性也会比较小。</p>
            <p>如果这种方法可行，那么不久的将来，相亲节目和相亲网站也许都将不存在。只要 DNA 配型合适，你们就开始约会吧。</p>
            <p>而且还不止于此，一家公司所有员工的 DNA，进行加总计算，就可以得到这家公司的"平均 DNA"。以后入学或者找工作，有可能都要测 DNA。要是你跟本单位的 DNA 不相配，对不起，只能请你另找别家了。&nbsp;</p>
        </div>
    `;

    keyupHandlerFunction(event){
        document.getElementById('htmlResult').innerHTML = event;
    }

    ngOnInit(){

    }
}
