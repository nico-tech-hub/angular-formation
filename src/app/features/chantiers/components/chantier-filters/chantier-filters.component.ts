import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chantier-filters',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './chantier-filters.component.html',
  styleUrls: ['./chantier-filters.component.scss']
})
export class ChantierFiltersComponent {
  filters = {
    city: '',
    module: '',
    status: ''
  };

  constructor(private modalCtrl: ModalController) {}

  applyFilters() {
    this.modalCtrl.dismiss(this.filters);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
