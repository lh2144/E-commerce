import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
    selector: 'my-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
    public active: number = 1;
    public document: Document;
    public constructor(public render: Renderer2, @Inject(DOCUMENT) doc: Document) {
      this.document = doc;
    }

    public ngOnInit(): void {
      this.setSlider(this.active);
    }

    public onNav(index: number): void {
      this.setSlider(this.active += index);
    }

    public setCurrentSlide(index: number): void {
      this.setSlider(this.active = index);
    }

    public setSlider(index: number): void {
      const slides = this.document.getElementsByClassName('slide');
      const dots = this.document.getElementsByClassName('dot');
      if (index > slides.length) { this.active = 1; }
      if (index < 1 ) { this.active = slides.length; }

      for (let i = 0; i < slides.length; i++) {
        this.render.setStyle(slides[i], 'display', 'none');
        // slides[i]['style'].display = 'none';
      }

      for (let i = 0; i < dots.length; i++) {
        this.render.removeClass(dots[i], 'active');
        // dots[i].className = dots[i].className.replace(' active', '');
      }

      this.render.setStyle(slides[this.active - 1], 'display', 'block');
      this.render.addClass(dots[this.active - 1], 'active');
      // slides[this.active - 1]['style'].display = 'block';
      // dots[this.active - 1].className += ' active';
    }
}
