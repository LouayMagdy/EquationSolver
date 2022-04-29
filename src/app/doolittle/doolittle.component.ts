import {Component, OnInit} from '@angular/core';
import {Hash} from "../hash";

@Component({
  selector: 'app-doolittle',
  templateUrl: './doolittle.component.html',
  styleUrls: ['./doolittle.component.css']
})
export class DoolittleComponent implements OnInit {
  nullarr:any;
  hash : Hash;
  eqnNo : number = 0;
  precision: number = 7;
  freeTerm : Array<number> = [];
  stepFreeTerm: Array<number> = [];
  coefficients : Array<Array<number>> = [];
  matrixLU : Array<Array<number>> = [];
  YFreeTerm: Array<number> = [];
  soln: Array<number> = [];
  eqns: Array<string> = [];
  vars: Array<string> = [];
  err: string = "";

  constructor() {
    this.hash=new Hash();
    this.hash.numberofUn=3;
  }

  ngOnInit(): void {}
  setEqnNo(event: any){
    this.eqnNo = parseInt((event.target as HTMLInputElement).value);
    this.nullarr=new Array<number>(this.eqnNo);
    this.hash.numberofUn = this.eqnNo;
    this.eqns = [];
    for(let i = 0; i < this.eqnNo; i++){
      this.eqns.push("");
      this.vars.push("x");
      this.freeTerm.push(0);
      this.stepFreeTerm.push(0);
      this.YFreeTerm.push(0);
      this.soln.push(0);
    }
    for (let i = 0; i < this.eqnNo; i++) {
      this.coefficients.push([]);
      this.matrixLU.push([]);
      for (let j = 0; j < this.eqnNo; j++) {
        this.coefficients[i].push(0);
        this.matrixLU[i].push(0);
      }
    }
    console.log(this.coefficients);
  }

  setPrecision(e : any){
    this.precision = parseInt((e.target as HTMLInputElement).value);
    console.log("precision: "+ this.precision);
  }
  continue(){
    let solve = document.getElementById("solve");
    solve!.style.display = 'flex';
    let preciseLabel = document.getElementById("precisionId");
    preciseLabel!.style.display='flex';
    let precise = document.getElementById("precision");
    precise!.style.display = 'flex';
    let eqn = document.getElementById('eqnSlot');
    eqn!.style.display="block";
    let label = document.getElementById("NOeqn");
    let box = document.getElementById("inputEqnNo");
    label!.style.display = 'none';
    box!.style.display = 'none';
    let cont = document.getElementById("continue");
    cont!.style.display = 'none';

    if(this.eqnNo == 0){
      let precise = document.getElementById('precision');
      precise!.style.display='none';
      let preciseId = document.getElementById('precisionId');
      preciseId!.style.display='none';
      let solve = document.getElementById("solve");
      solve!.style.display = 'none';

    }

  }
  addEqn(event : any, index: number){
    this.eqns[index] = (event.target as HTMLInputElement).value;
  }

  partialPivoting(i: number) {
    for (let k = i + 1; k < this.eqnNo; k++) {
      if (Math.abs(this.matrixLU[i][i]) < Math.abs(this.matrixLU[k][i])) {
        for (let j = 0; j < this.eqnNo; j++) {
          let temp = this.matrixLU[i][j];
          this.matrixLU[i][j] = this.matrixLU[k][j];
          this.matrixLU[k][j] = temp;
        }
        let temp = this.stepFreeTerm[i];
        this.stepFreeTerm[i] = this.stepFreeTerm[k];
        this.stepFreeTerm[k] = temp;
      }
    }
  }
  decompose(){
    console.log("emdniinfurwburuwdujgewnwbinejidrwighe")
    console.log(this.eqns)
    this.hash.expressionEvaluate(this.eqns);
    let temp = this.hash.cofficient;
    let vars = this.hash.keys;
    console.log(temp);
    for(let i = 0; i < this.eqnNo; i++){
      for(let j = 0; j < this.eqnNo; j++){
        this.coefficients[i][j] = temp[i][j];
      }
      this.freeTerm[i] = temp[i][temp[i].length - 1];
      this.vars[i] = vars[i];
    }
    let steps = document.getElementById('steps');
    steps!.style.display = 'block';
    for (let i = 0; i < this.eqnNo ; i++) {
      for (let j = 0; j < this.eqnNo; j++) {
        this.matrixLU[i][j] = this.coefficients[i][j];
      }
      this.stepFreeTerm[i] = this.freeTerm[i];
    }
    for(let i = 0; i < this.eqnNo - 1; i++){
      this.partialPivoting(i);
      for(let j = i + 1 ; j < this.eqnNo; j++){
        for(let k = i; k < this.eqnNo; k++){
          if(k == i) {
            this.matrixLU[j][i] = Number(this.matrixLU[j][k].toPrecision(this.precision))
              / Number(this.matrixLU[i][k].toPrecision(this.precision));
            this.matrixLU[j][i] = Number(this.matrixLU[j][i].toPrecision(this.precision));
          }
          else{
            this.matrixLU[j][k] -= Number((this.matrixLU[j][i] * this.matrixLU[i][k]).toPrecision(this.precision));
            this.matrixLU[j][k] = Number(this.matrixLU[j][k].toPrecision(this.precision));
          }
        }
      }
    }
    for(let i = 0; i < this.eqnNo; i++){
      for(let j = 0; j < this.eqnNo; j++){
        console.log(this.matrixLU[i][j])
      }
      console.log(".......")
    }
  }
  forwardSubstitution(){
    for(let i = 0; i < this.eqnNo; i ++){
      console.log("b" + (i + 1) + "..." + this.stepFreeTerm[i]);
    }
    this.YFreeTerm[0] = this.stepFreeTerm[0];
    for(let i = 1; i < this.eqnNo; i++){
      let value = this.stepFreeTerm[i];
      for(let j = 0; j < i; j++){
        value = Number( value - Number((this.matrixLU[i][j]*this.YFreeTerm[j]).toPrecision(this.precision)))
        value = Number(value.toPrecision(this.precision))
        this.YFreeTerm[i] = value;
      }
    }
    for(let i = 0; i < this.eqnNo; i ++){
      console.log("Y" + (i + 1) + "..." + this.YFreeTerm[i]);
    }
  }
  backwardSubstitution(){
    for(let i = this.eqnNo - 1; i >= 0; i--){
      let value = this.YFreeTerm[i];
      for(let j = this.eqnNo - 1; j > i; j--){
        value = Number( value - Number((this.matrixLU[i][j]*this.soln[j]).toPrecision(this.precision)))
        value = Number(value.toPrecision(this.precision));
      }
      value = Number((value / this.matrixLU[i][i]).toPrecision(this.precision));
      this.soln[i] = value;
    }
  }
  solve(){
    this.decompose();
    this.forwardSubstitution();
    this.backwardSubstitution();
    let solve = document.getElementById('eqn');
    solve!.style.display = 'none';
  }


}
