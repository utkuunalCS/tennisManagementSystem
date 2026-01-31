package com.tennis.management.service;

import com.tennis.management.dto.LineupDTO;
import com.tennis.management.dto.LineupPlayerDTO;
import com.tennis.management.entity.Lineup;
import com.tennis.management.entity.LineupPlayer;
import com.tennis.management.entity.Player;
import com.tennis.management.repository.LineupPlayerRepository;
import com.tennis.management.repository.LineupRepository;
import com.tennis.management.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class LineupService {
    
    @Autowired
    private LineupRepository lineupRepository;
    
    @Autowired
    private LineupPlayerRepository lineupPlayerRepository;
    
    @Autowired
    private PlayerRepository playerRepository;
    
    public List<LineupDTO> getAllLineups() {
        return lineupRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public LineupDTO getLineupById(Long id) {
        Lineup lineup = lineupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lineup not found with id: " + id));
        return convertToDTO(lineup);
    }
    
    public LineupDTO createLineup(LineupDTO lineupDTO) {
        Lineup lineup = new Lineup();
        lineup.setName(lineupDTO.getName());
        lineup.setLineupPlayers(new ArrayList<>());
        
        Lineup savedLineup = lineupRepository.save(lineup);
        
        if (lineupDTO.getLineupPlayers() != null) {
            for (LineupPlayerDTO lpDTO : lineupDTO.getLineupPlayers()) {
                Player player = playerRepository.findById(lpDTO.getPlayerId())
                        .orElseThrow(() -> new RuntimeException("Player not found with id: " + lpDTO.getPlayerId()));
                
                LineupPlayer lineupPlayer = new LineupPlayer();
                lineupPlayer.setLineup(savedLineup);
                lineupPlayer.setPlayer(player);
                lineupPlayer.setMatchNumber(lpDTO.getMatchNumber());
                lineupPlayer.setPosition(lpDTO.getPosition());
                
                savedLineup.getLineupPlayers().add(lineupPlayer);
            }
            
            savedLineup = lineupRepository.save(savedLineup);
        }
        
        return convertToDTO(savedLineup);
    }
    
    public LineupDTO updateLineup(Long id, LineupDTO lineupDTO) {
        Lineup lineup = lineupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lineup not found with id: " + id));
        
        lineup.setName(lineupDTO.getName());
        
        // Clear existing lineup players
        lineup.getLineupPlayers().clear();
        
        // Add new lineup players
        if (lineupDTO.getLineupPlayers() != null) {
            for (LineupPlayerDTO lpDTO : lineupDTO.getLineupPlayers()) {
                Player player = playerRepository.findById(lpDTO.getPlayerId())
                        .orElseThrow(() -> new RuntimeException("Player not found with id: " + lpDTO.getPlayerId()));
                
                LineupPlayer lineupPlayer = new LineupPlayer();
                lineupPlayer.setLineup(lineup);
                lineupPlayer.setPlayer(player);
                lineupPlayer.setMatchNumber(lpDTO.getMatchNumber());
                lineupPlayer.setPosition(lpDTO.getPosition());
                
                lineup.getLineupPlayers().add(lineupPlayer);
            }
        }
        
        Lineup updatedLineup = lineupRepository.save(lineup);
        return convertToDTO(updatedLineup);
    }
    
    public void deleteLineup(Long id) {
        if (!lineupRepository.existsById(id)) {
            throw new RuntimeException("Lineup not found with id: " + id);
        }
        lineupRepository.deleteById(id);
    }
    
    private LineupDTO convertToDTO(Lineup lineup) {
        LineupDTO dto = new LineupDTO();
        dto.setId(lineup.getId());
        dto.setName(lineup.getName());
        dto.setCreatedAt(lineup.getCreatedAt());
        dto.setUpdatedAt(lineup.getUpdatedAt());
        
        List<LineupPlayerDTO> lineupPlayerDTOs = lineup.getLineupPlayers().stream()
                .map(lp -> {
                    LineupPlayerDTO lpDTO = new LineupPlayerDTO();
                    lpDTO.setId(lp.getId());
                    lpDTO.setPlayerId(lp.getPlayer().getId());
                    lpDTO.setFirstName(lp.getPlayer().getFirstName());
                    lpDTO.setLastName(lp.getPlayer().getLastName());
                    lpDTO.setMatchNumber(lp.getMatchNumber());
                    lpDTO.setPosition(lp.getPosition());
                    return lpDTO;
                })
                .collect(Collectors.toList());
        
        dto.setLineupPlayers(lineupPlayerDTOs);
        return dto;
    }
}
