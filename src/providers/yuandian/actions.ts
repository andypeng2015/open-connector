import type { ProviderActionDefinition } from "../../core/provider-definition.ts";

import { s } from "../../core/json-schema.ts";
import { defineProviderAction } from "../../core/provider-definition.ts";

const service = "yuandian";

const rawPayloadSchema = s.looseObject("The raw Yuan Dian response payload.");
const resultItemSchema = s.looseObject("A single Yuan Dian result item as returned by the API.");
const resultListSchema = s.array("The normalized Yuan Dian result list.", resultItemSchema);
const requestSchema = s.looseObject(
  "Yuan Dian action input. Field names follow the provider-specific action contract.",
);
const detailOutputSchema = s.object("A normalized Yuan Dian detail response with the raw upstream payload preserved.", {
  code: s.integer("The Yuan Dian business response code."),
  status: s.nullableString("The Yuan Dian response status when returned."),
  message: s.nullableString("The Yuan Dian response message when returned."),
  data: s.unknown("The Yuan Dian response data field."),
  raw: rawPayloadSchema,
});
const envelopeOutputSchema = s.object("A normalized Yuan Dian list response with the raw upstream payload preserved.", {
  code: s.integer("The Yuan Dian business response code."),
  status: s.nullableString("The Yuan Dian response status when returned."),
  message: s.nullableString("The Yuan Dian response message when returned."),
  results: resultListSchema,
  raw: rawPayloadSchema,
});
const caseSearchOutputSchema = s.object("A normalized Yuan Dian case search response.", {
  code: s.integer("The Yuan Dian business response code."),
  status: s.nullableString("The Yuan Dian response status when returned."),
  message: s.nullableString("The Yuan Dian response message when returned."),
  total: s.unknown("The upstream total hit count or hit-count object."),
  results: resultListSchema,
  raw: rawPayloadSchema,
});
const enterprisePageOutputSchema = s.object("A normalized Yuan Dian enterprise page response.", {
  code: s.integer("The Yuan Dian business response code."),
  status: s.nullableString("The Yuan Dian response status when returned."),
  message: s.nullableString("The Yuan Dian response message when returned."),
  total: s.unknown("The upstream total record count when returned."),
  pageNo: s.unknown("The upstream page number when returned."),
  pageSize: s.unknown("The upstream page size when returned."),
  results: resultListSchema,
  raw: rawPayloadSchema,
});
const semanticSearchOutputSchema = s.object("A normalized Yuan Dian semantic search response.", {
  code: s.integer("The Yuan Dian business response code."),
  message: s.nullableString("The Yuan Dian response message when returned."),
  results: resultListSchema,
  raw: rawPayloadSchema,
});
const hallucinationOutputSchema = s.object("A normalized Yuan Dian legal hallucination check response.", {
  regulations: resultListSchema,
  cases: resultListSchema,
  highlightedText: s.nullableString("HTML text with Yuan Dian highlight spans for detected legal references."),
  semanticCompareError: s.nullableString("Semantic comparison error text when Yuan Dian returned one."),
  chatModel: s.nullableString("The server-side chat model used by Yuan Dian."),
  requestId: s.nullableString("The Yuan Dian request identifier for this check."),
  raw: rawPayloadSchema,
});

export type YuandianActionName =
  | "search_regulations"
  | "search_clauses"
  | "get_regulation_detail"
  | "get_clause_detail"
  | "semantic_search_regulations"
  | "search_ordinary_cases"
  | "search_authoritative_cases"
  | "get_case_details"
  | "semantic_search_cases"
  | "search_enterprises"
  | "search_enterprise_profiles"
  | "get_enterprise_detail"
  | "get_enterprise_base_info"
  | "get_enterprise_aggregation_summary"
  | "get_enterprise_litigation_statistics"
  | "list_enterprise_writs"
  | "list_enterprise_execution_risks"
  | "list_enterprise_court_notices"
  | "list_enterprise_compliance_records"
  | "list_enterprise_business_records"
  | "list_enterprise_ip_assets"
  | "get_enterprise_annual_report"
  | "check_legal_hallucinations";

