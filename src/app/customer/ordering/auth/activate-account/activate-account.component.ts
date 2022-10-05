import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/_services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  public loading: boolean = true;
  public uuid = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    this.uuid = this.route.snapshot.params['uuid'];
    this.authService.activate(this.route.snapshot.params['token'])
      .subscribe(
        result => {
          this.router.navigate(['']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  ngOnInit() {
  }

  onLogin() {
    this.router.navigate([this.uuid + '/auth/login'], { relativeTo: this.route.parent });
  }

}
