import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
// import { MatchSmallCard } from '../components/MatchSmallCard';
import  './MatchPage.scss';
import { YearSelector } from './YearSelector';
export const MatchPage = () => {

   const [matches, setMatches] = useState([]);
    
    const { teamName, year } = useParams();
    console.log(teamName,year)
   useEffect(
    () => {
      const fetchMathes = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/team/${teamName}/matches?year=${year}`)
        const data = await response.json();
        setMatches(data);
        //console.log(data);
      }
      fetchMathes();
    }, [teamName, year]
  );


    return (
        <div className="MatchPage">
            <div className="year-selector">
                Select Year
                <YearSelector teamName={teamName} />
            </div>
            <div>
            <h1 className="page-heading">{teamName} matches in {year}</h1>
            {matches.map(( match,index ) => <MatchDetailCard key={index} teamName={teamName} match={match} ></MatchDetailCard>)}
            </div>
        </div>
    );
}

