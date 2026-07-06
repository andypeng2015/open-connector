import type { CredentialValidators, ExecutionContext, ProviderExecutors } from "../../core/types.ts";
import type { VtexContext } from "./runtime.ts";

import { defineProviderExecutors, requireApiKeyCredential } from "../provider-runtime.ts";
import {
  normalizeVtexEnvironment,
  readVtexAccountName,
  requireVtexAppToken,
  validateVtexCredential,
  vtexActionHandlers,
} from "./runtime.ts";

const service = "vtex";

export const executors: ProviderExecutors = defineProviderExecutors<VtexContext>({
  service,
  handlers: vtexActionHandlers,
  async createContext(context: ExecutionContext, fetcher: typeof fetch): Promise<VtexContext> {
    const credential = await requireApiKeyCredential(context, service);
    return {
      appKey: credential.apiKey,
      appToken: requireVtexAppToken(credential.values.appToken),
      accountName: readVtexAccountName(credential.metadata.accountName ?? credential.values.accountName),
      environment: normalizeVtexEnvironment(credential.metadata.environment ?? credential.values.environment),
      fetcher,
      signal: context.signal,
    };
  },
});

export const credentialValidators: CredentialValidators = {
  apiKey(input) {
    return validateVtexCredential({
      appKey: input.apiKey,
      appToken: input.values.appToken,
      accountName: input.values.accountName,
      environment: input.values.environment,
    });
  },
};
