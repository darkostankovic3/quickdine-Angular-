import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CloudinaryService } from 'app/_services/tenant/cloudinary.service';

@Component({
  selector: 'app-cloudinary',
  templateUrl: './cloudinary.component.html',
  styleUrls: ['./cloudinary.component.scss']
})
export class CloudinaryComponent implements OnInit {
  public loading: boolean;
  public form: FormGroup;
  public cloudinary;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public translate: TranslateService,
    private toastr: ToastrService,
    public cloudinaryService: CloudinaryService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      keys: this.fb.array([]),
      use_cloudinary_keys: [false]
    });

    this.cloudinaryService.get()
      .subscribe(
        result => {
          if (result) {
            this.cloudinary = result;
            this.populate();
          } else {
            this.addKeys();
          }
        }
      );

  }

  addKeys() {
    const keys = this.form.get('keys') as FormArray;

    for (const key of ["CLOUDINARY_URL", "CLOUDINARY_API_KEY", "CLOUDINARY_SECRET_KEY", "CLOUDINARY_CLOUD_NAME"]) {
      keys.push(this.fb.group({
        key: [key, [Validators.required]],
        value: [this.getCloudinaryValue(key)]
      }));
    }
  }
  getCloudinaryValue(key: string) {
    if (this.cloudinary && this.cloudinary.keys)
      if (this.cloudinary.keys.findIndex(item => item.key === key) !== -1)
        return this.cloudinary.keys.find(item => item.key === key).value;

    return null;
  }

  onSubmit() {
    this.loading = true;

    this.cloudinaryService.store(this.form.value).subscribe(
      result => {
        this.loading = false;
        this.toastr.success("Success", "Setting updated successfully.");
      },
      error => {
        this.loading = false;
      }
    );
  }

  populate() {
    this.form.patchValue({
      use_cloudinary_keys: this.cloudinary.use_cloudinary_keys
    });

    this.addKeys();
  }

}
