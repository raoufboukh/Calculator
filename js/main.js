const number = document.querySelectorAll("[data-number]");
const operation = document.querySelectorAll("[data-operation]");
const del = document.querySelector("[data-delete]");
const allClear = document.querySelector("[data-all-clear]");
const eq = document.querySelector("[data-equals]");
const results = document.querySelector(".result");
const change = document.querySelector(".change");
const container = document.querySelector(".container");
let arr = [];
change.addEventListener("click",function(){
    arr = [];
    document.body.classList.toggle("black");
    container.classList.toggle("shadow");
    change.classList.toggle("white");
    for(let i = 0;i < document.body.classList.length;i++){
        arr.push(document.body.classList[i]);
    }
    for(let i = 0;i < container.classList.length;i++){
        arr.push(container.classList[i]);
    }
    for(let i = 0;i < change.classList.length;i++){
        arr.push(change.classList[i]);
    }
    local();
})
function local(){
    arr = arr.filter(el => el == "black" || el == "shadow" || el == "white");
    localStorage.setItem("class",JSON.stringify(arr));
}

if(localStorage.getItem("class")){
    arr = JSON.parse(localStorage.getItem("class"));
    darkMode(arr);
}
function darkMode(arr){
    for(let i = 0;i < arr.length;i++){
        if(arr[i] == "black"){
            document.body.classList.add(arr[i]);
        }else if(arr[i] == "shadow"){
            container.classList.add("shadow");
        }else{
            change.classList.add("white");
        }
    }
}

allClear.onclick = function(){
    results.textContent = 0;
}

del.addEventListener("click", function(){
    results.textContent = results.textContent.slice(0,-1);
    if(results.textContent.length === 0){
        results.textContent = 0;
    }
});

operation.forEach(op =>{
    op.onclick = function(){
        if(op.textContent != '%'){
            results.textContent += op.textContent;
        }
        if(op.textContent == '%'){
            results.textContent = +results.textContent/100;
        }
    }
})

number.forEach(nb =>{
    nb.addEventListener("click",function(){
        if(nb.textContent == '.'){
            results.textContent += nb.textContent;
        }else if((results.textContent == 0 && nb.textContent != '.') && !(results.textContent == '0.')){
            results.textContent ='';
            results.textContent += nb.textContent;
        }else if(nb.textContent != '.'){
            results.textContent += nb.textContent;
        }
        })
})

eq.onclick = function(){
    try{
        results.textContent = eval(results.textContent);
    }catch(error){
        results.textContent = 'Math Error';
    }
}