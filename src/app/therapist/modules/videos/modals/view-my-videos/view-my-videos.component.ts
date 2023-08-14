import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from '../../../home/dashboard/dashboard.component';
import { VideosService } from 'src/app/therapist/services/videos.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-my-videos',
  templateUrl: './view-my-videos.component.html',
  styleUrls: ['./view-my-videos.component.css']
})
export class ViewMyVideosComponent {
  /*variables*/
  static videoType: string = "";
  static videoDetailRecibed: any = {
    title: "",
    link: "",
    isPublic: true,
    description: ""
  }
  videoDetail: any = {
    title: "",
    link: "",
    isPublic: true,
    description: ""
  }
  idVideo: string = "";
  videoUrl: string = "";
  type: string = "";

  /*Constructor*/
  constructor(
    public modal: NgbModal,
    private headers: DashboardComponent,
    private videoService: VideosService,
    private sanitizer: DomSanitizer
  ) { }

  /*ngOnInit*/
  ngOnInit() {
    if (ViewMyVideosComponent.videoType == "online") {
      this.idVideo = this.getVideoIdFromUrl(ViewMyVideosComponent.videoDetailRecibed.url);
      this.type = "online"
      this.videoDetail = {
        title: ViewMyVideosComponent.videoDetailRecibed.title,
        link: this.getEmbeddedUrl(this.idVideo),
        isPublic: ViewMyVideosComponent.videoDetailRecibed.isPublic,
        description: ViewMyVideosComponent.videoDetailRecibed.description,
      }
    }
    else {
      this.downloadAndDisplayVideo();
      this.videoDetail = {
        title: ViewMyVideosComponent.videoDetailRecibed.title,
        link: ViewMyVideosComponent.videoDetailRecibed.url,
        isPublic: ViewMyVideosComponent.videoDetailRecibed.isPublic,
        description: ViewMyVideosComponent.videoDetailRecibed.description,
      }
    }
  }

  /*Método que descarga el video local*/
  downloadAndDisplayVideo() {
    this.videoService.getVideo(this.headers.getHeaders(), 107).subscribe((response: Blob) => {
      const blobUrl = URL.createObjectURL(response);
      this.videoUrl = blobUrl;
    }
    );
  }

  /*Método que obtiene el ID de un video de YouTube*/
  getVideoIdFromUrl(url: string): string {
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]*)/);
    if (videoIdMatch && videoIdMatch.length >= 2) {
      return videoIdMatch[1];
    }
    return "";
  }

  /*Método que retorna la ruta concatenado de youtube+id del video*/
  getEmbeddedUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}`;
    console.log("RUTA FINAL");
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /*Icons to use*/
  iconVideo = iconos.faVideo;
  iconArrowRight = iconos.faCaretRight;
  iconPublic = iconos.faEarthAmericas;
  iconPrivate = iconos.faLock;
}
