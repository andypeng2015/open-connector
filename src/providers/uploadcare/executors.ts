import type { CredentialValidationResult, CredentialValidators, ProviderExecutors } from "../../core/types.ts";
import type { UploadcareContext } from "./runtime.ts";

import { defineProviderExecutors, requireApiKeyCredential } from "../provider-runtime.ts";
import {
  readRequiredUploadcareCredentialField,
  uploadcareActionHandlers,
  validateUploadcareCredential,
} from "./runtime.ts";

const service = "uploadcare";

export const executors: ProviderExecutors = defineProviderExecutors<UploadcareContext>({
  service,
  handlers: uploadcareActionHandlers,
  async createContext(context, fetcher): Promise<UploadcareContext> {
    const credential = await requireApiKeyCredential(context, service);
    return {
      publicKey: readRequiredUploadcareCredentialField(credential.values, "publicKey"),
      secretKey: credential.apiKey,
      fetcher,
      signal: context.signal,
    };
  },
});

export const credentialValidators: CredentialValidators = {
  apiKey(input, { fetcher, signal }): Promise<CredentialValidationResult> {
    return validateUploadcareCredential({
      apiKey: input.apiKey,
      publicKey: readRequiredUploadcareCredentialField(input.values, "publicKey"),
      fetcher,
      signal,
    });
  },
};
