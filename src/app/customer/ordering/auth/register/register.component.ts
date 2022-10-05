import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from 'app/_services/auth.service';
import { SweetAlertService } from 'app/_services/sweet-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public loading: boolean;
  public form: FormGroup;
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
      name: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.email]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]],
      phone_number: [null, [Validators.required]],
      origin: ['ordering']
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
              this.router.navigate([this.uuid + '/auth/login'], { relativeTo: this.route.parent })
            });
          this.loading = false;
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
