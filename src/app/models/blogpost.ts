export class BlogPostGroup {
    key: string;
    items: BlogPost[];
}

export class BlogPost {
    ID: number;
    Subject: string;
    Preview: string;
    Body?: string;
    Created: Date;
    UserID?: number;
    Username: string;
    HighPriority?: boolean;
    HasAttachments?: boolean;
    Seen?: boolean;
    Published?: boolean;
}
