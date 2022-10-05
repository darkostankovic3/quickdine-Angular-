import { ProductModel } from './product.model';
import { UserModel } from 'app/_models/user.model';
import { LocationModel } from './location.model';
import { OrderModel } from './order.model';

export class TicketModel {
    public location: LocationModel;
    public orders: OrderModel[];
    public user_obj: UserModel;
    public location_obj: LocationModel;

    constructor(public id: number = null,
        public user_id: number = null,
        public amount: number = null,
        public remaining_amount: number = null,
        public location_id: number = null,
        public is_closed: boolean = null,
        public last_order_time: string = null,
        public last_payment_time: string = null,
        public state: string = null,
        public note: string = null,
        public last_order_time_display: string = null,
        public last_payment_time_display: string = null,
        public status: string = null,
        public time_left: number = null,
        public sub_total: number = null,
        public upsell_products: any = null,
        public queue_number: string = null,
        public delivery_charge: any = null,
        public department_charge: any = null,
        public card_charges: any = null,
        public delivery_address: any = null,
        public remarks: string = null,
        public display_total_amount: number = null,
        public payment_method: string = null) {
    }
}