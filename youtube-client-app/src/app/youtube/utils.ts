export function getDateStatus(date: string): string {
    return Math.floor((+new Date() - +new Date(date)) / 86400000).toString();
}
