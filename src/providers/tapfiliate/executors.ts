import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";

import { defineApiKeyProviderExecutors } from "../provider-runtime.ts";
import { tapfiliateActionHandlers, validateTapfiliateCredential } from "./runtime.ts";

const service = "tapfiliate";

export const executors: ProviderExecutors = defineApiKeyProviderExecutors(service, tapfiliateActionHandlers);

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }) {
    return validateTapfiliateCredential(input.apiKey, fetcher, signal);
  },
};
