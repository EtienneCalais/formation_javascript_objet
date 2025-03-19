const a =[2,25,100,23]
a.sort();
console.log(a.sort((c,d)=>-1*(c-d)));
console.log(a.sort((c,d)=>1*(c-d)));