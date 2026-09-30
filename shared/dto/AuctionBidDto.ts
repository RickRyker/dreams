// shared/dto/AuctionBidDto.ts
import { z } from "zod";
import { AuctionBidSchema } from "../zod/AuctionBidSchema";

export type AuctionBidDto = z.infer<typeof AuctionBidSchema>;