# User Documentation

The **Account** represents the account-level entity (user) that owns one or more Players.

## Authentication
- **OAuth Integration**: Users can authenticate via Google, GitHub, or Discord.
- **Magic Links**: Support for passwordless login via email verification.

## Account Management
- **Shadow Banning**: Managed via `IpAccessLog`. Shadow-banned users have their actions (chat, name requests) queued or logged without impact on the live game world, while appearing successful to the user.

## Relationship to Players
- A single Account can have multiple **Players**.
- Accounts own and manage **Avatars** which can be shared or assigned to their **Player** personas.
- Administrative actions (like name change approval) are tracked back to the player ID of the staff member who performed them.
