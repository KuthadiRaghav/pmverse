import { CASE_RETENTION_CLIFF } from './caseRetentionCliff';
import { CASE_HALLUCINATING_COPILOT } from './caseHallucinatingCopilot';
import { CASE_RUNAWAY_REORDER } from './caseMeridianProcurement';
import { CASE_PRICING_PIVOT } from './casePricingPivot';
import { CASE_THE_SUNSET } from './caseTheSunset';

// Ordered list of playable cases. Adding a case = adding a data file + one line.
export const CASE_LIST = [CASE_RETENTION_CLIFF, CASE_HALLUCINATING_COPILOT, CASE_RUNAWAY_REORDER, CASE_PRICING_PIVOT, CASE_THE_SUNSET];

export const CASES = Object.fromEntries(CASE_LIST.map((c) => [c.meta.id, c]));

export const DEFAULT_CASE_ID = CASE_LIST[0].meta.id;
