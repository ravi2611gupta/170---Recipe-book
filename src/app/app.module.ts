import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // RecipesModule, // ! removed it when started using lazy loading.
    // ShoppingListModule, // ! removed it when started using lazy loading.
    SharedModule,
    CoreModule,
    // AuthModule, // ! removed it when started using lazy loading.
    StoreModule.forRoot({
      shoppingList: shoppingListReducer,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
