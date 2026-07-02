import type { ExecutionContext } from "../../core/types.ts";

import { describe, expect, it } from "vitest";
import { executors } from "./executors.ts";

const context: ExecutionContext = {
  async getCredential() {
    return {
      authType: "api_key",
      apiKey: "test-leiga-key",
      values: {},
      profile: {
        accountId: "test-leiga-account",
        displayName: "Test Leiga account",
        grantedScopes: [],
      },
      metadata: {},
    };
  },
};

describe("leiga executors", () => {
  it("returns invalid_input for malformed list_issues array fields before calling the provider", async () => {
    const result = await executors["leiga.list_issues"]?.(
      {
        projectId: 1,
        pageNumber: 1,
        pageSize: 20,
        showedCustomFieldCodes: ["field_1", 42],
      },
      context,
    );

    expect(result).toMatchObject({
      ok: false,
      error: {
        code: "invalid_input",
        details: {
          status: 400,
        },
      },
    });
  });
});
