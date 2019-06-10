import { Component, OnInit } from '@angular/core';

import 'rxjs/add/observable/of';
import { MatTableDataSource } from '@angular/material/table';
//import {MatTabsModule} from '@angular/material/tabs';
import { MedicineService } from '../../shared/medicine.service';
import { Medicine} from '../../shared/medicine.model';
////import { NgForm } from '@angular/forms';
import { PatientRecordsService } from 'src/app/shared/patientRecords/patient-records.service';
//import { MatInputModule } from '@angular/material';
import { from } from 'rxjs';
import { PatientRecordClass } from 'src/app/shared/patientRecords/patient-record-class.model';
//import {MatDialogModule} from '@angular/material/dialog';

import {UserService} from 'src/app/shared/user.service';

export class TabGroupDynamicHeightExample {}

// export interface PeriodicElement {
//   name:String;
//   age: number;
//   date: number;
//   description: string;
 
// }



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})


export class AdminComponent implements OnInit {
  // dataSource :any;
  public dataSource = new MatTableDataSource<PatientRecordClass>();
 
  constructor(private  patientRecordService:  PatientRecordsService, private userService: UserService) {}
  displayedColumns: string[] = ['name','date','age','description','actions'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  
 
   ngOnInit() {

    this.getPatientRecord();
    //  this.patientRecordService.getPatientRecordList().subscribe((result)=>{    
    //   this.dataSource  =  result.body;
      
  }

  // getPatientRecord(){
  //   this.patientRecordService.getPatientRecordList().subscribe((res)=>{
  //     this.dataSource.data = res as PatientRecordClass[];
  //   })
  //   //   this.dataSource = res;
  //   //   console.log(this.dataSource);
  //   // },error =>{
  //   //   console.log(error);

  //   // })

  // }

  getPatientRecord() {
    this.userService.getPatientDetails().subscribe((res) => {

      this.dataSource.data = res as PatientRecordClass[];
    });
  }



  deletePatientRecord(patientRecords: PatientRecordClass) {
    console.log(patientRecords);
    if (confirm('Are you sure to delete this record?') == true) {
      this.patientRecordService.deletePatientRecord(patientRecords).subscribe((res) => {
        this.getPatientRecord();
      });
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // onEdit(){
  //   this.dialog
  // }

}

export class CardOverviewExample {}

 
 


  export class MedicineComponent implements OnInit{
    constructor(private medicineService: MedicineService){}
  
    ngOnInit(){
     
      this.refreshMedicineList();
    }
  
    refreshMedicineList(){
      this.medicineService.getMedicineList().subscribe((res) => {
        this.medicineService.medi = res as Medicine[];
      })
    }
  
  }
  
  

