import { CartService } from "app/_services/customer/cart.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CustomValidators } from "ng2-validation";
import { AuthService } from "app/_services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public loading: boolean;
  public uuid = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public fb: FormBuilder,
    private toastr: ToastrService,
    public authService: AuthService,
    public cartService: CartService
  ) {
    this.uuid = this.route.snapshot.params["uuid"];
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, [Validators.required, CustomValidators.email]],
      password: [null, [Validators.required]],
      type: "Customer",
    });
  }

  redirect() {
    if (this.route.snapshot.queryParams.returnUrl)
      this.router.navigate([this.route.snapshot.queryParams.returnUrl], {
        relativeTo: this.route.parent,
      });
    else this.router.navigate(["ordering/" + this.uuid + "/locations"]);
  }

  onSubmit() {
    this.loading = true;

    this.authService.customerLogin(this.form.value).subscribe(
      (result) => {
        this.redirect();
      },
      (error) => {
        this.loading = false;

        if (error.status === 401) {
          if (error.error.error === "InvalidCredentials") {
            this.toastr.error(
              "Something wrong with credentials, please try resetting your password.",
              "Error"
            );
          }

          if (error.error.error === "AccountNotActive") {
            this.toastr.error(
              "Account not active, please check your email to activate your account.",
              "Error"
            );
          }

          this.form.reset();
        }
      }
    );
  }

  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate([this.uuid + "/auth/forgot-password"], {
      relativeTo: this.route.parent,
    });
  }

  // On registration link click
  onRegister() {
    this.router.navigate([this.uuid + "/auth/register"], {
      relativeTo: this.route.parent,
    });
  }

  continueAsGuest() {
    this.cartService.continueAsGuest = true;
    this.redirect();
  }
}
