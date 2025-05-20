import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Chantier } from '../../interfaces/chantier.interface';

@Component({
  selector: 'app-chantier-detail',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './chantier-detail.component.html',
  styleUrls: ['./chantier-detail.component.scss']
})
export class ChantierDetailComponent {
  @Input() chantier!: Chantier;

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
