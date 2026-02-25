export interface Movie {
    title: string;
    year?: string;
    description?: string;
    thumbnailUrls: string[];
    availableLinks: {
        label: string;
        url: string;
    }[];
}

export interface SearchResult {
    title: string;
    thumbnail?: string;
    url: string;
}
