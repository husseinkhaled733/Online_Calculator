import { CalculationsService } from './../calculations.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  constructor(private service:CalculationsService) { }

  ngOnInit(): void {
  }
  numberd:string="0";//number in the lower screen
  exp:string="";//the string returned to backend
  numberu:string="";//number in the upper screen
  firstclick:boolean=false;//when the user press number button for first time
  para:number=0;//number of parameters
  error:boolean=false;//error indicator
  symbol:string="";//the symbol of operation used right now
  opt:string="";//the operation used right now




  show(event:any){


    //error
    if(this.numberd==="ERROR"){
      this.error=false;
      this.firstclick=false;
      this.exp="";
      this.numberu="";
      this.para=0;
      this.opt="";
      this.symbol="";
    }


    //clear
    if(event.target.value==="c"||event.target.value==="ce"){
      this.error=false;
      this.firstclick=false;
      this.numberd="0";
      this.exp="";
      this.numberu="";
      this.para=0;
      this.opt="";
      this.symbol="";
    }




    //backspace
    else if(event.target.value==="delete"){
      if(this.para===0||this.para===2){
        this.numberd=this.numberd.substring(0,this.numberd.length-1);
        if(this.numberd.length==0){
          this.firstclick=false;
          this.numberd="0";
        }
      }
    }




    //number operations
    else if((event.target.value>="0"&&event.target.value<="9")){
      if(this.firstclick===false){
        if(this.para===1){
          this.exp="";
          this.numberu="";
          this.para=0;
        }
        else if(this.para===3){
          this.exp =this.exp.substring(0,this.exp.indexOf(this.opt.charAt(this.opt.length-1))+1);
          this.numberu =this.numberu.substring(0,this.numberu.indexOf(this.symbol)+1);
          this.para=2;
        }
        this.firstclick=true;
        this.numberd=event.target.value;
      }
      else if(this.numberd==="0"){
        this.numberd=event.target.value;
      }
      else{
        this.numberd+=event.target.value;
      }
    }



    //dot operation
    else if(event.target.value==="."){
      if((this.numberd.charAt(this.numberd.length-1)!="."&&this.numberd.includes(".")===false)||this.firstclick===false){
        if(this.para===1){
          this.numberd="0";
          this.exp="";
          this.numberu="";
          this.para=0;
        }
        else if(this.para==3){
          this.numberd="0";
          this.exp =this.exp.substring(0,this.exp.indexOf(this.opt.charAt(this.opt.length-1))+1);
          this.numberu =this.numberu.substring(0,this.numberu.indexOf(this.symbol)+1);
          this.para=2;
        }
        this.firstclick=true;
        this.numberd+=event.target.value;
      }
    }



    // % 1/x xpower2 rootx negatex
    else if(event.target.value==="percentx"||event.target.value==="dividebyx"||event.target.value==="powx"||event.target.value==="rootx"||event.target.value==="negatex"){
      let value:string=event.target.value;
      if(this.firstclick||this.para===1||this.para===3) value=value.replace('x',this.numberd);
      else value=value.replace('x',"");
      let x:string=this.exp.substring(0,this.exp.indexOf(this.opt));
      value=x.concat(value);
      this.service.evaluate(value).subscribe((data)=>{
        this.handleresultone(data,event,value);
      })
    }



    // equal operation
    else if(event.target.value==="equal"){
      if(this.para===1){
        this.exp=this.numberd;
        this.numberu=this.numberd;
      }
      else if(this.para===0||this.para===2){
        this.exp+=this.numberd;
        this.numberu+=this.numberd;
        this.para++;
      }
      if(this.para===3){
        this.numberu+=event.target.innerHTML;
      }
      this.service.evaluate(this.exp).subscribe((data)=>{
        this.handleresult(data);
      })
    }



    // + - * / operations
    else{
      this.symbol=event.target.innerHTML;
      this.opt=event.target.value;
      if(this.para===0){
        this.numberu=this.numberd+event.target.innerHTML;
        this.exp+=this.numberd+event.target.value;
        this.para+=2;
        this.firstclick=false;
        this.numberd="0";
        console.log(this.exp);
      }
      else if(this.para===1){
        this.numberu=this.numberd+event.target.innerHTML;
        this.exp+=event.target.value;
        this.para++;
        this.firstclick=false;
        this.numberd="0";
      }
      else if(this.para===2){
        this.exp+=this.numberd;
        this.para++;
        this.service.evaluate(this.exp).subscribe((data)=>{
          this.handleresultopt(data,event);
        })
      }
    }
  }




  handleresult(data:string){
    this.firstclick=false;
    if(data===null){
      data="ERROR";
      this.error=true;
    }
    data=String(data);
    if(this.para===0||this.para===2){
      this.exp+=data;
      this.para++;
    }
    else{
      this.exp=data;
      this.para=1;
    }
    this.numberd=data;
  }



  handleresultone(data:string,event:any,ret:string){
    this.firstclick=false;
    let value:string=event.target.value;
    let html:string=event.target.innerHTML;
    let result:string="";
    value=value.replace("x","");
    if(value==="negate"){
      if(ret.endsWith("negate")){
        result=value+'('+ret.substring(0,ret.indexOf("negate"))+')';
      }
      else{
        result=value+'('+this.numberd+')';
      }
    }
    else if(value==="percent"){
      result=data;
    }
    else{
      if(ret.endsWith(value)){
        result=html.replace('𝑥',ret.substring(0,ret.indexOf(value)));
      }
      else{
        result=html.replace('𝑥',this.numberd);
      }
    }
    if(data===null){
      data="ERROR";
      this.error=true;
    }
    data=String(data);
    this.numberd=data;
    if(this.para===1){
      this.exp=data;
      this.numberu=result;
    }
    else if(this.para===2||this.para===0){
      this.exp+=data;
      this.para++;
      this.numberu+=result;
    }
    else{
      this.exp =this.exp.substring(0,this.exp.indexOf(this.opt.charAt(this.opt.length-1))+1)+data;
      this.numberu =this.numberu.substring(0,this.numberu.indexOf(this.symbol)+1)+result;
    }
  }


  handleresultopt(data:string,event:any){
    this.firstclick=false;
    if(data===null){
      data="ERROR";
      this.error=true;
    }
    data=String(data);
    if(this.para===0||this.para===2){
      this.exp+=data;
      this.para++;
    }
    else{
      this.exp=data;
      this.para=1;
    }
    this.numberu=data+event.target.innerHTML;
    this.exp+=event.target.value;
    this.para++;
    this.firstclick=false;
    this.numberd="0";
  }
}
