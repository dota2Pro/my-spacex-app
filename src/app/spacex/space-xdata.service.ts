import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FilterObject, RootObject} from './spacex.component';

@Injectable({
  providedIn: 'root'
})
export class SpaceXdataService {

  constructor(private http: HttpClient) {
  }

  getSpaceXData(filterObj: FilterObject) {

    let url = 'https://api.spacexdata.com/v3/launches?limit=100';

    if (filterObj.year) {
      url += `&launch_year=${filterObj.year}`;
    }

    if (filterObj.landing) {
      url += `land_success=true`;
    }

    if (filterObj.launch) {
      url += `&launch_success=true`;
    }

    return this.http.get<RootObject[]>(url);
  }
}
