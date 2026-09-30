// server/src/email/EmailTemplates.ts


export function buildVerificationEmail(email: string, token: string) {
  const verifyUrl = `${process.env.APP_BASE_URL}/verify?token=${encodeURIComponent(token)}`;
  return {
    subject: "Verify your account",
    text: `Hi ${email},\n\nPlease verify your account by visiting: ${verifyUrl}\n\nThanks!`,
    html: `<p>Hi ${email},</p><p>Please verify your account by clicking <a href="${verifyUrl}">this link</a>.</p>`,
  };
}

export function buildPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.APP_BASE_URL}/reset-password?token=${encodeURIComponent(token)}`;
  return {
    subject: "Reset your password",
    text: `Hi ${email},\n\nReset your password here: ${resetUrl}\n\nIf you didn't request this, ignore this email.`,
    html: `<p>Hi ${email},</p><p>Reset your password by clicking <a href="${resetUrl}">this link</a>.</p>`,
  };
}
