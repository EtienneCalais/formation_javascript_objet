const a =() => {
    let arr=[];
    for (var i = 0;i<3;i++){
        arr.push(function(){
            console.log(i)
        })
    }
    return arr;
}
const tab=a();
tab[0]();
tab[1]();
tab[2]();