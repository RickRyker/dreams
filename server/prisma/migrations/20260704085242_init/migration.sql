-- CreateEnum
CREATE TYPE "AttackType" AS ENUM ('MELEE', 'RANGED', 'MAGIC');

-- CreateEnum
CREATE TYPE "CastStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED', 'INTERRUPTED');

-- CreateEnum
CREATE TYPE "EffectType" AS ENUM ('AURA', 'BUFF', 'DEBUFF', 'DOT', 'HASTE', 'HOT', 'KNOCKBACK', 'SHIELD', 'SILENCE', 'SLEEP', 'SLOW', 'STUN', 'TAUNT', 'OTHER');

-- CreateEnum
CREATE TYPE "ElementType" AS ENUM ('NONE', 'AIR', 'DEATH', 'EARTH', 'FIRE', 'ICE', 'LIGHTNING', 'NATURE', 'POISON', 'SHADOW', 'SPIRIT', 'WATER');

-- CreateEnum
CREATE TYPE "ParticipantType" AS ENUM ('MONSTER', 'NPC', 'PET', 'PLAYER');

-- CreateEnum
CREATE TYPE "TelegraphShape" AS ENUM ('CIRCLE', 'CONE', 'RECTANGLE');

-- CreateEnum
CREATE TYPE "DialogActionType" AS ENUM ('ADD_XP', 'ADD_GOLD', 'ADD_ITEM', 'REMOVE_ITEM', 'ADD_RECIPE', 'ADD_SKILL', 'ADD_STAT', 'SET_VARIABLE', 'ADD_VALUE_TO_VARIABLE', 'MULTIPLY_VARIABLE', 'ADD_VARIABLE_TO_VARIABLE', 'SET_VARIABLE_TO_CURRENT_TIME', 'PUT_CURRENT_DATE_IN_VARIABLE', 'PUT_CURRENT_TIME_IN_VARIABLE', 'CLEAR_VARIABLE', 'START_QUEST', 'COMPLETE_QUEST', 'FAIL_QUEST', 'RESET_QUEST', 'MOVE_PLAYER_TO_MAP', 'MOVE_PLAYER_TO_COORDS', 'RETURN_PLAYER_TO_PREVIOUS_LOCATION', 'SET_RESPAWN_POINT', 'PREPARE_COMBAT_MONSTER', 'START_COMBAT', 'START_COMBAT_GROUP', 'APPLY_EFFECT', 'REMOVE_EFFECT');

-- CreateEnum
CREATE TYPE "DialogConditionOperator" AS ENUM ('EQ', 'NE', 'GT', 'LT', 'GTE', 'LTE', 'CONTAINS', 'NOT_CONTAINS', 'STARTS_WITH', 'ENDS_WITH');

-- CreateEnum
CREATE TYPE "DialogDisplayMode" AS ENUM ('FULLSCREEN', 'OVERHEAD');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('WORLD', 'HOLIDAY', 'SEASONAL', 'BOSS');

-- CreateEnum
CREATE TYPE "RewardType" AS ENUM ('ITEM', 'XP_BOOST', 'DROP_RATE', 'CURRENCY', 'COSMETIC', 'RECIPE', 'QUEST', 'TITLE');

-- CreateEnum
CREATE TYPE "GuildLogActionType" AS ENUM ('JOINED', 'DONATED', 'BORROWED', 'WITHDREW', 'PROMOTED', 'DEMOTED', 'KICKED');

-- CreateEnum
CREATE TYPE "GuildLogType" AS ENUM ('MEMBERS', 'TREASURY');

-- CreateEnum
CREATE TYPE "GuildPermissionType" AS ENUM ('WITHDRAW_ITEMS', 'WITHDRAW_GOLD', 'INVITE', 'TAG_ITEMS', 'EDIT_DESCRIPTION', 'PROMOTE', 'DEMOTE', 'KICK', 'UNTAG_ITEMS', 'MANAGE_RANKS');

-- CreateEnum
CREATE TYPE "ContainerType" AS ENUM ('AUCTION', 'BANK', 'CHEST', 'GUILD', 'MAIL', 'PLAYER', 'STORE');

-- CreateEnum
CREATE TYPE "ItemActionType" AS ENUM ('NONE', 'DRINK', 'EAT', 'READ', 'USE');

-- CreateEnum
CREATE TYPE "ItemQualityType" AS ENUM ('RUINED', 'POOR', 'STANDARD', 'FINE', 'PRISTINE');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('NONE', 'ARMOR', 'ARROW', 'AXE', 'BELT', 'BLUEPRINT', 'BOLT', 'BOOT', 'BOW', 'BULLET', 'CONTAINER', 'CLUB', 'CROP', 'CROSSBOW', 'DRINK', 'FLOWER', 'FOOD', 'FURNITURE', 'GEM', 'GLOVE', 'HAMMER', 'HAT', 'HERB', 'INGOT', 'INGREDIENT', 'INSTRUMENT', 'KNIFE', 'MATERIAL', 'MEAL', 'MEAT', 'ORE', 'PAINT', 'PENDANT', 'PET', 'PIGMENT', 'PLANK', 'POTION', 'REAGENT', 'RECIPE', 'REMAINS', 'RING', 'SCROLL', 'SHIELD', 'SLUG', 'SPEAR', 'STAFF', 'SWORD', 'TOOL', 'WAND', 'WEAPON');

-- CreateEnum
CREATE TYPE "TerrainType" AS ENUM ('NONE', 'CAVE', 'CLIFF', 'CLOUD', 'DIRT', 'GRASS', 'ICE', 'LAVA', 'OCEAN', 'ROCK', 'SAND', 'SKY', 'SNOW', 'SNOW_CLIFF', 'SWAMP', 'VOID', 'WATER');

-- CreateEnum
CREATE TYPE "WildLifeType" AS ENUM ('BEE', 'BIRD', 'BUTTERFLY');

-- CreateEnum
CREATE TYPE "TradeDirection" AS ENUM ('FROM', 'TO');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PetFamilyType" AS ENUM ('BASIC', 'BEAST', 'ELEMENTAL', 'FLYING', 'LEGENDARY', 'SPIRIT', 'MOUNT', 'WIND');

-- CreateEnum
CREATE TYPE "AchievementCategory" AS ENUM ('COMBAT', 'CRAFTING', 'EXPLORATION', 'SOCIAL');

-- CreateEnum
CREATE TYPE "AchievementTier" AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SkillType" AS ENUM ('ARMOR', 'CRAFTING', 'GATHERING', 'MAGIC', 'SOCIAL', 'WEAPON');

-- CreateEnum
CREATE TYPE "StatType" AS ENUM ('NONE', 'STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA', 'SPD', 'HP', 'MP', 'AC', 'DR', 'SR', 'FORT', 'REF', 'WILL', 'TH');

-- CreateEnum
CREATE TYPE "TitleDisplayType" AS ENUM ('PREFIX', 'SUFFIX');

-- CreateEnum
CREATE TYPE "WeaponType" AS ENUM ('NONE', 'AXES', 'BOWS', 'CLUBS', 'CROSSBOWS', 'HAMMERS', 'HANDS', 'KNIVES', 'PETS', 'SCROLLS', 'SPEARS', 'STAVES', 'SWORDS', 'TOOLS', 'WANDS');

-- CreateEnum
CREATE TYPE "QuestStatusType" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "BonusCategoryType" AS ENUM ('NONE', 'VITALITY', 'ENDURANCE', 'FOCUS', 'WARMTH', 'HEAT_RESISTANCE', 'FORTITUDE', 'SPEED', 'CHARISMA', 'RECOVERY', 'LUCK');

-- CreateEnum
CREATE TYPE "IngredientRarityType" AS ENUM ('COMMON', 'UNCOMMON', 'RARE', 'LEGENDARY');

-- CreateEnum
CREATE TYPE "MapEventActionType" AS ENUM ('TRANSITION', 'MESSAGE', 'OVERLAP_TILE');

-- CreateEnum
CREATE TYPE "MapEventLogicOperator" AS ENUM ('AND', 'OR', 'NOT');