const actions: Array<{
  name: YuandianActionName;
  description: string;
  outputSchema: ReturnType<typeof s.object>;
}> = [
  {
    name: "search_regulations",
    description: "Search Yuan Dian regulations by keyword, name, validity, region, effect level, authority, and dates.",
    outputSchema: envelopeOutputSchema,
  },
  {
    name: "search_clauses",
    description: "Search Yuan Dian statutory clauses by keyword and legal filters.",
    outputSchema: envelopeOutputSchema,
  },
  {
    name: "get_regulation_detail",
    description: "Retrieve detail for one Yuan Dian regulation.",
    outputSchema: detailOutputSchema,
  },
  {
    name: "get_clause_detail",
    description: "Retrieve detail for one Yuan Dian statutory clause.",
    outputSchema: detailOutputSchema,
  },
  {
    name: "semantic_search_regulations",
    description: "Run semantic search across Yuan Dian statutory clauses.",
    outputSchema: semanticSearchOutputSchema,
  },
  {
    name: "search_ordinary_cases",
    description: "Search ordinary Yuan Dian cases.",
    outputSchema: caseSearchOutputSchema,
  },
  {
    name: "search_authoritative_cases",
    description: "Search authoritative Yuan Dian cases.",
    outputSchema: caseSearchOutputSchema,
  },
  {
    name: "get_case_details",
    description: "Retrieve Yuan Dian case details by case ID or case number.",
    outputSchema: detailOutputSchema,
  },
  {
    name: "semantic_search_cases",
    description: "Run semantic search across Yuan Dian cases.",
    outputSchema: semanticSearchOutputSchema,
  },
  {
    name: "search_enterprises",
    description: "Search Yuan Dian enterprises by name.",
    outputSchema: envelopeOutputSchema,
  },
  {
    name: "search_enterprise_profiles",
    description: "Search Yuan Dian enterprise profile candidates by name.",
    outputSchema: envelopeOutputSchema,
  },
  {
    name: "get_enterprise_detail",
    description: "Retrieve one Yuan Dian enterprise detail.",
    outputSchema: detailOutputSchema,
  },
  {
    name: "get_enterprise_base_info",
    description: "Retrieve one Yuan Dian enterprise base information record.",
    outputSchema: detailOutputSchema,
  },
  {
    name: "get_enterprise_aggregation_summary",
    description: "Retrieve Yuan Dian enterprise aggregation summary.",
    outputSchema: detailOutputSchema,
  },
  {
    name: "get_enterprise_litigation_statistics",
    description: "Retrieve Yuan Dian enterprise litigation statistics.",
    outputSchema: detailOutputSchema,
  },
  {
    name: "list_enterprise_writs",
    description: "List Yuan Dian enterprise writs.",
    outputSchema: enterprisePageOutputSchema,
  },
  {
    name: "list_enterprise_execution_risks",
    description: "List Yuan Dian enterprise execution risk records.",
    outputSchema: enterprisePageOutputSchema,
  },
  {
    name: "list_enterprise_court_notices",
    description: "List Yuan Dian enterprise court notices.",
    outputSchema: enterprisePageOutputSchema,
  },
  {
    name: "list_enterprise_compliance_records",
    description: "List Yuan Dian enterprise compliance records.",
    outputSchema: enterprisePageOutputSchema,
  },
  {
    name: "list_enterprise_business_records",
    description: "List Yuan Dian enterprise business records.",
    outputSchema: enterprisePageOutputSchema,
  },
  {
    name: "list_enterprise_ip_assets",
    description: "List Yuan Dian enterprise intellectual property assets.",
    outputSchema: enterprisePageOutputSchema,
  },
  {
    name: "get_enterprise_annual_report",
    description: "Retrieve one Yuan Dian enterprise annual report.",
    outputSchema: detailOutputSchema,
  },
  {
    name: "check_legal_hallucinations",
    description: "Check legal citations in text for Yuan Dian-detected hallucinations.",
    outputSchema: hallucinationOutputSchema,
  },
];

export const yuandianActions: ProviderActionDefinition<YuandianActionName>[] = actions.map((action) =>
  defineProviderAction(service, {
    ...action,
    inputSchema: requestSchema,
  }),
);
