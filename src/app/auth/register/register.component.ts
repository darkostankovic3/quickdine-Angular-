import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SweetAlertService } from 'app/_services/sweet-alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
    public form: FormGroup;
    public loading: boolean;

    constructor(public fb: FormBuilder,
        public authService: AuthService,
        public sweetAlert: SweetAlertService,
        public router: Router,
        public route: ActivatedRoute) {

    }

    ngOnInit() {
        let password = new FormControl(null, [Validators.required]);
        let certainPassword = new FormControl(null, [CustomValidators.equalTo(password), Validators.required]);

        this.form = this.fb.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.required, CustomValidators.email]],
            password: password,
            password_confirmation: certainPassword,
            agree: [false, [Validators.required, CustomValidators.equal(true)]]
        });
    }

    onSubmit() {
        this.loading = true;

        this.authService
            .register(this.form.value)
            .subscribe(
                result => {
                    this.sweetAlert.progress('Nice job, please check your email to activate your account',
                        'success',
                        'Account Succesfully Created',
                        "Let's Get Started",
                        () => {
                            this.router.navigate(['auth'])
                        });
                    this.loading = false;
                },
                error => {
                    this.loading = false;
                }
            );
    }

    onLogin() {
        this.router.navigate(['auth'], { relativeTo: this.route.parent });
    }
}
