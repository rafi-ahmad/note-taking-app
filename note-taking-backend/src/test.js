let array = [0, "tom", 0, "ham", 0, "cat", 0];


let filteredArray = array.filter((value) => value !== 0);

let reIndexedArray = filteredArray.map((value, index) => value);

reIndexedArray.map((item,index)=>{
    console.log(index + 1); // 0,1,2
    
})
