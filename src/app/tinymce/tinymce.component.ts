
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
            plugins: ['link', 'paste', 'table','image'],
            skin_url: './assets/skins/ui/oxide',
            language: 'zh_CN',
            setup: function(editor){
                _this.editor = editor;
                editor.on('keyup', function() {
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
