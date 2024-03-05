import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    standalone: true,
    selector: '[appColoredBackground]'
})
export class ColoredBackgroundDirective implements OnInit {
    @Input() appColoredBackground?: boolean;
    constructor(private el: ElementRef) {}
    ngOnInit(): void {
        if (!this.appColoredBackground) {
            return;
        }
        this.el.nativeElement.style.backgroundColor = '#FCE4EC';
    }
}
