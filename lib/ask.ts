// Where reader questions are delivered (see app/api/question/route.ts).
// The Formspree form id is public (it appears in any form's address), so it lives here;
// QUESTIONS_FORMSPREE_ID in the hosting environment overrides it.
export const FORMSPREE_ID = process.env.QUESTIONS_FORMSPREE_ID || "xbgggejp";

export const askConfigured = () => !!(FORMSPREE_ID || (process.env.RESEND_API_KEY && process.env.QUESTIONS_EMAIL_TO));
