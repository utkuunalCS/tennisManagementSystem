import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { Player } from '../../../../core/models/player.model';
import { SkillLevel, getSkillLevelDisplay } from '../../../../core/enums/skill-level.enum';
import { Gender } from '../../../../core/enums/gender.enum';

interface PlayerGroup {
  title: string;
  players: Player[];
  skillLevel: SkillLevel;
  gender: Gender;
}

@Component({
  selector: 'app-player-pool',
  standalone: true,
  imports: [CommonModule, DragDropModule, MatCardModule],
  templateUrl: './player-pool.component.html',
  styleUrls: ['./player-pool.component.scss']
})
export class PlayerPoolComponent {
  @Input() players: Player[] = [];
  @Input() usedPlayerIds: number[] = [];

  get playerGroups(): PlayerGroup[] {
    const groups: PlayerGroup[] = [
      { title: 'A+ Male', players: [], skillLevel: SkillLevel.A_PLUS, gender: Gender.MALE },
      { title: 'A+ Female', players: [], skillLevel: SkillLevel.A_PLUS, gender: Gender.FEMALE },
      { title: 'A Male', players: [], skillLevel: SkillLevel.A, gender: Gender.MALE },
      { title: 'A Female', players: [], skillLevel: SkillLevel.A, gender: Gender.FEMALE },
      { title: 'B Male', players: [], skillLevel: SkillLevel.B, gender: Gender.MALE },
      { title: 'B Female', players: [], skillLevel: SkillLevel.B, gender: Gender.FEMALE },
      { title: 'C Male', players: [], skillLevel: SkillLevel.C, gender: Gender.MALE },
      { title: 'C Female', players: [], skillLevel: SkillLevel.C, gender: Gender.FEMALE },
      { title: 'D Male', players: [], skillLevel: SkillLevel.D, gender: Gender.MALE },
      { title: 'D Female', players: [], skillLevel: SkillLevel.D, gender: Gender.FEMALE }
    ];

    this.players.forEach(player => {
      const group = groups.find(g => 
        g.skillLevel === player.skillLevel && g.gender === player.gender
      );
      if (group) {
        group.players.push(player);
      }
    });

    return groups.filter(g => g.players.length > 0);
  }

  isPlayerUsed(playerId: number): boolean {
    return this.usedPlayerIds.includes(playerId);
  }

  getPlayerName(player: Player): string {
    return `${player.firstName} ${player.lastName}`;
  }
}
