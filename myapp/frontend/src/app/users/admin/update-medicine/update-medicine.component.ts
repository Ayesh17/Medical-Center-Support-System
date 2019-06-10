import { Component, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { MedicineService } from '../../../shared/medicine.service';
import { Medicine} from '../../../shared/medicine.model';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';


declare var M: any;
@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.css']
})
export class UpdateMedicineComponent implements OnInit {

  constructor(private medicineService: MedicineService, private route:ActivatedRoute, private router: Router){
  
  }

  _id = "";

  ngOnInit(){
    this.resetForm();
    //this.refreshMedicineList();
    this._id = this.route.snapshot.params['_id'];
    this.medicineService.getMedicineByID(this._id).subscribe((res:any) => {
    this.medicineService.selectedMedicine = {
      name:res.name,
      notes:res.notes,
      type:res.type,
      dose:res.dose,
      unit:res.unit,
      price:res.price,
      qty:res.qty
      }
    });

    //this.m=this.;

  }

  resetForm(form?:NgForm){
    if(form)
      form.reset();
    this.medicineService.selectedMedicine = {
      name:"",
      notes:"",
      type:"",
      dose:null,
      unit:"",
      price:null,
      qty:null
    }
    
  }
   
  onSubmit(form : NgForm){
    /** this.medicineService.postMedicine(form.value).subscribe(res => {
      this.resetForm(form);
      //M.toast({html: 'Saved successfully', classes: 'rounded'});
    });*/ 
    this.medicineService.editMedicine({...form.value, _id:this._id}).subscribe(res => {
      if(confirm('Successfully updated.Do you want to go back?')==true){
        this.router.navigate(['/admin']);
      
      }
    //this.resetForm();
    });
  }

  refreshMedicineList(){
    this.medicineService.getMedicineList().subscribe((res) => {
      this.medicineService.medi = res as Medicine[];
    });
  }

  onEdit(med : Medicine){
    console.log("edit works");
    this.medicineService.selectedMedicine = med;
  }

  onDelete(_id:string, form:NgForm){
    console.log("delete works");
    if(confirm('Are you sure to delete this record?')==true){
      this.medicineService.deleteMedicine(_id).subscribe((res) => {
      this.refreshMedicineList();
      this.resetForm(form);
      });
    }
  }

}


