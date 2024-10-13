import { Routes } from '@angular/router';
import { IraildemoComponent } from './iraildemo/iraildemo.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'demo', component: IraildemoComponent},
    {path: '', component: HomeComponent}
];
