// shared/dto/ReplayImportDto.ts

import type {ReplayExportDto} from "./ReplayExportDto";

export interface ReplayImportDto {
  overwriteExisting?: boolean;
  replay: ReplayExportDto;
}
