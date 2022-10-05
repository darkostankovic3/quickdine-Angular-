import { UserModel } from './user.model';

export class TenantModel {
    public user: UserModel;

    constructor(public id: number = null,
        public uuid: string = null,
        public name: string = null,
        public user_id: number = null,
        public status: string = null,
        public country_id: number = null,
        public default_language: number = null,
        public hostname: string = null,
        public languages: any = null) {
    }
}