import { AppSettings } from 'src/app/shared/models/appSettings.model';
import { Directive, Input, ElementRef, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appImage]'
})
export class ImageCompressionDirective implements AfterViewInit {

  @Input() url: string;
  @Input() size: string;
  @Input() old: boolean = false;
  @Input() settings: AppSettings;
  @Input() noCrop: boolean = false;
  @Input() local_image: string = '';

  constructor(
    private el: ElementRef,
    private imageRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }
  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement)
  }

  private loadImage() {
    if (!!this.url && !this.local_image) {
      let image = this.url.match(/\/([^\/?#]+)[^\/]*$/) ? (this.url.match(/\/([^\/?#]+)[^\/]*$/))[1] : null;
      if (!!image) {
        let size = this.size.split('x');
        let new_image_base;
                
        if (this.settings && this.settings.enable_image_format_manage == 1) {
          if(this.url.includes(".imgix.net")) {
            let x = this.url.indexOf(".imgix.net");
            let str = this.url.substr(0, x);
            new_image_base = (str + '.imgix.net');
          } else {
            let y = this.url.indexOf(image);
            let str1 = this.url.substr(0, y-1);
            new_image_base = str1;
          }
        } else {
          new_image_base = this.old ? 'https://royo.imgix.net' : environment.IMAGE_URL;
        }        
        
        const imageLink  =  ((!image.includes('gif')) ? `${new_image_base}/${image}?w=${size[0]}&h=${size[1]}${!this.noCrop ? '&fit=crop' : ''}&auto=format`:`${new_image_base}/${image}` );
        
        if (this.settings && this.settings.disable_image_force_compression == 1) {
          const img = new Image();
          img.onload = () => this.setImage(imageLink);
          img.onerror = () => { this.setImage(this.url); }
        } else {
          this.setImage(imageLink);
        }
      }
    }
    else {
      this.setImage(this.local_image);
    }
  }
  private setImage(src: string) {
    this.imageRef.nativeElement.setAttribute('src', src);
  }
}
