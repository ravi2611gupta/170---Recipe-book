import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() onSelectFeature = new EventEmitter<string>();
  
  onClickFeature(feature: string) {
    this.onSelectFeature.emit(feature);
  }
}
