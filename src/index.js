const obj = {
    firstname:'Jean',
    lastname:'Louis',
    age:15
}
console.log(JSON.stringify(obj));

console.log(JSON.parse(`{"firstname":"Jean","lastname":"Louis","age":"15"}`))