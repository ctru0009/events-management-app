import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { set } from 'mongoose';
import { io } from 'socket.io-client';
import { API_URL } from 'src/app/constant';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css'],
})
export class TextToSpeechComponent {
  constructor(private dbService: DatabaseService, private http: HttpClient) {
    this.socket = io(API_URL);
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });
  }

  text: string = '';
  audioSource: string = '';
  socket: any;

  ngOnInit(): void {
    const audio = document.querySelector('audio');
    audio?.load();
  }

  convertToSpeech() {
    this.socket.emit('text-to-speech', this.text);
    console.log(this.text);
    this.socket.on('audio-source', (audioSource: string) => {
      this.audioSource = API_URL + audioSource;
      console.log(this.audioSource);
    });

    setTimeout(() => {
      var audio = document.querySelector('audio');
      audio?.load();
      audio?.play();
    }, 2000);
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
