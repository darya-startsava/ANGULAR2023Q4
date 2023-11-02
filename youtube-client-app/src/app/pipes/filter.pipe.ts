import { Pipe, PipeTransform } from "@angular/core";

import { Item } from "../search/search-item.model";

@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {
    transform(
        searchItems: Item[],
        wordForFilterBy: string,
        isFilteredByWord: boolean
    ): Item[] {
        if (!wordForFilterBy || !isFilteredByWord) {
            return searchItems;
        }
        return searchItems.filter((i) =>
            i.snippet.title.toLowerCase().match(wordForFilterBy.toLowerCase())
        );
    }
}
