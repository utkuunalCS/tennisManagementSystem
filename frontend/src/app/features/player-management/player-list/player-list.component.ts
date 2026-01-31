import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

import { Player } from '../../../core/models/player.model';
import { PlayerService } from '../../../core/services/player.service';
import { SkillLevel, getSkillLevelDisplay } from '../../../core/enums/skill-level.enum';
import { Gender, getGenderDisplay } from '../../../core/enums/gender.enum';

@Component({
  selector: 'app-player-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    FormsModule
  ],
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'skillLevel',
    'gender',
    'matchesPlayed',
    'matchesWon',
    'matchesLost',
    'winPercentage'
  ];

  dataSource: MatTableDataSource<Player>;
  players: Player[] = [];
  filteredPlayers: Player[] = [];

  @ViewChild(MatSort) sort!: MatSort;

  // Filter values
  selectedSkillLevel: string = 'All';
  selectedGender: string = 'All';
  searchText: string = '';

  // Enum arrays for dropdowns
  skillLevels: string[] = ['All', 'A+', 'A', 'B', 'C', 'D'];
  genders: string[] = ['All', 'Male', 'Female'];

  // Enums
  SkillLevel = SkillLevel;
  Gender = Gender;

  constructor(private playerService: PlayerService) {
    this.dataSource = new MatTableDataSource<Player>([]);
  }

  ngOnInit(): void {
    this.loadPlayers();
  }

  loadPlayers(): void {
    this.playerService.getPlayersWithStatistics().subscribe({
      next: (players) => {
        this.players = players.map(player => ({
          ...player,
          winPercentage: this.calculateWinPercentage(player)
        }));
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading players:', error);
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  calculateWinPercentage(player: Player): number {
    if (player.matchesPlayed === 0) {
      return 0;
    }
    return Math.round((player.matchesWon / player.matchesPlayed) * 100);
  }

  applyFilters(): void {
    this.filteredPlayers = this.players.filter(player => {
      const matchesSkillLevel = this.filterBySkillLevel(player);
      const matchesGender = this.filterByGender(player);
      const matchesSearch = this.filterBySearch(player);
      return matchesSkillLevel && matchesGender && matchesSearch;
    });
    this.dataSource.data = this.filteredPlayers;
  }

  filterBySkillLevel(player: Player): boolean {
    if (this.selectedSkillLevel === 'All') {
      return true;
    }
    const displayLevel = getSkillLevelDisplay(player.skillLevel);
    return displayLevel === this.selectedSkillLevel;
  }

  filterByGender(player: Player): boolean {
    if (this.selectedGender === 'All') {
      return true;
    }
    const displayGender = getGenderDisplay(player.gender);
    return displayGender === this.selectedGender;
  }

  filterBySearch(player: Player): boolean {
    if (!this.searchText) {
      return true;
    }
    const searchLower = this.searchText.toLowerCase();
    const fullName = `${player.firstName} ${player.lastName}`.toLowerCase();
    return fullName.includes(searchLower);
  }

  onSkillLevelChange(): void {
    this.applyFilters();
  }

  onGenderChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  getSkillLevelDisplay(level: SkillLevel): string {
    return getSkillLevelDisplay(level);
  }

  getGenderDisplay(gender: Gender): string {
    return getGenderDisplay(gender);
  }

  getGenderIcon(gender: Gender): string {
    return gender === Gender.MALE ? 'male' : 'female';
  }

  getSkillLevelClass(level: SkillLevel): string {
    const display = getSkillLevelDisplay(level);
    switch (display) {
      case 'A+':
        return 'skill-level-a-plus';
      case 'A':
        return 'skill-level-a';
      case 'B':
        return 'skill-level-b';
      case 'C':
        return 'skill-level-c';
      case 'D':
        return 'skill-level-d';
      default:
        return '';
    }
  }
}
