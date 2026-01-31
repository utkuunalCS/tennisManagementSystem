import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Player } from '../../../../core/models/player.model';
import { MatchSlotData } from '../../lineup-builder.component';
import { getSkillLevelDisplay } from '../../../../core/enums/skill-level.enum';
import { getGenderDisplay } from '../../../../core/enums/gender.enum';

@Component({
  selector: 'app-match-slot',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatButtonModule, MatIconModule],
  templateUrl: './match-slot.component.html',
  styleUrls: ['./match-slot.component.scss']
})
export class MatchSlotComponent {
  @Input() slot!: MatchSlotData;
  @Input() slotIndex!: number;
  @Input() usedPlayerIds: number[] = [];
  @Output() playerDropped = new EventEmitter<{ slotIndex: number; player: Player }>();
  @Output() playerRemoved = new EventEmitter<number>();

  get placeholderText(): string {
    const skillLevel = getSkillLevelDisplay(this.slot.skillLevel);
    const gender = getGenderDisplay(this.slot.gender);
    return `Drop ${skillLevel} ${gender} here`;
  }

  get playerName(): string {
    if (this.slot.player) {
      return `${this.slot.player.firstName} ${this.slot.player.lastName}`;
    }
    return '';
  }

  canDrop = (item: any): boolean => {
    const player = item.data as Player;
    
    if (!player) {
      return false;
    }

    // Check if skill level matches
    if (player.skillLevel !== this.slot.skillLevel) {
      return false;
    }

    // Check if gender matches
    if (player.gender !== this.slot.gender) {
      return false;
    }

    // Check if player is already used (but allow if it's in this slot)
    if (this.usedPlayerIds.includes(player.id) && 
        this.slot.player?.id !== player.id) {
      return false;
    }

    return true;
  };

  onDrop(event: CdkDragDrop<any>): void {
    if (event.previousContainer !== event.container) {
      const player = event.item.data as Player;
      if (this.canDrop(event.item)) {
        this.playerDropped.emit({ slotIndex: this.slotIndex, player });
      }
    }
  }

  removePlayer(): void {
    this.playerRemoved.emit(this.slotIndex);
  }
}
