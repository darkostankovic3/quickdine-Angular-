export class TagItemModel {
  constructor(
    public id: number = null,
    public name: string = null,
    public product_id: number = null,
    public price: number = null,
    public quantity: number = null,
    public selected_quantity: number = 0,
    public is_selected: boolean = null,
    public price_with_details: any = null) { }
}
