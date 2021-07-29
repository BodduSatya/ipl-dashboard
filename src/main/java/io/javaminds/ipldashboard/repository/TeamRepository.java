package io.javaminds.ipldashboard.repository;

import org.springframework.data.repository.CrudRepository;

import io.javaminds.ipldashboard.modal.Team;

public interface TeamRepository extends CrudRepository<Team,Long> {
    
    Team findByTeamName(String teamName);
}
