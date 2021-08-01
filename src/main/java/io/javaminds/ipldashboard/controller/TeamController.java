package io.javaminds.ipldashboard.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import io.javaminds.ipldashboard.modal.Team;
import io.javaminds.ipldashboard.repository.MatchRepository;
import io.javaminds.ipldashboard.repository.TeamRepository;

@RestController
@CrossOrigin
public class TeamController {

   private TeamRepository teamRepository;
   private MatchRepository matchRepository;

   public TeamController( TeamRepository teamRepository, MatchRepository matchRepository ){
       this.teamRepository = teamRepository;
       this.matchRepository=matchRepository;
   }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        System.out.println("***"+teamName);
        Team team =  this.teamRepository.findByTeamName(teamName);
        team.setMatches(matchRepository.findLatestMatchesByTeam(teamName, 4));
        return team;
    }
    
}
