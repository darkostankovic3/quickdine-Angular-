import { CustomValidators } from 'ng2-validation';
import { AuthService } from './../../_services/auth.service';
import { Component, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'app/_services/sweet-alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public form: FormGroup;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public authService: AuthService,
    public sweetAlert: SweetAlertService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, CustomValidators.email]]
    });
  }

  onLogin() {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }

  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  onSubmit() {
    this.loading = false;

    this.authService.forgotPassword(this.form.value).subscribe(
      result => {
        this.form.reset();
        this.sweetAlert.progress(
          'Nice job, please check your email to reset your account password',
          'success',
          'Sent Email',
          "Let's Get Started",
          () => {
            this.router.navigate(['auth']);
          }
        );
      },
      error => {
        this.loading = false;
      }
    );
  }
}
