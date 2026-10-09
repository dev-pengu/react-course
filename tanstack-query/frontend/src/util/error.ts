import type { APIInfo } from "../types";

class HttpError extends Error {
  code: number;
  info: APIInfo;

  constructor(message: string, code: number, info: APIInfo) {
    super(message);
    this.code = code;
    this.info = info;
  }
}

export { HttpError };
