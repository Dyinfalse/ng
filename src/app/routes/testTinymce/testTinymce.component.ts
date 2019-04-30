import {
    Component,
    OnInit
} from '@angular/core';
@Component({
    templateUrl: `./testTinymce.component.html`
})
export class TestTinymceComponent implements OnInit {

    htmlResult: string;

    keyupHandlerFunction(event){
        console.log(event)
        document.getElementById('htmlResult').innerHTML = event;
    }

    ngOnInit(){

    }
}
