import { Pipe, PipeTransform } from "@angular/core";
import { VideoItem } from "src/app/redux/state.models";

@Pipe({
    name: "filter"
})
export class FilterPipe implements PipeTransform {
    transform(searchItems: VideoItem[], wordForFilterBy: string): VideoItem[] {
        if (!wordForFilterBy) {
            return searchItems;
        }
        return searchItems.filter((item) =>
            item.title.toLowerCase().match(wordForFilterBy.toLowerCase())
        );
    }
}
