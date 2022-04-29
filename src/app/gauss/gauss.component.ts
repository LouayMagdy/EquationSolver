import { Component, OnInit } from '@angular/core';
import {Hash} from "../hash";
@Component({
  selector: 'app-gauss',
  templateUrl: './gauss.component.html',
  styleUrls: ['./gauss.component.css']
})
export class GaussComponent implements OnInit {
  hash:Hash;
  precision!:number;
  answer=false;
  hid=false
  nw!: boolean;
  arr!:string[];
  uniqe=false
  inf=false
  noSolu=false
  show=false;
  solve!:number[][];
  solution!:number[]
  ElimnationTime=0;
  BacsubtutionTime=0;


  constructor() {
    this.hash=new Hash();
  }
  ngOnInit(): void {
  }
  number = new Array(3).fill(0).map(() => new Array(5).fill(0));
  //function it will be called after enter  equations and click solve
  fun(){
    this.arr = new Array(this.hash.numberofUn).fill(0)
    //it will loop and get all equations 
    for(let  i=0;i<this.hash.numberofUn;i++){
      console.log((<HTMLInputElement>document.getElementById(""+i)).value + "fun")
      this.arr[i] = (<HTMLInputElement>document.getElementById(""+i)).value
      console.log(this.arr[i])
    }
    console.log(this.arr)
    //it will make show false and 
    this.show=false
    //it will set precision to default 7
    this.precision=parseInt((<HTMLInputElement>document.getElementById("inputPre")).value)
    if(isNaN(this.precision)){
      this.precision=7
    }
    //it will apear solutions 
    this.nw=true
    //call "expressionEvaluate" to calculate augmented matrix  
    this.hash.expressionEvaluate(this.arr);

    console.log("                    ee")
    console.log(this.hash.cofficient)
    //it will call gauess solver to calculate solution
    this.gaussSolver(this.hash.cofficient)
    console.log(this.hash.cofficient)
    this.answer=true
  }
  //function be called after enter number of equations
  func(){
    this.hash.numberofUn=parseInt((<HTMLInputElement>document.getElementById("inputN")).value)

    console.log(this.hash.numberofUn);
    //if number equal to 0 or negative so it will not work and return
    if(isNaN(this.hash.numberofUn) || this.hash.numberofUn < 1){
      return
    }
    //to make solution appear in fornt 
    this.hid=true
    this.arr=new Array(this.hash.numberofUn).fill(0)
    this.show=true
  }
  //function will get bigest element in row and it used in pivot with scale;
  getBigestInrow(arr:number[]):number{
    let index=0
    let max=arr[0]
    for(let i=1;i<arr.length-1;i++){
      if(arr[i]>max){
        max=arr[i]
        index=i
      }
    }
    return index;

  }
  //function will get bigest element in  pivot Coulmn and it used in pivot with scale ;
  getBigestCoulmnIN(arr:number[][],pivot:number){
    let max=arr[pivot][pivot]
    let index=pivot
    for(let i=pivot+1;i<arr.length;i++){
      if(arr[i][pivot]>max){
        max=arr[i][pivot]
        index=i
      }
    }
    return index;
  }
  //that function will pivot if it needed 
  pivotAndscale(arr:number[][],pivot:number){
    let temp= new Array(arr.length).fill(0).map(() => new Array(arr[0].length).fill(0));
    //copy function so the orignal one will still same
    for(let i=0;i<arr.length;i++){
      for(let j=0;j<arr[0].length;j++){
        temp[i][j]=arr[i][j];
        temp[i][j]= Math.abs(temp[i][j])
      }
    }
    //scale each row according to biggest element in row  
    for(let i=pivot;i<arr.length;i++){
      let max = temp[i][this.getBigestInrow(temp[i])]
      for(let j=0;j<arr.length;j++){
        temp[i][j]=temp[i][j]/max
      }
    }
    //get biggest element in coulmn 
    let n=this.getBigestCoulmnIN(temp,pivot)
    console.log("TTTTTTTT")
    console.log(temp)
    //if bigest is coulmn then there is no need to scale
    if(n==pivot){
      return
    }
    else{
      console.log("pivoooooooooot")
      let before= new Array(arr.length).fill(0).map(() => new Array(arr[0].length).fill(0));
      console.log(temp)
      let temp1=arr[pivot]
      console.log(temp1)
      arr[pivot]=arr[n]
      arr[n]=temp1
      console.log(temp)
    }

  }

