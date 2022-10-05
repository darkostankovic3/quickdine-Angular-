import { BrandModel } from './brand.model';

export class CategoryModel {
  public brand: BrandModel[];
  constructor(
    public id: number = null,
    public name: string = null,
    public attachment_id: number = null,
    public pic: string = null,
    public brand_id: number = null) { }
}
