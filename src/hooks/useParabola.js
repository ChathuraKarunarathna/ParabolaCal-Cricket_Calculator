import { useState, useMemo } from 'react';
import { getParabolaNorm } from '../data/parabolaTable';

export const useParabola = () => {
  const [matchFormat, setMatchFormat] = useState(50);
  const [team1Score, setTeam1Score] = useState(0);
  const [team1Overs, setTeam1Overs] = useState(50);
  const [team2Overs, setTeam2Overs] = useState(20);
  const [team2Balls, setTeam2Balls] = useState(0);

  const reset = () => {
    setTeam1Score(0);
    if (matchFormat === 50) {
      setTeam1Overs(50);
      setTeam2Overs(20);
    } else if (matchFormat === 30) {
      setTeam1Overs(30);
      setTeam2Overs(20);
    } else if (matchFormat === 20) {
      setTeam1Overs(20);
      setTeam2Overs(5);
    }
    setTeam2Balls(0);
  };

  // Update overs when format changes
  const handleFormatChange = (newFormat) => {
    setMatchFormat(newFormat);
    if (newFormat === 50) {
      setTeam1Overs(50);
      setTeam2Overs(20);
    } else if (newFormat === 30) {
      setTeam1Overs(30);
      setTeam2Overs(20);
    } else if (newFormat === 20) {
      setTeam1Overs(20);
      setTeam2Overs(5);
    }
    setTeam2Balls(0);
  };

  const calculation = useMemo(() => {
    const norm1 = getParabolaNorm(team1Overs, 0, matchFormat);
    const norm2 = getParabolaNorm(team2Overs, team2Balls, matchFormat);

    if (norm1 === 0) return { target: 0, norm1, norm2 };

    const ratio = norm2 / norm1;
    const targetFloat = team1Score * ratio;
    const target = Math.ceil(targetFloat);

    return {
      target,
      norm1,
      norm2,
      ratio
    };
  }, [team1Score, team1Overs, team2Overs, team2Balls, matchFormat]);

  return {
    matchFormat,
    setMatchFormat: handleFormatChange,
    team1Score, setTeam1Score,
    team1Overs, setTeam1Overs,
    team2Overs, setTeam2Overs,
    team2Balls, setTeam2Balls,
    reset,
    ...calculation
  };
};
