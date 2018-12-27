import { Component, ViewChild } from '@angular/core';
import { VideoSettings } from './properties/video.properties';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Car Insurance';
  @ViewChild('canvas') canvas; 

  videoPath = '';
  showVideo: boolean = false;
  currentTime = 0;
  paths: Array<String> = [];
  frameTime: Number = 0;

  onFileUpload(event){
    this.renderVideo(event.target.files[0]);
    this.videoPath = '';
    this.showVideo = false;
    this.currentTime = 0;
    this.paths = [];
  }

  renderVideo(file){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      if(event.total < VideoSettings.maxVideoSize){
        this.videoPath = event.target['result'];
        this.showVideo = true;
      }
      else{
        alert('video Size too long');
        event.preventDefault();
      }
    }
  }

  onVidLoad(event){
    console.log(event.target['duration']);
    if(event.target['duration'] <= VideoSettings.maxVideoTime){
      this.frameTime = Math.round(Math.round(event.target.duration)/VideoSettings.frameNo);
      event.target.currentTime  = this.currentTime;
    }else{
      alert('video Time too long');
      this.videoPath = '';
      this.showVideo = false;
      event.preventDefault();
    }
  }

  onSeek(event){
    console.log(event);
    this.generateImg(this.currentTime, event);
    this.currentTime+= +this.frameTime;
    if(this.currentTime <= event.target.duration){
      event.target.currentTime = this.currentTime;
    }
  }

  generateImg(i,e){
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    context.drawImage(e.target, 0, 0, 250, 180);
    const dataURL = canvas.toDataURL();
    this.paths.push(dataURL);
  }
}
