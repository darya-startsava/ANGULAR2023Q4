import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { deleteGroupLoading } from '../../../redux/actions/groups.actions';
import { AppState } from '../../../redux/state.models';

@Component({
    selector: 'app-delete-group-dialog',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './delete-group-dialog.component.html',
    styleUrl: './delete-group-dialog.component.scss'
})
export class DeleteGroupDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteGroupDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { id: string },
        public store: Store<AppState>
    ) {}
    deleteGroup() {
        this.store.dispatch(deleteGroupLoading({ id: this.data.id }));
    }

    cancel() {
        this.dialogRef.close();
    }
}
