import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm }   from '@angular/forms';
//import { FilterPipeModule } from 'ngx-filter-pipe';
import { FormGroup, FormControl } from '@angular/forms';

import { MedicineService } from '../../../shared/medicine.service';
import { Medicine} from '../../../shared/medicine.model';
import { MatTableDataSource } from '@angular/material/table';

declare var M: any;
@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css'],
  providers: [MedicineService]
})

export class MedicineListComponent implements OnInit {
  public dataSource = new MatTableDataSource< Medicine >();
 
    
  constructor(private medicineService: MedicineService){}
    displayedColumns: string[] = ['name','type','price','qty','dose','notes','actions'];
    hiddenColumns: string[] = ['_id','unit'];
  

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
   
  onSubmit(form : NgForm){
    /** this.medicineService.postMedicine(form.value).subscribe(res => {
      this.resetForm(form);
      //M.toast({html: 'Saved successfully', classes: 'rounded'});
    });*/
    this.medicineService.editMedicine(form.value).subscribe(res => {
      this.resetForm();
    });
  }

  refreshMedicineList(){
    this.medicineService.getMedicineList().subscribe((res) => {
      this.dataSource.data = res as Medicine[];
    });
  }


  onEdit(med : Medicine){
    console.log("edit works");
    this.medicineService.selectedMedicine = med;
  }

  /*onDelete(_id:string, form:NgForm){
    console.log("delete works");
    if(confirm('Are you sure to delete this record?')==true){
      this.medicineService.deleteMedicine(_id).subscribe((res) => {
      this.refreshMedicineList();
      this.resetForm(form);
      });
    }
  }
  */

  onDelete(elm) {
    if(confirm('Are you sure to delete this record?')==true){
      this.dataSource.data = this.dataSource.data.filter(i => i !== elm);
      this.medicineService.deleteMedicine(elm._id).subscribe((res)=>{
        this.refreshMedicineList();
      });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

}





