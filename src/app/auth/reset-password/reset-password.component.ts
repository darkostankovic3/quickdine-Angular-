import { CustomValidators } from 'ng2-validation';
import { AuthService } from './../../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from 'app/_services/sweet-alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    public authService: AuthService,
    public sweetAlertService: SweetAlertService) { }

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
          this.sweetAlertService.progress('Great, Your password has been successfully updated', 'success', 'Password Updated', 'Login', () => {
            this.router.navigate(['auth']);
          })
        },
        error => {
          this.loading = false;
        }
      );
  }

  onLogin() {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }

  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }
}
