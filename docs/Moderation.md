# Moderation and Admin Functions

The game features specialized tools for **Moderators** and **Admins** to maintain a safe and fair environment.

## Chat Moderation
Moderators have access to real-time and historical chat logs to indentify toxicity or rule-breaking.
- **Log Review**: Access to `MessageLog` via the `/admin/chat-logs` endpoint, including player metadata and timestamps.
- **Profanity Lab**: A tool (`ProfanityLabComponent.tsx`) to test and add new `ProfanityPattern` entries. These patterns automatically filter incoming chat messages.

## Player Management
Moderators can handle identity and behavior issues:
- **Name Change Requests**: Reviewing and approving/denying player name changes via the Admin Portal.
- **Shadow Banning**: A specialized "hidden" moderation tool.
  - **How it works**: When a player is shadow-banned (via `IpAccessLog`), their requests (like name changes or certain chat messages) appear to have succeeded to them, but are never actually updated in the database or seen by other players.
- **Recall**: Admins can force-recall a player to their home point if they are stuck or causing issues.

## Security
- **IP Access Logs**: Tracking `trustLevel` and IP-based behavior to automatically flag potential bots or spammers.
- **Anti-Spam**: Automated middleware that throttles rapid requests, protecting the server and the game economy.

