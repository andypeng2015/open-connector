import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { defineApiKeyProviderExecutors } from "../provider-runtime.ts";
import { openHandsActionHandlers, validateOpenHandsCredential } from "./runtime.ts";

const service = "open_hands";

export const executors: ProviderExecutors = defineApiKeyProviderExecutors(service, openHandsActionHandlers);

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }) {
    return validateOpenHandsCredential(input.apiKey, fetcher, signal);
  },
};
