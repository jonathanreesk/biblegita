// Whether reader questions can be delivered (see app/api/question/route.ts).
export const askConfigured = () =>
  !!(process.env.QUESTIONS_FORMSPREE_ID || (process.env.RESEND_API_KEY && process.env.QUESTIONS_EMAIL_TO));
