import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lineup } from '../models/lineup.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineupService {
  private apiUrl = `${environment.apiUrl}/lineups`;

  constructor(private http: HttpClient) {}

  getAllLineups(): Observable<Lineup[]> {
    return this.http.get<Lineup[]>(this.apiUrl);
  }

  getLineupById(id: number): Observable<Lineup> {
    return this.http.get<Lineup>(`${this.apiUrl}/${id}`);
  }

  createLineup(lineup: Lineup): Observable<Lineup> {
    return this.http.post<Lineup>(this.apiUrl, lineup);
  }

  updateLineup(id: number, lineup: Lineup): Observable<Lineup> {
    return this.http.put<Lineup>(`${this.apiUrl}/${id}`, lineup);
  }

  deleteLineup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
