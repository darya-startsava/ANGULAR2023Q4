export interface Source {
    [key: string]: CustomCard;
}

export interface CustomCard {
    title?: string;
    description?: string;
    image?: string;
    video?: string;
    date?: string;
    tags?: Array<string>;
}
