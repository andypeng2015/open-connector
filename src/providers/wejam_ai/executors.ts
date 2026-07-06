import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { defineApiKeyProviderExecutors } from "../provider-runtime.ts";
import { validateWejamAiCredential, wejamAiActionHandlers } from "./runtime.ts";

const service = "wejam_ai";

export const executors: ProviderExecutors = defineApiKeyProviderExecutors(service, wejamAiActionHandlers);

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }) {
    return validateWejamAiCredential(input.apiKey, fetcher, signal);
  },
};
