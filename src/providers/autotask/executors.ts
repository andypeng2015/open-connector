import type { CredentialValidators, ProviderExecutors } from "../../core/types.ts";
import type { AutotaskActionContext } from "./runtime.ts";

import { optionalString, requiredString } from "../../core/cast.ts";
import { defineProviderExecutors, ProviderRequestError, requireApiKeyCredential } from "../provider-runtime.ts";
import { autotaskActionHandlers, resolveAutotaskApiBaseUrl, validateAutotaskCredential } from "./runtime.ts";

const service = "autotask";

export const executors: ProviderExecutors = defineProviderExecutors<AutotaskActionContext>({
  service,
  handlers: autotaskActionHandlers,
  async createContext(context, fetcher): Promise<AutotaskActionContext> {
    const credential = await requireApiKeyCredential(context, service);
    return {
      username: credential.apiKey,
      secret: requiredCredentialValue(credential.values.secret, "secret"),
      integrationCode: requiredCredentialValue(credential.values.integrationCode, "integrationCode"),
      apiBaseUrl: resolveAutotaskApiBaseUrl(credential.metadata),
      fetcher,
      signal: context.signal,
    };
  },
});

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }) {
    return validateAutotaskCredential(
      {
        username: input.apiKey,
        secret: requiredCredentialValue(input.values.secret, "secret"),
        integrationCode: requiredCredentialValue(input.values.integrationCode, "integrationCode"),
      },
      fetcher,
      signal,
    );
  },
};

function requiredCredentialValue(value: unknown, fieldName: string): string {
  return requiredString(optionalString(value), fieldName, (message) => new ProviderRequestError(400, message));
}
