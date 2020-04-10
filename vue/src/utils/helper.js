const sortedPlayers = game => {
  const players = game.players.map(p => ({ ...p, score: 0 }));
  for (const [key, value] of Object.entries(game)) {
    if (key.startsWith('answer')) {
      for (const p of players) {
        const playerAnswer = value.find(answer => p.uid === answer.uid);
        if (playerAnswer) p.score += playerAnswer.score;
      }
    }
  }
  return players.sort((a, b) => b.score - a.score);
}

export {sortedPlayers}