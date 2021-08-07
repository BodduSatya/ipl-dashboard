import { React, useEffect, useState } from 'react';
import './HomePage.scss';

import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

    const [teams, setTeams] = useState([]);

    useEffect(
        () => {
            const fetchAllTeams = async () => {
                const response = await fetch(`/team`)
                const data = await response.json();
                setTeams(data);
                //console.log(data);
            }
            fetchAllTeams();
        }, []
    );


    return (
        <div className="HomePage">
            <div className="header-section">
                <h1 className="app-name">IPL Dashboard</h1>
            </div>
            <div className="team-grid">
                {teams.map((team,index) => <TeamTile key={index} teamName={team.teamName} />)}
            </div>
        </div>
    );
}