  gaussSolver(arr:number[][]){
    let arrr= new Array(arr.length).fill(0).map(() => new Array(arr[0].length).fill(0));
    for(let i=0;i<arr.length;i++){
      for(let j=0;j<arr[0].length;j++){
        arrr[i][j]=arr[i][j];
      }
    }
    console.log(arr)
    console.warn(arrr)
    let st =Date.now();
    //it will do forward elimination
    for(let i=0;i<this.hash.numberofUn-1;i++){
      this.pivotAndscale(arrr,i)
      for(let j=i+1;j<this.hash.numberofUn;j++){
        // if pivot after scale equal zero then it will call back substitution direct
        if(arrr[i][i]==0){
          this.backSubs(arrr)
          return
        }
        // it will get factor and Round-off to givien precision
        let factor = parseFloat((arrr[j][i]/arrr[i][i]).toPrecision(this.precision));
        console.log(factor)
        for(let k=i;k<this.hash.numberofUn+1;k++){
          arrr[j][k]=parseFloat((arrr[j][k]-factor*arrr[i][k]).toPrecision(this.precision));
        }
        arrr[j][i]=0
      }
    }
    this.ElimnationTime=Date.now() -st;
    this.solve= new Array(arrr.length).fill(0).map(() => new Array(arrr[0].length).fill(0));
    // it will copy the givin array to solve array 
    for(let i=0;i<arrr.length;i++){
      for(let j=0;j<arrr[0].length;j++){
        this.solve[i][j]=arrr[i][j]
      }
    }
    this.backSubs(arrr)
    console.log(this.solve);
    console.log("sssssssssssssss")
  }
  hasSolution(arr:number[][]):string{
    let Inf=false
    // check if the equations has unique or finite solution or has no solutions
    for(let i=0;i<arr.length;i++){
      let rawZ=true
      for(let j=0;j<arr.length;j++){
        if(arr[i][j]!=0){
          rawZ=false
          break
        }
      }
      // if the rank of A dosen't equal to aguimented matrix it will retuen has no solutions 
      if((arr[i][this.hash.numberofUn]!=0&&rawZ)||(this.hash.keys.length>this.hash.numberofUn)||(this.hash.keys.indexOf('')>-1)){
        return 'hasNosolution';
      }
      if((arr[i][this.hash.numberofUn]==0&&rawZ)||(this.hash.keys.length<this.hash.numberofUn)){
        Inf=true
      }
    }
    // if the rank of A  equal to aguimented matrix and didn't equa'l N it will return infinity 
    if(Inf){
      return 'infinity';
    }
    //if rank of A = rank of aguimented matrix it will return unique 
    else{
      return 'unique'
    }
  }

  backSubs(arr:number[][]){
    let sol= this.hasSolution(arr)
    console.log("stttttttttttttttttt")
    // if system has has no solution then appear in html
    if(sol==='hasNosolution'){
      console.log('hasNosolution')
      this.noSolu=true
      return
    }
    // if system has has  infinity then appear in html
    if(sol==='infinity'){
      console.log("infinity")
      this.inf=true
      return
    }
    else{
      // if system has has  unique then solve and  appear in html
      this.uniqe=true
      console.log("unique")
      // var st= window.performance.now()*Math.pow(10,5)
      this.solution = new Array(this.hash.numberofUn).fill(0)
      //loop to do back substitution 
      for(let i=arr.length-1;i>=0;i--){
        for(let j=i+1;j<arr.length;j++){
          arr[i][arr.length]= parseFloat((arr[i][arr.length]-arr[i][j]*this.solution[j]).toPrecision(this.precision))
        }
        this.solution[i]=parseFloat((arr[i][arr.length]/arr[i][i]).toPrecision(this.precision))
      }
      // var end= window.performance.now()*Math.pow(10,5)
      // this.BacsubtutionTime=(end-st);
      // console.log(st)
      // console.log(end)
      console.log(this.BacsubtutionTime)
      console.log(this.solution)
    }
  }


}
