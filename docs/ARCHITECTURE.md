# Dreams of Nowhere Else and Beyond Architecture Guide

## Overview
High-performance MMORPG engine (nickname "Dreams") featuring a split architecture with a real-time responsive frontend and a buffered Write-Ahead Log (WAL) server. The architecture is designed to handle high concurrency while ensuring data consistency and durability.

## Key Services
- `AchievementService`: Manages player achievements, including tracking progress, awarding rewards, and displaying achievements in player profiles.
- `AdminService`: Provides tools for administrators to manage the game, including player moderation, content updates, and system monitoring.
- `AnalyticsService`: Collects and analyzes player behavior data to inform game design and balance decisions.
- `AuditLogService`: Offloads critical logs to S3 for long-term storage and auditing.
- `BufferService`: Buffers incoming actions and flushes them to the database in batches for performance.
- `ChatService`: Implements in-game chat functionality, including global, guild, and private messaging, with anti-spam measures.
- `CombatService`: Handles combat logic, including turn order, damage calculation, and status effects.
- `CommunityService`: Manages community engagement, including forums, feedback channels, and player-driven content creation.
- `ContentService`: Manages game content like quests, maps, and character pets, allowing for dynamic updates without downtime.
- `CraftingService`: Manages crafting systems, including recipes, materials, and crafting outcomes, allowing for player-driven item creation and customization.
- `DeploymentService`: Handles deployment processes, including CI/CD pipelines, infrastructure management, and rollback capabilities.
- `DocumentationService`: Maintains up-to-date documentation for developers and contributors, ensuring clear communication of system architecture, APIs, and development workflows.
- `EconomyService`: Manages the in-game economy, including currency, trading systems, and market dynamics.
- `EventService`: Manages in-game events, such as seasonal activities, special quests, and community challenges.
- `GuildService`: Manages player guilds, including membership, guild events, and shared resources.
- `InventoryService`: Handles player inventory management, including item storage, trading, and crafting systems
- `LeaderboardService`: Handles leaderboards for various game modes, tracking player rankings and providing competitive incentives for gameplay.
- `LocalizationService`: Handles localization and internationalization of game content, allowing for a global player base with support for multiple languages and regions.
- `LoggingService`: Centralized logging for all critical actions, errors, and system events, ensuring comprehensive audit trails and debugging capabilities.
- `MaintenanceService`: Controls maintenance mode, allowing for safe updates and downtime.
- `MapService`: Handles area maps, terrain generation, and dynamic world events that affect the game environment.
- `MatchmakingService`: Handles player matchmaking for PvP combat, ensuring balanced and competitive gameplay.
- `ModerationService`: Implements shadow-banning and anti-spam measures to maintain a healthy game environment.
- `MonitoringService`: Provides real-time monitoring of system health, performance metrics, and error tracking.
- `MountService`: Manages character mounts, including mount stats, abilities, and interactions with the player and combat system.
- `NotificationService`: Handles in-game notifications and alerts for players, such as combat updates, system messages, and event announcements.
- `PerformanceService`: Monitors and optimizes system performance, ensuring smooth gameplay even under high concurrency.
- `PetService`: Manages character pets, including pet stats, abilities, and interactions with the player and combat system.
- `PlayerService`: Manages player accounts, authentication, and profile data, ensuring secure access and personalized experiences.
- `QuestService`: Manages quest creation, tracking, and rewards, allowing for dynamic content updates and player progression.
- `RecoveryService`: Implements WAL replay and checkpointing for crash recovery and data integrity, ensuring minimal downtime and data loss in case of failures.
- `ScalingService`: Manages horizontal scaling of server services to handle increased player load and ensure high availability.
- `SecurityService`: Implements security measures, including authentication, authorization, and protection against common vulnerabilities.
- `SocialService`: Manages player social interactions, including friend lists, messaging, and player-driven events.
- `SupportService`: Provides tools and resources for player support, including ticketing systems, FAQs, and live chat support.
- `TestingService`: Manages automated testing for both frontend and server, ensuring code quality and reliability through unit, integration, and end-to-end tests.
- `WalService`: Manages the Write-Ahead Log, ensuring all critical actions are logged before processing.
