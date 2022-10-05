export class DeliveryPriceModel {

    constructor(public id: number = null,
        public location_id:number = null,
        public minimum_amount:number = null,
        public maximum_amount:number = null,
        public delivery_price:number = null,

        ) {
    }
}