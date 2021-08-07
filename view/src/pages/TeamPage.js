import { React, useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import './TeamPage.scss';
import { PieChart } from 'react-minimal-pie-chart';

export const TeamPage = () => {

  const [team, setTeam] = useState({ matches: [] });
  const { teamName } = useParams();
  //console.log(teamName);
  useEffect(
    () => {
      const fetchTeams = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}`)
        const data = await response.json();
        setTeam(data);
        //console.log(data);
      }
      fetchTeams();
    }, [teamName]
  );

  if (!team || !team.teamName) {
    return <h1> {teamName} Team  not found.</h1>
  }
  return (
    <div className="TeamPage">
      <div className="team-name-section">
        <h1 className="team-name">{team.teamName}</h1>
      </div>
      <div className="win-loss-section">Win / Lossess
        <PieChart
          data={[
            { title: 'Losses', value: team.totalMatches-team.totalWins, color: '#e15454' },
            { title: 'Wins', value: team.totalWins, color: '#4da375' }
            
            
          ]}
        />
      </div>
      <div className="match-detail-setion">
        <h3>Latest Matches</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      {team.matches.slice(1).map(( match,index) => <MatchSmallCard key={index} teamName={team.teamName} match={match} ></MatchSmallCard>)}
      <div className="more-link">
        <Link to={`/teams/${teamName}/matches/${process.env.REACT_APP_DATA_END_YEAR}`} >
            More >>  
        </Link>
      </div>
    </div>
  );
}


 
