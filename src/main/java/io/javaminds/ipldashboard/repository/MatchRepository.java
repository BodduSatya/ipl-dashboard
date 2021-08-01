package io.javaminds.ipldashboard.repository;


import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import io.javaminds.ipldashboard.modal.Match;

import java.time.LocalDate;
import java.util.List;

public interface MatchRepository extends CrudRepository<Match,Long> {
    
    List<Match> getByTeam1OrTeam2OrderByDateDesc(String teamName1,String teamName2,Pageable pageable);

    @Query("SELECT m from Match m where (m.team1 = :teamName or m.team2 = :teamName) and m.date between :dateStart and :dateEnd order by date desc ")
    List<Match> getMatchesByTeamBetweenDates(@Param("teamName") String teamName,@Param("dateStart") LocalDate date1,@Param("dateEnd")LocalDate date2);
    // List<Match> getByTeam1AndDateBetweenOrTeam2AndDateBetweenOrderByDateDesc(
    //     String teamName1,LocalDate data1,LocalDate data2,
    //     String teamName2,LocalDate date3,LocalDate date4);
    
    default List<Match> findLatestMatchesByTeam(String teamName, int count){
        return getByTeam1OrTeam2OrderByDateDesc( teamName, teamName, PageRequest.of(0, count));
    }
}
