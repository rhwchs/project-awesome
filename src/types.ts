export interface Link {
  id: string;
  url: string;
  name: string;
  color: string;
  requiresAccount: boolean;
  order: number;
}

export interface Suggestion {
  id: string;
  url: string;
  name: string;
  submitterName: string;
  description: string;
}

export interface WebsiteOfDay {
  linkId: string;
  date: string;
  isManualOverride: boolean;
}

export interface AdminMessage {
  text: string;
  color: string;
  isVisible: boolean;
}