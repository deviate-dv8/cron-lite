import { CONST_ERR } from "./const.ts";

export const INVALID_EMAIL_VERIFICATION_TOKEN: CONST_ERR = {
  error: "The Email Verification Token is Expired or Invalid",
  code: "INVALID_EMAIL_VERICATION_TOKEN"
}

export const VALID_EMAIL_VERIFICATION_TOKEN = { message: "The Email Verification Token is Valid" }
