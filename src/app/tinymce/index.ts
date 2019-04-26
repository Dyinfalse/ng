
import {
    Component,
    OnDestroy,
    AfterViewInit,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
@Component({
    selector: 'simple-tiny',
    template:`<div id="test"><div>`
})
export class MyeditorComponent implements AfterViewInit, OnDestroy {
    @Input() elementId: String;
    @Output() onEditorKeyup = new EventEmitter();
    editor;
    ngAfterViewInit() {
        let _this = this;
        tinymce.init({
            // selector: '#' + this.elementId,
            selector: '#test',
            plugins: 'link paste table image ',
            toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link image | alignleft aligncenter alignright alignjustify  | outdent indent | removeformat',
            skin_url: './assets/skins/ui/oxide',
            language: 'zh_CN',
            height: 400,
            width: 500,
            images_upload_handler: (blobInfo, success, failure)=>{
                console.log(blobInfo) // 图片数据流
                console.log(success) // 向组件发送上传之后的图片地址
                console.log(failure)
            },
            setup: editor => {
                _this.editor = editor;
                editor.on('keyup', ()=> {
                    const content = editor.getContent();
                    _this.onEditorKeyup.emit(content);
                });
            }
        });
    }
    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
