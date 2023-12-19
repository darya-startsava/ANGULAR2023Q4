import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { onlyLettersDigitsSpacesNameValidator } from '../../directives/only-letters-digits-spaces-name.directive';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../redux/state.models';
import { createGroupLoading } from '../../../redux/actions/groups.actions';

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
        console.log(this.nameInput.value);
        this.store.dispatch(
            createGroupLoading({ name: this.nameInput.value || '' })
        );
        //  this.dialogRef.close();
    }
}