-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('BONE', 'CERAMIC', 'CLOTH', 'DUST', 'ESSENCE', 'FIBER', 'GAS', 'GLASS', 'GRAIN', 'LEATHER', 'LIQUID', 'MEAT', 'METAL', 'MINERAL', 'ORGANIC', 'PLANT', 'STONE', 'WOOD', 'NONE', 'OTHER', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('ADMIN', 'BOT', 'CHAT', 'COMBAT', 'ERROR', 'NPC', 'PLAYER', 'QUEST', 'SYSTEM', 'WHISPER');

-- CreateEnum
CREATE TYPE "ObjectType" AS ENUM ('NONE', 'BOULDER', 'BRIDGE', 'BUILDING', 'BUSH', 'CAVE', 'DECORATION', 'FURNITURE', 'HILL', 'NPC', 'RIVER', 'ROAD', 'STREAM', 'TREES', 'WALL');

-- CreateEnum
CREATE TYPE "QualityType" AS ENUM ('F', 'E', 'D', 'C', 'B', 'A', 'S', 'SS', 'SSS', 'M');

-- CreateEnum
CREATE TYPE "SlotType" AS ENUM ('NONE', 'WEAPON', 'OFFHAND', 'ARMOR', 'HEAD', 'NECK', 'HANDS', 'WAIST', 'LEGS', 'FEET', 'RING1', 'RING2', 'EARS', 'EYES', 'FACE', 'BACK');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateEnum
CREATE TYPE "WeaponModeType" AS ENUM ('MELEE', 'RANGED');

-- CreateEnum
CREATE TYPE "WorldConfigSettingType" AS ENUM ('BUFFER_SIZE', 'MAINTENANCE_START', 'LOG_SIZE_LIMIT_BYTES', 'LOG_PRUNE_DAYS', 'IS_MAINTENANCE_MODE', 'BYPASS_MAINTENANCE', 'SIMILARITY_THRESHOLD', 'TUTORIAL_MAP', 'TUTORIAL_START_X', 'TUTORIAL_START_Y', 'GHOST_DURATION_MINUTES', 'MIN_LEVEL_CREATE_GUILD', 'MIN_LEVEL_JOIN_GUILD');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountAuthentication" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'PASSWORD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccountAuthentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avatar" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "s3Key" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "creatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastIp" TEXT NOT NULL,
    "trusted" BOOLEAN NOT NULL DEFAULT false,
    "lastUsed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailChangeToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailChangeToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MfaSecret" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MfaSecret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimit" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminActionLog" (
    "id" TEXT NOT NULL,
    "gmId" TEXT NOT NULL,
    "targetId" TEXT,
    "actionType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminActionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ban" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ban_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mute" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Mute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EconomySnapshot" (
    "id" TEXT NOT NULL,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalGold" INTEGER NOT NULL DEFAULT 0,
    "totalItems" INTEGER NOT NULL DEFAULT 0,
    "activeAuctions" INTEGER NOT NULL DEFAULT 0,
    "activeListings" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,

    CONSTRAINT "EconomySnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeatmapEvent" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "eventType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeatmapEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerSessionLog" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "loginAt" TIMESTAMP(3) NOT NULL,
    "logoutAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "clientVersion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerSessionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServerMetric" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "tags" JSONB,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServerMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatBot" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "triggerName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatBot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatBotResponse" (
    "id" TEXT NOT NULL,
    "chatBotId" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "replies" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatBotResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ability" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "effectType" TEXT NOT NULL,
    "castTimeMs" INTEGER NOT NULL,
    "cooldownMs" INTEGER NOT NULL,
    "resourceCost" INTEGER,
    "range" INTEGER,
    "isInstant" BOOLEAN NOT NULL DEFAULT false,
    "isChannel" BOOLEAN NOT NULL DEFAULT false,
    "baseAmount" INTEGER,
    "durationMs" INTEGER,
    "tickIntervalMs" INTEGER,
    "telegraph" JSONB,
    "tags" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatCast" (
    "id" TEXT NOT NULL,
    "combatId" TEXT NOT NULL,
    "casterId" TEXT NOT NULL,
    "spellSlug" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "status" "CastStatus" NOT NULL DEFAULT 'PENDING',
    "telegraphShape" "TelegraphShape",
    "telegraphRadius" INTEGER,
    "telegraphAngle" INTEGER,
    "telegraphLength" INTEGER,
    "telegraphWidth" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "combatParticipantId" TEXT,

    CONSTRAINT "CombatCast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatLogEntry" (
    "id" TEXT NOT NULL,
    "combatId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "actorId" TEXT,
    "actorType" "ParticipantType",
    "targetId" TEXT,
    "message" TEXT NOT NULL,
    "data" JSONB,
    "seq" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CombatLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatLoot" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "qty" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CombatLoot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatParticipant" (
    "id" TEXT NOT NULL,
    "combatId" TEXT NOT NULL,
    "participantType" "ParticipantType" NOT NULL DEFAULT 'PLAYER',
    "playerId" TEXT,
    "petId" TEXT,
    "monsterId" TEXT,
    "name" TEXT,
    "corpseName" TEXT,
    "tier" INTEGER NOT NULL DEFAULT 0,
    "hp" INTEGER NOT NULL DEFAULT 1,
    "maxHp" INTEGER NOT NULL DEFAULT 1,
    "mp" INTEGER NOT NULL DEFAULT 0,
    "maxMp" INTEGER NOT NULL DEFAULT 0,
    "strength" INTEGER NOT NULL DEFAULT 1,
    "dexterity" INTEGER NOT NULL DEFAULT 1,
    "intelligence" INTEGER NOT NULL DEFAULT 1,
    "charisma" INTEGER NOT NULL DEFAULT 1,
    "elementAffinity" "ElementType" NOT NULL DEFAULT 'NONE',
    "critChance" DOUBLE PRECISION NOT NULL DEFAULT 0.05,
    "critDamage" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
    "critResistance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "damageReduction" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "spellResistance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "elementResistances" JSONB DEFAULT '{}',
    "abilityCooldowns" JSONB DEFAULT '{}',
    "shield" INTEGER NOT NULL DEFAULT 0,
    "initiative" INTEGER NOT NULL DEFAULT 0,
    "x" INTEGER NOT NULL DEFAULT 10,
    "y" INTEGER NOT NULL DEFAULT 10,
    "facingDeg" INTEGER NOT NULL DEFAULT 0,
    "hasActed" BOOLEAN NOT NULL DEFAULT false,
    "isAlive" BOOLEAN NOT NULL DEFAULT true,
    "isInvisible" BOOLEAN NOT NULL DEFAULT false,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "isLooted" BOOLEAN NOT NULL DEFAULT false,
    "gcdSeconds" INTEGER NOT NULL DEFAULT 1500,
    "globalCooldownUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CombatParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatReplay" (
    "id" TEXT NOT NULL,
    "combatId" TEXT NOT NULL,
    "summary" JSONB NOT NULL,
    "frames" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CombatReplay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatSession" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "turnPhase" "ParticipantType" NOT NULL DEFAULT 'PLAYER',
    "activeTurnId" TEXT,
    "toHitBonus" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "turnTimeoutSeconds" INTEGER NOT NULL DEFAULT 20,
    "roundNumber" INTEGER NOT NULL DEFAULT 1,
    "turnIndex" INTEGER NOT NULL DEFAULT 0,
    "lastTurnAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CombatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatSnapshot" (
    "id" TEXT NOT NULL,
    "combatId" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "eventType" TEXT NOT NULL,
    "event" JSONB NOT NULL,
    "resolution" JSONB NOT NULL,
    "entities" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CombatSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatThreat" (
    "id" TEXT NOT NULL,
    "combatId" TEXT NOT NULL,
    "monsterId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CombatThreat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CombatTimelineEvent" (
    "id" TEXT NOT NULL,
    "combatId" TEXT NOT NULL,
    "participantId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT,
    "value" DOUBLE PRECISION,
    "telegraph" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CombatTimelineEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dialog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Bob',
    "displayMode" "DialogDisplayMode" NOT NULL DEFAULT 'OVERHEAD',
    "chatBotId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dialog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DialogAction" (
    "id" TEXT NOT NULL,
    "pageId" TEXT,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "action" "DialogActionType" NOT NULL DEFAULT 'ADD_GOLD',
    "questId" TEXT,
    "variable1" TEXT,
    "variable2" TEXT,
    "text" TEXT,
    "numberAmt" INTEGER,
    "floatAmt" DOUBLE PRECISION,
    "slug" TEXT,
    "skill" TEXT,
    "mapId" TEXT,
    "x" INTEGER,
    "y" INTEGER,
    "message" TEXT,
    "sound" TEXT,
    "music" TEXT,
    "cutscene" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DialogAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DialogCondition" (
    "id" TEXT NOT NULL,
    "partId" TEXT,
    "actionId" TEXT,
    "linkId" TEXT,
    "questId" TEXT NOT NULL,
    "variable" TEXT NOT NULL,
    "operator" "DialogConditionOperator" NOT NULL DEFAULT 'EQ',
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DialogCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DialogLink" (
    "id" TEXT NOT NULL,
    "pageId" TEXT,
    "sequence" INTEGER,
    "dialogId" TEXT,
    "mapId" TEXT,
    "x" INTEGER,
    "y" INTEGER,
    "leave" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DialogLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DialogLock" (
    "dialogId" TEXT NOT NULL,
    "editorId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DialogLock_pkey" PRIMARY KEY ("dialogId")
);

-- CreateTable
CREATE TABLE "DialogPage" (
    "id" TEXT NOT NULL,
    "dialogId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DialogPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DialogPart" (
    "id" TEXT NOT NULL,
    "pageId" TEXT,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DialogPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DialogSnapshot" (
    "id" TEXT NOT NULL,
    "dialogId" TEXT NOT NULL,
    "editorId" TEXT NOT NULL,
    "snapshot" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DialogSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "EventType" NOT NULL DEFAULT 'WORLD',
    "isHoliday" BOOLEAN NOT NULL DEFAULT false,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipation" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "progress" JSONB NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "rewardClaimed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventParticipation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventReward" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "rewardType" "RewardType" NOT NULL DEFAULT 'ITEM',
    "title" TEXT,
    "itemId" TEXT,
    "recipeId" TEXT,
    "amount" INTEGER,
    "value" DOUBLE PRECISION,

    CONSTRAINT "EventReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "founderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildLog" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "type" "GuildLogType" NOT NULL DEFAULT 'MEMBERS',
    "action" "GuildLogActionType" NOT NULL DEFAULT 'JOINED',
    "playerId" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildMember" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "rankLevel" INTEGER NOT NULL DEFAULT 0,
    "rankId" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "joinAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildRank" (
    "id" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildRank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuildPermission" (
    "id" TEXT NOT NULL,
    "guildRankId" TEXT NOT NULL,
    "action" "GuildPermissionType" NOT NULL,
    "permitted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Container" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "slots" INTEGER NOT NULL,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "ownerId" TEXT,
    "mapId" TEXT,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Container_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryItem" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "isBroken" BOOLEAN NOT NULL DEFAULT false,
    "isDroppable" BOOLEAN NOT NULL DEFAULT false,
    "isEquipped" BOOLEAN NOT NULL DEFAULT false,
    "isTradeable" BOOLEAN NOT NULL DEFAULT false,
    "degradation" INTEGER NOT NULL DEFAULT 0,
    "tier" INTEGER NOT NULL DEFAULT 0,
    "quality" "ItemQualityType" NOT NULL DEFAULT 'STANDARD',
    "containerId" TEXT,
    "containerType" "ContainerType",
    "playerId" TEXT,
    "equippedSlot" "SlotType",
    "guildTagId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InventoryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT DEFAULT 'Nothing special about this item.',
    "type" "ItemType" NOT NULL DEFAULT 'NONE',
    "slot" "SlotType" NOT NULL DEFAULT 'NONE',
    "element" "ElementType" NOT NULL DEFAULT 'NONE',
    "material" "MaterialType" NOT NULL DEFAULT 'OTHER',
    "weight" INTEGER NOT NULL DEFAULT 1,
    "baseCost" INTEGER NOT NULL DEFAULT 1,
    "buyPrice" INTEGER NOT NULL DEFAULT 1,
    "sellPrice" INTEGER NOT NULL DEFAULT 1,
    "fragility" INTEGER NOT NULL DEFAULT 0,
    "toHitBonus" INTEGER NOT NULL DEFAULT 0,
    "minLevel" INTEGER NOT NULL DEFAULT 1,
    "maxLevel" INTEGER NOT NULL DEFAULT 800,
    "decayRate" INTEGER NOT NULL DEFAULT 1,
    "canBeBroken" BOOLEAN NOT NULL DEFAULT true,
    "canOverrideCollision" BOOLEAN NOT NULL DEFAULT false,
    "effects" JSONB,
    "spellSlug" TEXT,
    "action" "ItemActionType" NOT NULL DEFAULT 'NONE',
    "statEffects" JSONB,
    "quality" "QualityType" NOT NULL DEFAULT 'F',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Unnamed Recipe',
    "description" TEXT NOT NULL DEFAULT 'No description provided.',
    "resultItemId" TEXT NOT NULL,
    "skillSlug" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "ingredients" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Map" (
    "id" TEXT NOT NULL,
    "regionId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "height" INTEGER NOT NULL DEFAULT 256,
    "width" INTEGER NOT NULL DEFAULT 256,
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "isSystemMap" BOOLEAN NOT NULL DEFAULT false,
    "s3JsonUrl" TEXT NOT NULL,
    "s3BitmaskUrl" TEXT NOT NULL,
    "wildLifeMaxCount" INTEGER NOT NULL DEFAULT 5,
    "wildLifeTypes" JSONB,
    "wildLifeColors" JSONB,
    "creatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapEvent" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "condition" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MapEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapEventAction" (
    "id" TEXT NOT NULL,
    "mapEventId" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "type" "MapEventActionType" NOT NULL,
    "message" TEXT NOT NULL,
    "tileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MapEventAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapEventCondition" (
    "id" TEXT NOT NULL,
    "scope" TEXT NOT NULL DEFAULT 'SYSTEM',
    "variable" TEXT NOT NULL,
    "operator" TEXT NOT NULL DEFAULT '==',
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MapEventCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapEventCompoundCondition" (
    "id" TEXT NOT NULL,
    "operator" "MapEventLogicOperator" NOT NULL,
    "conditions" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MapEventCompoundCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapTile" (
    "id" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "tileDefinitionId" TEXT NOT NULL,
    "isWalkable" BOOLEAN NOT NULL DEFAULT true,
    "objectType" "ObjectType" NOT NULL DEFAULT 'NONE',
    "terrainType" "TerrainType" NOT NULL DEFAULT 'GRASS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MapTile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TileDefinition" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tileSetId" TEXT NOT NULL,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "canBeForeground" BOOLEAN NOT NULL DEFAULT false,
    "isWalkable" BOOLEAN NOT NULL DEFAULT true,
    "objectType" "ObjectType" NOT NULL DEFAULT 'NONE',
    "terrainType" "TerrainType" NOT NULL DEFAULT 'GRASS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TileDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TileSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "configUrl" TEXT,
    "tileSize" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TileSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auction" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "inventoryItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "startingBid" INTEGER NOT NULL,
    "buyoutPrice" INTEGER,
    "currentBidId" TEXT,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Auction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuctionBid" (
    "id" TEXT NOT NULL,
    "auctionId" TEXT NOT NULL,
    "bidderId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuctionBid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketListing" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "isBuyOrder" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcStore" (
    "id" TEXT NOT NULL,
    "npcId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NpcStore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NpcStoreItem" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "buyPrice" INTEGER NOT NULL,
    "sellPrice" INTEGER NOT NULL,
    "stock" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NpcStoreItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "fromPlayerId" TEXT NOT NULL,
    "toPlayerId" TEXT NOT NULL,
    "status" "TradeStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TradeItem" (
    "id" TEXT NOT NULL,
    "tradeId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "direction" "TradeDirection" NOT NULL DEFAULT 'FROM',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TradeItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Monster" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "monsterTypeId" TEXT NOT NULL,
    "spriteImage" TEXT,
    "element" "ElementType" NOT NULL DEFAULT 'NONE',
    "attackType" "AttackType" NOT NULL DEFAULT 'MELEE',
    "tier" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "health" INTEGER NOT NULL DEFAULT 1,
    "mana" INTEGER NOT NULL DEFAULT 0,
    "strength" INTEGER NOT NULL DEFAULT 1,
    "dexterity" INTEGER NOT NULL DEFAULT 1,
    "intelligence" INTEGER NOT NULL DEFAULT 1,
    "charisma" INTEGER NOT NULL DEFAULT 1,
    "minGold" INTEGER NOT NULL DEFAULT 1,
    "maxGold" INTEGER NOT NULL DEFAULT 1,
    "critChance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "critDamage" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
    "critResistance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "damageReduction" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "spellResistance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "invasionMonster" BOOLEAN NOT NULL DEFAULT false,
    "isBoss" BOOLEAN NOT NULL DEFAULT false,
    "behavior" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterAbility" (
    "id" TEXT NOT NULL,
    "monsterId" TEXT NOT NULL,
    "abilityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonsterAbility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterLootTable" (
    "id" TEXT NOT NULL,
    "monsterId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "minQty" INTEGER NOT NULL,
    "maxQty" INTEGER NOT NULL,
    "dropRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MonsterLootTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonsterType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attackType" "AttackType" NOT NULL DEFAULT 'MELEE',
    "baseHp" INTEGER NOT NULL DEFAULT 1,
    "baseStrength" INTEGER NOT NULL DEFAULT 1,
    "element" "ElementType" NOT NULL DEFAULT 'NONE',
    "spriteImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonsterType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetSacrifice" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "petLevel" INTEGER NOT NULL DEFAULT 10,
    "petType1" TEXT NOT NULL,
    "petType2" TEXT NOT NULL,
    "petType3" TEXT NOT NULL,
    "eggSlug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetSacrifice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PetType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "defaultPet" BOOLEAN NOT NULL DEFAULT false,
    "isMountable" BOOLEAN NOT NULL DEFAULT false,
    "attackType" "AttackType" NOT NULL DEFAULT 'MELEE',
    "element" "ElementType" NOT NULL DEFAULT 'NONE',
    "family" "PetFamilyType" NOT NULL DEFAULT 'BEAST',
    "tier" INTEGER NOT NULL DEFAULT 0,
    "baseHp" INTEGER NOT NULL DEFAULT 0,
    "baseStrength" INTEGER NOT NULL DEFAULT 0,
    "critChance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "critDamage" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
    "critResistance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "damageReduction" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "spellResistance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "spriteImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "tier" "AchievementTier" NOT NULL DEFAULT 'BRONZE',
    "points" INTEGER NOT NULL DEFAULT 0,
    "category" "AchievementCategory" NOT NULL DEFAULT 'COMBAT',
    "requirements" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedPlayer" (
    "id" TEXT NOT NULL,
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,

    CONSTRAINT "BlockedPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "primaryStat" "StatType" NOT NULL DEFAULT 'NONE',
    "secondaryStat" "StatType" DEFAULT 'NONE',
    "favoredWeapon" "WeaponType" NOT NULL DEFAULT 'NONE',
    "bonuses" JSONB,
    "statGrowth" JSONB,
    "startingSpells" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "title" TEXT,
    "gender" "GenderType" NOT NULL DEFAULT 'MALE',
    "mapId" TEXT,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "recallLocationId" TEXT,
    "isGhost" BOOLEAN NOT NULL DEFAULT false,
    "isInvisible" BOOLEAN NOT NULL DEFAULT false,
    "ghostUntil" TIMESTAMP(3),
    "isBanned" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "isPaused" BOOLEAN NOT NULL DEFAULT false,
    "lastActionAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activeCombatId" TEXT,
    "weaponMode" "WeaponModeType" NOT NULL DEFAULT 'MELEE',
    "switchedWeapon" BOOLEAN NOT NULL DEFAULT false,
    "accountId" TEXT NOT NULL,
    "avatarId" TEXT,
    "hunger" INTEGER NOT NULL DEFAULT 100,
    "hungerRate" INTEGER NOT NULL DEFAULT 1,
    "fatigue" INTEGER NOT NULL DEFAULT 100,
    "fatigueRate" INTEGER NOT NULL DEFAULT 1,
    "thirst" INTEGER NOT NULL DEFAULT 100,
    "thirstRate" INTEGER NOT NULL DEFAULT 1,
    "colorTheme" JSONB,
    "customColors" JSONB DEFAULT '[]',
    "messageFilters" JSONB DEFAULT '[]',
    "hotbar" JSONB NOT NULL DEFAULT '[]',
    "keybinds" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerStats" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "gold" INTEGER NOT NULL DEFAULT 0,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "strength" INTEGER NOT NULL DEFAULT 1,
    "baseStrength" INTEGER NOT NULL DEFAULT 1,
    "dexterity" INTEGER NOT NULL DEFAULT 1,
    "baseDexterity" INTEGER NOT NULL DEFAULT 1,
    "intelligence" INTEGER NOT NULL DEFAULT 1,
    "baseIntelligence" INTEGER NOT NULL DEFAULT 1,
    "charisma" INTEGER NOT NULL DEFAULT 1,
    "baseCharisma" INTEGER NOT NULL DEFAULT 1,
    "hp" INTEGER NOT NULL DEFAULT 1,
    "maxHp" INTEGER NOT NULL DEFAULT 1,
    "mp" INTEGER NOT NULL DEFAULT 0,
    "maxMp" INTEGER NOT NULL DEFAULT 0,
    "critChance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "critDamage" DOUBLE PRECISION NOT NULL DEFAULT 1.5,
    "critResistance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "damageReduction" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "spellResistance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerAchievement" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerActivity" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "activityData" JSONB NOT NULL,
    "count" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerClass" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerDeath" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "killedBy" TEXT NOT NULL,
    "mapId" TEXT NOT NULL,
    "x" INTEGER NOT NULL DEFAULT 0,
    "y" INTEGER NOT NULL DEFAULT 0,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerDeath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerEffect" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "type" "EffectType" NOT NULL,
    "element" "ElementType",
    "magnitude" INTEGER NOT NULL,
    "tickIntervalMs" INTEGER,
    "nextTickAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerEffect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerEquipment" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "slotType" "SlotType" NOT NULL,
    "itemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMonsterKill" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "monsterId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerMonsterKill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerMonsterTypeKill" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerMonsterTypeKill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerNameHistory" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "oldName" TEXT NOT NULL,
    "newName" TEXT NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'PENDING',
    "moderatorId" TEXT,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerNameHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerPet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "attackType" "AttackType" NOT NULL DEFAULT 'MELEE',
    "tier" INTEGER NOT NULL DEFAULT 0,
    "currentHp" INTEGER NOT NULL DEFAULT 1,
    "hunger" INTEGER NOT NULL DEFAULT 0,
    "loneliness" INTEGER NOT NULL DEFAULT 0,
    "isEgg" BOOLEAN NOT NULL DEFAULT false,
    "isJuvenile" BOOLEAN NOT NULL DEFAULT false,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "hatchesAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerPet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerQuest" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "status" "QuestStatusType" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerQuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerQuestVariable" (
    "id" TEXT NOT NULL,
    "playerQuestId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerQuestVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerRecipe" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerRole" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerSkill" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerSpell" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "spellId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerSpell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerTitle" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "awardedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerVariable" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlayerVariable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "skillType" "SkillType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Title" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "female" TEXT,
    "description" TEXT NOT NULL,
    "display" "TitleDisplayType" NOT NULL DEFAULT 'PREFIX',
    "isGrantable" BOOLEAN NOT NULL DEFAULT false,
    "achievementId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quest" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requirementLevel" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestRequirementLevel" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "QuestRequirementLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestRequirementItem" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "itemSlug" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "QuestRequirementItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestRequirementSkill" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "skillSlug" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "QuestRequirementSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestRequirementQuest" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "requiredQuestId" TEXT NOT NULL,

    CONSTRAINT "QuestRequirementQuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestRewardItem" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "itemSlug" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "QuestRewardItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestRewardSkill" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "skillSlug" TEXT NOT NULL,

    CONSTRAINT "QuestRewardSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestRewardTitle" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "titleSlug" TEXT NOT NULL,

    CONSTRAINT "QuestRewardTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestDependency" (
    "id" TEXT NOT NULL,
    "questId" TEXT NOT NULL,
    "dependsOn" TEXT NOT NULL,

    CONSTRAINT "QuestDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionalDish" (
    "id" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "dish" TEXT NOT NULL,
    "rarity" "IngredientRarityType" NOT NULL DEFAULT 'COMMON',
    "bonusDuration" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegionalDish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionalDishBonus" (
    "id" TEXT NOT NULL,
    "regionalDishId" TEXT NOT NULL,
    "bonusCategory" "BonusCategoryType" NOT NULL DEFAULT 'NONE',
    "value" INTEGER NOT NULL DEFAULT 10,
    "mythicBonus" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegionalDishBonus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionalIngredient" (
    "id" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "ingredient" TEXT NOT NULL,
    "rarity" "IngredientRarityType" NOT NULL DEFAULT 'COMMON',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegionalIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spell" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "minLevel" INTEGER NOT NULL DEFAULT 0,
    "element" "ElementType" NOT NULL DEFAULT 'NONE',
    "skillSlug" TEXT,
    "attackType" "AttackType" NOT NULL DEFAULT 'MAGIC',
    "manaCost" INTEGER NOT NULL DEFAULT 0,
    "cooldown" INTEGER NOT NULL DEFAULT 0,
    "castTime" INTEGER NOT NULL DEFAULT 0,
    "range" INTEGER NOT NULL DEFAULT 1,
    "areaOfEffect" INTEGER NOT NULL DEFAULT 0,
    "effect" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Spell_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageLog" (
    "id" TEXT NOT NULL,
    "senderId" TEXT,
    "recipientId" TEXT,
    "messageType" "MessageType" NOT NULL DEFAULT 'SYSTEM',
    "content" TEXT NOT NULL,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "isFiltered" BOOLEAN NOT NULL DEFAULT false,
    "badWords" JSONB NOT NULL,
    "moderatorId" TEXT,
    "moderationNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MessageLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfanityPattern" (
    "id" TEXT NOT NULL,
    "pattern" TEXT NOT NULL,
    "severity" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfanityPattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldConfig" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Dreams of Nowhere Else and Beyond',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorldConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorldConfigSetting" (
    "id" TEXT NOT NULL,
    "worldConfigId" TEXT NOT NULL,
    "name" "WorldConfigSettingType" NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorldConfigSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlockedAccounts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BlockedAccounts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccountAuthentication_accountId_provider_key" ON "AccountAuthentication"("accountId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_accountId_name_key" ON "Avatar"("accountId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Device_accountId_name_key" ON "Device"("accountId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "EmailChangeToken_token_key" ON "EmailChangeToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "MfaSecret_accountId_key" ON "MfaSecret"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE INDEX "RateLimit_ip_endpoint_timestamp_idx" ON "RateLimit"("ip", "endpoint", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBot_name_key" ON "ChatBot"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ability_slug_key" ON "Ability"("slug");

-- CreateIndex
CREATE INDEX "CombatCast_combatId_idx" ON "CombatCast"("combatId");

-- CreateIndex
CREATE INDEX "CombatCast_casterId_idx" ON "CombatCast"("casterId");

-- CreateIndex
CREATE INDEX "CombatLogEntry_combatId_seq_idx" ON "CombatLogEntry"("combatId", "seq");

-- CreateIndex
CREATE INDEX "CombatLoot_participantId_idx" ON "CombatLoot"("participantId");

-- CreateIndex
CREATE INDEX "CombatLoot_itemId_idx" ON "CombatLoot"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "CombatLoot_participantId_itemId_key" ON "CombatLoot"("participantId", "itemId");

-- CreateIndex
CREATE INDEX "CombatParticipant_combatId_idx" ON "CombatParticipant"("combatId");

-- CreateIndex
CREATE INDEX "CombatParticipant_participantType_idx" ON "CombatParticipant"("participantType");

-- CreateIndex
CREATE INDEX "CombatParticipant_playerId_idx" ON "CombatParticipant"("playerId");

-- CreateIndex
CREATE INDEX "CombatParticipant_petId_idx" ON "CombatParticipant"("petId");

-- CreateIndex
CREATE INDEX "CombatParticipant_monsterId_idx" ON "CombatParticipant"("monsterId");

-- CreateIndex
CREATE UNIQUE INDEX "CombatParticipant_combatId_playerId_key" ON "CombatParticipant"("combatId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "CombatParticipant_combatId_petId_key" ON "CombatParticipant"("combatId", "petId");

-- CreateIndex
CREATE UNIQUE INDEX "CombatReplay_combatId_key" ON "CombatReplay"("combatId");

-- CreateIndex
CREATE UNIQUE INDEX "CombatSession_activeTurnId_key" ON "CombatSession"("activeTurnId");

-- CreateIndex
CREATE INDEX "CombatSession_mapId_idx" ON "CombatSession"("mapId");

-- CreateIndex
CREATE INDEX "CombatSnapshot_combatId_timestamp_idx" ON "CombatSnapshot"("combatId", "timestamp");

-- CreateIndex
CREATE INDEX "CombatThreat_combatId_monsterId_idx" ON "CombatThreat"("combatId", "monsterId");

-- CreateIndex
CREATE UNIQUE INDEX "CombatThreat_monsterId_targetId_key" ON "CombatThreat"("monsterId", "targetId");

-- CreateIndex
CREATE INDEX "CombatTimelineEvent_combatId_timestamp_idx" ON "CombatTimelineEvent"("combatId", "timestamp");

-- CreateIndex
CREATE INDEX "Dialog_chatBotId_idx" ON "Dialog"("chatBotId");

-- CreateIndex
CREATE INDEX "Dialog_title_idx" ON "Dialog"("title");

-- CreateIndex
CREATE INDEX "DialogAction_pageId_idx" ON "DialogAction"("pageId");

-- CreateIndex
CREATE INDEX "DialogAction_action_idx" ON "DialogAction"("action");

-- CreateIndex
CREATE UNIQUE INDEX "DialogAction_pageId_sequence_key" ON "DialogAction"("pageId", "sequence");

-- CreateIndex
CREATE INDEX "DialogCondition_actionId_idx" ON "DialogCondition"("actionId");

-- CreateIndex
CREATE INDEX "DialogCondition_linkId_idx" ON "DialogCondition"("linkId");

-- CreateIndex
CREATE INDEX "DialogCondition_partId_idx" ON "DialogCondition"("partId");

-- CreateIndex
CREATE INDEX "DialogLink_pageId_idx" ON "DialogLink"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "DialogLink_pageId_sequence_key" ON "DialogLink"("pageId", "sequence");

-- CreateIndex
CREATE INDEX "DialogPage_dialogId_idx" ON "DialogPage"("dialogId");

-- CreateIndex
CREATE UNIQUE INDEX "DialogPage_dialogId_sequence_key" ON "DialogPage"("dialogId", "sequence");

-- CreateIndex
CREATE INDEX "DialogPart_pageId_idx" ON "DialogPart"("pageId");

-- CreateIndex
CREATE UNIQUE INDEX "DialogPart_pageId_sequence_key" ON "DialogPart"("pageId", "sequence");

-- CreateIndex
CREATE INDEX "DialogSnapshot_dialogId_idx" ON "DialogSnapshot"("dialogId");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EventParticipation_eventId_playerId_key" ON "EventParticipation"("eventId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Guild_name_key" ON "Guild"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GuildMember_guildId_playerId_key" ON "GuildMember"("guildId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "GuildRank_guildId_level_key" ON "GuildRank"("guildId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "GuildPermission_guildRankId_action_key" ON "GuildPermission"("guildRankId", "action");

-- CreateIndex
CREATE UNIQUE INDEX "Item_slug_key" ON "Item"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "Recipe"("slug");

-- CreateIndex
CREATE INDEX "Map_regionId_idx" ON "Map"("regionId");

-- CreateIndex
CREATE UNIQUE INDEX "MapEventAction_mapEventId_key" ON "MapEventAction"("mapEventId");

-- CreateIndex
CREATE UNIQUE INDEX "Auction_currentBidId_key" ON "Auction"("currentBidId");

-- CreateIndex
CREATE INDEX "Auction_sellerId_idx" ON "Auction"("sellerId");

-- CreateIndex
CREATE INDEX "Auction_inventoryItemId_idx" ON "Auction"("inventoryItemId");

-- CreateIndex
CREATE INDEX "AuctionBid_auctionId_idx" ON "AuctionBid"("auctionId");

-- CreateIndex
CREATE INDEX "AuctionBid_bidderId_idx" ON "AuctionBid"("bidderId");

-- CreateIndex
CREATE INDEX "AuctionBid_auctionId_amount_idx" ON "AuctionBid"("auctionId", "amount");

-- CreateIndex
CREATE INDEX "AuctionBid_auctionId_createdAt_idx" ON "AuctionBid"("auctionId", "createdAt");

-- CreateIndex
CREATE INDEX "MarketListing_isActive_idx" ON "MarketListing"("isActive");

-- CreateIndex
CREATE INDEX "MarketListing_itemId_isBuyOrder_idx" ON "MarketListing"("itemId", "isBuyOrder");

-- CreateIndex
CREATE INDEX "MarketListing_sellerId_idx" ON "MarketListing"("sellerId");

-- CreateIndex
CREATE INDEX "Trade_status_idx" ON "Trade"("status");

-- CreateIndex
CREATE INDEX "TradeItem_tradeId_idx" ON "TradeItem"("tradeId");

-- CreateIndex
CREATE INDEX "TradeItem_ownerId_idx" ON "TradeItem"("ownerId");

-- CreateIndex
CREATE INDEX "TradeItem_itemId_idx" ON "TradeItem"("itemId");

-- CreateIndex
CREATE INDEX "Monster_name_idx" ON "Monster"("name");

-- CreateIndex
CREATE INDEX "Monster_monsterTypeId_idx" ON "Monster"("monsterTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Monster_name_key" ON "Monster"("name");

-- CreateIndex
CREATE INDEX "MonsterAbility_monsterId_idx" ON "MonsterAbility"("monsterId");

-- CreateIndex
CREATE INDEX "MonsterAbility_abilityId_idx" ON "MonsterAbility"("abilityId");

-- CreateIndex
CREATE UNIQUE INDEX "MonsterAbility_monsterId_abilityId_key" ON "MonsterAbility"("monsterId", "abilityId");

-- CreateIndex
CREATE INDEX "MonsterLootTable_monsterId_idx" ON "MonsterLootTable"("monsterId");

-- CreateIndex
CREATE INDEX "MonsterLootTable_itemId_idx" ON "MonsterLootTable"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "MonsterLootTable_monsterId_itemId_key" ON "MonsterLootTable"("monsterId", "itemId");

-- CreateIndex
CREATE INDEX "MonsterType_name_idx" ON "MonsterType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MonsterType_name_key" ON "MonsterType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PetSacrifice_slug_key" ON "PetSacrifice"("slug");

-- CreateIndex
CREATE INDEX "PetSacrifice_petType1_idx" ON "PetSacrifice"("petType1");

-- CreateIndex
CREATE INDEX "PetSacrifice_petType2_idx" ON "PetSacrifice"("petType2");

-- CreateIndex
CREATE INDEX "PetSacrifice_petType3_idx" ON "PetSacrifice"("petType3");

-- CreateIndex
CREATE INDEX "PetType_name_idx" ON "PetType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PetType_name_key" ON "PetType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_slug_key" ON "Achievement"("slug");

-- CreateIndex
CREATE INDEX "BlockedPlayer_blockedId_idx" ON "BlockedPlayer"("blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "BlockedPlayer_blockerId_blockedId_key" ON "BlockedPlayer"("blockerId", "blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- CreateIndex
CREATE INDEX "Player_accountId_idx" ON "Player"("accountId");

-- CreateIndex
CREATE INDEX "Player_name_idx" ON "Player"("name");

-- CreateIndex
CREATE INDEX "Player_activeCombatId_idx" ON "Player"("activeCombatId");

-- CreateIndex
CREATE INDEX "Player_avatarId_idx" ON "Player"("avatarId");

-- CreateIndex
CREATE INDEX "Player_mapId_idx" ON "Player"("mapId");

-- CreateIndex
CREATE INDEX "Player_recallLocationId_idx" ON "Player"("recallLocationId");

-- CreateIndex
CREATE INDEX "Player_hunger_idx" ON "Player"("hunger");

-- CreateIndex
CREATE INDEX "Player_fatigue_idx" ON "Player"("fatigue");

-- CreateIndex
CREATE INDEX "Player_thirst_idx" ON "Player"("thirst");

-- CreateIndex
CREATE UNIQUE INDEX "Player_accountId_name_key" ON "Player"("accountId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerStats_playerId_key" ON "PlayerStats"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerAchievement_playerId_achievementId_key" ON "PlayerAchievement"("playerId", "achievementId");

-- CreateIndex
CREATE INDEX "PlayerActivity_playerId_idx" ON "PlayerActivity"("playerId");

-- CreateIndex
CREATE INDEX "PlayerActivity_activityType_idx" ON "PlayerActivity"("activityType");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerActivity_playerId_activityType_key" ON "PlayerActivity"("playerId", "activityType");

-- CreateIndex
CREATE INDEX "PlayerClass_playerId_idx" ON "PlayerClass"("playerId");

-- CreateIndex
CREATE INDEX "PlayerClass_classId_idx" ON "PlayerClass"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerClass_playerId_classId_key" ON "PlayerClass"("playerId", "classId");

-- CreateIndex
CREATE INDEX "PlayerDeath_playerId_idx" ON "PlayerDeath"("playerId");

-- CreateIndex
CREATE INDEX "PlayerDeath_mapId_idx" ON "PlayerDeath"("mapId");

-- CreateIndex
CREATE INDEX "PlayerDeath_timestamp_idx" ON "PlayerDeath"("timestamp");

-- CreateIndex
CREATE INDEX "PlayerEffect_playerId_idx" ON "PlayerEffect"("playerId");

-- CreateIndex
CREATE INDEX "PlayerEquipment_playerId_idx" ON "PlayerEquipment"("playerId");

-- CreateIndex
CREATE INDEX "PlayerEquipment_itemId_idx" ON "PlayerEquipment"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerEquipment_playerId_slotType_key" ON "PlayerEquipment"("playerId", "slotType");

-- CreateIndex
CREATE INDEX "PlayerMonsterKill_playerId_idx" ON "PlayerMonsterKill"("playerId");

-- CreateIndex
CREATE INDEX "PlayerMonsterKill_monsterId_idx" ON "PlayerMonsterKill"("monsterId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerMonsterKill_playerId_monsterId_key" ON "PlayerMonsterKill"("playerId", "monsterId");

-- CreateIndex
CREATE INDEX "PlayerMonsterTypeKill_playerId_idx" ON "PlayerMonsterTypeKill"("playerId");

-- CreateIndex
CREATE INDEX "PlayerMonsterTypeKill_typeId_idx" ON "PlayerMonsterTypeKill"("typeId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerMonsterTypeKill_playerId_typeId_key" ON "PlayerMonsterTypeKill"("playerId", "typeId");

-- CreateIndex
CREATE INDEX "PlayerNameHistory_playerId_idx" ON "PlayerNameHistory"("playerId");

-- CreateIndex
CREATE INDEX "PlayerPet_playerId_idx" ON "PlayerPet"("playerId");

-- CreateIndex
CREATE INDEX "PlayerPet_typeId_idx" ON "PlayerPet"("typeId");

-- CreateIndex
CREATE INDEX "PlayerPet_isSelected_idx" ON "PlayerPet"("isSelected");

-- CreateIndex
CREATE INDEX "PlayerQuest_playerId_idx" ON "PlayerQuest"("playerId");

-- CreateIndex
CREATE INDEX "PlayerQuest_questId_idx" ON "PlayerQuest"("questId");

-- CreateIndex
CREATE INDEX "PlayerQuest_status_idx" ON "PlayerQuest"("status");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerQuest_playerId_questId_key" ON "PlayerQuest"("playerId", "questId");

-- CreateIndex
CREATE INDEX "PlayerQuestVariable_playerQuestId_idx" ON "PlayerQuestVariable"("playerQuestId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerQuestVariable_playerQuestId_name_key" ON "PlayerQuestVariable"("playerQuestId", "name");

-- CreateIndex
CREATE INDEX "PlayerRecipe_playerId_idx" ON "PlayerRecipe"("playerId");

-- CreateIndex
CREATE INDEX "PlayerRecipe_recipeId_idx" ON "PlayerRecipe"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerRecipe_playerId_recipeId_key" ON "PlayerRecipe"("playerId", "recipeId");

-- CreateIndex
CREATE INDEX "PlayerRole_playerId_idx" ON "PlayerRole"("playerId");

-- CreateIndex
CREATE INDEX "PlayerRole_roleId_idx" ON "PlayerRole"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerRole_playerId_roleId_key" ON "PlayerRole"("playerId", "roleId");

-- CreateIndex
CREATE INDEX "PlayerSkill_playerId_idx" ON "PlayerSkill"("playerId");

-- CreateIndex
CREATE INDEX "PlayerSkill_skillId_idx" ON "PlayerSkill"("skillId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSkill_playerId_skillId_key" ON "PlayerSkill"("playerId", "skillId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerSpell_playerId_spellId_key" ON "PlayerSpell"("playerId", "spellId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerTitle_playerId_titleId_key" ON "PlayerTitle"("playerId", "titleId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerVariable_playerId_key_key" ON "PlayerVariable"("playerId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_slug_key" ON "Skill"("slug");

-- CreateIndex
CREATE INDEX "Skill_skillType_idx" ON "Skill"("skillType");

-- CreateIndex
CREATE UNIQUE INDEX "Title_slug_key" ON "Title"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_slug_key" ON "Quest"("slug");

-- CreateIndex
CREATE INDEX "Quest_slug_idx" ON "Quest"("slug");

-- CreateIndex
CREATE INDEX "Quest_createdById_idx" ON "Quest"("createdById");

-- CreateIndex
CREATE INDEX "QuestRequirementLevel_questId_idx" ON "QuestRequirementLevel"("questId");

-- CreateIndex
CREATE INDEX "QuestRequirementItem_questId_idx" ON "QuestRequirementItem"("questId");

-- CreateIndex
CREATE INDEX "QuestRequirementItem_itemSlug_idx" ON "QuestRequirementItem"("itemSlug");

-- CreateIndex
CREATE INDEX "QuestRequirementSkill_questId_idx" ON "QuestRequirementSkill"("questId");

-- CreateIndex
CREATE INDEX "QuestRequirementSkill_skillSlug_idx" ON "QuestRequirementSkill"("skillSlug");

-- CreateIndex
CREATE INDEX "QuestRequirementQuest_questId_idx" ON "QuestRequirementQuest"("questId");

-- CreateIndex
CREATE INDEX "QuestRequirementQuest_requiredQuestId_idx" ON "QuestRequirementQuest"("requiredQuestId");

-- CreateIndex
CREATE INDEX "QuestRewardItem_questId_idx" ON "QuestRewardItem"("questId");

-- CreateIndex
CREATE INDEX "QuestRewardItem_itemSlug_idx" ON "QuestRewardItem"("itemSlug");

-- CreateIndex
CREATE INDEX "QuestRewardSkill_questId_idx" ON "QuestRewardSkill"("questId");

-- CreateIndex
CREATE INDEX "QuestRewardSkill_skillSlug_idx" ON "QuestRewardSkill"("skillSlug");

-- CreateIndex
CREATE INDEX "QuestRewardTitle_questId_idx" ON "QuestRewardTitle"("questId");

-- CreateIndex
CREATE INDEX "QuestRewardTitle_titleSlug_idx" ON "QuestRewardTitle"("titleSlug");

-- CreateIndex
CREATE INDEX "QuestDependency_questId_idx" ON "QuestDependency"("questId");

-- CreateIndex
CREATE INDEX "QuestDependency_dependsOn_idx" ON "QuestDependency"("dependsOn");

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "Region"("slug");

-- CreateIndex
CREATE INDEX "RegionalDish_regionId_idx" ON "RegionalDish"("regionId");

-- CreateIndex
CREATE INDEX "RegionalDish_dish_idx" ON "RegionalDish"("dish");

-- CreateIndex
CREATE UNIQUE INDEX "RegionalDish_regionId_dish_key" ON "RegionalDish"("regionId", "dish");

-- CreateIndex
CREATE UNIQUE INDEX "RegionalIngredient_regionId_ingredient_key" ON "RegionalIngredient"("regionId", "ingredient");

-- CreateIndex
CREATE UNIQUE INDEX "Spell_slug_key" ON "Spell"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProfanityPattern_pattern_key" ON "ProfanityPattern"("pattern");

-- CreateIndex
CREATE INDEX "_BlockedAccounts_B_index" ON "_BlockedAccounts"("B");

-- AddForeignKey
ALTER TABLE "AccountAuthentication" ADD CONSTRAINT "AccountAuthentication_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailChangeToken" ADD CONSTRAINT "EmailChangeToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MfaSecret" ADD CONSTRAINT "MfaSecret_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ban" ADD CONSTRAINT "Ban_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mute" ADD CONSTRAINT "Mute_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeatmapEvent" ADD CONSTRAINT "HeatmapEvent_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeatmapEvent" ADD CONSTRAINT "HeatmapEvent_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSessionLog" ADD CONSTRAINT "PlayerSessionLog_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBotResponse" ADD CONSTRAINT "ChatBotResponse_chatBotId_fkey" FOREIGN KEY ("chatBotId") REFERENCES "ChatBot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatCast" ADD CONSTRAINT "CombatCast_combatParticipantId_fkey" FOREIGN KEY ("combatParticipantId") REFERENCES "CombatParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatLogEntry" ADD CONSTRAINT "CombatLogEntry_combatId_fkey" FOREIGN KEY ("combatId") REFERENCES "CombatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatLoot" ADD CONSTRAINT "CombatLoot_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "CombatParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatLoot" ADD CONSTRAINT "CombatLoot_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatParticipant" ADD CONSTRAINT "CombatParticipant_combatId_fkey" FOREIGN KEY ("combatId") REFERENCES "CombatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatParticipant" ADD CONSTRAINT "CombatParticipant_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatParticipant" ADD CONSTRAINT "CombatParticipant_petId_fkey" FOREIGN KEY ("petId") REFERENCES "PlayerPet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatParticipant" ADD CONSTRAINT "CombatParticipant_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatSession" ADD CONSTRAINT "CombatSession_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatSession" ADD CONSTRAINT "CombatSession_activeTurnId_fkey" FOREIGN KEY ("activeTurnId") REFERENCES "CombatParticipant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatThreat" ADD CONSTRAINT "CombatThreat_combatId_fkey" FOREIGN KEY ("combatId") REFERENCES "CombatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatThreat" ADD CONSTRAINT "CombatThreat_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "CombatParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatThreat" ADD CONSTRAINT "CombatThreat_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "CombatParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CombatTimelineEvent" ADD CONSTRAINT "CombatTimelineEvent_combatId_fkey" FOREIGN KEY ("combatId") REFERENCES "CombatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dialog" ADD CONSTRAINT "Dialog_chatBotId_fkey" FOREIGN KEY ("chatBotId") REFERENCES "ChatBot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogAction" ADD CONSTRAINT "DialogAction_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "DialogPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogCondition" ADD CONSTRAINT "DialogCondition_partId_fkey" FOREIGN KEY ("partId") REFERENCES "DialogPart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogCondition" ADD CONSTRAINT "DialogCondition_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "DialogAction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogCondition" ADD CONSTRAINT "DialogCondition_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "DialogLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogCondition" ADD CONSTRAINT "DialogCondition_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogLink" ADD CONSTRAINT "DialogLink_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "DialogPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogLink" ADD CONSTRAINT "DialogLink_dialogId_fkey" FOREIGN KEY ("dialogId") REFERENCES "Dialog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogLink" ADD CONSTRAINT "DialogLink_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogPage" ADD CONSTRAINT "DialogPage_dialogId_fkey" FOREIGN KEY ("dialogId") REFERENCES "Dialog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DialogPart" ADD CONSTRAINT "DialogPart_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "DialogPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipation" ADD CONSTRAINT "EventParticipation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipation" ADD CONSTRAINT "EventParticipation_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventReward" ADD CONSTRAINT "EventReward_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventReward" ADD CONSTRAINT "EventReward_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventReward" ADD CONSTRAINT "EventReward_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guild" ADD CONSTRAINT "Guild_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildLog" ADD CONSTRAINT "GuildLog_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildLog" ADD CONSTRAINT "GuildLog_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildMember" ADD CONSTRAINT "GuildMember_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildMember" ADD CONSTRAINT "GuildMember_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildMember" ADD CONSTRAINT "GuildMember_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "GuildRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildRank" ADD CONSTRAINT "GuildRank_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuildPermission" ADD CONSTRAINT "GuildPermission_guildRankId_fkey" FOREIGN KEY ("guildRankId") REFERENCES "GuildRank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Container" ADD CONSTRAINT "Container_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_containerId_fkey" FOREIGN KEY ("containerId") REFERENCES "Container"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryItem" ADD CONSTRAINT "InventoryItem_guildTagId_fkey" FOREIGN KEY ("guildTagId") REFERENCES "Guild"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_resultItemId_fkey" FOREIGN KEY ("resultItemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Map" ADD CONSTRAINT "Map_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapEvent" ADD CONSTRAINT "MapEvent_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapEventAction" ADD CONSTRAINT "MapEventAction_mapEventId_fkey" FOREIGN KEY ("mapEventId") REFERENCES "MapEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapEventAction" ADD CONSTRAINT "MapEventAction_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapTile" ADD CONSTRAINT "MapTile_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapTile" ADD CONSTRAINT "MapTile_tileDefinitionId_fkey" FOREIGN KEY ("tileDefinitionId") REFERENCES "TileDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TileDefinition" ADD CONSTRAINT "TileDefinition_tileSetId_fkey" FOREIGN KEY ("tileSetId") REFERENCES "TileSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auction" ADD CONSTRAINT "Auction_currentBidId_fkey" FOREIGN KEY ("currentBidId") REFERENCES "AuctionBid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionBid" ADD CONSTRAINT "AuctionBid_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuctionBid" ADD CONSTRAINT "AuctionBid_bidderId_fkey" FOREIGN KEY ("bidderId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketListing" ADD CONSTRAINT "MarketListing_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketListing" ADD CONSTRAINT "MarketListing_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NpcStoreItem" ADD CONSTRAINT "NpcStoreItem_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "NpcStore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NpcStoreItem" ADD CONSTRAINT "NpcStoreItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_fromPlayerId_fkey" FOREIGN KEY ("fromPlayerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_toPlayerId_fkey" FOREIGN KEY ("toPlayerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeItem" ADD CONSTRAINT "TradeItem_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeItem" ADD CONSTRAINT "TradeItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TradeItem" ADD CONSTRAINT "TradeItem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Monster" ADD CONSTRAINT "Monster_monsterTypeId_fkey" FOREIGN KEY ("monsterTypeId") REFERENCES "MonsterType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterAbility" ADD CONSTRAINT "MonsterAbility_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterAbility" ADD CONSTRAINT "MonsterAbility_abilityId_fkey" FOREIGN KEY ("abilityId") REFERENCES "Ability"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterLootTable" ADD CONSTRAINT "MonsterLootTable_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonsterLootTable" ADD CONSTRAINT "MonsterLootTable_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedPlayer" ADD CONSTRAINT "BlockedPlayer_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedPlayer" ADD CONSTRAINT "BlockedPlayer_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_recallLocationId_fkey" FOREIGN KEY ("recallLocationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_activeCombatId_fkey" FOREIGN KEY ("activeCombatId") REFERENCES "CombatSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerStats" ADD CONSTRAINT "PlayerStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAchievement" ADD CONSTRAINT "PlayerAchievement_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerAchievement" ADD CONSTRAINT "PlayerAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerActivity" ADD CONSTRAINT "PlayerActivity_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerClass" ADD CONSTRAINT "PlayerClass_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerClass" ADD CONSTRAINT "PlayerClass_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerDeath" ADD CONSTRAINT "PlayerDeath_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerDeath" ADD CONSTRAINT "PlayerDeath_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEffect" ADD CONSTRAINT "PlayerEffect_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEquipment" ADD CONSTRAINT "PlayerEquipment_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerEquipment" ADD CONSTRAINT "PlayerEquipment_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "InventoryItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMonsterKill" ADD CONSTRAINT "PlayerMonsterKill_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMonsterKill" ADD CONSTRAINT "PlayerMonsterKill_monsterId_fkey" FOREIGN KEY ("monsterId") REFERENCES "Monster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMonsterTypeKill" ADD CONSTRAINT "PlayerMonsterTypeKill_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerMonsterTypeKill" ADD CONSTRAINT "PlayerMonsterTypeKill_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MonsterType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerNameHistory" ADD CONSTRAINT "PlayerNameHistory_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerNameHistory" ADD CONSTRAINT "PlayerNameHistory_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPet" ADD CONSTRAINT "PlayerPet_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerPet" ADD CONSTRAINT "PlayerPet_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "PetType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerQuest" ADD CONSTRAINT "PlayerQuest_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerQuest" ADD CONSTRAINT "PlayerQuest_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerQuestVariable" ADD CONSTRAINT "PlayerQuestVariable_playerQuestId_fkey" FOREIGN KEY ("playerQuestId") REFERENCES "PlayerQuest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerRecipe" ADD CONSTRAINT "PlayerRecipe_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerRecipe" ADD CONSTRAINT "PlayerRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerRole" ADD CONSTRAINT "PlayerRole_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerRole" ADD CONSTRAINT "PlayerRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSkill" ADD CONSTRAINT "PlayerSkill_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSkill" ADD CONSTRAINT "PlayerSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSpell" ADD CONSTRAINT "PlayerSpell_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerSpell" ADD CONSTRAINT "PlayerSpell_spellId_fkey" FOREIGN KEY ("spellId") REFERENCES "Spell"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTitle" ADD CONSTRAINT "PlayerTitle_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerTitle" ADD CONSTRAINT "PlayerTitle_titleId_fkey" FOREIGN KEY ("titleId") REFERENCES "Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerVariable" ADD CONSTRAINT "PlayerVariable_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRequirementLevel" ADD CONSTRAINT "QuestRequirementLevel_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRequirementItem" ADD CONSTRAINT "QuestRequirementItem_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRequirementSkill" ADD CONSTRAINT "QuestRequirementSkill_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRequirementQuest" ADD CONSTRAINT "QuestRequirementQuest_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRequirementQuest" ADD CONSTRAINT "QuestRequirementQuest_requiredQuestId_fkey" FOREIGN KEY ("requiredQuestId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRewardItem" ADD CONSTRAINT "QuestRewardItem_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRewardSkill" ADD CONSTRAINT "QuestRewardSkill_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestRewardTitle" ADD CONSTRAINT "QuestRewardTitle_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestDependency" ADD CONSTRAINT "QuestDependency_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestDependency" ADD CONSTRAINT "QuestDependency_dependsOn_fkey" FOREIGN KEY ("dependsOn") REFERENCES "Quest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionalDish" ADD CONSTRAINT "RegionalDish_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionalDishBonus" ADD CONSTRAINT "RegionalDishBonus_regionalDishId_fkey" FOREIGN KEY ("regionalDishId") REFERENCES "RegionalDish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionalIngredient" ADD CONSTRAINT "RegionalIngredient_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageLog" ADD CONSTRAINT "MessageLog_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageLog" ADD CONSTRAINT "MessageLog_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageLog" ADD CONSTRAINT "MessageLog_moderatorId_fkey" FOREIGN KEY ("moderatorId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorldConfigSetting" ADD CONSTRAINT "WorldConfigSetting_worldConfigId_fkey" FOREIGN KEY ("worldConfigId") REFERENCES "WorldConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedAccounts" ADD CONSTRAINT "_BlockedAccounts_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockedAccounts" ADD CONSTRAINT "_BlockedAccounts_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
