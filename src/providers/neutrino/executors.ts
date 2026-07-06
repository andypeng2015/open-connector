import type { CredentialValidators, ExecutionContext, ProviderExecutors } from "../../core/types.ts";

import { defineProviderExecutors, ProviderRequestError, requireApiKeyCredential } from "../provider-runtime.ts";
import { neutrinoActionHandlers, validateNeutrinoCredential } from "./runtime.ts";

const service = "neutrino";

interface NeutrinoContext {
  apiKey: string;
  userId: string;
  fetcher: typeof fetch;
  signal?: AbortSignal;
}

export const executors: ProviderExecutors = defineProviderExecutors<NeutrinoContext>({
  service,
  handlers: neutrinoActionHandlers,
  async createContext(context: ExecutionContext, fetcher: typeof fetch): Promise<NeutrinoContext> {
    const credential = await requireApiKeyCredential(context, service);
    return {
      apiKey: credential.apiKey,
      userId: requireNeutrinoUserId(credential.values, credential.metadata, 500, "Neutrino userId is missing."),
      fetcher,
      signal: context.signal,
    };
  },
});

export const credentialValidators: CredentialValidators = {
  async apiKey(input, { fetcher, signal }) {
    return validateNeutrinoCredential(
      {
        apiKey: input.apiKey,
        userId: requireNeutrinoUserId(input.values, {}, 400, "userId is required."),
      },
      fetcher,
      signal,
    );
  },
};

function requireNeutrinoUserId(
  values: Record<string, string>,
  metadata: Record<string, unknown>,
  status: number,
  message: string,
): string {
  const userId = values.userId?.trim() || (typeof metadata.userId === "string" ? metadata.userId.trim() : "");
  if (!userId) {
    throw new ProviderRequestError(status, message);
  }
  return userId;
}
