import {Component, OnInit} from '@angular/core';
import {SpaceXdataService} from './space-xdata.service';


export interface Core {
  land_success?: boolean;
}

export interface FirstStage {
  cores: Core[];
}

export interface Rocket {
  first_stage: FirstStage;
}

export interface Links {
  mission_patch_small: string;
}

export interface RootObject {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  launch_year: string;
  launch_success: boolean;
  rocket: Rocket;
  links: Links;
  launch_landing?: boolean;
}

export interface FilterObject {
  year?: number;
  launch?: boolean;
  landing?: boolean;
}


@Component({
  selector: 'app-spacex',
  templateUrl: './spacex.component.html',
  styleUrls: ['./spacex.component.scss']
})
export class SpacexComponent implements OnInit {

  launches: RootObject[];
  filterObj: FilterObject;

  col1Years = [2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020];
  col2Years = [2007, 2009, 2011, 2013, 2015, 2017, 2019];

  constructor(private spaceXSvc: SpaceXdataService) {
  }

  ngOnInit(): void {

    this.filterObj = {
      year: 2006,
      launch: false,
      landing: false
    };

    this.fetchData();

  }

  fetchData(): void {
    this.spaceXSvc.getSpaceXData(this.filterObj).subscribe((result: RootObject[]) => {
      this.launches = [...result];
      this.launches.forEach((launch: RootObject) => {
        let landing = false;
        launch.rocket.first_stage.cores.forEach((core: Core) => {
          landing = core.land_success;
        });
        launch.launch_landing = landing;
      });
    });
  }

}
