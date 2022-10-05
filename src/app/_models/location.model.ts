import { BrandLocationModel } from './brand-location.model';
import { DeliveryPriceModel } from './delivery-price.model';
export class LocationModel {
    public brands: BrandLocationModel[];
    public delivery_prices: DeliveryPriceModel[];

    constructor(public id: number = null,
        public name: string = null,
        public display_label: string = null,
        public tax_type: string = null,
        public pic: string = null,
        public is_otp_required: boolean = null,
        public is_customer_required: boolean = null,
        public taxes: string = null,
        public payment_methods: any = null,
        public description: boolean = null,
        public attactment_id: boolean = null,
        public is_twilio_required: boolean = null,
        public is_active: boolean = null,
        public is_delivery: boolean = null,
        public delivery_partner: string = null,
        public departments: any = null,
    ) {
    }
}
