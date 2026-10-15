/**
 * @summary Technology topics supported for repository searches.
 * @author Roberto Gonzales Ayala
 */
export const SUPPORTED_TOPICS = ['angular', 'typescript', 'node', 'react'] as const;

/** A supported technology topic. */
export type Topic = (typeof SUPPORTED_TOPICS)[number];
