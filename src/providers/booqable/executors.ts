import type { CredentialValidators, ExecutionContext, ProviderExecutors } from "../../core/types.ts";
import type { BooqableContext } from "./runtime.ts";

import { optionalString } from "../../core/cast.ts";
import { defineProviderExecutors, requireApiKeyCredential } from "../provider-runtime.ts";
import { booqableActionHandlers, normalizeBooqableCompanySlug, validateBooqableCredential } from "./runtime.ts";

const service = "booqable";

export const executors: ProviderExecutors = defineProviderExecutors<BooqableContext>({
  service,
  handlers: booqableActionHandlers,
  async createContext(context: ExecutionContext, fetcher: typeof fetch): Promise<BooqableContext> {
    const credential = await requireApiKeyCredential(context, service);
    return {
      apiKey: credential.apiKey,
      companySlug: normalizeBooqableCompanySlug(
        optionalString(credential.metadata.companySlug) ?? optionalString(credential.values.companySlug),
      ),
      fetcher,
      signal: context.signal,
    };
  },
});

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }) {
    return validateBooqableCredential(input, fetcher, signal);
  },
};
