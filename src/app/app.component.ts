import { Component, ElementRef, ViewChild } from '@angular/core';


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
  i = 0;

  onFileUpload(event){
    this.renderVideo(event.target.files[0]);
    this.videoPath = '';
    this.showVideo = false;
    this.i = 0;
    document.getElementById('thumbnailContainer').innerHTML = '';
  }

  renderVideo(file){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.videoPath = event.target['result'];
      this.showVideo = true;
    }
  }


  onVidLoad(event){
    console.log(event);
    setTimeout(() =>{
      event.target.currentTime  = this.i;
    },2000)
    
  }

  onSeek(event){
    console.log(event);
    this.generateImg(this.i, event);
    this.i+= 3;
    if(this.i <= event.target.duration){
      event.target.currentTime = this.i;
    }
  }

  generateImg(i,e){
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    context.drawImage(e.target, 0, 0, 250, 180);
    const dataURL = canvas.toDataURL();

    const img = new Image();
    //img.crossOrigin="Anonymous";
    img.setAttribute('src', dataURL);

    document.getElementById('thumbnailContainer').appendChild(img);
  }
}
