import { ProductDescriptionModel } from './product-description.model';
import { TagModel } from './tag.model';
import { ProductComboModel } from './product-combo.model';
import { BrandLocationProductModel } from "./brand-location-product.model";
import { ProductPortionModel } from "./product-portion.model";
import { ProductUpSellModel } from "./product-up-sell.model";
import { ProductCategoryModel } from "./product-category.model";

export class ProductModel {
  public product_portions: ProductPortionModel[];
  public product_up_sells: ProductUpSellModel[];
  public brand_location_products: BrandLocationProductModel[];
  public product_categories: ProductCategoryModel;
  public product_combos: ProductComboModel[];
  public product_descriptions: ProductDescriptionModel[];
  public selected_tags: TagModel[];
  public translations: any[];

  constructor(
    public id: number = null,
    public category_id: number = null,
    public name: string = null,
    public default_name: string = null,
    public pic: string = null,
    public price: number = null,
    public brand_id: number = null,
    public is_combo: boolean = null,
    public is_upsell: boolean = null,
    public tag_valid: boolean = null,
    public combo_valid: boolean = null,
    public reload_tags: boolean = null,
    public price_with_details: any = null,
    public total_amount: number = null,
    public sub_total_amount: number = null,
    public description: boolean = null,
    public attachment_id: boolean = null,
    public display_price: number = null,
    public display_label: string = null,
    public display_description: string = null,
    public remarks: string = null,
    public is_enable: boolean = null) {

  }
}
