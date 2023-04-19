import { Component, Input } from '@angular/core';
import { ImgUnsplash } from '../ViewModels/Gallery';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
})
export class ImageSliderComponent {
  @Input() galleryArray: string[] = [];
}
