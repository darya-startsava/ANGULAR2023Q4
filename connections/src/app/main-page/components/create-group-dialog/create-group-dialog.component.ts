import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { createGroupLoading } from '../../../redux/actions/groups.actions';
import { AppState } from '../../../redux/state.models';
import { onlyLettersDigitsSpacesNameValidator } from '../../directives/only-letters-digits-spaces-name.directive';

@Component({
    selector: 'app-create-group-dialog',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    templateUrl: './create-group-dialog.component.html',
    styleUrl: './create-group-dialog.component.scss'
})
export class CreateGroupDialogComponent {
    nameInput = new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
        onlyLettersDigitsSpacesNameValidator()
    ]);

    constructor(
        public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
        public store: Store<AppState>
    ) {}

    onCreateGroup() {
        this.store.dispatch(
            createGroupLoading({ name: this.nameInput.value || '' })
        );
    }
}
