import { SharedModule } from "./../../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TagsRoutingModule } from "./tags-routing.module";
import { TagsComponent } from "./tags/tags.component";
import { TagComponent } from "./tag/tag.component";

@NgModule({
  declarations: [TagsComponent, TagComponent],
  imports: [CommonModule, TagsRoutingModule, SharedModule]
})
export class TagsModule {}
