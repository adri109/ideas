export type EmailClassification =
  | "ACTION_REQUIRED"
  | "MEETING"
  | "FYI"
  | "NEWSLETTER"
  | "SPAM"
  | "UNKNOWN";

export interface NormalizedEmail {
  source: "gmail";
  messageId: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  receivedAt: string;
  bodyText: string;
  labels: string[];
  gmailLink: string;
}

export interface CursorWebhookPayload {
  source: "gmail-inbox-agent";
  triggeredAt: string;
  email: NormalizedEmail;
}

export interface PubSubPushMessage {
  message?: {
    data?: string;
    messageId?: string;
    publishTime?: string;
  };
  subscription?: string;
}

export interface GmailPushNotification {
  emailAddress: string;
  historyId: string;
}
