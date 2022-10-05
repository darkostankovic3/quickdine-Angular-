import { CartService } from 'app/_services/customer/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UserAddressService } from 'app/_services/user-address.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteConfirmComponent } from 'app/shared/delete-confirm/delete-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from 'app/_services/customer/country.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.scss']
})
export class UserAddressesComponent implements OnInit {
  public form: FormGroup;
  public addressList: any[] = [];
  public contains: boolean = false;
  public uuid: any;
  public showForm: boolean = false;
  public loading: boolean = false;
  public countryList: any = null;

  constructor(
    public fb: FormBuilder,
    public userAddressService: UserAddressService,
    public router: Router,
    public route: ActivatedRoute,
    public modalService: NgbModal,
    public cartService: CartService,
    public countryService: CountryService) {
    this.getAddresses()
    this.uuid = this.route.snapshot.params['uuid'];
    this.getCountry();
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      address_line_1: [null, [Validators.required]],
      address_line_2: [null],
      phone_number: [null, [Validators.required, CustomValidators.number]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      pincode: [null, [Validators.required, CustomValidators.number]],
      country: [null, [Validators.required]],
      country_code: [null, [Validators.required]],
      note: [null]
    });
  }

  onSubmit() {
    this.userAddressService
      .store({ user_addresses: [this.form.value] })
      .subscribe(
        result => {
          this.showForm = false;
          this.form.reset();

          const index = this.addressList.findIndex(item => item.id == result.id);

          if (index > -1)
            this.addressList[index] = result;
          else
            this.addressList.push(result);

          this.cartService.userAddress = result.id;
        },
        error => {
        }
      )
  }

  getAddresses() {
    this.userAddressService.getAllAddress()
      .subscribe(
        result => {
          this.addressList = result

          if (this.addressList.length === 0)
            this.showForm = true;
        },
        error => {

        }
      )
  }

  delete(address: any) {
    const modal = this.modalService.open(DeleteConfirmComponent, { size: 'sm' }).componentInstance;
    modal.action.subscribe(
      result => {
        if (result === true) {
          this.userAddressService.delete(address.id)
            .subscribe(
              result => {
                if (address.id == this.cartService.userAddress)
                  this.cartService.userAddress = null;

                this.addressList.splice(this.addressList.findIndex(item => item.id === address.id), 1);
              }
            );
        }
      }
    );
  }

  populate(address: any) {
    this.form.patchValue({
      id: address.id,
      address_line_1: address.address_line_1,
      address_line_2: address.address_line_2,
      phone_number: address.phone_number,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      note: address.note,
      country: address.country,
      country_code: address.country_code
    });

    this.showForm = true;
  }

  getCountry() {
    this.countryService.getCountriesList()
      .subscribe(
        result => {
          this.countryList = result;
        },
        error => {

        }
      )
  }
}
