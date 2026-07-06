import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { defineApiKeyProviderExecutors } from "../provider-runtime.ts";
import { bitqueryActionHandlers, validateBitqueryCredential } from "./runtime.ts";

const service = "bitquery";

export const executors: ProviderExecutors = defineApiKeyProviderExecutors(service, bitqueryActionHandlers);

export const credentialValidators: CredentialValidators = {
  async apiKey(input, { fetcher, signal }) {
    return validateBitqueryCredential(input.apiKey, fetcher, signal);
  },
};
