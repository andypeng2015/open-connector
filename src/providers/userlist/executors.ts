import type { CredentialValidationResult, CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { defineApiKeyProviderExecutors } from "../provider-runtime.ts";
import { userlistActionHandlers, validateUserlistCredential } from "./runtime.ts";

const service = "userlist";

export const executors: ProviderExecutors = defineApiKeyProviderExecutors(service, userlistActionHandlers);

export const credentialValidators: CredentialValidators = {
  apiKey(): Promise<CredentialValidationResult> {
    return Promise.resolve(validateUserlistCredential());
  },
};
