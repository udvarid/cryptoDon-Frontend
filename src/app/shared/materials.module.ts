import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule,
  MatToolbarModule, MatMenuModule, MatDividerModule,
  MatTableModule, MatPaginatorModule, MatTooltipModule,
  MatInputModule, MatFormFieldModule, MatDialogModule,
  MatSnackBarModule, MatProgressSpinnerModule, MatProgressBarModule, MatSidenavModule, MatListModule
} from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSidenavModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSidenavModule
  ]
})
export class MaterialsModule { }
