import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Employee } from './employee.model';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  dataArr:any;
  directoryPath:any = 'http://127.0.0.1:8000/image/';
  countryArr:any;
  stateArr:any;
  cityArr:any;
  files:any;
  employee = new Employee();
  selectedHobby:any = [];
  page:any = 1;
  limit:any = 5;
  skip:any;
  totalCount:any;
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

  constructor(
   private dataService:DataService,
   private spinner: NgxSpinnerService
    ) { }

  ngOnInit(): void {
    
    this.getEmployeeData();
    this.getCountry();
  }

  getEmployeeData()
  {  
    this.spinner.show();

    if(this.page == 1)
    {
       this.skip = 0;
    } else
    {
      this.skip = (this.page-1)*this.limit;
    }

    var requestObj = {
      'limit':this.limit,
      'skip' : this.skip
    }
   // console.log(requestObj);
    this.dataService.getData(requestObj).subscribe((res:any)=>{
    this.spinner.hide();
     this.dataArr=res.data;
     this.totalCount=res.totalCount;
    })
  }

  insertData()
  {
     let formdata = new FormData();
     this.employee.hobby = this.selectedHobby.toString();
     formdata.append("file",this.files,this.files.name);
     formdata.append("data",JSON.stringify(this.employee));
     
    
   
     this.dataService.insertData(formdata).subscribe(res=>{

     this.getEmployeeData();
    })
  }

  deleteData(id:any)
  {
    this.dataService.deleteData(id).subscribe(res=>{

     this.getEmployeeData();
    })
  }

  selecthobby(event:any)
  {

    let index = this.selectedHobby.indexOf(event.target.value);
    if(index == -1)
     {
       this.selectedHobby.push(event.target.value);
     } 
     else
     {
      this.selectedHobby.splice(index,1);
     }

     console.log(this.selectedHobby);
   
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

  uploadFile(event:any)
  {
   this.files = event.target.files[0];
  }

}
