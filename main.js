let shadow = document.querySelectorAll('#shadow');
let modal = document.querySelectorAll('#modal');
let basket = document.querySelectorAll('#basket');
let modalTXT = document.querySelectorAll('#modal_txt');
let numberPurchase = document.querySelectorAll('#numberPurchase');
let click = true
basket[0].onclick = function(){
    if(click==true){
        shadow[0].style.display = 'block';
        modal[0].style.display = 'block';
        basket[0].innerHTML = '<img src="img/basketBlack.png" alt="Корзина" width="50px">';
         click=false
   }
   else{
        shadow[0].style.display = 'none';
        modal[0].style.display = 'none';
        basket[0].innerHTML = '<img src="img/basketWhite.png" alt="Корзина" width="50px">';
       if(obSumm>=1){
            basket[0].innerHTML = '<img src="img/basketWithProduct.png" alt="Корзина" width="50px">';
        }
        click = true
   }
    
}

class purshase {
    constructor(purshaseArticul, purshasePhoto, purshaseType, purshaseName, purshasePrice, purshaseQuantity){
        this.photo = purshasePhoto,
        this.articul = purshaseArticul, 
        this.type = purshaseType;
        this.name = purshaseName;
        this.price = purshasePrice;
        this.quantity = purshaseQuantity;
    }
    print(sumTovar){
        let outText = (`${this.photo} Арт:${this.articul}; ${this.type} - ${this.name} Цена:${this.price}руб;<br><br>   Количество:${this.quantity}шт Стоимость:${sumTovar}руб`);  
        return(outText)
        
   }
   valSingle(){
    let val = this.price*this.quantity
    return(val)
   }
   
}

let tovar =[]
let outputTovar=``;
let sumTovar= 0;
let outputALL=``;
let clearBasket = document.querySelectorAll('#clearBasket');
let obSumm=0;
let priceTovar=0
let kolvoTovar = 0

function getToBasket( articul, photo, type, name, price, quantity){
  // alert('Товар успешно добавлен');
   let ArticulSovpal=true;
   
   for(let i=0; i<tovar.length; i++){
        if(tovar[i].articul == articul ){
            ArticulSovpal=false;
            tovar[i].quantity=Number(tovar[i].quantity)
            tovar[i].quantity++
            kolvoTovar++
            showTovar(obSumm);   
        }
        
    }
    if(ArticulSovpal){
    tovar.push (new purshase(articul, photo, type, name, price, quantity));
    kolvoTovar++
    showTovar(obSumm);
    }
   
}

let indexI
function showTovar(obSumm){
  modalTXT[0].innerHTML="";
    for(i=0;i<tovar.length;i++){
      
       indexI= i
       sumTovar=tovar[i].valSingle();
      
        modalTXT[0].innerHTML+=(indexI+1)+") "+tovar[indexI].print(sumTovar)+` <input type="button" id="plus" value="+" onclick="plus(${indexI})" style="width:20px; padding:0px">/<input type="button" id="minus" value="-" onclick="minus(${indexI})" style="width:20px; padding:0px"> `+"<br><br>";
        obSumm+= sumTovar; 
       
        console.log(indexI)
    }
    
    numberPurchase[0].innerHTML= kolvoTovar;
    basket[0].innerHTML = '<img src="img/basketWithProduct.png" alt="Корзина" width="50px">';
    clearBasket[0].innerHTML = `<br><input type="submit" value="Очистить корзину" style="width:300px;" onclick="clearningBasket()">`;
    obSummOut.innerHTML =`Общая сумма покупки: ${obSumm}`;

}



function clearningBasket(){
    outputALL = ``
    tovar.splice(0, tovar.length);
    clearBasket[0].innerHTML = ``;
    obSummOut.innerHTML = ``;
    modalTXT[0].innerHTML = `Корзина пуста`; 
    numberPurchase[0].innerHTML = `0`; 
    obSumm = 0
    kolvoTovar= 0
    basket[0].innerHTML = '<img src="img/basketWithProduct.png" alt="Корзина" width="50px">';
}

function plus(indexI){
    
    tovar[indexI].quantity++
    kolvoTovar++
    showTovar(obSumm); 
}

function minus(indexI){
    tovar[indexI].quantity--
    kolvoTovar--
    showTovar(obSumm); 
    if(tovar[indexI].quantity <= 0 ){
       // clearningBasket()
        tovar[indexI].quantity = 0
        kolvoTovar=0
        showTovar(obSumm); 
    
    }
}