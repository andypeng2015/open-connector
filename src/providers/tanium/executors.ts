import type { CredentialValidators, ExecutionContext, ProviderExecutors } from "../../core/types.ts";
import type { TaniumContext } from "./runtime.ts";

import { optionalString } from "../../core/cast.ts";
import { defineProviderExecutors, requireApiKeyCredential } from "../provider-runtime.ts";
import { normalizeTaniumGatewayUrl, taniumActionHandlers, validateTaniumCredential } from "./runtime.ts";

const service = "tanium";

export const executors: ProviderExecutors = defineProviderExecutors<TaniumContext>({
  service,
  handlers: taniumActionHandlers,
  async createContext(context: ExecutionContext, fetcher: typeof fetch): Promise<TaniumContext> {
    const credential = await requireApiKeyCredential(context, service);
    return {
      apiKey: credential.apiKey,
      gatewayUrl: normalizeTaniumGatewayUrl(
        optionalString(credential.metadata.gatewayUrl) ?? optionalString(credential.values.gatewayUrl),
      ),
      fetcher,
      signal: context.signal,
    };
  },
});

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }) {
    return validateTaniumCredential(
      {
        apiKey: input.apiKey,
        gatewayUrl: input.values.gatewayUrl,
      },
      fetcher,
      signal,
    );
  },
};
