import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/_services/auth.service';
import { SweetAlertService } from 'app/_services/sweet-alert.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public authService: AuthService,
    public sweetAlertService: SweetAlertService
  ) { }

  ngOnInit() {
    let password = new FormControl(null, [Validators.required]);
    let certainPassword = new FormControl(null, [CustomValidators.equalTo(password), Validators.required]);

    this.form = this.fb.group({
      email: [null, [Validators.required]],
      password: password,
      password_confirmation: certainPassword,
      token: [this.route.snapshot.params['token'], [Validators.required]]
    });
  }

  onSubmit() {
    this.loading = true;

    this.authService.resetPassword(this.form.value)
      .subscribe(
        result => {
          this.sweetAlertService.progress('Nice job, Your password has been reset successfully',
            'success',
            'Great',
            "Let's Get Started", () => {
              this.router.navigate(['']);
            })
        },
        error => {
          this.loading = false;
        }
      );
  }

}
