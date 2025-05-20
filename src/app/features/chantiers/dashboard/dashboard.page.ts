import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChantierCardComponent } from '../components/chantier-card/chantier-card.component';
import { Chantier } from '../interfaces/chantier.interface';
import { ChantierService } from '../services/chantier.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ChantierCardComponent],
})
export class DashboardPage {
  chantiers = signal<Chantier[]>([]);
  page = signal(1);
  total = signal(0);
  limit = 10;
  searchTerm = '';
  loading = signal(false);
  filters: { city?: string; module?: string; status?: string } = {};


  constructor(private chantierService: ChantierService, 
              private modalCtrl: ModalController) {}

  ngOnInit(){
    this.loadChantiers();
  }

  loadChantiers(reset = false) {
    this.loading.set(true);
    const pageValue = reset ? 1 : this.page();

    this.chantierService.getChantiers(pageValue, this.limit, this.searchTerm, this.filters).subscribe({
      next: ({ results, total }) => {
        if (reset) {
          this.chantiers.set(results);
          this.page.set(2);
        } else {
          this.chantiers.update((prev) => [...prev, ...results]);
          this.page.set(this.page() + 1);
        }
        this.total.set(total);
      },
      complete: () => this.loading.set(false),
    });
  }

  loadMore(event: Event) {
    this.loadChantiers();
    (event as InfiniteScrollCustomEvent).target.complete();
  }

  onSearchChange() {
    this.page.set(1);
    this.loadChantiers(true);
  }

  async openFilters() {
    const modal = await this.modalCtrl.create({
      component: await import('../components/chantier-filters/chantier-filters.component').then(m => m.ChantierFiltersComponent),
      initialBreakpoint: 0.5,
      breakpoints: [0, 0.5, 0.9],
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();
    console.log(data);

    if (data) {
      this.filters = data;
      this.page.set(1);
      this.loadChantiers(true);
    }
  }

  async openDetail(chantier: Chantier) {
    const modal = await this.modalCtrl.create({
      component: await import('../components/chantier-detail/chantier-detail.component').then(m => m.ChantierDetailComponent),
      componentProps: { chantier },
      initialBreakpoint: 0.9,
    });
    await modal.present();
  }
}
