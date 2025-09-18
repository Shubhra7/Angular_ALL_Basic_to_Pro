import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class Hover {

  @Input() color: string = 'red';

  constructor(private element: ElementRef, private renderer : Renderer2) {
    console.log(this.element.nativeElement);
   }

   ngOnInit(){
    //  this.element.nativeElement.style.backgroundColor = this.color;


    // Renderer2: An Angular service for safely manipulating the DOM (styles, attributes, classes, event listeners).
    // Works for Server Side Rendering also
    this.renderer.setStyle(this.element.nativeElement, 'backgroundColor', this.color);
   }

  //  @HostListener used to listen any event on parent component
   @HostListener('mouseenter') onMouseEnter(){
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    )
   }

   @HostListener('mouseleave') onMouseLeave(){
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    )
   }

}
