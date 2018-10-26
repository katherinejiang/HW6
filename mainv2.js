/*eslint-env browser*/
/*eslint-env document*/
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

var elements = document.getElementsByClassName("button2 click");
console.log("click works");
for(var i=0; i<elements.length; i++){
    elements[i].addEventListener("click", addToCart);
}
    
function optionsVal (options){
    var selectedOption;
    for(var i=0; i<options.length;i++){
        if(options[i].checked){
            selectedOption = options[i].value;
            break;
        }
    }
    return selectedOption;
}
    
function buildCartItem(glazing, price, quantity){
    var cartItem = {
    options:{
        glazing: glazing,
        price: price,
        quantity: quantity,
        },
    };
        return cartItem;
    }

function saveShoppingCart(cartItem){
    console.log("in the save function!");
    
    var cartFromStorage = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    console.log(cartFromStorage);
//    if(cartFromStorage.length>0){
        cartFromStorage.push(cartItem);
//    }else {
//        cartFromStorage=[cartItem];
//    }
    //this puts into localStorage
    console.log(cartFromStorage);
    localStorage.setItem('shoppingCart', JSON.stringify(cartFromStorage));
}

function addToCart(e){
    if (e && e.target){
        var quantityOptions;
        var glazeOptions;
        
        if(document.getElementsByName('quantity').length || document.getElementsByName('glazing').length){
            quantityOptions = optionsVal(document.getElementsByName('quantity'));
            glazeOptions = optionsVal(document.getElementsByName('glazing'));
        } 
    var priceOptions = quantityOptions*5;

    var shoppingCartItem = buildCartItem(glazeOptions, priceOptions, quantityOptions);

    saveShoppingCart(shoppingCartItem);        
    }
    }
    
//function loadShoppingCart() {
//    if(localStorage.getItem('shoppingCart')){
//        JSON.parse(localStorage.getItem('shoppingCart'));
//    }
//    loadShoppingCart();
//}
  
function clearShoppingCart(){
    console.log("shoppingcart cleared");
    localStorage.removeItem('shoppingCart');
}
    
//    document.onLoad = function(){
////        document.getElementById("clearbutton").addEventListener("click", function(){
////    console.log("shoppingcart cleared");
////    localStorage.removeItem('shoppingCart');
//});
//    }

function populateCartHtml() {
    // get cart 
    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    
    if (cart.length == 0)
    {
        //fix this later i guess ugh
        alert("No items in cart!");
    }
    else {
        for (var i = 0; i < cart.length; i++)
        {
            var itemList = document.getElementById("itemList");
            var itemRow = document.createElement("div");

            var attr = document.createAttribute("class");
            // class
            attr.value = "product-row";
            // class="product-row"

            itemRow.setAttribute("className", attr);
            
            // create glaze html
            var titleElement = document.createElement("h7");
            var titleNode = document.createTextNode(cart[i].options.glazing);
            titleElement.appendChild(titleNode);
            
            itemRow.appendChild(titleElement);
            
            itemList.appendChild(itemRow);
            
            
        }
    }
}

