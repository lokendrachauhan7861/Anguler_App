import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  header = new HttpHeaders({
    'token': '' + localStorage.getItem('token')  // pass token in header for authorization.
  })

  constructor(
   private httpClient:HttpClient
    ) { }

  getData(data:any)
  {
   return this.httpClient.post('http://127.0.0.1:8000/employee',data,{headers: this.header});
  }

  insertData(data:any)
  {
    return this.httpClient.post('http://127.0.0.1:8000/addEmployee',data);
  }

   deleteData(id:any)
  {
    return this.httpClient.delete('http://127.0.0.1:8000/deleteEmployee/'+id);
  }

  getEmployeeData(id:any)
  {
    return this.httpClient.get('http://127.0.0.1:8000/getEmployee/'+id);
  }

 updateDataService(id:any,data:any)
 {
    return this.httpClient.patch('http://127.0.0.1:8000/updateEmployee/'+id,data);
 }

 getCountryService()
 {
   return this.httpClient.get('http://127.0.0.1:8000/getCountry');
 }

 getStateService(data:any)
 {
  return this.httpClient.post('http://127.0.0.1:8000/getState',data);
 }

  getCityService(data:any)
 {
  return this.httpClient.post('http://127.0.0.1:8000/getCity',data);
 }

 createUser(data:any)
 {
  return this.httpClient.post('http://127.0.0.1:8000/createUser',data);
 }

 login(data:any)
 {
  return this.httpClient.post('http://127.0.0.1:8000/login',data);
 }

}
