package com.tennis.management.repository;

import com.tennis.management.entity.Player;
import com.tennis.management.entity.enums.Gender;
import com.tennis.management.entity.enums.SkillLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findBySkillLevel(SkillLevel skillLevel);
    List<Player> findByGender(Gender gender);
    List<Player> findBySkillLevelAndGender(SkillLevel skillLevel, Gender gender);
}
