let a={}

Object.defineProperty(a,"obj",{
    get:function(){
      console.log("getter!!!");
    }
  });
  var x=a;
  console.log(a.obj); 
  console.log(x.obj);
  