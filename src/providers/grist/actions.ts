import type { ActionDefinition, JsonSchema } from "../../core/types.ts";

import { defineProviderAction } from "../../core/provider-definition.ts";
import { gristGeneratedActionSchemas } from "./generated.ts";

const service = "grist";

export type GristActionName = (typeof gristGeneratedActionSchemas)[number]["name"];

export const gristActions: ActionDefinition[] = gristGeneratedActionSchemas.map((actionSchema) =>
  defineProviderAction(service, {
    name: actionSchema.name,
    description: actionSchema.description,
    requiredScopes: actionSchema.requiredScopes,
    providerPermissions: actionSchema.providerPermissions,
    followUpActions: actionSchema.followUpActions,
    asyncLifecycle: actionSchema.asyncLifecycle,
    inputSchema: actionSchema.inputSchema as JsonSchema,
    outputSchema: actionSchema.outputSchema as JsonSchema,
  }),
);
