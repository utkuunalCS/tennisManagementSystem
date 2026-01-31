import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Player } from '../../core/models/player.model';
import { SkillLevel } from '../../core/enums/skill-level.enum';
import { Gender } from '../../core/enums/gender.enum';
import { PlayerService } from '../../core/services/player.service';
import { LineupService } from '../../core/services/lineup.service';
import { ExportService } from '../../core/services/export.service';
import { PlayerPoolComponent } from './components/player-pool/player-pool.component';
import { MatchLineupComponent } from './components/match-lineup/match-lineup.component';
import { SaveLineupDialogComponent } from './components/dialogs/save-lineup-dialog.component';
import { LoadLineupDialogComponent } from './components/dialogs/load-lineup-dialog.component';

export interface MatchSlotRequirement {
  matchNumber: number;
  position: number;
  skillLevel: SkillLevel;
  gender: Gender;
}

export interface MatchSlotData {
  matchNumber: number;
  position: number;
  skillLevel: SkillLevel;
  gender: Gender;
  player: Player | null;
}

@Component({
  selector: 'app-lineup-builder',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatProgressSpinnerModule,
    PlayerPoolComponent,
    MatchLineupComponent
  ],
  templateUrl: './lineup-builder.component.html',
  styleUrls: ['./lineup-builder.component.scss']
})
export class LineupBuilderComponent implements OnInit {
  players: Player[] = [];
  matchSlots: MatchSlotData[] = [];
  loading = false;

  // Fixed match structure
  private matchRequirements: MatchSlotRequirement[] = [
    // Match 1: A+ Male + A+ Female
    { matchNumber: 1, position: 1, skillLevel: SkillLevel.A_PLUS, gender: Gender.MALE },
    { matchNumber: 1, position: 2, skillLevel: SkillLevel.A_PLUS, gender: Gender.FEMALE },
    // Match 2: A Male + A Female
    { matchNumber: 2, position: 1, skillLevel: SkillLevel.A, gender: Gender.MALE },
    { matchNumber: 2, position: 2, skillLevel: SkillLevel.A, gender: Gender.FEMALE },
    // Match 3: A Male + B Male
    { matchNumber: 3, position: 1, skillLevel: SkillLevel.A, gender: Gender.MALE },
    { matchNumber: 3, position: 2, skillLevel: SkillLevel.B, gender: Gender.MALE },
    // Match 4: B Male + B Female
    { matchNumber: 4, position: 1, skillLevel: SkillLevel.B, gender: Gender.MALE },
    { matchNumber: 4, position: 2, skillLevel: SkillLevel.B, gender: Gender.FEMALE },
    // Match 5: B Male + B Female
    { matchNumber: 5, position: 1, skillLevel: SkillLevel.B, gender: Gender.MALE },
    { matchNumber: 5, position: 2, skillLevel: SkillLevel.B, gender: Gender.FEMALE },
    // Match 6: C Male + C Female
    { matchNumber: 6, position: 1, skillLevel: SkillLevel.C, gender: Gender.MALE },
    { matchNumber: 6, position: 2, skillLevel: SkillLevel.C, gender: Gender.FEMALE },
    // Match 7: C Male + C Female
    { matchNumber: 7, position: 1, skillLevel: SkillLevel.C, gender: Gender.MALE },
    { matchNumber: 7, position: 2, skillLevel: SkillLevel.C, gender: Gender.FEMALE },
    // Match 8: D Male + D Female
    { matchNumber: 8, position: 1, skillLevel: SkillLevel.D, gender: Gender.MALE },
    { matchNumber: 8, position: 2, skillLevel: SkillLevel.D, gender: Gender.FEMALE },
    // Match 9: D Male + D Female
    { matchNumber: 9, position: 1, skillLevel: SkillLevel.D, gender: Gender.MALE },
    { matchNumber: 9, position: 2, skillLevel: SkillLevel.D, gender: Gender.FEMALE }
  ];

  constructor(
    private playerService: PlayerService,
    private lineupService: LineupService,
    private exportService: ExportService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initializeMatchSlots();
    this.loadPlayers();
  }

  private initializeMatchSlots(): void {
    this.matchSlots = this.matchRequirements.map(req => ({
      matchNumber: req.matchNumber,
      position: req.position,
      skillLevel: req.skillLevel,
      gender: req.gender,
      player: null
    }));
  }

  private loadPlayers(): void {
    this.loading = true;
    this.playerService.getAllPlayers().subscribe({
      next: (players) => {
        this.players = players;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading players:', error);
        this.snackBar.open('Error loading players', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  getUsedPlayerIds(): number[] {
    return this.matchSlots
      .filter(slot => slot.player !== null)
      .map(slot => slot.player!.id);
  }

  onPlayerDropped(event: { slotIndex: number; player: Player }): void {
    this.matchSlots[event.slotIndex].player = event.player;
  }

  onPlayerRemoved(slotIndex: number): void {
    this.matchSlots[slotIndex].player = null;
  }

  isLineupComplete(): boolean {
    return this.matchSlots.every(slot => slot.player !== null);
  }

  saveLineup(): void {
    if (!this.isLineupComplete()) {
      this.snackBar.open('Please fill all 18 slots before saving', 'Close', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(SaveLineupDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(lineupName => {
      if (lineupName) {
        const lineup = {
          name: lineupName,
          lineupPlayers: this.matchSlots.map(slot => ({
            playerId: slot.player!.id,
            matchNumber: slot.matchNumber,
            position: slot.position
          }))
        };

        this.lineupService.createLineup(lineup).subscribe({
          next: () => {
            this.snackBar.open('Lineup saved successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error saving lineup:', error);
            this.snackBar.open('Error saving lineup', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  loadLineup(): void {
    const dialogRef = this.dialog.open(LoadLineupDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(lineup => {
      if (lineup) {
        this.clearLineup();
        
        lineup.lineupPlayers.forEach((lp: any) => {
          const slotIndex = this.matchSlots.findIndex(
            slot => slot.matchNumber === lp.matchNumber && slot.position === lp.position
          );
          
          if (slotIndex !== -1) {
            const player = this.players.find(p => p.id === lp.playerId);
            if (player) {
              this.matchSlots[slotIndex].player = player;
            }
          }
        });

        this.snackBar.open('Lineup loaded successfully', 'Close', { duration: 3000 });
      }
    });
  }

  clearLineup(): void {
    this.matchSlots.forEach(slot => {
      slot.player = null;
    });
    this.snackBar.open('Lineup cleared', 'Close', { duration: 2000 });
  }

  async exportAsPNG(): Promise<void> {
    try {
      await this.exportService.exportAsPNG('lineup-grid', 'tennis-lineup');
      this.snackBar.open('Exported as PNG', 'Close', { duration: 2000 });
    } catch (error) {
      console.error('Error exporting as PNG:', error);
      this.snackBar.open('Error exporting as PNG', 'Close', { duration: 3000 });
    }
  }

  async exportAsJPEG(): Promise<void> {
    try {
      await this.exportService.exportAsJPEG('lineup-grid', 'tennis-lineup');
      this.snackBar.open('Exported as JPEG', 'Close', { duration: 2000 });
    } catch (error) {
      console.error('Error exporting as JPEG:', error);
      this.snackBar.open('Error exporting as JPEG', 'Close', { duration: 3000 });
    }
  }
}
