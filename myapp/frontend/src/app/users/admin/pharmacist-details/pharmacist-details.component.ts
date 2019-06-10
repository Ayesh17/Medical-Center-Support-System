import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientRecordClass } from 'src/app/shared/patientRecords/patient-record-class.model';
import { PatientRecordsService } from 'src/app/shared/patientRecords/patient-records.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-pharmacist-details',
  templateUrl: './pharmacist-details.component.html',
  styleUrls: ['./pharmacist-details.component.css']
})

 
export class PharmacistDetailsComponent implements OnInit {

  // dataSource :any;
  public dataSource = new MatTableDataSource<PatientRecordClass>();
 
 
  constructor(private  patientRecordService:  PatientRecordsService, private userService: UserService) {}
  displayedColumns: string[] = ['name','date','age','actions'];
  
  
 
   ngOnInit() {

    this. getPharamasictRecord();
    
      
  }

  

  getPharamasictRecord() {
    this.userService.getPharmasictstDetails().subscribe((res) => {

      this.dataSource.data = res as PatientRecordClass[];
    });
  }



  // deletePatientRecord(patientRecords: PatientRecordClass) {
  //   console.log(patientRecords);
  //   if (confirm('Are you sure to delete this record?') == true) {
  //     this.patientRecordService.deletePatientRecord(patientRecords).subscribe((res) => {
  //       this.getPatientRecord();
  //     });
  //   }
  // }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // onEdit(){
  //   this.dialog
  // }

}

export class CardOverviewExample {}
