import { SettingService } from './../../../../_services/customer/setting.service';
import { TagModel } from './../../../../_models/tag.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tag-display',
  templateUrl: './tag-display.component.html',
  styleUrls: ['./tag-display.component.scss']
})
export class TagDisplayComponent implements OnInit {
  public _tags: TagModel[];
  @Input("tags")
  set tags(value: TagModel[]) {
    if (value) {
      let _tags = [];

      for (const tag of value)
        if (tag.tag_items.filter(item => item.is_selected === true).length > 0)
          _tags.push(tag);

      this._tags = [..._tags];
    }
  }
  get tags() {
    return this._tags;
  }

  constructor(public settingService: SettingService) { }

  ngOnInit() {
  }

}
