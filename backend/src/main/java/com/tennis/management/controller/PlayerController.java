package com.tennis.management.controller;

import com.tennis.management.dto.PlayerDTO;
import com.tennis.management.entity.enums.Gender;
import com.tennis.management.entity.enums.SkillLevel;
import com.tennis.management.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
@CrossOrigin(origins = "*")
public class PlayerController {
    
    @Autowired
    private PlayerService playerService;
    
    @GetMapping
    public ResponseEntity<List<PlayerDTO>> getAllPlayers(
            @RequestParam(required = false) SkillLevel skillLevel,
            @RequestParam(required = false) Gender gender) {
        
        List<PlayerDTO> players;
        
        if (skillLevel != null && gender != null) {
            players = playerService.getPlayersBySkillLevelAndGender(skillLevel, gender);
        } else if (skillLevel != null) {
            players = playerService.getPlayersBySkillLevel(skillLevel);
        } else if (gender != null) {
            players = playerService.getPlayersByGender(gender);
        } else {
            players = playerService.getAllPlayers();
        }
        
        return ResponseEntity.ok(players);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PlayerDTO> getPlayerById(@PathVariable Long id) {
        PlayerDTO player = playerService.getPlayerById(id);
        return ResponseEntity.ok(player);
    }
    
    @PostMapping
    public ResponseEntity<PlayerDTO> createPlayer(@RequestBody PlayerDTO playerDTO) {
        PlayerDTO createdPlayer = playerService.createPlayer(playerDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPlayer);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<PlayerDTO> updatePlayer(@PathVariable Long id, @RequestBody PlayerDTO playerDTO) {
        PlayerDTO updatedPlayer = playerService.updatePlayer(id, playerDTO);
        return ResponseEntity.ok(updatedPlayer);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long id) {
        playerService.deletePlayer(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/statistics")
    public ResponseEntity<List<PlayerDTO>> getPlayersWithStatistics() {
        List<PlayerDTO> players = playerService.getPlayersWithStatistics();
        return ResponseEntity.ok(players);
    }
}
