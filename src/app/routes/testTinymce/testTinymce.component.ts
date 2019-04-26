import {
    Component,
    OnInit
} from '@angular/core';
@Component({
    templateUrl: `./testTinymce.component.html`
})
export class TestTinymceComponent implements OnInit {
    
    keyupHandlerFunction(event){
        console.log(event)
    }

    ngOnInit(){

    }
}
