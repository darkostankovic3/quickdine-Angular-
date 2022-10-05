import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'app/_models/user.model';
import { UserService } from 'app/_services/user.service';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public formSubmitLoader: boolean;
  public pageLoader: boolean = true;

  public _changePassword: boolean;
  set changePassword(value: boolean) {
    if (value === true) {
      this.profileForm.addControl('change_password', new FormControl(value, [Validators.required]));
      this.profileForm.addControl('old_password', new FormControl(null, [Validators.required]));
      this.profileForm.addControl('password', new FormControl(null, [Validators.required]));
      this.profileForm.addControl('password_confirmation', new FormControl(null, [Validators.required]));
    } else {
      this.profileForm.addControl('change_password', new FormControl(value, [Validators.required]));
      this.profileForm.removeControl('old_password');
      this.profileForm.removeControl('password');
      this.profileForm.removeControl('password_confirmation');
    }

    this._changePassword = value;
  }

  get changePassword() {
    return this._changePassword;
  }

  public _user: UserModel;
  set user(value: UserModel) {
    this._user = value;
    this.populate();
  }

  get user() {
    return this._user;
  }

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public toastr: ToastrService,
    public userService: UserService) {

  }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.email]],
      old_password: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password_confirmation: [null, [Validators.required]]
    });

    this.user = this.authService.currentUserValue;
    this.changePassword = false;
  }

  onUpdate(form: FormGroup) {
    this.formSubmitLoader = true;

    this.userService.myProfile(form.value)
      .subscribe(
        result => {
          this.formSubmitLoader = false;
          this.user = (<any>result);
          this.authService.currentUserSubject.next(this.user);
          this.toastr.success("Profile Update Successfully", "Success");
        },
        error => {
          this.formSubmitLoader = false;
        }
      );
  }

  populate() {
    this.profileForm.patchValue({
      name: this.user.name,
      email: this.user.email
    });

    this.pageLoader = false;
  }
}
