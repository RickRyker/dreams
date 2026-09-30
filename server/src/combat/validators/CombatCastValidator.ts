// server/src/combat/validators/CombatCastValidator.ts

import {CastSpellRequestSchema} from "@shared/index";
import {validateBody} from "../../middleware/validate";

export const validateCastSpell = validateBody(CastSpellRequestSchema);
