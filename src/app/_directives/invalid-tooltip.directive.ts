import { environment } from './../../environments/environment';
import { Directive } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[appInvalidTooltip]',
    host: {
        '(blur)': 'onBlur($event)',
        '(focus)': 'onFocus($event)',
        '(touch)': 'onBlur($event)'
    }
})
export class InvalidTooltipDirective {
    constructor(public control: NgControl, public tooltip: NgbTooltip) {
        setTimeout(function () {
            tooltip.ngbTooltip = environment.defaultValidationMessage;

            control.statusChanges.subscribe((status) => {
                if (control.invalid && (control.touched || control.dirty)) {
                    if (control.hasError('required')) {
                        tooltip.ngbTooltip = 'Field is required.';
                    }

                    if (control.hasError('url')) {
                        tooltip.ngbTooltip = 'Must be a valid url.';
                    }

                    if (control.hasError('maxlength')) {
                        tooltip.ngbTooltip = 'Field length excedded.';
                    }

                    if (control.hasError('email')) {
                        tooltip.ngbTooltip = 'Must be a valid email.';
                    }

                    if (control.hasError("equalTo")) {
                        tooltip.ngbTooltip = 'Must match the password field.';
                    }

                    if (control.hasError("number")) {
                        tooltip.ngbTooltip = 'Must be a number ex. 12';
                    }

                    if (control.hasError("min")) {
                        tooltip.ngbTooltip = 'Must be larger than this.';
                    }

                    if (control.hasError("max")) {
                        tooltip.ngbTooltip = 'Must be larger than this.';
                    }

                    if (control.hasError("pattern")) {
                        tooltip.ngbTooltip = 'Must be a link like = "https://www.youtube.com/watch?v=f-87yuyaSJHagf"';
                    }

                    tooltip.open();
                } else {
                    tooltip.close();
                }
            });
        }, 100);
    }

    onBlur(event) {
        if (this.control.invalid && (this.control.touched || this.control.dirty)) {
            this.tooltip.ngbTooltip = 'Validation failed.';

            if (this.control.hasError('required')) {
                this.tooltip.ngbTooltip = 'Field is required.';
            }

            if (this.control.hasError('maxlength')) {
                this.tooltip.ngbTooltip = 'Field length excedded.';
            }

            this.tooltip.open();
        } else {
            this.tooltip.close();
        }
    }

    onFocus(event) {
        this.tooltip.close();
    }
}