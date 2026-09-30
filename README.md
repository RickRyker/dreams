# Dreams of Nowhere Else and Beyond: A Journey into the Uncharted Realms of Imagination

Dreams of Nowhere Else and Beyond (nickname "Dreams") is a sophisticated, high-performance, MMORPG engine built with a split architecture to ensure real-time responsiveness and data consistency under high concurrency.

## Project Summary

This repository the full stack for the Dreams engine, featuring:
- **Real-time Responsive Frontend**: Built with React, PixiJS for tiled map rendering, and Tailwind CSS.
- **Buffered WAL server**: A Node.js (Express) server using a Write-Ahead Log (WAL) system to offload database writes and ensure zero data loss.
- **Robust Persistence**: Powered by Prisma and MySQL, with S3-offloaded audit logging.

## Core Systems

- **Combat Engine**: A 16x16 grid-based combat system featuring multi-classing (Cavalier, Marauder, Mage, Rogue, Archer, Beastmaster), pets, and mounts.
- **Consistency Model**: Leverages a "Buffer & Flush" strategy via the 'WALService' and 'BufferService' to handle rapid player actions.
- **Security & Moderation**: Includes built-in maintenance mode, shadow-banning, anti-spam middleware, and comprehensive admin audit logging.
- **Content Management**: Expandable systems for Quests, Area Maps, and Character Pets.

## Repository Structure

- [`server/`](./server/README.md): Node.js Express server. Prisma models, and core services.
- [`client/`](./client/README.md): React client and PixiJS rendering engine.
- [`docs/`](./docs/README.md): Additional design and element documentation.
- [`shared/`](./shared/types.ts): Shared TypeScript types and interfaces for frontend-server consistency.
- [`infra/`](./infra/): Infrastructure-as-code configurations for deployment and management.

## Documentation Links

For more detailed information on the engine's internals and development giues, please refer to:

- [**Architecture Guide**](docs/ARCHITECTURE.md): Deep dive into the WAL system, data flow, and recovery patterns.
- [**AI Agent Guide**](.AGENTS.md): Techinical overview for developers and AI contributors.
- [**General Elements**](./Game-Elements.md): High-level design notes for game elements.
- [**Maps Documentation**](docs/Maps.md): Information on Area Maps, tilesets, and terrain.
- [**Gameplay Documentation**](./docs/Gameplay.md): Player perspective on exploration, interation, and tactical movement.

## Getting Started

Note: There is no root-level 'package.json'. Navigate to the respective client and server directories to install dependencies.

### server
```bash
cd server
npm install
npx prisma generate
# Configure .env with DAATABASE_URL
npx nodemon src/index.cjs
```

### Client
```bash
cd client
npm run dev
```
