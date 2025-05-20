import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Chantier } from '../../interfaces/chantier.interface';

@Component({
  selector: 'app-chantier-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './chantier-card.component.html',
  styleUrls: ['./chantier-card.component.scss'],
})
export class ChantierCardComponent {
  @Input() chantier!: Chantier;
}
