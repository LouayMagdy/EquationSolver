export class Hash{
  MyMap= new Map<string,number[]>();
  keys: Array<string>=[];
  numberofUn!:number;

  cofficient: Array<Array<any>> = [];
  theSolution: Array<number> = [];
  //function to add cofficient to key 
  public add(key:string, value:number,numerEq:number){
    let arr:number[];
    //check if key if namber then reorder Equation
    if(key.charCodeAt(0)<58){
      this.theSolution[numerEq]=this.theSolution[numerEq]-parseFloat(key)
      return
    }
    //to deal if equation have the same key two times then it will add them
    if(this.MyMap.has(key)){
      if(numerEq<this.MyMap.get(key)!.length){
        console.log("===============================================================")
        this.MyMap.get(key)![numerEq]=this.MyMap.get(key)![numerEq]+value
        return
      }
      //if number of current equation greater than number of variable then he will add zero untill required equation
      if(numerEq>this.MyMap.get(key)!.length){
        for(let i=this.MyMap.get(key)!.length;i<numerEq;i++){
          console.log("ffffffffffffff")
          this.MyMap.get(key)!.push(0)
        }

      }
      //he will add new value to same key
      this.MyMap.get(key)!.push(value)
    }
    else{
      //if key didn't exist and number of equation zero then it will be added direct
      if(numerEq==0){
        this.MyMap.set(key,[value]);
      }
      //if  it didn't exist in first equatoin he will push zero 
      else{
        this.MyMap.set(key,[0]);
        //will loop and add zero untill the required equation 
        for(let i=this.MyMap.get(key)!.length;i<numerEq;i++){
          this.MyMap.get(key)!.push(0)
        }
        //he will add value in required place
        this.MyMap.get(key)!.push(value)
      }
      //he will push key if it exist and all first equation have values
      if(this.keys.length!=0){
        this.keys.push(key);
      }
      else {this.keys=[key]}
    }
  }
  // it evaluate the expression and return it back in cofficient array
  expressionEvaluate(_arr: string[]){
    let splitPlus = new Array(this.numberofUn).fill(0);
    let max=0;
    let maxIndex=0;
    //loop in every equation
    for(let i=0;i<_arr.length;i++){
      console.log("anssss")
      //split with equal and get after equal and push it to solution array 
      this.theSolution.push(parseFloat((_arr[i].split('='))[1]))
      //if equation have no equal or variable after array it will return 0
      if(isNaN(this.theSolution[i]))
        this.theSolution[i]=0
      console.log(this.theSolution[i])
      //it will add +- in the place of - so that split can work without problem 
      _arr[i]=_arr[i].split("-").join("+-")
      //it will delete every space in expression
      _arr[i]=_arr[i].split(" ").join("");
      console.log("reeeeeee")
      console.log(_arr[i])
      //check if first character is + it will delete it 
      if(_arr[i].charCodeAt(0)=="+".charCodeAt(0))
      {
        _arr[i]= _arr[i].substring(1);
        console.log("eeeeeeeeeeee")
        console.log(_arr[i])
      }
      // it will splet the equation with plus into terms and cofficient
      splitPlus[i]=((_arr[i].split('='))[0]).split("+")
      if(splitPlus[i].length>max){
        maxIndex=i;
        max=splitPlus[i].length;
      }
    }
    console.log(splitPlus)
    //it will splet cofficient from variable 
    this.evaluateAllunknown(splitPlus)
    //it will call clculateArr
    this.clculateArr();

    console.log(this.keys)
    console.log(this.cofficient)
  }
  //function will return two things cofficient and variable 
  getSubstring(sub:string):any[]{
    let index = 0;
    //loop untill get char not an integar and it will consider it variable
    for (let i = 0; i < sub.length; i++) {
      const character = sub.charCodeAt(i);
      if((character>64 && character<91)||(character>96 && character<123)){
        index=i;
        break;
      }
    }
    //index is the start of first character
    //if first is "-" and first variable in position 1 it will return -1 and variable 
    if(index==1 && sub.includes('-',0)){
      return [sub.substring(index,sub.length),-1];
    }
    //if index zero and have no cofficient then it will direct add 1 like x 
    if(index==0){
      return [sub.substring(index,sub.length),1];
    }
    //else it will return variable and cofficient
    return [sub.substring(index,sub.length),sub.substring(0,index)];
  }
  //after that function it will return all cofficient separate from vriable
  evaluateAllunknown(_arr: string[][]){
    let answer = new Array(_arr.length).fill(0).map(() => new Array(_arr.length).fill(0));
    console.log(_arr)
    //to loop each place in array and seprate cofficient from variables
    for(let i=0;i<_arr.length;i++){
      for(let j=0;j<_arr[i].length;j++){
        console.log(_arr[i][j])
        //it will call "gitSubstring" function to send to it two substring 
        let temp=this.getSubstring(_arr[i][j])
        //it will send it to add Function and it will add it to map
        this.add(temp[0],parseFloat(temp[1]),i);
      }
    }
    //check if variable didn't exist in last equations it will push zero instead  
    for(let k of this.keys){
      if(this.MyMap.get(k)!.length!=this.numberofUn){
        for(let i=this.MyMap.get(k)!.length;i<this.numberofUn;i++){
          this.MyMap.get(k)!.push(0)
        }
      }
    }
  }
  //to get augmented matrix
  clculateArr(){
    this.cofficient = new Array(this.numberofUn).fill(0).map(() => new Array(this.numberofUn+1).fill(0));
    console.log(this.MyMap)
    for(let k=0;k<this.keys.length;k++){
      for(let i=0;i<this.numberofUn;i++){
        this.cofficient[i][k]= this.MyMap.get(this.keys[k])![i]
      }
    }
    console.log(this.MyMap)
    for(let i=0;i<this.numberofUn;i++){
      //it will return add the number after equal sign to augmented matrix
      this.cofficient[i][this.numberofUn]= this.theSolution[i]
    }
    if(this.keys.length!=this.numberofUn){
      console.error("errrrrrror")
    }
    this.MyMap.clear();
  }

  constructor(){   }
}
