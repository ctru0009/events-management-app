import { Component } from '@angular/core';
import { io } from 'socket.io-client';
import { Router } from '@angular/router';
import { API_URL } from 'src/app/constant';


@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {
  socket: any;
  inputText: string = "";
  language: string = "";
  translatedTexts: Array<Array<string>> = [[]];

  constructor(private router: Router) {
    this.socket = io(API_URL);

    this.socket.on("translated", (translated: string) => {
      // add translated text to array
      this.translatedTexts.push([this.inputText, this.language, translated]);  
    })
  }

  translate() {
    // send text to server to translate
    this.socket.emit("translate", {inputText: this.inputText, language: this.language}); 
    // check if user keyed in input text and language
    if (this.inputText == "" || this.language == "") {
      this.router.navigate(['/invalid-data']);
    }
  }

}
