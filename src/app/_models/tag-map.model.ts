import { ProductModel } from 'app/_models/product.model';

export class TagMapModel {
  public products: ProductModel[];

  constructor(
    public id: number = null,
    public name: string = null,
    public product_id: number = null,
    public category_id: number = null
  ) { }
}
