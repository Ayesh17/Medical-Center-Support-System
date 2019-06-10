import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { MedicineService } from '../../../shared/medicine.service';
import { Medicine } from '../../../shared/medicine.model';
import { PatientRecordsService } from 'src/app/shared/patientRecords/patient-records.service';
import { ActivatedRoute } from '@angular/router';

declare var M: any;
@Component({
  selector: 'app-issue-medicine',
  templateUrl: './issue-medicine.component.html',
  styleUrls: ['./issue-medicine.component.css'],
  providers: [MedicineService, PatientRecordsService]
})
export class IssueMedicineComponent implements OnInit {

  issuedMedicine = [];
  _id = "";
  name="";
  x;
  serach = "";
  blah: string = "dsfsdffsdfs";
  constructor(private medicineService: MedicineService, public patientRecordService: PatientRecordsService, public route: ActivatedRoute) { }


  ngOnInit() {
    this.resetForm();
    this.refreshMedicineList();
    this._id = this.route.snapshot.params['_id'];
    this.patientRecordService.getPatientRecordById(this._id).subscribe((res: any) => {
      this.x = {
        _id: res._id,
        id: res.id,
        name: res.name,
        age: res.age,
        cost: res.cost,
        description: res.description,
        date: res.date,
        medicenList1: res.medicenList[0],
        medicenList2: res.medicenList[1],
        medicenList3: res.medicenList[2],
        medicenList4: res.medicenList[3]
      }
      var docFee= this.x.cost;
      console.log("DFGHJ", docFee);
    });
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.medicineService.selectedMedicine = {
      name: "",
      notes: "",
      type: "",
      dose: null,
      unit: "",
      price: null,
      qty: null
    }

  }

  /** 
  onprint(){
    this.router.navigateByUrl('/bill', { med: issuedMedicine });

  }
  */

  onSubmit(med, _id) {
    /** this.medicineService.postMedicine(form.value).subscribe(res => {
      this.resetForm(form);
      //M.toast({html: 'Saved successfully', classes: 'rounded'});
                                                        });*/
    //console.log("MEDICIEN",med);
    this.medicineService.issueMedicine(_id, this.medicineService.selectedMedicine.qty).subscribe(
      res => {
        console.log("MEDICINE LOL", this.medicineService.selectedMedicine);
        console.log("RESS", res);
        this.issuedMedicine.push(this.medicineService.selectedMedicine);
        this.refreshMedicineList();
        this.resetForm();
      },
      error => {
        alert("QUANTITY IS NOT ENOUGH");
      }
    );

  }

  refreshMedicineList() {
    this.medicineService.getMedicineList().subscribe((res) => {
      this.medicineService.medi = res as Medicine[];
    });
  }

  onAdd(med: Medicine) {
    console.log("edit works");
    this.medicineService.selectedMedicine = med;

  }

  total() {
    var tot = 0;
    for (var i = 0; i < this.issuedMedicine.length; i++) {
      tot += (this.issuedMedicine[i].price) * (this.issuedMedicine[i].qty);
    }
    return tot;

  }

  fee(){
    this._id = this.route.snapshot.params['_id'];
    var tot=0;

      
  }

}


