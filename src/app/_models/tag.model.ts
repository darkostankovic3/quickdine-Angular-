import { TagMapModel } from "app/_models/tag-map.model";
import { TagItemModel } from "app/_models/tag-item.model";
import { BrandModel } from "./brand.model";

export class TagModel {
  public tag_items: TagItemModel[];
  public tag_maps: TagMapModel[];
  public brand: BrandModel[];

  constructor(
    public id: number = null,
    public brand_id: number = null,
    public name: string = null,
    public min_select: number = null,
    public max_select: number = null,
    public is_free_tag: boolean = null,
    public is_add_tag_price_to_order: boolean = null,
    public is_save_free_tag: boolean = null,
    public is_tax_free: boolean = null,
    public validate: boolean = false,
    public total_amount: number = 0,
    public sub_total_amount: number = 0,
    public display_price: number = 0,
    public display_label: string = null) { }
}
