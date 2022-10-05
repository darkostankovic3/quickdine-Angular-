import { TagsComponent } from "./tags/tags.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TagComponent } from "./tag/tag.component";

const routes: Routes = [
  {
    path: "",
    component: TagsComponent,
    data: {
      title: "Tags"
    }
  },
  {
    path: "add",
    component: TagComponent,
    data: {
      title: "Add Tag"
    }
  },
  {
    path: "edit/:id",
    component: TagComponent,
    data: {
      title: "Edit Tag"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsRoutingModule {}
