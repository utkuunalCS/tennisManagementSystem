package com.tennis.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LineupDTO {
    private Long id;
    private String name;
    private List<LineupPlayerDTO> lineupPlayers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
