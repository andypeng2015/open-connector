import type { ActionDefinition, JsonSchema } from "../../core/types.ts";

export interface GristGeneratedActionSchema {
  name: string;
  description: string;
  requiredScopes: string[];
  providerPermissions: string[];
  followUpActions?: string[];
  asyncLifecycle?: ActionDefinition["asyncLifecycle"];
  inputSchema: JsonSchema;
  outputSchema: JsonSchema;
}

export const gristGeneratedActionSchemas: GristGeneratedActionSchema[] = [
  {
    name: "list_workspaces",
    description:
      "List the Grist workspaces and documents that the authenticated API key can access on the current Grist site.",
    requiredScopes: [],
    providerPermissions: [],
    followUpActions: ["grist.get_document"],
    inputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    outputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        workspaces: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                minimum: -9007199254740991,
                maximum: 9007199254740991,
                description: "Workspace identifier.",
              },
              name: {
                type: "string",
                description: "Workspace name.",
              },
              access: {
                type: "string",
                description: "Access level for the authenticated user.",
              },
              orgDomain: {
                description: "Organization domain that owns the workspace, when present.",
                anyOf: [
                  {
                    type: "string",
                  },
                  {
                    type: "null",
                  },
                ],
              },
              docs: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      description: "Unique document identifier.",
                    },
                    name: {
                      type: "string",
                      description: "Document name.",
                    },
                    access: {
                      type: "string",
                      description: "Access level for the authenticated user.",
                    },
                    urlId: {
                      description: "Short URL alias for the document, if any.",
                      anyOf: [
                        {
                          type: "string",
                        },
                        {
                          type: "null",
                        },
                      ],
                    },
                    type: {
                      description: "Document type, if Grist reports one.",
                      anyOf: [
                        {
                          type: "string",
                        },
                        {
                          type: "null",
                        },
                      ],
                    },
                    trunkId: {
                      description: "Parent document ID when the document is a fork.",
                      anyOf: [
                        {
                          type: "string",
                        },
                        {
                          type: "null",
                        },
                      ],
                    },
                    isPinned: {
                      type: "boolean",
                      description: "Whether the document is pinned in the workspace.",
                    },
                    createdAt: {
                      description: "Timestamp when the document was created.",
                      type: "string",
                    },
                    updatedAt: {
                      description: "Timestamp when the document was last updated.",
                      type: "string",
                    },
                    forks: {
                      description: "Fork summaries attached to the document, when present.",
                      type: "array",
                      items: {
                        type: "object",
                        properties: {},
                        additionalProperties: {},
                      },
                    },
                  },
                  required: ["id", "name", "access", "isPinned"],
                  additionalProperties: {},
                  description: "Summary of a Grist document.",
                },
                description: "Documents contained in the workspace.",
              },
              owner: {
                description: "Workspace owner information, when present.",
                anyOf: [
                  {
                    type: "object",
                    properties: {},
                    additionalProperties: {},
                  },
                  {
                    type: "null",
                  },
                ],
              },
              createdAt: {
                description: "Timestamp when the workspace was created.",
                type: "string",
              },
              updatedAt: {
                description: "Timestamp when the workspace was last updated.",
                type: "string",
              },
              isSupportWorkspace: {
                description: "Whether Grist marks this as a support workspace.",
                type: "boolean",
              },
            },
            required: ["id", "name", "access", "docs"],
            additionalProperties: {},
            description: "Summary of a Grist workspace.",
          },
          description: "Workspaces available to the authenticated user.",
        },
      },
      required: ["workspaces"],
      additionalProperties: false,
      description: "Workspace and document list returned by Grist.",
    },
  },
  {
    name: "get_document",
    description: "Fetch metadata for a Grist document by document ID or short URL alias.",
    requiredScopes: [],
    providerPermissions: [],
    followUpActions: ["grist.list_tables"],
    inputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        docId: {
          type: "string",
          minLength: 1,
          description: "The Grist document identifier.",
        },
      },
      additionalProperties: false,
    },
    outputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        id: {
          type: "string",
          description: "Unique document identifier.",
        },
        name: {
          type: "string",
          description: "Document name.",
        },
        access: {
          type: "string",
          description: "Access level for the authenticated user.",
        },
        urlId: {
          description: "Short URL alias for the document, if any.",
          anyOf: [
            {
              type: "string",
            },
            {
              type: "null",
            },
          ],
        },
        isPinned: {
          description: "Whether the document is pinned.",
          type: "boolean",
        },
        type: {
          description: "Document type, when present.",
          anyOf: [
            {
              type: "string",
            },
            {
              type: "null",
            },
          ],
        },
        workspace: {
          description: "Workspace metadata attached to the document, when present.",
          type: "object",
          properties: {
            id: {
              type: "integer",
              minimum: -9007199254740991,
              maximum: 9007199254740991,
              description: "Workspace identifier.",
            },
            name: {
              type: "string",
              description: "Workspace name.",
            },
            access: {
              type: "string",
              description: "Access level for the authenticated user.",
            },
            orgDomain: {
              description: "Organization domain that owns the workspace, when present.",
              anyOf: [
                {
                  type: "string",
                },
                {
                  type: "null",
                },
              ],
            },
            docs: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    description: "Unique document identifier.",
                  },
                  name: {
                    type: "string",
                    description: "Document name.",
                  },
                  access: {
                    type: "string",
                    description: "Access level for the authenticated user.",
                  },
                  urlId: {
                    description: "Short URL alias for the document, if any.",
                    anyOf: [
                      {
                        type: "string",
                      },
                      {
                        type: "null",
                      },
                    ],
                  },
                  type: {
                    description: "Document type, if Grist reports one.",
                    anyOf: [
                      {
                        type: "string",
                      },
                      {
                        type: "null",
                      },
                    ],
                  },
                  trunkId: {
                    description: "Parent document ID when the document is a fork.",
                    anyOf: [
                      {
                        type: "string",
                      },
                      {
                        type: "null",
                      },
                    ],
                  },
                  isPinned: {
                    type: "boolean",
                    description: "Whether the document is pinned in the workspace.",
                  },
                  createdAt: {
                    description: "Timestamp when the document was created.",
                    type: "string",
                  },
                  updatedAt: {
                    description: "Timestamp when the document was last updated.",
                    type: "string",
                  },
                  forks: {
                    description: "Fork summaries attached to the document, when present.",
                    type: "array",
                    items: {
                      type: "object",
                      properties: {},
                      additionalProperties: {},
                    },
                  },
                },
                required: ["id", "name", "access", "isPinned"],
                additionalProperties: {},
                description: "Summary of a Grist document.",
              },
              description: "Documents contained in the workspace.",
            },
            owner: {
              description: "Workspace owner information, when present.",
              anyOf: [
                {
                  type: "object",
                  properties: {},
                  additionalProperties: {},
                },
                {
                  type: "null",
                },
              ],
            },
            createdAt: {
              description: "Timestamp when the workspace was created.",
              type: "string",
            },
            updatedAt: {
              description: "Timestamp when the workspace was last updated.",
              type: "string",
            },
            isSupportWorkspace: {
              description: "Whether Grist marks this as a support workspace.",
              type: "boolean",
            },
          },
          required: ["id", "name", "access", "docs"],
          additionalProperties: {},
        },
        org: {
          description: "Organization metadata attached to the document, when present.",
          type: "object",
          properties: {},
          additionalProperties: {},
        },
        createdAt: {
          description: "Timestamp when the document was created.",
          type: "string",
        },
        updatedAt: {
          description: "Timestamp when the document was last updated.",
          type: "string",
        },
        forks: {
          description: "Fork metadata attached to the document, when present.",
          type: "array",
          items: {
            type: "object",
            properties: {},
            additionalProperties: {},
          },
        },
        aliases: {
          description: "Document aliases attached to the document, when present.",
          type: "array",
          items: {
            type: "object",
            properties: {},
            additionalProperties: {},
          },
        },
      },
      required: ["id", "name", "access"],
      additionalProperties: {},
      description: "Metadata for a Grist document.",
    },
  },
  {
    name: "list_tables",
    description: "List the tables defined in a Grist document.",
    requiredScopes: [],
    providerPermissions: [],
    followUpActions: ["grist.list_columns", "grist.list_records"],
    inputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        docId: {
          type: "string",
          minLength: 1,
          description: "The Grist document identifier.",
        },
      },
      additionalProperties: false,
    },
    outputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        tables: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Table identifier.",
              },
              fields: {
                type: "object",
                properties: {
                  tableRef: {
                    type: "integer",
                    minimum: -9007199254740991,
                    maximum: 9007199254740991,
                    description: "Internal table reference identifier.",
                  },
                  onDemand: {
                    type: "boolean",
                    description: "Whether the table is loaded on demand.",
                  },
                },
                required: ["tableRef", "onDemand"],
                additionalProperties: {},
                description: "Metadata fields for the table.",
              },
            },
            required: ["id", "fields"],
            additionalProperties: {},
            description: "Metadata for a Grist table.",
          },
          description: "Tables returned by Grist for the document.",
        },
      },
      required: ["tables"],
      additionalProperties: false,
      description: "Table list returned by Grist.",
    },
  },
  {
    name: "list_columns",
    description: "List the columns defined in a Grist table.",
    requiredScopes: [],
    providerPermissions: [],
    inputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        docId: {
          type: "string",
          minLength: 1,
          description: "The Grist document identifier.",
        },
        tableId: {
          type: "string",
          minLength: 1,
          description: "The Grist table identifier.",
        },
        hidden: {
          description: "Whether hidden metadata columns should be included.",
          type: "boolean",
        },
      },
      additionalProperties: false,
    },
    outputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        columns: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Column identifier.",
              },
              fields: {
                type: "object",
                properties: {
                  label: {
                    type: "string",
                    description: "Display label of the column.",
                  },
                  type: {
                    type: "string",
                    description: "Grist column type.",
                  },
                  formula: {
                    description: "Formula expression when the column is formula-backed.",
                    type: "string",
                  },
                  isFormula: {
                    description: "Whether the column is formula-backed.",
                    type: "boolean",
                  },
                  description: {
                    description: "Help text or description of the column.",
                    type: "string",
                  },
                },
                required: ["label", "type"],
                additionalProperties: {},
                description: "Metadata fields for the column.",
              },
            },
            required: ["id", "fields"],
            additionalProperties: {},
            description: "Metadata for a Grist column.",
          },
          description: "Columns returned by Grist for the table.",
        },
      },
      required: ["columns"],
      additionalProperties: false,
      description: "Column list returned by Grist.",
    },
  },
  {
    name: "list_records",
    description:
      "List records from a Grist table with optional filtering, sorting, limits, and hidden-column inclusion.",
    requiredScopes: [],
    providerPermissions: [],
    followUpActions: ["grist.update_records", "grist.delete_records"],
    inputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        docId: {
          type: "string",
          minLength: 1,
          description: "The Grist document identifier.",
        },
        tableId: {
          type: "string",
          minLength: 1,
          description: "The Grist table identifier.",
        },
        hidden: {
          description: "Whether hidden metadata columns should be included.",
          type: "boolean",
        },
        sort: {
          description: "Comma-separated columns to sort by. Prefix with '-' for descending.",
          type: "string",
        },
        filter: {
          description: 'JSON string that maps column IDs to allowed values arrays, such as \'{"pet":["cat"]}\'.',
          type: "string",
        },
        limit: {
          description: "Maximum number of records to return. Use 0 for no limit.",
          type: "integer",
          minimum: 0,
          maximum: 9007199254740991,
        },
      },
      additionalProperties: false,
    },
    outputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        records: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                minimum: -9007199254740991,
                maximum: 9007199254740991,
                description: "Row ID of the record.",
              },
              fields: {
                type: "object",
                propertyNames: {
                  type: "string",
                },
                additionalProperties: {},
                description: "Column IDs mapped to cell values for the record.",
              },
            },
            required: ["id", "fields"],
            additionalProperties: false,
            description: "A Grist table record.",
          },
          description: "Records returned by Grist for the table.",
        },
      },
      required: ["records"],
      additionalProperties: false,
      description: "Record list returned by Grist.",
    },
  },
  {
    name: "add_records",
    description: "Add one or more records to a Grist table.",
    requiredScopes: [],
    providerPermissions: [],
    followUpActions: ["grist.list_records"],
    inputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        docId: {
          type: "string",
          minLength: 1,
          description: "The Grist document identifier.",
        },
        tableId: {
          type: "string",
          minLength: 1,
          description: "The Grist table identifier.",
        },
        noparse: {
          description: "Whether Grist should store values without automatic parsing.",
          type: "boolean",
        },
        records: {
          minItems: 1,
          type: "array",
          items: {
            type: "object",
            properties: {
              fields: {
                type: "object",
                propertyNames: {
                  type: "string",
                },
                additionalProperties: {},
                description: "Column IDs mapped to cell values for the new record.",
              },
            },
            required: ["fields"],
            additionalProperties: false,
            description: "A record to add to a Grist table.",
          },
          description: "Records to add to the target table.",
        },
      },
      required: ["records"],
      additionalProperties: false,
    },
    outputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        records: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                minimum: -9007199254740991,
                maximum: 9007199254740991,
                description: "Row ID of the created record.",
              },
            },
            required: ["id"],
            additionalProperties: false,
            description: "A Grist record creation acknowledgement.",
          },
          description: "Created record IDs returned by Grist.",
        },
      },
      required: ["records"],
      additionalProperties: false,
      description: "Record creation acknowledgement returned by Grist.",
    },
  },
  {
    name: "update_records",
    description: "Update one or more existing Grist records by row ID.",
    requiredScopes: [],
    providerPermissions: [],
    inputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        docId: {
          type: "string",
          minLength: 1,
          description: "The Grist document identifier.",
        },
        tableId: {
          type: "string",
          minLength: 1,
          description: "The Grist table identifier.",
        },
        noparse: {
          description: "Whether Grist should store values without automatic parsing.",
          type: "boolean",
        },
        records: {
          minItems: 1,
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                exclusiveMinimum: 0,
                maximum: 9007199254740991,
                description: "The Grist row ID to update.",
              },
              fields: {
                type: "object",
                propertyNames: {
                  type: "string",
                },
                additionalProperties: {},
                description: "Column IDs mapped to the updated cell values.",
              },
            },
            required: ["id", "fields"],
            additionalProperties: false,
            description: "A record update for an existing Grist row.",
          },
          description: "Records to update in the target table.",
        },
      },
      required: ["records"],
      additionalProperties: false,
    },
    outputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        ok: {
          type: "boolean",
          description: "Whether the Grist update request completed successfully.",
        },
        updatedCount: {
          type: "integer",
          minimum: -9007199254740991,
          maximum: 9007199254740991,
          description: "Number of records included in the update request.",
        },
      },
      required: ["ok", "updatedCount"],
      additionalProperties: false,
      description: "Local acknowledgement for a successful Grist record update.",
    },
  },
  {
    name: "delete_records",
    description: "Delete one or more records from a Grist table by row ID.",
    requiredScopes: [],
    providerPermissions: [],
    inputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        docId: {
          type: "string",
          minLength: 1,
          description: "The Grist document identifier.",
        },
        tableId: {
          type: "string",
          minLength: 1,
          description: "The Grist table identifier.",
        },
        rowIds: {
          minItems: 1,
          type: "array",
          items: {
            type: "integer",
            exclusiveMinimum: 0,
            maximum: 9007199254740991,
          },
          description: "Row IDs to delete from the target table.",
        },
      },
      additionalProperties: false,
    },
    outputSchema: {
      $schema: "https://json-schema.org/draft/2020-12/schema",
      type: "object",
      properties: {
        ok: {
          type: "boolean",
          description: "Whether the Grist delete request completed successfully.",
        },
        deletedRowIds: {
          type: "array",
          items: {
            type: "integer",
            minimum: -9007199254740991,
            maximum: 9007199254740991,
          },
          description: "Row IDs that were requested for deletion.",
        },
      },
      required: ["ok", "deletedRowIds"],
      additionalProperties: false,
      description: "Local acknowledgement for a successful Grist record deletion.",
    },
  },
];
