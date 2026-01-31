package com.tennis.management.repository;

import com.tennis.management.entity.LineupPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LineupPlayerRepository extends JpaRepository<LineupPlayer, Long> {
}
