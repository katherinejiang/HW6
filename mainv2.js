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
//    var newPriceElement = document.createElement("span");
//    newPriceElement.appendChild(newPriceNode);
//    console.log(newPriceElement);
//    whatToReplace.replaceParent(newPriceElement, whatToReplace);
    
}

function populateCartHtml() {
    // get cart 
    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    
    if (cart.length == 0)
    {
        //fix this later
        console.log("You don't have anything in your cart yet!");
    }
    else {
        for (var i = 0; i < cart.length; i++)
        {
            var itemList = document.getElementById("itemList");
            var itemRow = document.createElement("div");

            //var attr = document.createAttribute("class");
            // class
            //attr.value = "tablegridrow";
            // class="product-row"
//            var attr = "cart-row";
//            itemRow.setAttribute("class", attr);
            itemRow.className = "orderitem";
            
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
            
            itemRow.appendChild(nameElement);
            itemRow.appendChild(glazeElement);
            itemRow.appendChild(quantityElement);
            itemRow.appendChild(priceElement);
            
            itemList.appendChild(itemRow);
            
        }
    }
}

