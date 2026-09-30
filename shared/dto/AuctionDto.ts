// shared/dto/AuctionDto.ts
import { z } from "zod";
import { AuctionSchema } from "../zod/AuctionSchema";

export type AuctionDto = z.infer<typeof AuctionSchema>;