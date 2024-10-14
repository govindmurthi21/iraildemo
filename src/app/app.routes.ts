import { Routes } from '@angular/router';
import { IraildemoComponent } from './iraildemo/iraildemo.component';
import { HomeComponent } from './home/home.component';
import { Iraildemo2Component } from './iraildemo2/iraildemo2.component';

export const routes: Routes = [
    {path: 'demo', component: IraildemoComponent},
    {path: 'demo2', component: Iraildemo2Component},
    {path: '', component: HomeComponent}
];
