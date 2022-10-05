
export class DepartmentModel {

    constructor(
        public id: number = null,
        public name: string = null,
        public amount_type: string = null,
        public amount: number = null,
        public caption: string = null,
        public percent_charge_amount: number = null,
        public taxes: any = null,
        public tax_data: any = null
    ) {
    }
}