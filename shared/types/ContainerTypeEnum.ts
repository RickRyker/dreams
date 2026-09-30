// shared/types/ContainerTypeEnum.ts


export const ContainerTypeEnum: string[] = [
  "AUCTION",
  "BANK",
  "CHEST",
  "GUILD",
  "MAIL",
  "PLAYER",
  "STORE",
];

export type ContainerType = typeof ContainerTypeEnum[number];
