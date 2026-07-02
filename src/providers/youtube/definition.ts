import type { ProviderDefinition } from "../../core/types.ts";

import { youtubeActions } from "./actions.ts";

const service = "youtube";

export const youtubeProviderScopes: string[] = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtube.force-ssl",
];

export const provider: ProviderDefinition = {
  service,
  displayName: "YouTube",
  categories: ["Design & Media", "Social"],
  authTypes: ["oauth2"],
  auth: [
    {
      type: "oauth2",
      authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenUrl: "https://oauth2.googleapis.com/token",
      scopes: youtubeProviderScopes,
      redirectPath: "/oauth/callback/youtube",
      tokenEndpointAuthMethod: "client_secret_post",
      authorizationParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  ],
  homepageUrl: "https://www.youtube.com/",
  actions: youtubeActions,
};
