import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';
import { SkillLevel } from '../enums/skill-level.enum';
import { Gender } from '../enums/gender.enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private apiUrl = `${environment.apiUrl}/players`;

  constructor(private http: HttpClient) {}

  getAllPlayers(skillLevel?: SkillLevel, gender?: Gender): Observable<Player[]> {
    let params = new HttpParams();
    if (skillLevel) {
      params = params.set('skillLevel', skillLevel);
    }
    if (gender) {
      params = params.set('gender', gender);
    }
    return this.http.get<Player[]>(this.apiUrl, { params });
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  createPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${id}`, player);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPlayersWithStatistics(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.apiUrl}/statistics`);
  }
}
