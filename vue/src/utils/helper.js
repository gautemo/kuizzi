const sortedPlayers = inputPlayers => {
  const players = inputPlayers.map(p => ({ ...p, score: 0 }));
  for (const [key, value] of Object.entries(game.value)) {
    if (key.startsWith('answer')) {
      for (const p of players) {
        const playerAnswer = value.find(p => p.uid === me.uid);
        if (playerAnswer) p.score += playerAnswer.score;
      }
    }
  }
  return players.sort((a, b) => b.score - a.score);
}

export {sortedPlayers}