export class ProductDescriptionModel {
  constructor(
    public id: number = null,
    public product_id: number = null,
    public language: string = null,
    public name: string = null,
    public description: string = null
  ) {}
}
