import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-spacing
import { NgForm }   from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import { MedicineService } from '../../../shared/medicine.service';
import { Medicine} from '../../../shared/medicine.model';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {


  issuedMedicine = [];
  constructor(private medicineService: MedicineService){}

  ngOnInit(){
    this.resetForm();
    this.refreshMedicineList();
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
   
  onSubmit(med, _id){
    /** this.medicineService.postMedicine(form.value).subscribe(res => {
      this.resetForm(form);
      //M.toast({html: 'Saved successfully', classes: 'rounded'});
    });*/
    //console.log("MEDICIEN",med);
    this.medicineService.issueMedicine(_id,this.medicineService.selectedMedicine.qty).subscribe(res => {
      console.log("MEDICINE LOL", this.medicineService.selectedMedicine);
      this.issuedMedicine.push(this.medicineService.selectedMedicine);
    this.refreshMedicineList();
    this.resetForm();

    });
    
  }

  refreshMedicineList(){
    this.medicineService.getMedicineList().subscribe((res) => {
      this.medicineService.medi = res as Medicine[];
    });
  }


  total(){
    var tot=0;
    for(var i=0;i<this.issuedMedicine.length;i++){
       tot+= (this.issuedMedicine[i].price)*(this.issuedMedicine[i].qty);
    }
    return tot;

  }

}


