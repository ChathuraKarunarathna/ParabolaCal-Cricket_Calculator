import { useState, useMemo } from 'react';
import { getParabolaNorm } from '../data/parabolaTable';

export const useParabola = () => {
  const [team1Score, setTeam1Score] = useState(250);
  const [team1Overs, setTeam1Overs] = useState(50);
  const [team2Overs, setTeam2Overs] = useState(40);
  const [team2Balls, setTeam2Balls] = useState(0);

  const calculation = useMemo(() => {
    const norm1 = getParabolaNorm(team1Overs, 0); // Team 1 usually completes overs or is all out (treated as full overs?)
    // If Team 1 is all out, usually their score is taken as is, but the Norm might still be based on overs available?
    // The formula says "Norm for Team Batting 1st". Usually this implies the overs they were *allotted*.

    const norm2 = getParabolaNorm(team2Overs, team2Balls);

    if (norm1 === 0) return { target: 0, norm1, norm2 };

    const ratio = norm2 / norm1;
    const targetFloat = team1Score * ratio;
    const target = Math.ceil(targetFloat); // "Decimals to be rounded up to the next whole number"

    // Tie logic: "01 Run less than the given target score means the side batting second has lost"
    // So Target is the winning score.
    // If Target is 200, 199 is loss. 200 is win? 
    // "The winning score... is the given score and there is NO TIED MATCHES"
    // Usually in cricket: Target to win = Par Score + 1.
    // The text says "The winning score... is the given score".
    // So if formula gives 200.2 -> Round up to 201. 201 is the winning score.

    return {
      target,
      norm1,
      norm2,
      ratio
    };
  }, [team1Score, team1Overs, team2Overs, team2Balls]);

  return {
    team1Score, setTeam1Score,
    team1Overs, setTeam1Overs,
    team2Overs, setTeam2Overs,
    team2Balls, setTeam2Balls,
    ...calculation
  };
};
