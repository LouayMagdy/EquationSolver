import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  lUOptions: Array<string> = ["Doolittle", "Crout", "Cholesky"]
  constructor() { }

  ngOnInit(): void {
  }

  clickLU(){
    let LUMenu = document.getElementById("chooseLU");
    if(LUMenu!.style.display == "block") LUMenu!.style.display = "none";
    else LUMenu!.style.display = "block";
  }
  clickGaussJordan(){
    ////
    let home = document.getElementById('home');
    home!.style.display='none';
    let gauss = document.getElementById('gaussJordanMethod');
    gauss!.style.display='flex';
    let LUMenu = document.getElementById("chooseLU");
    LUMenu!.style.display = "none";
  }
  clickGauss(){
    ////
    let home = document.getElementById('home');
    home!.style.display='none';
    let gauss = document.getElementById('gaussMethod');
    gauss!.style.display='flex';
    let LUMenu = document.getElementById("chooseLU");
    LUMenu!.style.display = "none";
  }

  clickIterative(){
    ////
    let home = document.getElementById('home');
    home!.style.display='none';
    // let gauss = document.getElementById('jacobi');
    // gauss!.style.display='flex';
    let iterative = document.getElementById('iterative-methods')
    iterative!.style.display='flex'
  }


  chooseLU(type : string){
    let home = document.getElementById('home');
    home!.style.display='none';

    if(type == 'Doolittle'){
      let LU = document.getElementById('doolittle');
      LU!.style.display='flex';
    }
    else if(type == 'Crout'){
      ////////////////////
      let LU = document.getElementById('crout');
      LU!.style.display='flex';
    }
    else if(type == "Cholesky"){
      //////////////////
      let LU = document.getElementById('cholesky');
      LU!.style.display='flex';
    }
  }

}
