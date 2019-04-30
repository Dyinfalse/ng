import {
    Component,
    OnDestroy,
    AfterContentInit,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
@Component({
    selector: 'simple-tiny',
    template:`<textarea [id]="elementId"></textarea>`
})
export class MyeditorComponent implements AfterContentInit, OnDestroy {
    @Input() elementId: string;
    @Input() template: string;

    @Output() onEditorKeyup = new EventEmitter();
    editor: any;
    ngAfterContentInit() {
        let _this = this;
        setTimeout(()=>{
            /**
             * 默认内容
             */
            document.getElementById(this.elementId).innerHTML = this.template;

            this.onEditorKeyup.emit(this.template);
            tinymce.init({
                selector: '#' + this.elementId,
                plugins: 'link paste table image',
                toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link image | alignleft aligncenter alignright alignjustify  | outdent indent | removeformat',
                skin_url: './assets/skins/ui/oxide',
                language: 'zh_CN',
                height: 400,
                width: '100%',
                images_upload_handler: (blobInfo, success, failure)=>{
                    console.log(blobInfo) // 图片数据流
                    console.log(success) // 向组件发送上传之后的图片地址
                    console.log(failure)
                },
                setup: editor => {
                    _this.editor = editor;
                    editor.on('NodeChange', ()=> {
                        const content = editor.getContent();
                        _this.onEditorKeyup.emit(content);
                    });
                }
            });
        },0)
    }
    ngOnDestroy() {
        tinymce.remove(this.editor);
    }
}
