import { AuthService } from './../../_services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {
  public loading: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService) {

    this.authService.activate(this.route.snapshot.params['token'])
      .subscribe(
        result => {
          this.router.navigate(['auth']);
        },
        error => {
          this.loading = false;
        }
      );
  }

  ngOnInit() {
  }
}
