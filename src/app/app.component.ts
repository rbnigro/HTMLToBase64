import { Component } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HTMLToBase64';
  base64: any;

  onInputChanged(event:any) {
    let targetEvent = event.target;
    let file: File = targetEvent.files[0];
    let fileReader: FileReader = new FileReader();

    fileReader.onload = (e) => {
      this.base64 = fileReader.result;
    }
    fileReader.readAsDataURL(file);
    console.log(file);
   this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new  Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((d) => {
      console.log(d);
      this.myImage
    })
 }

 readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete()
    }
    fileReader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }
 }
}
