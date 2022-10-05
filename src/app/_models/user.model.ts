export class UserModel {
    public password: string;

    constructor(public id: number = null,
        public name: string = null,
        public email: string = null,
        public type: string = null,
        public status: string = null,
        public is_super_admin: boolean = false,
        public uuid: string = null,
        public tenant: any = null) {

    }
}