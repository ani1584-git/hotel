/*const demo1=()=>{
    return new Promise((resolve,reject)=>{
        var n=0;
        if(n%2==0)
            resolve("number is even")
        else
        reject("number is odd")
    })
}
console.log("before execution");

demo1().then(resolve=>{
    console.log(resolve)
}).catch(reject=>{
    console.log(reject)
})*/

function getData(dataId){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(dataId){
            resolve("success")
            console.log("data",dataId);
            }
            else{
            reject("fail")
            console.log("data not found")
            }
        },2000)
    });
}


async function demo(){
console.log("getting data...");
await getData(1);
console.log("getting data...");
await getData(2);
console.log("getting data...");
await getData();
}
demo()


