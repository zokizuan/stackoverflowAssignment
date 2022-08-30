export interface APIResponse {
  items: Results[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
  page: number;
  page_size: number;
  total: number;
}

export interface Results {
  tags: string[];
  owner: Owner;
  is_answered: boolean;
  view_count: number;
  up_vote_count: number;
  answer_count: number;
  score: number;
  last_activity_date: number;
  creation_date: number;
  question_id: number;
  link: string;
  title: string;
  body: string;
  accepted_answer_id?: number;
  last_edit_date?: number;
  closed_date?: number;
  closed_reason?: string;
  bounty_amount?: number;
  bounty_closes_date?: number;
}

export interface Owner {
  account_id: number;
  reputation: number;
  user_id: number;
  user_type: string;
  profile_image: string;
  display_name: string;
  link: string;
  accept_rate?: number;
}