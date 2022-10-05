import { FormSnippet } from './../../../_snippets/form.snipppet';
import { CustomValidators } from 'ng2-validation';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'app/_models/user.model';
import { UserService } from 'app/_services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public userType: string = null;
  public isAdmin: boolean = false;
  public changePassword: boolean = false;
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public userId: number = null;
  public status: any = [
    { id: 'Active', text: 'Active' },
    { id: 'ActivationPending', text: 'In-Active' }
  ];
  public types: any = [
    "Customer",
    "Tenant"
  ];

  public _user: UserModel;
  set user(value: UserModel) {
    this._user = value;
    this.populate();
  }
  get user() {
    return this._user;
  }

  constructor(public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public userService: UserService) {

    //Admin
    if (this.router.url.indexOf('admins') != -1) {
      this.isAdmin = true;
      this.userType = "Admin";
    }

    //Get ID from url
    if (this.router.url.indexOf('edit') != -1) {
      this.userId = this.route.snapshot.params['id'];
      this.pageLoader = true;
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, CustomValidators.email]],
      status: ["Active", [Validators.required]],
      type: [this.userType, [Validators.required]],
      is_super_admin: [this.isAdmin]
    });

    if (this.userId) {
      let changePassword = new FormControl(this.changePassword, [Validators.required]);
      let method = new FormControl("PUT", [Validators.required]);

      this.form.addControl('change_password', changePassword);
      this.form.addControl('_method', method);

      this.userService.get(this.userId)
        .subscribe(
          result => {
            this.user = result;
          }
        );

    } else {
      this.addPasswordControls();
    }
  }

  onSubmit() {
    this.loading = true;

    this.userService.store(this.form.value)
      .subscribe(
        result => {
          this.router.navigate(['admin/users']);

          if (this.userType == "Admin")
            this.router.navigate(["admin/admins"]);
        },
        error => {
          this.loading = false;
        }
      );
  }

  onUpdate() {
    this.loading = true;

    this.userService.update(this.form.value, this.userId)
      .subscribe(
        result => {
          this.router.navigate(['admin/users']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  populate() {
    for (const item of Object.getOwnPropertyNames(new UserModel())) {
      FormSnippet.populateValueInForm(this.form, item, this.user[item]);
    }
    this.pageLoader = false;
  }

  addPasswordControls() {
    let password = new FormControl(null, [Validators.required]);
    let confirmPassword = new FormControl(null, [CustomValidators.equalTo(password), Validators.required]);

    this.form.addControl('password', password);
    this.form.addControl('password_confirmation', confirmPassword);
  }

  removePasswordControls() {
    this.form.removeControl('password');
    this.form.removeControl('password_confirmation');
  }

  changePasswordClicked() {
    this.changePassword = this.form.value.change_password;

    if (this.form.value.change_password === true) {
      this.addPasswordControls();
      this.changePassword = true;
    } else {
      this.changePassword = false;
      this.removePasswordControls();
    }
  }
}
