import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pageName;
  constructor( private activatedRoute : ActivatedRoute ) { }

  async ngOnInit() {
    this.pageName = await this.activatedRoute.snapshot.params.name
    console.log(this.pageName)
  }

}
