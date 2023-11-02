import { Pipe, PipeTransform } from "@angular/core";

import { Item } from "../search/search-item.model";

@Pipe({
    name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
    transform(
        searchItems: Item[],
        sortType: string,
        isAcs: boolean,
        isSort: boolean
    ): Item[] {
        if (!isSort) {
            return searchItems;
        }
        switch (sortType) {
            case "date": {
                return searchItems.sort((a, b) => {
                    if (isAcs) {
                        return (
                            +new Date(a.snippet.publishedAt) -
                            +new Date(b.snippet.publishedAt)
                        );
                    }
                    return (
                        +new Date(b.snippet.publishedAt) -
                        +new Date(a.snippet.publishedAt)
                    );
                });
            }
            case "viewCount": {
                return searchItems.sort((a, b) => {
                    if (isAcs) {
                        return (
                            +a.statistics.viewCount - +b.statistics.viewCount
                        );
                    }
                    return +b.statistics.viewCount - +a.statistics.viewCount;
                });
            }
            default:
                return searchItems;
        }
    }
}
