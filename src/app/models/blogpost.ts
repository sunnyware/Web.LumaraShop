export class BlogPostGroup {
  key: string;
  items: BlogPost[];
}

export class BlogPost {
  ID: number;
  Subject: string;
  Preview: string;
  Body?: string;
  TimeCreated: Date;
  UserID?: number;
  Username: string;
  HighPriority?: boolean;
  HasAttachments?: boolean;
  Seen?: boolean;
  Published?: boolean;
}

export class BlogPostListItem {
  ID: number;
  Preview: string;
  TimeCreated: Date;
  Username: string;
  HighPriority: boolean;
  HasAttachments: boolean;
  Seen: boolean;
  Published: boolean;
  IsComplete: boolean;
  Attachments?: BlogPostAttachment[];
}

export class BlogPostAttachment {
  Filename: string;
  FileSize: string;
  FileExtension: string;
  FileID: string;
}
