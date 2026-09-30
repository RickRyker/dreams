// shared/dto/ApiResponseDto.ts

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
