import { SettingService } from 'app/_services/customer/setting.service';
import { Injectable } from '@angular/core';

import { Resolve, ActivatedRoute } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class SettingResolverService implements Resolve<any> {
    constructor(private settingService: SettingService,
        public route: ActivatedRoute) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        if (this.settingService.settings === null) {
            if (route.params["uuid"]) {
                localStorage.setItem('uuid', route.params["uuid"]);
            }

            return this.settingService.getSettings()
                .subscribe(
                    result => {
                        this.settingService.settings = result;
                        console.log(this.settingService.settings);
                    }
                );
        } else {
            return;
        }
    }
}