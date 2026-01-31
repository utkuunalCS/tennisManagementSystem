import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlayerListComponent } from './player-list.component';
import { PlayerService } from '../../../core/services/player.service';
import { of } from 'rxjs';
import { Player } from '../../../core/models/player.model';
import { SkillLevel } from '../../../core/enums/skill-level.enum';
import { Gender } from '../../../core/enums/gender.enum';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let playerService: jasmine.SpyObj<PlayerService>;

  const mockPlayers: Player[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      skillLevel: SkillLevel.A,
      gender: Gender.MALE,
      matchesPlayed: 10,
      matchesWon: 7,
      matchesLost: 3
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      skillLevel: SkillLevel.B,
      gender: Gender.FEMALE,
      matchesPlayed: 8,
      matchesWon: 5,
      matchesLost: 3
    }
  ];

  beforeEach(async () => {
    const playerServiceSpy = jasmine.createSpyObj('PlayerService', ['getPlayersWithStatistics']);

    await TestBed.configureTestingModule({
      imports: [
        PlayerListComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: PlayerService, useValue: playerServiceSpy }
      ]
    }).compileComponents();

    playerService = TestBed.inject(PlayerService) as jasmine.SpyObj<PlayerService>;
    playerService.getPlayersWithStatistics.and.returnValue(of(mockPlayers));

    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load players on init', () => {
    fixture.detectChanges();
    expect(playerService.getPlayersWithStatistics).toHaveBeenCalled();
    expect(component.players.length).toBe(2);
  });

  it('should calculate win percentage correctly', () => {
    const player: Player = {
      id: 1,
      firstName: 'Test',
      lastName: 'Player',
      skillLevel: SkillLevel.A,
      gender: Gender.MALE,
      matchesPlayed: 10,
      matchesWon: 7,
      matchesLost: 3
    };
    const percentage = component.calculateWinPercentage(player);
    expect(percentage).toBe(70);
  });

  it('should return 0 for win percentage when no matches played', () => {
    const player: Player = {
      id: 1,
      firstName: 'Test',
      lastName: 'Player',
      skillLevel: SkillLevel.A,
      gender: Gender.MALE,
      matchesPlayed: 0,
      matchesWon: 0,
      matchesLost: 0
    };
    const percentage = component.calculateWinPercentage(player);
    expect(percentage).toBe(0);
  });

  it('should filter players by skill level', () => {
    fixture.detectChanges();
    component.selectedSkillLevel = 'A';
    component.applyFilters();
    expect(component.filteredPlayers.length).toBe(1);
    expect(component.filteredPlayers[0].skillLevel).toBe(SkillLevel.A);
  });

  it('should filter players by gender', () => {
    fixture.detectChanges();
    component.selectedGender = 'Male';
    component.applyFilters();
    expect(component.filteredPlayers.length).toBe(1);
    expect(component.filteredPlayers[0].gender).toBe(Gender.MALE);
  });

  it('should filter players by search text', () => {
    fixture.detectChanges();
    component.searchText = 'john';
    component.applyFilters();
    expect(component.filteredPlayers.length).toBe(1);
    expect(component.filteredPlayers[0].firstName).toBe('John');
  });

  it('should show all players when filters are set to "All"', () => {
    fixture.detectChanges();
    component.selectedSkillLevel = 'All';
    component.selectedGender = 'All';
    component.searchText = '';
    component.applyFilters();
    expect(component.filteredPlayers.length).toBe(2);
  });

  it('should get correct skill level class', () => {
    expect(component.getSkillLevelClass(SkillLevel.A_PLUS)).toBe('skill-level-a-plus');
    expect(component.getSkillLevelClass(SkillLevel.A)).toBe('skill-level-a');
    expect(component.getSkillLevelClass(SkillLevel.B)).toBe('skill-level-b');
    expect(component.getSkillLevelClass(SkillLevel.C)).toBe('skill-level-c');
    expect(component.getSkillLevelClass(SkillLevel.D)).toBe('skill-level-d');
  });

  it('should get correct gender icon', () => {
    expect(component.getGenderIcon(Gender.MALE)).toBe('male');
    expect(component.getGenderIcon(Gender.FEMALE)).toBe('female');
  });
});
