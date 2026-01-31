import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { LineupService } from '../../../../core/services/lineup.service';
import { Lineup } from '../../../../core/models/lineup.model';

@Component({
  selector: 'app-load-lineup-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Load Lineup</h2>
    <mat-dialog-content>
      <div class="loading" *ngIf="loading">
        <mat-spinner diameter="50"></mat-spinner>
      </div>

      <div class="empty-state" *ngIf="!loading && lineups.length === 0">
        <mat-icon>inbox</mat-icon>
        <p>No saved lineups found</p>
      </div>

      <mat-selection-list 
        #lineupList 
        [multiple]="false"
        *ngIf="!loading && lineups.length > 0">
        <mat-list-option 
          *ngFor="let lineup of lineups" 
          [value]="lineup">
          <div class="lineup-item">
            <div class="lineup-info">
              <span class="lineup-name">{{ lineup.name }}</span>
              <span class="lineup-date" *ngIf="lineup.createdAt">
                {{ lineup.createdAt | date:'short' }}
              </span>
            </div>
            <span class="player-count">
              {{ lineup.lineupPlayers.length }} players
            </span>
          </div>
        </mat-list-option>
      </mat-selection-list>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button 
        mat-raised-button 
        color="primary" 
        (click)="onLoad()"
        [disabled]="!lineupList.selectedOptions.hasValue()">
        Load
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 500px;
      min-height: 300px;
      max-height: 500px;
      overflow-y: auto;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      color: #757575;

      mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
        opacity: 0.5;
      }

      p {
        font-size: 16px;
        margin: 0;
      }
    }

    .lineup-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 8px 0;

      .lineup-info {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .lineup-name {
          font-weight: 500;
          font-size: 16px;
        }

        .lineup-date {
          font-size: 12px;
          color: #757575;
        }
      }

      .player-count {
        font-size: 14px;
        color: #757575;
        background-color: #e0e0e0;
        padding: 4px 12px;
        border-radius: 12px;
      }
    }

    mat-selection-list {
      padding-top: 0;
    }
  `]
})
export class LoadLineupDialogComponent implements OnInit {
  @ViewChild('lineupList') lineupList!: MatSelectionList;
  lineups: Lineup[] = [];
  loading = false;

  constructor(
    private dialogRef: MatDialogRef<LoadLineupDialogComponent>,
    private lineupService: LineupService
  ) {}

  ngOnInit(): void {
    this.loadLineups();
  }

  private loadLineups(): void {
    this.loading = true;
    this.lineupService.getAllLineups().subscribe({
      next: (lineups) => {
        this.lineups = lineups;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading lineups:', error);
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onLoad(): void {
    const selectedLineup = this.lineupList?.selectedOptions?.selected[0]?.value;
    if (selectedLineup) {
      this.dialogRef.close(selectedLineup);
    }
  }
}
