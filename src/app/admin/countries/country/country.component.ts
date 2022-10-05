import { CountryService } from "./../../../_services/admin/country.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CountryModel } from "./../../../_models/country.model";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-country",
  templateUrl: "./country.component.html",
  styleUrls: ["./country.component.scss"],
})
export class CountryComponent implements OnInit {
  public pageLoader: boolean;
  public form: FormGroup;
  public loading: boolean = false;
  public countryId: number = null;
  public paymentMethods: any = [
    { id: "Paytm", text: "Paytm" },
    { id: "Skrill", text: "Skrill" },
    { id: "Omise", text: "Omise" },
    { id: "Stripe", text: "Stripe" },
    { id: "Ipay88", text: "Ipay88" },
    { id: "2C2P", text: "2C2P" },
    { id: "Cash", text: "Cash" },
    { id: "CcAvenue", text: "CcAvenue" },
  ];

  public deliveryPartners: any = [
    { id: "Lalamove", text: "Lalamove" },
    { id: "Selfdelivery", text: "Self Delivery" },
  ];

  public _country: CountryModel;
  set country(value: CountryModel) {
    this._country = value;
    this.populate();
  }
  get country() {
    return this._country;
  }
  public countries: CountryModel[];

  constructor(
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public countryService: CountryService
  ) {
    //Get ID from url
    if (this.router.url.indexOf("edit") != -1) {
      this.countryId = this.route.snapshot.params["id"];
      this.pageLoader = true;
    }

    //Get all countries
    {
      this.countryService.getAllRecords().subscribe((result) => {
        this.countries = [...result];
      });
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      country: [null, [Validators.required]],
      payment_methods: [null, [Validators.required]],
      delivery_partners: [null, [Validators.required]],
    });

    if (this.countryId) {
      let method = new FormControl("PUT", [Validators.required]);
      this.form.addControl("_method", method);

      this.countryService.get(this.countryId).subscribe((result) => {
        this.country = result;
      });
    }
  }

  onSubmit() {
    this.loading = true;

    this.countryService.store(this.form.value).subscribe(
      (result) => {
        this.router.navigate(["admin/countries"]);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onUpdate() {
    this.loading = true;

    this.countryService.update(this.form.value, this.countryId).subscribe(
      (result) => {
        this.router.navigate(["admin/countries"]);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  populate() {
    this.form.patchValue({
      country: this.country.country,
      payment_methods: this.country.payment_methods,
      delivery_partners: this.country.delivery_partners,
    });
    this.pageLoader = false;
  }
}
