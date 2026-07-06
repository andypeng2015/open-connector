import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { defineApiKeyProviderExecutors } from "../provider-runtime.ts";
import { botsonicActionHandlers, validateBotsonicCredential } from "./runtime.ts";

const service = "botsonic";

export const executors: ProviderExecutors = defineApiKeyProviderExecutors(service, botsonicActionHandlers);

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }) {
    return validateBotsonicCredential(input.apiKey, fetcher, signal);
  },
};
