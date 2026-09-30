#!/usr/bin/env bash
set -e

echo "🔍 Fixing legacy combat DTO imports..."

# --- Legacy DTOs → New DTOs ---

# CombatStateDto → CombatSnapshotDto
grep -rl "CombatStateDto" . | xargs sed -i '' 's/CombatStateDto/CombatSnapshotDto/g'

# CombatTimelineMarkerDto → CombatTimelineEventDto
grep -rl "CombatTimelineMarkerDto" . | xargs sed -i '' 's/CombatTimelineMarkerDto/CombatTimelineEventDto/g'

# ActiveCast → derive from timeline (remove import)
grep -rl "ActiveCast" . | xargs sed -i '' 's/ActiveCast//g'

# PredictedTimelineEvent → CombatTimelineEventDto
grep -rl "PredictedTimelineEvent" . | xargs sed -i '' 's/PredictedTimelineEvent/CombatTimelineEventDto/g'

# CombatEvent → CombatTimelineEventDto
grep -rl "CombatEvent" . | xargs sed -i '' 's/CombatEvent/CombatTimelineEventDto/g'

# TelegraphDto (old) → TelegraphDto (new)
grep -rl "TelegraphDto" . | xargs sed -i '' 's/TelegraphDto/TelegraphDto/g'

# EffectType → EffectTypeDto
grep -rl "EffectType" . | xargs sed -i '' 's/EffectType/EffectTypeDto/g'

# ElementType → AbilityElementDto
grep -rl "ElementType" . | xargs sed -i '' 's/ElementType/AbilityElementDto/g'

echo "✨ DTO import migration complete."
