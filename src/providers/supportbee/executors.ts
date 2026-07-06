import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { supportbeeExecutors, validateSupportbeeCredential } from "./runtime.ts";

export const executors: ProviderExecutors = supportbeeExecutors;

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }) {
    return validateSupportbeeCredential(input, fetcher, signal);
  },
};
