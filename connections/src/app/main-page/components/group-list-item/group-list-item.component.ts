import { Component, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { selectDeleteGroupStatus } from '../../../redux/selectors/groups.selector';
import {
    AppState,
    GroupsDataState,
    StatusState
} from '../../../redux/state.models';
import { DeleteGroupDialogComponent } from '../delete-group-dialog/delete-group-dialog.component';

@Component({
    selector: 'app-group-list-item',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, RouterModule],
    templateUrl: './group-list-item.component.html',
    styleUrl: './group-list-item.component.scss'
})
export class GroupListItemComponent implements OnDestroy {
    @Input() group!: GroupsDataState;
    private dialogRef: MatDialogRef<DeleteGroupDialogComponent> | undefined;
    public deleteGroupStatus$: Observable<StatusState>;
    subscription: Subscription;

    constructor(
        public dialog: MatDialog,
        private store: Store<AppState>
    ) {
        this.deleteGroupStatus$ = store.select(selectDeleteGroupStatus);
        this.subscription = this.deleteGroupStatus$.subscribe((status) => {
            if (status === StatusState.Success) {
                this.dialogRef?.close();
            }
        });
    }

    openDialog(): void {
        this.dialogRef = this.dialog.open(DeleteGroupDialogComponent, {
            data: { id: this.group.id }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    get uid(): string | null {
        return localStorage.getItem('uid');
    }
}
