package com.tennis.management.controller;

import com.tennis.management.dto.LineupDTO;
import com.tennis.management.service.LineupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lineups")
@CrossOrigin(origins = "*")
public class LineupController {
    
    @Autowired
    private LineupService lineupService;
    
    @GetMapping
    public ResponseEntity<List<LineupDTO>> getAllLineups() {
        List<LineupDTO> lineups = lineupService.getAllLineups();
        return ResponseEntity.ok(lineups);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<LineupDTO> getLineupById(@PathVariable Long id) {
        LineupDTO lineup = lineupService.getLineupById(id);
        return ResponseEntity.ok(lineup);
    }
    
    @PostMapping
    public ResponseEntity<LineupDTO> createLineup(@RequestBody LineupDTO lineupDTO) {
        LineupDTO createdLineup = lineupService.createLineup(lineupDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLineup);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<LineupDTO> updateLineup(@PathVariable Long id, @RequestBody LineupDTO lineupDTO) {
        LineupDTO updatedLineup = lineupService.updateLineup(id, lineupDTO);
        return ResponseEntity.ok(updatedLineup);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLineup(@PathVariable Long id) {
        lineupService.deleteLineup(id);
        return ResponseEntity.noContent().build();
    }
}
