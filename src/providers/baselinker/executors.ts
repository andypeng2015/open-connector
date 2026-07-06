import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { defineApiKeyProviderExecutors } from "../provider-runtime.ts";
import { baseLinkerActionHandlers, validateBaseLinkerCredential } from "./runtime.ts";

const service = "baselinker";

export const executors: ProviderExecutors = defineApiKeyProviderExecutors(service, baseLinkerActionHandlers);

export const credentialValidators: CredentialValidators = {
  async apiKey(input, { fetcher, signal }) {
    return validateBaseLinkerCredential(input.apiKey, fetcher, signal);
  },
};
