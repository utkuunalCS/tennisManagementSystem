import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { Player } from '../../../../core/models/player.model';
import { MatchSlotData } from '../../lineup-builder.component';
import { MatchSlotComponent } from '../match-slot/match-slot.component';

interface MatchData {
  matchNumber: number;
  slots: MatchSlotData[];
}

@Component({
  selector: 'app-match-lineup',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatCardModule, MatchSlotComponent],
  templateUrl: './match-lineup.component.html',
  styleUrls: ['./match-lineup.component.scss']
})
export class MatchLineupComponent {
  @Input() matchSlots: MatchSlotData[] = [];
  @Input() usedPlayerIds: number[] = [];
  @Output() playerDropped = new EventEmitter<{ slotIndex: number; player: Player }>();
  @Output() playerRemoved = new EventEmitter<number>();

  get matches(): MatchData[] {
    const matchMap = new Map<number, MatchSlotData[]>();
    
    this.matchSlots.forEach(slot => {
      if (!matchMap.has(slot.matchNumber)) {
        matchMap.set(slot.matchNumber, []);
      }
      matchMap.get(slot.matchNumber)!.push(slot);
    });

    const matches: MatchData[] = [];
    for (let i = 1; i <= 9; i++) {
      matches.push({
        matchNumber: i,
        slots: matchMap.get(i) || []
      });
    }

    return matches;
  }

  getSlotIndex(slot: MatchSlotData): number {
    return this.matchSlots.findIndex(
      s => s.matchNumber === slot.matchNumber && s.position === slot.position
    );
  }

  onPlayerDropped(event: { slotIndex: number; player: Player }): void {
    this.playerDropped.emit(event);
  }

  onPlayerRemoved(slotIndex: number): void {
    this.playerRemoved.emit(slotIndex);
  }
}
