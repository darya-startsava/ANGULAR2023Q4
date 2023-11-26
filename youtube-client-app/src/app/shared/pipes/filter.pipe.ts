import { Pipe, PipeTransform } from "@angular/core";

import { Item } from "../../youtube/models/search-item.model";

@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {
    transform(searchItems: Item[], wordForFilterBy: string): Item[] {
        if (!wordForFilterBy) {
            return searchItems;
        }
        return searchItems.filter((item) =>
            item.snippet.title.toLowerCase().match(wordForFilterBy.toLowerCase())
        );
    }
}
