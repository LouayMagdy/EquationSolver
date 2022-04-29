import {Component, OnInit} from '@angular/core';
import {Hash} from "../hash";

@Component({
  selector: 'app-cholesky',
  templateUrl: './cholesky.component.html',
  styleUrls: ['./cholesky.component.css']
})
export class CholeskyComponent implements OnInit {
  hash: Hash;
  eqnNo: number = 0;
  precision: number = 7;
  freeTerm: Array<number> = [];
  stepFreeTerm: Array<number> = [];
  coefficients: Array<Array<number>> = [];
  matrixLU: Array<Array<number>> = [];
  YFreeTerm: Array<number> = [];
  soln: Array<number> = [];
  valid: boolean = true;
  eqns: Array<string> = [];
  vars: Array<string> = [];

  constructor() {
    this.hash=new Hash();
    this.hash.numberofUn=3;
  }

  ngOnInit(): void {}

  setEqnNo(event: any){
    this.eqnNo = parseInt((event.target as HTMLInputElement).value);
    this.hash.numberofUn = this.eqnNo;
    this.eqns = [];
    for(let i = 0; i < this.eqnNo; i++){
      this.eqns.push("");
      this.vars.push("x"+i);
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
    let solve = document.getElementById("solvek");
    solve!.style.display = 'flex';
    let preciseLabel = document.getElementById("precisionIdk");
    preciseLabel!.style.display='flex';
    let precise = document.getElementById("precisionk");
    precise!.style.display = 'flex';
    let eqn = document.getElementById('eqnSlotk');
    eqn!.style.display="block";
    let label = document.getElementById("NOeqnk");
    let box = document.getElementById("inputEqnNok");
    label!.style.display = 'none';
    box!.style.display = 'none';
    let cont = document.getElementById("continuek");
    cont!.style.display = 'none';

    if(this.eqnNo == 0){
      let precise = document.getElementById('precisionk');
      precise!.style.display='none';
      let preciseId = document.getElementById('precisionIdk');
      preciseId!.style.display='none';
      let solve = document.getElementById("solvek");
      solve!.style.display = 'none';

    }

  }

  addEqn(event : any, index: number){
    this.eqns[index] = (event.target as HTMLInputElement).value;
  }
  checkMatrix(){
    let symmetric = true;
    for (let i = 0; i < this.eqnNo; i++) {
      for (let j = 0; j < i; j++) {
        if (this.coefficients[i][j] != this.coefficients[j][i]) symmetric = false;
      }
    }
    this.valid = symmetric;
    /////////////////////////////rest ////////////
    let temp : Array<Array<number>> = [];
    for(let i = 0; i < this.eqnNo; i++){
      temp.push([]);
      for(let j = 0 ; j < this.eqnNo; j++){
        temp[i].push(this.coefficients[i][j]);
      }
    }
    for(let i = 0; i < this.eqnNo; i++){
      console.log(temp[i]);
    }
    for(let i = 0; i < this.eqnNo - 1; i++){
      for(let j = i + 1 ; j < this.eqnNo; j++){
        for(let k = i; k < this.eqnNo; k++){
          if(k == i) {
            temp[j][i] = Number(temp[j][k].toPrecision(this.precision))
              / Number(temp[i][k].toPrecision(this.precision));
            temp[j][i] = Number(temp[j][i].toPrecision(this.precision));
          }
          else{
            temp[j][k] -= Number((temp[j][i] * temp[i][k]).toPrecision(this.precision));
            temp[j][k] = Number(temp[j][k].toPrecision(this.precision));
          }
        }
      }
    }
    console.log("------------------------------------------")
    for(let i = 0; i < this.eqnNo; i++){
      console.log(temp[i]);
    }
    for(let i = 0; i < this.eqnNo; i++){
      if(temp[i][i] <= 0) this.valid = false;
    }
  }

  decompose(){
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
    let steps = document.getElementById('stepsk');
    steps!.style.display = 'block';
    for (let i = 0; i < this.eqnNo ; i++) {
      for (let j = 0; j < this.eqnNo; j++) {
        this.matrixLU[i][j] = this.coefficients[i][j];
      }
      this.stepFreeTerm[i] = this.freeTerm[i];
    }

    this.checkMatrix();
    for(let i = 0; i < this.eqnNo; i++){
      for(let j = 0; j <= i; j++){
        let value = this.coefficients[i][j];
        console.log("value["+i+"]" + "[" + j +"] = " + value);
        for(let k = 0; k < j; k++){
          let temp = Number((this.matrixLU[i][k] * this.matrixLU[j][k]).toPrecision(this.precision));
          value = Number((value - temp).toPrecision(this.precision));
          console.log("value["+i+"]" + "[" + j +"] = " + value);
        }
        if(i == j){
          this.matrixLU[i][i] = Number(Math.sqrt(value).toPrecision(this.precision));
        }
        else{
          this.matrixLU[i][j] = Number((value / this.matrixLU[j][j]).toPrecision(this.precision));
          this.matrixLU[j][i] = this.matrixLU[i][j];
        }
        console.log("L["+i+"]" + "[" + j +"] = " + this.matrixLU[i][j]);
      }
    }
  }
  forwardSubstitution () {
    for (let i = 0; i < this.eqnNo; i++) {
      let value = this.stepFreeTerm[i];
      for (let j = 0; j < i; j++) {
        value = Number(value - Number((this.matrixLU[i][j] * this.YFreeTerm[j]).toPrecision(this.precision)))
        value = Number(value.toPrecision(this.precision))
      }
      this.YFreeTerm[i] = Number((value / this.matrixLU[i][i]).toPrecision(this.eqnNo));
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
    let solve = document.getElementById('eqnk');
    solve!.style.display = 'none';
  }
}
