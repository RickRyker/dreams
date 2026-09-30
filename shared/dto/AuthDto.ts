// shared/dto/AuthDto.ts

export interface AuthDto {
  accessToken: string;
  refreshToken: string;
  account: {
    id: string;
    email: string;
  };
}
