import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from 'app/_services/auth.service';
import { SweetAlertService } from 'app/_services/sweet-alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;
  public uuid = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private toastr: ToastrService,
    public authService: AuthService,
    public sweetAlert: SweetAlertService,
  ) {
    this.uuid = this.route.snapshot.params['uuid'];
  }

  ngOnInit() {
    this.form = this.fb.group({
      origin: ['ordering'],
      email: [null, [Validators.required, CustomValidators.email]]
    });
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
            this.router.navigate([''], { relativeTo: this.route.parent });
          }
        );
      },
      error => {
        this.loading = false;
      }
    );
  }

  onLogin() {
    this.router.navigate([this.uuid + '/auth/login'], { relativeTo: this.route.parent });
  }
}
