import { Component } from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private dataStorageService: dataStorageService) {}

  onSaveData() {
    this.dataStorageService.storeRecipes(); 
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes();
  }
}
