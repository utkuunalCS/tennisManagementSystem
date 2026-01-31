package com.tennis.management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LineupPlayerDTO {
    private Long id;
    private Long playerId;
    private String firstName;
    private String lastName;
    private Integer matchNumber;
    private Integer position;
}
