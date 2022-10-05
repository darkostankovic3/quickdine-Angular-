import { environment } from './../../../environments/environment';
import { AttachmentModel } from './../../_models/attachment.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  public attachments: AttachmentModel[];
  public _thumbnail: string = 'https://www.homebars.com.au/wp-content/uploads/2018/11/noimage.jpg';

  @Input('thumbnail')
  set thumbnail(value: string) {
    this._thumbnail = value;
  }
  get thumbnail() {
    if (!this._thumbnail)
      return 'https://www.homebars.com.au/wp-content/uploads/2018/11/noimage.jpg';

    return this._thumbnail;
  }
  @Output() filesAdded = new EventEmitter<any>();
  @Output() filesRemoved = new EventEmitter<any>();

  @Input('existingAttachments')
  set existingAttachments(value: AttachmentModel[]) {
    this.attachments = value;
  }

  get existingAttachments() {
    return this.attachments;
  }

  public _hideImages: boolean = false;
  @Input('hideImages')
  set hideImages(value: boolean) {
    this._hideImages = value;
  }

  get hideImages() {
    return this._hideImages;
  }

  public _isLogo: boolean = false;
  @Input('isLogo')
  set isLogo(value: boolean) {
    this._isLogo = value;
  }

  get isLogo() {
    return this._isLogo;
  }

  public url: string;

  constructor() {
    this.attachments = new Array();
    this.url = environment.attachmentUploadUrl;
  }

  ngOnInit() {
  }

  beforeRequest(xhr) {
    xhr.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    xhr.setRequestHeader("uuid", localStorage.getItem('uuid'));
  }

  fileUploaded(event) {
    let attachment = new AttachmentModel();
    if (event[1]) {
      attachment = <AttachmentModel>(JSON.parse(event[1]));

      this.thumbnail = attachment.file_path;

      if (this.attachments === undefined) {
        this.attachments = new Array();
      }

      this.attachments.push(attachment);

      this.filesAdded.emit(attachment);
    }
  }

  fileRemoved(attachment: AttachmentModel) {
    const index = this.attachments.findIndex(item => item.id === attachment.id);

    if (index !== -1) {
      this.attachments.splice(index, 1);
      this.filesRemoved.emit(attachment);
    }
  }

  beforeFileUpload(formData) {
    return formData;
  }

  filesUpdated(files) {

  }

  getTemplate() {
    if (this.isLogo === true)
      return '<div class="xt-d-img-size d-inline-flex thumbnail"><img class="p-1" src="' + this.thumbnail + '" height="65"></div>';
    else
      return '<div class="xt-d-img-size d-inline-flex thumbnail"><img class="img-thumbnail" src="' + this.thumbnail + '" height="80" width="80"><span class="overlay text-white bg-dark pl-1"> 200 X 200px</span></div>';
  }
}
