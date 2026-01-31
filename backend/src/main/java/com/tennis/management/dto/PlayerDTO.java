package com.tennis.management.dto;

import com.tennis.management.entity.enums.Gender;
import com.tennis.management.entity.enums.SkillLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private SkillLevel skillLevel;
    private Gender gender;
    private Integer matchesPlayed;
    private Integer matchesWon;
    private Integer matchesLost;
    private Double winPercentage;
}
