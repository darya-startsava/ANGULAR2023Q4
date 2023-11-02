import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
    selector: "[appColoredBorder]"
})
export class ColoredBorderDirective implements OnInit {
    constructor(private el: ElementRef) {}
    @Input() appColoredBorder: string;
    ngOnInit() {
        this.el.nativeElement.style.borderBottom = `10px solid ${this.getColor()}`;
    }
    getColor(): string {
        const age = Number(this.appColoredBorder);
        if (age < 7) return "blue";
        if (age < 30 && age >= 7) return "green";
        if (age >= 30 && age < 180) return "yellow";
        return "red";
    }
}
