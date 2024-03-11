import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';

// Modules
import { IconModule } from './icons/icon.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { ButtonComponent } from './components/button/button.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LocationComponent } from './pages/location/location.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ZoneSelectComponent } from './components/zone-select/zone-select.component';
import { AddVolunteerComponent } from './pages/add-volunteer/add-volunteer.component';
import { CardWorkdayComponent } from './components/card-workday/card-workday.component';
import { CardLocationComponent } from './components/card-location/card-location.component';
import { StateSelectedComponent } from './components/state-selected/state-selected.component';
import { FormSearchVolunteerComponent } from './components/form-search-volunteer/form-search-volunteer.component';

@NgModule({
  declarations: [
    // Pages
    AppComponent,
    LoginComponent,
    UsersComponent,
    LocationComponent,
    DashboardComponent,
    AddVolunteerComponent,

    // Components
    ButtonComponent,
    LoaderComponent,
    SidebarComponent,
    ZoneSelectComponent,
    CardWorkdayComponent,
    CardLocationComponent,
    StateSelectedComponent,
    FormSearchVolunteerComponent
  ],
  imports: [
    IconModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // Angular Material
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
