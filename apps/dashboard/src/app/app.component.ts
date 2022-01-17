import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@ng-mfe/shared/data-access-user';

@Component({
  selector: 'ng-mfe-root',
  template: `
    <div class='dashboard-nav'>Admin Dashboard</div>
    <div *ngIf='isLoggedIn$ | async; else signIn'>
      You are authenticated so you can see this content.
    </div>
    <ng-template #signIn>
      <router-outlet></router-outlet>
    </ng-template>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {
  isLoggedIn$ = this.userService.isUserLoggedIn$;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.isLoggedIn$.subscribe(console.error);
    this.isLoggedIn$
      .subscribe((loggedIn) => {
        console.error(loggedIn);
        if (!loggedIn) {
          this.router.navigateByUrl('login');
        } else {
          this.router.navigateByUrl('');
        }
      });
  }
}
