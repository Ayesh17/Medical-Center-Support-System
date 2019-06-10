import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DocterComponent } from './users/docter/docter.component';
import { LoginComponent, LoginDialog, SignupDialog} from './login/login.component';
import { SliderpanelComponent } from './component/sliderpanel/sliderpanel.component';
import { PatientComponent } from './users/patient/patient.component';
import { PharmacistComponent } from './users/pharmacist/pharmacist.component';
import { IssueMedicineComponent } from './users/pharmacist/issue-medicine/issue-medicine.component';
import { IssueMedicineOutsidersComponent } from './users/pharmacist/issue-medicine-outsiders/issue-medicine-outsiders.component'
import { PatientRecordComponent} from './users/pharmacist/patient-record/patient-record.component';
import { RestockMedicineComponent } from './users/pharmacist/restock-medicine/restock-medicine.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth.guard';
import { AdminComponent } from './users/admin/admin.component';
import { MedicineComponent } from './users/admin/medicine/medicine.component';
import { AddMedicineComponent } from './users/admin/add-medicine/add-medicine.component';
import { UpdateMedicineComponent } from './users/admin/update-medicine/update-medicine.component';
import { BillComponent } from './users/pharmacist/bill/bill.component';
import { MedicineListComponent } from './users/pharmacist/medicine-list/medicine-list.component';
import { AboutUsComponent } from './component/footer/about-us/about-us.component';
import { ContactUsComponent } from './component/footer/contact-us/contact-us.component';


const routes: Routes = [
{ path: '', component: SliderpanelComponent},


{ path:'doctor',component:DocterComponent},
{ path:'patient',component:PatientComponent},
{ path:'pha',component:PharmacistComponent},
{ path: 'admin' , component:AdminComponent},
{ path: 'med' , component:MedicineComponent},
{ path: 'addMed' , component:AddMedicineComponent},
{ path: 'updateMed/:_id' , component:UpdateMedicineComponent},
{ path: 'pharmacist' , component:PharmacistComponent},
{ path: 'issueMed/:_id' , component:IssueMedicineComponent},
{ path: 'issueMedOutsiders' , component:IssueMedicineOutsidersComponent},
{ path: 'medList' , component:MedicineListComponent},
{ path: 'prescription' , component:IssueMedicineComponent},
{ path: 'records' , component:PatientRecordComponent},
{ path: 'restock' , component:RestockMedicineComponent},
{ path: 'bill' , component:BillComponent },
{ path: 'about-us' , component:AboutUsComponent },
{ path: 'contact-us' , component:ContactUsComponent},
{path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {

}
