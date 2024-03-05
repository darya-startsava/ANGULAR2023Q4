import { Pipe, PipeTransform } from '@angular/core';

import { PeopleDataState } from '../../redux/state.models';

@Pipe({
    name: 'deleteUser',
    standalone: true
})
export class DeleteUserPipe implements PipeTransform {
    transform(
        peopleItems: PeopleDataState[] | null | undefined
    ): PeopleDataState[] | null | undefined {
        if (!peopleItems) {
            return peopleItems;
        }
        return peopleItems.filter(
            (item) => item.uid !== localStorage.getItem('uid')
        );
    }
}
