import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-mannual',
  templateUrl: './user-mannual.component.html',
  styleUrls: ['./user-mannual.component.scss']
})
export class UserMannualComponent implements OnInit {
  pdfSrc = "assets/file/RiskCounts%20RCM%20User%20Guide%202.pdf"
  constructor() { }

  ngOnInit() {
  }

}
