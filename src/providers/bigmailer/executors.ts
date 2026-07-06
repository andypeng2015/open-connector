import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { defineApiKeyProviderExecutors } from "../provider-runtime.ts";
import { bigmailerActionHandlers, validateBigmailerCredential } from "./runtime.ts";

const service = "bigmailer";

export const executors: ProviderExecutors = defineApiKeyProviderExecutors(service, bigmailerActionHandlers);

export const credentialValidators: CredentialValidators = {
  async apiKey(input, { fetcher, signal }) {
    return validateBigmailerCredential(input.apiKey, fetcher, signal);
  },
};
