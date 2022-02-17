import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Employee } from '../employee/employee.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:any;
  data:any;
  employee = new Employee();
  selectedHobby:any = [];
  countryArr:any = '';
  stateArr:any = '';
  cityArr:any = '';
     hobbyArr = [
    {
       "key":"cricket",
       "value":"cricket"
    },
    {
       "key":"chesh",
       "value":"chesh"
    },
     {
       "key":"game",
       "value":"game"
    }
  ]

  constructor( private route:ActivatedRoute,
               private dataService:DataService
          ) { }

  ngOnInit(): void {


    this.id = this.route.snapshot.params['id'];
    this.getData();
    this.getCountry();

  }
  getData()
  {
    this.dataService.getEmployeeData(this.id).subscribe(res=>{
    this.data = res;
    this.employee=this.data;
    console.log(this.employee.country);
    if(this.employee.country)
    {
      this.getState(this.employee.country);
    }

    if(this.employee.state)
    {
      this.getCity(this.employee.state);
    }
   
    this.selectedHobby = this.employee.hobby.split(','); // convert string to array for selected
  })
  }

  updateData()
  {
     this.data.hobby = this.selectedHobby.toString();  // array convert in string and pass string for update
     this.dataService.updateDataService(this.id,this.data).subscribe(res=> {

      
     })
  }

    selecthobby(event:any)
  {
    let index = this.selectedHobby.indexOf(event.target.value); // checked duplicate value
    if(index == -1)
     {
       this.selectedHobby.push(event.target.value); // push value in blank array 
     } 
     else
     {
      this.selectedHobby.splice(index,1); // remove same value in array
     }
   
  }

  getCountry()
  {
    this.dataService.getCountryService().subscribe(res=> {
      this.countryArr = res;
      
    })
  }

  getState(event:any)
  {
    var obj = {
      "country_id":event.target.value
    }

    this.dataService.getStateService(obj).subscribe(res=> {

   this.stateArr = res;
    })
  }

  getCity(event:any)
  {
    var objcity = {
      "state_id":event.target.value
    }
    this.dataService.getCityService(objcity).subscribe(res=>{
     this.cityArr = res;

    })
  }

  

}
