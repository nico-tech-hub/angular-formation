import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chantier } from '../interfaces/chantier.interface';

@Injectable({
  providedIn: 'root'
})
export class ChantierService {
  constructor(private http: HttpClient) {}

  getChantiers(
    page: number,
    limit: number,
    searchTerm: string = '',
    filters?: { city?: string; module?: string; status?: string }
  ): Observable<{ results: Chantier[]; total: number }> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('search', searchTerm);

    if (filters?.city) {
      params = params.set('city', filters.city);
    }
    if (filters?.module) {
      params = params.set('module', filters.module);
    }
    if (filters?.status) {
      params = params.set('status', filters.status);
    }

    return this.http.get<{ results: Chantier[]; total: number }>(
      `${environment.apiUrl}/chantiers`,
      { params }
    );
  }
}