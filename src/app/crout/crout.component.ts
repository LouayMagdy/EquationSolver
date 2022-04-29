import { Component, OnInit} from '@angular/core';
import {Hash} from "../hash";

@Component({
  selector: 'app-crout',
  templateUrl: './crout.component.html',
  styleUrls: ['./crout.component.css']
})
export class CroutComponent implements OnInit{

  augmented : any;
  coff : Array<Array<number>> = [];
  soln : Array<number> = [];
  l : Array<Array<number>> = [];
  u : Array<Array<number>> = [];
  y : Array<number> = [];
  x : Array<number> = [];
  ep: number = 5;
  msgX = "";
  msgY = "";
  noEqn = 0;
  noText = 0;
  eqnExp : any;
  nullArr: any;
  hash!:Hash;

  constructor() {
    this.hash = new Hash();
    this.hash.numberofUn=3;
  }

  ngOnInit() {

  }

  precisionSelector(e : any){
    // set precision ep
    if(!isNaN(Number((e.target as HTMLInputElement).value)) && Number((e.target as HTMLInputElement).value)!=0) {
      this.ep = Number((e.target as HTMLInputElement).value);
    }
    console.log("precision= " + this.ep);
  }

  numberEqnSelector(e : any){
    // get no of eqn from text box but submittion bt submit button in no Text varr
    this.noEqn = Number((e.target as HTMLInputElement).value);
    console.log("temp no eqn= " + this.noEqn);
  }

  getTextEqn(){
    // set no of eqn by submit button
    if(!isNaN(this.noEqn) && this.noEqn!=0) {
      this.noText = this.noEqn;
      this.hash.numberofUn=this.noText;
      // nullArr used in display arrays as empty array
      this.nullArr = new Array<number>(this.noText);
      this.eqnExp = new Array<string>(this.noText);
    }
    else this.noText=0;
    console.log("submitted number of eqn= " + this.noText);

  }
  setEqn(e:any , index:number){
    // setting eqn exp array
    this.eqnExp[index] = (e.target as HTMLInputElement).value;
    console.log("eqn exp= ");
    console.log("index= "+index);
    console.log("value= "+this.eqnExp[index]);
    //console.log((e.target as HTMLInputElement).value);

  }

  solve(){
    let s = document.getElementById("solveCrout");
    s!.style.visibility="hidden";
    let m = document.getElementById("main");
    m!.style.visibility="visible";
    let no = document.getElementById("subNumber");
    no!.style.visibility="hidden";
    this.u=[];
    this.l=[];
    this.y=[];
    this.x=[];
    this.soln=[];
    this.coff=[];
    // send array of eqn exp to be converted to augmented matrix by hash class
    this.hash.expressionEvaluate(this.eqnExp);
    this.augmented = this.hash.cofficient;
    // this.augmented=[[1,4,6],[4,-1,9]]
    console.log("eqn exp array= "+this.eqnExp);
    console.log("augmented matrix= "+this.augmented);
    this.splitMatrices();
    this.LUcroutEvaluate();
    this.yEvaluate();
    this.xEvaluate();
    this.checkerX();
    this.checkerY();
  }

  splitMatrices(){
    // split augmented matrix to cofficients and soln
    for (let i = 0; i < this.augmented.length; i++) {
      // initialize coff,l,u,x matrices
      this.coff.push([]);
      this.l.push([]);
      this.u.push([]);
      this.x.push(1);
      // get coff matrix from augmented matrix
      for (let j = 0; j < this.augmented[0].length - 1; j++) {
        this.coff[i].push(this.augmented[i][j]);
        // initialize u,l as zeros and ones come first so we access them easily
        if(i>j) {
          this.u[i].push(0);
          this.l[i].push(1);
        }
        else {
          this.u[i].push(1);
          this.l[i].push(0);
        }
      }
      // get soln matrix from augmented matrix
      this.soln.push(Number((this.augmented[i][this.augmented[0].length - 1]).toPrecision(this.ep)));
    }
  }

  LUcroutEvaluate(){
    let sumL: number = 0;
    let sumJ: number = 0;
    for (let i = 0; i < this.coff.length; i++) {
      this.pivoting(i);
      // calculate Lij
      for (let j = 0; j <= i; j++) {
        sumL = 0;
        for (let k = 0; k < j; k++) {
          sumL =Number((sumL + this.l[i][k] * this.u[k][j]).toPrecision(this.ep));
        }
        this.l[i][j] = Number((this.coff[i][j] - sumL).toPrecision(this.ep));
      }
      // calculate Uij
      for (let j = i + 1; j < this.coff[i].length; j++) {
        sumJ = 0;
        for (let k = 0; k < i; k++) {
          sumJ = Number((sumJ + this.l[i][k] * this.u[k][j]).toPrecision(this.ep));
        }
        this.u[i][j] = Number(((this.coff[i][j] - sumJ) / this.l[i][i]).toPrecision(this.ep));
      }
    }
    console.log("U matrix= "+this.u);
    console.log("L matrix= "+this.l);

  }

  // Pivotting function
  pivoting(index : number){
    console.log("Pivotting req");
    let maxRow = 0;
    let temp = 0;
    // find maximum pivot
    for(let j = index; j < this.augmented.length; j++){
      if(Math.abs(this.coff[j][index]) > maxRow) maxRow = j;
    }
    // replacing 2 row if max is found
    if(maxRow != index) {
      for (let i = 0; i < this.coff.length; i++){
        temp = this.coff[index][i];
        this.coff[index][i] = this.coff[maxRow][i];
        this.coff[maxRow][i] = temp;
      }
      // replace soln matrix
      temp = this.soln[maxRow];
      this.soln[maxRow] = this.soln[index];
      this.soln[index] = temp;
    }
  }

  // evaluate y matrix from ly=b
  yEvaluate(){
    let sumJ = 0;
    for(let i = 0; i < this.l.length; i++){
      sumJ = 0;
      for(let j = 0; j < i; j++)  Number((sumJ = sumJ + this.l[i][j] * this.y[j]).toPrecision(this.ep));
      this.y.push(Number(( (this.soln[i] - sumJ) / this.l[i][i]).toPrecision(this.ep)));
    }
    console.log("Y matrix= "+this.y);
  }

  // evaluate x matrix from ux=y
  xEvaluate(){
    let sumJ = 0;
    for(let i = this.u.length - 1; i >= 0; i--){
      sumJ = 0;
      for(let j = i+1; j < this.u.length; j++)
        sumJ = Number((sumJ + this.u[i][j] * this.x[j]).toPrecision(this.ep));
      this.x[i] = Number((this.y[i] - sumJ).toPrecision(this.ep));
    }
    console.log("X matrix= "+this.x);
  }

  // check validity x matrix
  checkerX(){
    for(let i = 0; i < this.x.length; i++) {
      if (isNaN(this.x[i]) || !isFinite(this.x[i])) {
        this.msgX = 'Error';
        return;
      }
    }
    this.msgX = 'X matrix:';
  }

  //check validity y matrix
  checkerY(){
    for(let i = 0; i < this.x.length; i++) {
      if (isNaN(this.x[i]) || !isFinite(this.x[i])) {
        this.msgY = 'Error';
        return;
      }
    }
    this.msgY = 'Y matrix: ';
  }

  /*print(){
    for (let i = 0; i < this.u.length; i++) {
      for (let j = 0; j < this.u[i].length; j++)
        console.log(this.u[i][j]);
      console.log("n");
    }
  }*/
}
