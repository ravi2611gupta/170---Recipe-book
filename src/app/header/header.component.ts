import { Component, OnDestroy, OnInit } from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentication = false;
  private userSub: Subscription;
  constructor(
    private dataStorageService: dataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        // this.isAuthentication = !user ? false : true;
        this.isAuthentication = !!user;
      });
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    // this.dataStorageService.fetchRecipes();
    this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
