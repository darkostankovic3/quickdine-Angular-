import { AuthService } from './../../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    public form: FormGroup;
    public loading: boolean;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public fb: FormBuilder,
        public authService: AuthService,
        private toastr: ToastrService) { }

    ngOnInit() {
        this.form = this.fb.group({
            email: [null, [Validators.required, CustomValidators.email]],
            password: [null, [Validators.required]]
        });
    }

    // On submit button click
    onSubmit() {
        this.loading = true;

        this.authService.login(this.form.value)
            .subscribe(
                result => {
                    if (result.type === 'Admin') {
                        this.router.navigate(['admin']);
                    } else if (result.type === 'Customer') {
                        this.router.navigate(['customer']);
                    } else if (result.type === 'Tenant') {
                        this.router.navigate(['tenant']);
                    }
                },
                error => {
                    this.loading = false;

                    if (error.status === 401) {
                        if (error.error.error === "InvalidCredentials") {
                            this.toastr.error("Something wrong with credentials, please try resetting your password.", "Error");
                        }

                        if (error.error.error === "AccountNotActive") {
                            this.toastr.error("Account not active, please check your email to activate your account.", "Error");
                        }

                        this.form.reset();
                    }
                }
            );
    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
