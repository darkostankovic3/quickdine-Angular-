import { ProductModel } from 'app/_models/product.model';
import { TagModel } from 'app/_models/tag.model';
export class ProductComboItemModel {
  public tags: TagModel[];
  public product: ProductModel;

  constructor(
    public id: number = null,
    public product_id: number = null,
    public product_combo_id: number = null,
    public price: number = null,
    public quantity: number = null,
    public auto_select: boolean = null,
    public selected_quantity: number = null,
    public price_with_details: any = null) { }
}
