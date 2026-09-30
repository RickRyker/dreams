# Leaderboards (Player Perspective)

Leaderboards are currently **achievement-score based**, with additional **Top 10 category leaderboards** planned.

## Live leaderboard today

Current ranking is computed as:

- Sum of `Achievement.points` across a player’s earned `PlayerAchievement` records.

The achievements service maps those totals to player names for display.

## Planned additional Top 10 leaderboards

Leaderboards are expected to expand beyond achievement score to include category-specific Top 10 boards, such as:

- Character stat leaders (for key player stats)
- Class level leaders
- Gold leaders

These are intended as separate ranking views so players can compete in specific progression categories, not only total achievement points.

## API and implementation status

- Current endpoint: `GET /achievements/leaderboard?limit=...`
- Current payload: player ID/name plus total achievement score.
- There is no dedicated standalone `Leaderboard` model/table in the active schema yet.
- The live leaderboard logic is embedded in `AchievementsService.leaderboard(...)`.
- In the active server bootstrap route tree, the achievements router is not mounted by default, so leaderboard endpoints are not exposed there unless mounted separately.