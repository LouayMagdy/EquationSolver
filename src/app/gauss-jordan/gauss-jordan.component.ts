import { Component, OnInit } from '@angular/core';
import {Hash} from "../hash";

@Component({
  selector: 'app-gauss-jordan',
  templateUrl: './gauss-jordan.component.html',
  styleUrls: ['./gauss-jordan.component.css']
})

export class GaussJordanComponent implements OnInit {

  matrix: number[][]
  solution: number[]
  array: string[]
  steps: string[]
  n: number
  factor: number
  precision?: number
  numberOfSteps: number
  singular: boolean
  hideUI: boolean
  content: boolean
  hash: Hash

  constructor() {
    this.matrix = new Array
    this.solution = new Array
    this.array = new Array
    this.steps = new Array
    this.n = this.matrix.length
    this.factor = 0
    this.numberOfSteps = 0
    this.singular = false
    this.hideUI = false
    this.content = false
    this.hash = new Hash()
  }

  get Matrix() {
    return this.matrix
  }
  get Solution() {
    return this.solution
  }

  /**
   * Checks whether the matrix is singular or not by evaluating determinant after gauss elimination.
   */
  isSingular() {
    let Determinant = 1;
    for(let i = 0; i < this.n; i++) {
      Determinant *= this.matrix[i][i]         // Calculate the determinant (we do this after elimination and not before).
    }
    if(!Determinant) {
      this.singular = true;
    }
    return this
  }

  /**
   * pivoting function for a system of linear equations
   */
  pivot(iteration: number) {
    let pivot = iteration
    let max = this.matrix[iteration][iteration]
    for(let i = iteration + 1; i < this.n; i++) {
      let dummy = this.matrix[i][iteration]
      if(dummy > max) {
        max = dummy
        pivot = i
      }
    }
    if(pivot != iteration) {
      let temp = this.matrix[iteration]
      this.matrix[iteration] = this.matrix[pivot]
      this.matrix[pivot] = temp
    }

    return this
  }

  /**
   * gauss elimination for a system of linear equations
   */
  gElimination() {

    // Forward Elimination:
    for(let i = 0; i < this.n; i++) {

      this.pivot(i)

      for(let k = i + 1; k < this.n; k++) {

        this.factor = this.matrix[k][i] / this.matrix[i][i]
        this.factor = parseFloat(this.factor.toPrecision(this.precision))

        // Adding the this.steps
        this.steps.push("Calculated the factor in step " + this.numberOfSteps + ", Factor = " + this.factor)
        this.numberOfSteps++

        for(let j = i; j < this.matrix[k].length; j++) {
          this.matrix[k][j] = this.matrix[k][j] - this.matrix[i][j] * this.factor
          this.matrix[k][j] = parseFloat(this.matrix[k][j].toPrecision(this.precision))
        }

        // Adding the this.steps
        this.steps.push("Row calculation in step " + this.numberOfSteps + ", Matrix = ")
        this.numberOfSteps++
        for(let l = 0; l < this.n; l++)
          this.steps.push("[ " + this.matrix[l] + " ]")

      }
      this.isSingular()   // Checking whether the matrix is singular or not after Gauss Elimination.
    }
    return this
  }

  /**
   * gauss-jordan elimination for a system of linear equations
   */
  gjElimination() {

    this.gElimination()

    if(this.singular) {
      return this;
    }

    //Backward Elimination:
    for(let i = this.n - 1; i > 0; i--) {

      this.pivot(i)

      for(let k = i - 1; k >= 0; k--) {

        this.factor = this.matrix[k][i] / this.matrix[i][i]
        this.factor = parseFloat(this.factor.toPrecision(this.precision))
        // Adding the this.steps
        this.steps.push("Calculated the factor in step " + this.numberOfSteps + ", Factor = " + this.factor)
        this.numberOfSteps++

        for(let j = this.n; j >= 0; j--) {                                                                                             // Changing the rows values
          this.matrix[k][j] = this.matrix[k][j] - this.matrix[i][j] * this.factor
          this.matrix[k][j] = parseFloat(this.matrix[k][j].toPrecision(this.precision))
        }

        // Adding the this.steps
        this.steps.push("Row calculation in step " + this.numberOfSteps + ", Matrix = ")
        this.numberOfSteps++
        for(let l = 0; l < this.n; l++)
          this.steps.push("[ " + this.matrix[l] + " ]")
      }
    }
    return this
  }

  /**
   * solving the system of linear equations
   */
  solve() {
    if(this.singular) {
      for(let i=0;i<this.matrix.length;i++){
        let zeroRow = true
        for(let j=0;j<this.matrix.length;j++){
          if(this.matrix[i][j] != 0){
            zeroRow = false
            break
          }
        }

        if((this.matrix[i][this.hash.numberofUn]!=0&&zeroRow)||(this.hash.keys.length>this.hash.numberofUn)||(this.hash.keys.indexOf('')>-1)){
          this.steps.push("Solution = No solution! Matrix is singular.")
          return this
        }
        if((this.matrix[i][this.hash.numberofUn]==0&&zeroRow)||(this.hash.keys.length<this.hash.numberofUn)){
          this.steps.push("Solution = Infinite number of solutions! Matrix is singular.")
          return this
        }
      }
    }

    for(let i = 0; i < this.n; i++) {
      let coefficient: number = this.matrix[i][i]
      let result: number = this.matrix[i][this.n]
      let solution = result / coefficient
      solution = parseFloat(solution.toPrecision(this.precision))
      this.solution.push(solution)
    }
    this.steps.push("Solution = " + this.solution)
    return this
  }

  /**
   * function responsible for getting number of parameters from user
   */
  getParameters(){
    this.hash.numberofUn = parseInt((<HTMLInputElement>document.getElementById("inputNE")).value)
    this.n = this.hash.numberofUn
    if(isNaN(this.hash.numberofUn)){
      return this
    }
    this.array = new Array(this.n).fill(0)
    this.content=true
    this.hideUI=true
    return this
  }

  /**
   * function responsible for getting the equations from user
   */
  getEquations(){
    this.array = new Array()
    for(let i = 0; i < this.n; i++){
      this.array.push((<HTMLInputElement>document.getElementById(""+i)).value)
    }
    let precision = parseInt((<HTMLInputElement>document.getElementById("inputPreE")).value)
    if(!isNaN(precision)){
      this.precision = precision
    }
    this.content = false
    this.hash.expressionEvaluate(this.array);
    this.matrix = this.hash.cofficient;
  }

  ngOnInit(): void {
  }

}
