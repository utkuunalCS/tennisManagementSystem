package com.tennis.management.service;

import com.tennis.management.dto.PlayerDTO;
import com.tennis.management.entity.Player;
import com.tennis.management.entity.enums.Gender;
import com.tennis.management.entity.enums.SkillLevel;
import com.tennis.management.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PlayerService {
    
    @Autowired
    private PlayerRepository playerRepository;
    
    public List<PlayerDTO> getAllPlayers() {
        return playerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<PlayerDTO> getPlayersBySkillLevel(SkillLevel skillLevel) {
        return playerRepository.findBySkillLevel(skillLevel).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<PlayerDTO> getPlayersByGender(Gender gender) {
        return playerRepository.findByGender(gender).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<PlayerDTO> getPlayersBySkillLevelAndGender(SkillLevel skillLevel, Gender gender) {
        return playerRepository.findBySkillLevelAndGender(skillLevel, gender).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public PlayerDTO getPlayerById(Long id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Player not found with id: " + id));
        return convertToDTO(player);
    }
    
    public PlayerDTO createPlayer(PlayerDTO playerDTO) {
        Player player = new Player();
        player.setFirstName(playerDTO.getFirstName());
        player.setLastName(playerDTO.getLastName());
        player.setSkillLevel(playerDTO.getSkillLevel());
        player.setGender(playerDTO.getGender());
        player.setMatchesPlayed(playerDTO.getMatchesPlayed() != null ? playerDTO.getMatchesPlayed() : 0);
        player.setMatchesWon(playerDTO.getMatchesWon() != null ? playerDTO.getMatchesWon() : 0);
        player.setMatchesLost(playerDTO.getMatchesLost() != null ? playerDTO.getMatchesLost() : 0);
        
        Player savedPlayer = playerRepository.save(player);
        return convertToDTO(savedPlayer);
    }
    
    public PlayerDTO updatePlayer(Long id, PlayerDTO playerDTO) {
        Player player = playerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Player not found with id: " + id));
        
        player.setFirstName(playerDTO.getFirstName());
        player.setLastName(playerDTO.getLastName());
        player.setSkillLevel(playerDTO.getSkillLevel());
        player.setGender(playerDTO.getGender());
        player.setMatchesPlayed(playerDTO.getMatchesPlayed());
        player.setMatchesWon(playerDTO.getMatchesWon());
        player.setMatchesLost(playerDTO.getMatchesLost());
        
        Player updatedPlayer = playerRepository.save(player);
        return convertToDTO(updatedPlayer);
    }
    
    public void deletePlayer(Long id) {
        if (!playerRepository.existsById(id)) {
            throw new RuntimeException("Player not found with id: " + id);
        }
        playerRepository.deleteById(id);
    }
    
    public List<PlayerDTO> getPlayersWithStatistics() {
        return getAllPlayers();
    }
    
    private PlayerDTO convertToDTO(Player player) {
        PlayerDTO dto = new PlayerDTO();
        dto.setId(player.getId());
        dto.setFirstName(player.getFirstName());
        dto.setLastName(player.getLastName());
        dto.setSkillLevel(player.getSkillLevel());
        dto.setGender(player.getGender());
        dto.setMatchesPlayed(player.getMatchesPlayed());
        dto.setMatchesWon(player.getMatchesWon());
        dto.setMatchesLost(player.getMatchesLost());
        dto.setWinPercentage(player.getWinPercentage());
        return dto;
    }
}
