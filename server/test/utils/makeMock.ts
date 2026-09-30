// server/test/utils/makeMock.ts

import {jest} from "@jest/globals";

export function makeMock<T extends object>(overrides: Partial<T>): jest.Mocked<T> {
  return overrides as jest.Mocked<T>;
}
