import { Component, OnInit } from '@angular/core';
import {Hash} from "../hash";

@Component({
  selector: 'app-iterative-methods',
  templateUrl: './iterative-methods.component.html',
  styleUrls: ['./iterative-methods.component.css']
})
export class IterativeMethodsComponent implements OnInit {

  isIteration!:boolean;
  precision = 5;
  noOfIter = -1;
  tolValue = 0;
  noEqn = 0;
  initialGuess:any;
  nullar:any;
  equations:any;
  translator!:Hash;
  augmentedMatrix:any;
  solnMatrix:any;

  constructor() {

  }

  precisionSelector(e : any){
      this.precision = Number((e.target as HTMLInputElement).value);
     // console.log(this.precision);
  }

  selectBoundMethod(flag :boolean){
      this.isIteration=flag;
  }

  setNoIter(e:any) {
    this.noOfIter = Number((e.target as HTMLInputElement).value);
    console.log("iter=");
    console.log(this.noOfIter);
  }
  setNoEqn(e : any){
      console.log("set no of eqn")
      let eqnBoxes = document.getElementById("eqnBoxes");
      eqnBoxes!.style.display='none';
      this.noEqn = Number((e.target as HTMLInputElement).value);
      this.initialGuess = new Array<number>(this.noEqn);
      this.equations = new Array<string>(this.noEqn);
      this.nullar = new Array<number>(this.noEqn);
    // console.log(this.noEqn);
  }

  setInitial(e:any,index:number){
      console.log(index);
      this.initialGuess[index] = (e.target as HTMLInputElement).value;
      console.log(this.initialGuess[index] + "intial guess");
  }

  setEquation(e:any,index2:number){
    console.log(index2);
    this.equations[index2] = (e.target as HTMLInputElement).value;
    console.log(this.equations[index2] + "setEquation");
  }

  submitNoEqn(){
      let eqnBoxes = document.getElementById("eqnBoxes");
      eqnBoxes!.style.display='flex';
      let eqnId = document.getElementById("eqnId");
      eqnId!.style.visibility='visible';
      console.log(this.equations.length + "size")
  }

  setTol(e : any) {
    this.tolValue = Number((e.target as HTMLInputElement).value);
    this.noOfIter = -1
    console.log("tol=");
    console.log(this.tolValue);
  }


  solveByJacobi(){
      // this.augmentedMatrix = this.translator.expressionEvaluate(this.eqns);
    // this.augmentedMatrix = [[4,2,1,11],[-1,2,0,3],[2,1,4,16]]
    // this.solnMatrix = this.implementJacobi(this.augmentedMatrix, [1,1,1], 5, 0.1, 4);
    // console.log(this.solnMatrix)
    // console.log(this.equations)
    this.translator = new Hash();
    this.translator.numberofUn = this.noEqn;
    this.translator.expressionEvaluate(this.equations);
    this.augmentedMatrix = this.translator.cofficient;
    console.log(this.augmentedMatrix)
    this.solnMatrix = this.implementJacobi(this.augmentedMatrix, this.initialGuess, this.noOfIter, this.tolValue, this.precision);
    console.log(this.solnMatrix + "solution")
  }

  solveByGaussSiedel() {
    // this.augmentedMatrix = [[4,2,1,11],[-1,2,0,3],[2,1,4,16]]
    // this.solnMatrix = this.implementGaussSiedel(this.augmentedMatrix, [1,1,1], 3, 0.1, 4);
    // console.log(this.solnMatrix);
    this.translator = new Hash();
    this.translator.numberofUn = this.noEqn;
    this.translator.expressionEvaluate(this.equations);
    this.augmentedMatrix = this.translator.cofficient;
    console.log(this.augmentedMatrix)
    this.solnMatrix = this.implementGaussSiedel(this.augmentedMatrix, this.initialGuess, this.noOfIter, this.tolValue, this.precision);
    console.log(this.solnMatrix + "solution")
  }

  ngOnInit(): void {
  }

