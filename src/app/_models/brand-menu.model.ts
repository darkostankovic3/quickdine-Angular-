import { BrandModel } from "./brand.model";
import { BrandMenuItemModel } from "./brand-menu-item.model";
export class BrandMenuModel {
  public brand_menu_items: BrandMenuItemModel[];
  public brand: BrandModel;

  constructor(
    public id: number = null,
    public name: string = null,
    public brand_id: number = null,
    public logo_attachment_id: number = null,
    public brand_name: string = null,
    public pic: string = null,
    public logo_pic: string = null,
    public is_open: boolean = null,
    public open_time_label: string = null,
    public display_label: string = null
  ) {}
}
