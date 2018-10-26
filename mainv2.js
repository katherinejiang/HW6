/*eslint-env browser*/
/*eslint-env document*/
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */

var elements = document.getElementsByClassName("button2 click");
console.log("click works");
for(var i=0; i<elements.length; i++){
    elements[i].addEventListener("click", addToCart);
    
}



//var inputQuantity = document.getElementsByName("quantity");
//inputQuantity.addEventListener("input", function (){
//    console.log("did this price change work");
//  }
//);
    
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

function buildCartItem(name, glazing, price, quantity){
    var cartItem = {
    options:{
        name: name,
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
    var checkBunType = document.getElementById("bunName");
    var nameOptions = checkBunType.dataset.name;
    var shoppingCartItem = buildCartItem(nameOptions, glazeOptions, priceOptions, quantityOptions);

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
    window.location.reload();
}
    
//    document.onLoad = function(){
////        document.getElementById("clearbutton").addEventListener("click", function(){
////    console.log("shoppingcart cleared");
////    localStorage.removeItem('shoppingCart');
//});
//    }

function updatePrice(){
    var quantityOptions = optionsVal(document.getElementsByName('quantity'));
    var whatToReplace = document.getElementById("changePrice").firstChild;
    var newPriceNode = ("$"+quantityOptions*5);
    whatToReplace.nodeValue=newPriceNode;
    console.log(whatToReplace);

}

//function updateSubtotal(){
//    var currentSubtotal = document.getElementById("itemList");
//    console.log(currentSubtotal.childNodes.length);
//    var whatToReplace = document.getElementById("subtotalReplace").firstChild;
//    console.log(whatToReplace);
//    var runningSubtotal = 0;
//    
//    for (var i = 0; i<currentSubtotal.childNodes.length; i++){
//        runningSubtotal +=currentSubtotal.childNodes[i];
//        
//    }
//
//    whatToReplace.nodeValue=runningSubtotal;
//}

function populateCartHtml() {
    // get cart 
    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    var whatToReplace = document.getElementById("subtotalReplace").firstChild;
    
    if (cart.length == 0)
    {
        var itemList = document.getElementById("itemList");
        var noElement = document.createElement("h3");
        var noNode = document.createTextNode("You haven't added anything to your cart yet!");
        noElement.appendChild(noNode);
        
        itemList.appendChild(noElement);
        
        
        whatToReplace.nodeValue="$0";
    }
    else {
        var runningSubtotal = 0;
        for (var i = 0; i < cart.length; i++)
        {
            var itemList = document.getElementById("itemList");
            var itemRow = document.createElement("div");

            itemRow.className = "orderitem content";
            
            // create name html
            var nameElement = document.createElement("h7");
            var nameNode = document.createTextNode(cart[i].options.name);
            nameElement.appendChild(nameNode);
            
            // create glaze html
            var glazeElement = document.createElement("h7");
            var glazeNode = document.createTextNode(cart[i].options.glazing);
            glazeElement.appendChild(glazeNode);
            
            // create quantity html
            var quantityElement = document.createElement("h7");
            var quantityNode = document.createTextNode(cart[i].options.quantity);
            quantityElement.appendChild(quantityNode);
            
            // create price html
            var priceElement = document.createElement("h7");
            var priceNode = document.createTextNode("$"+cart[i].options.price);
            priceElement.appendChild(priceNode);
            runningSubtotal += cart[i].options.price;
            console.log(runningSubtotal);
        
            
            itemRow.appendChild(quantityElement);
            itemRow.appendChild(nameElement);
            itemRow.appendChild(glazeElement);
            itemRow.appendChild(priceElement);
            
            itemList.appendChild(itemRow);
            
            
            
        }
    }
    
    
        whatToReplace.nodeValue="$"+runningSubtotal;
}

