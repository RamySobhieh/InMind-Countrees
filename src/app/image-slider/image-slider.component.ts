import { Component, Input } from '@angular/core';
import { ImgUnsplash } from '../Gallery';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent {
  @Input() imgArray: ImgUnsplash = {} as ImgUnsplash;

  ngOnInit() {
    console.log(this.imgArray);
  }
}
