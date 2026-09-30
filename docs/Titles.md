# Titles Documentation

**Titles** are honorifics or descriptors that appear alongside a player's name in the game world and chat.

## Types of Titles
- **Achievement Titles**: Automatically unlocked by reaching specific milestones (e.g., "Dragon Slayer" for killing 100 dragons).
- **Quest Titles**: Awarded upon the completion of significant narrative arcs.
- **Admin-Assigned**: Unique titles granted by game administrators for community contributions or special events.

## Gender-Aware Titles
Titles can have gender-specific variants. If a player has a `FEMALE` gender set in their profile, and the assigned title has a `femaleTitle` defined in the database, the alternate version will be displayed.

Example:
- `LORD` (Male) -> `LADY` (Female)
- `KING` (Male) -> `QUEEN` (Female)
- `DUKE` (Male) -> `DUCHESS` (Female)
- `EARL` (Male) -> `COUNTESS` (Female)
- `BARON` (Male) -> `BARONESS` (Female)
- `SIR` (Male) -> `DAME` (Female)

## Security & Name Protection
To prevent players from impersonating titled individuals (e.g., naming themselves "Sir Arthur"), the system blocks by `PlayerNameHistory` where the proposed name contains a string in the `Titles` table. This check is case-sensitive and covers both primary and alternate titles.

## Display
Titles are stored as a string on the `Player` model (usually the masculine version). In the UI, they are rendered dynamically based on the player's gender:
`[Elder] playerName`.

## Management
Admins can manually assign or remove titles from players via the `/player/assign-title` endpoint.
- **Administrative Roles**: Titles like `SIR`, `LORD`, or `LADY` require special administrative roles.
- **Requirements**: Some titles have prerequisites. For example, assigning `SIR` requires the administrator to have `MAP_EDIT_OWN` or `MAP_EDIT_ALL` permissions.
- **Level Restrictions**: Assigning titles is restricted for level 1 players to prevent abuse.