  implementJacobi(a: number[][], intialGuess: number[], noOfIterations: number, eTolerance: number, precis: number) {
    let jacobiMethodResults = new Array<Array<number>>()
    jacobiMethodResults.push(intialGuess)
    let tempArray = new Array<number>(intialGuess.length)
    let relativeError = eTolerance
    if (noOfIterations != -1) {
      for (let count = 0; count < noOfIterations; count++) {
        console.log(intialGuess)
        for (let i = 0; i < intialGuess.length; i++) {
          tempArray[i] = 0
          for (let j = 0; j < intialGuess.length; j++) {
            if (j != i) {
              console.log(a[i][j] * intialGuess[j])
              tempArray[i] += a[i][j] * intialGuess[j]
            }
          }
          tempArray[i] = (a[i][a[0].length - 1] - tempArray[i]) / a[i][i]
          if (count == noOfIterations - 1)
            tempArray[i] = Number(tempArray[i].toPrecision(precis))
        }
        intialGuess = Array.from(tempArray)
        jacobiMethodResults.push(intialGuess)
      }
    } else {
      let count = 0
      while (relativeError >= eTolerance) {
        count++;
        console.log(intialGuess)
        relativeError = 0
        for (let i = 0; i < intialGuess.length; i++) {
          tempArray[i] = 0
          for (let j = 0; j < intialGuess.length; j++) {
            if (j != i) {
              console.log(a[i][j] * intialGuess[j])
              tempArray[i] += a[i][j] * intialGuess[j]
            }
          }
          tempArray[i] = (a[i][a[0].length - 1] - tempArray[i]) / a[i][i]
          relativeError = Math.max(relativeError, (tempArray[i] - intialGuess[i]) / tempArray[i] * 100)
          if (relativeError < eTolerance)
            tempArray[i] = Number(tempArray[i].toPrecision(precis))
        }
        intialGuess = Array.from(tempArray)
        jacobiMethodResults.push(intialGuess)
        if (count == 20) {
               break;
        }
      }
    }
    console.log(jacobiMethodResults)
    return jacobiMethodResults
  }

  implementGaussSiedel(a: number[][], intialGuess: number[], noOfIterations: number, eTolerance: number, precis: number) {
    let gaussSiedelResults = new Array<Array<number>>()
    gaussSiedelResults.push(intialGuess)
    let relativeError = eTolerance
    let tempArray
    if (noOfIterations != -1) {
      for (let count = 0; count < noOfIterations; count++) {
        tempArray = Array.from(intialGuess)
        console.log(intialGuess)
        for (let i = 0; i < intialGuess.length; i++) {
          tempArray[i] = 0
          for (let j = 0; j < intialGuess.length; j++) {
            if (j != i) {
              console.log(a[i][j] * tempArray[j])
              tempArray[i] += a[i][j] * tempArray[j]
            }
          }
          tempArray[i] = (a[i][a[0].length - 1] - tempArray[i]) / a[i][i]
          if (count == noOfIterations - 1)
            tempArray[i] = Number(tempArray[i].toPrecision(precis))
        }
        intialGuess = Array.from(tempArray)
        gaussSiedelResults.push(intialGuess)
      }
    } else {
      let count = 0
      while (relativeError >= eTolerance) {
        count++;
        console.log(intialGuess)
        relativeError = 0
        tempArray = Array.from(intialGuess)
        for (let i = 0; i < intialGuess.length; i++) {
          tempArray[i] = 0
          for (let j = 0; j < intialGuess.length; j++) {
            if (j != i) {
              console.log(a[i][j] * tempArray[j])
              tempArray[i] += a[i][j] * tempArray[j]
            }
          }
          tempArray[i] = (a[i][a[0].length - 1] - tempArray[i]) / a[i][i]
          relativeError = Math.max(relativeError, (tempArray[i] - intialGuess[i]) / tempArray[i] * 100)
          if (relativeError < eTolerance)
            tempArray[i] = Number(tempArray[i].toPrecision(precis))
        }
        intialGuess = Array.from(tempArray)
        gaussSiedelResults.push(intialGuess)
        if (count == 20) {
          break;
        }
      }

    }
    console.log(gaussSiedelResults)
    return gaussSiedelResults
  }

}
