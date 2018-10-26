/*eslint-env browser*/
/*eslint-env document*/
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */


var elements = document.getElementsByClassName("button2 click");
for (var i=0; i<elements.length; i++){
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
    cartFromStorage = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cartFromStorage.push(cartItem);
    console.log("hi i'm in the save");
    //this puts into localStorage
    console.log(cartFromStorage);
    localStorage.setItem('shoppingCart', JSON.stringify(cartFromStorage));
}

var cartFromStorage = [];
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
    countItems();
        
    }
}
    
function clearShoppingCart(){
    console.log("shoppingcart cleared");
    localStorage.removeItem('shoppingCart');
    window.location.reload();
}
    
function updatePrice(){
    var quantityOptions = optionsVal(document.getElementsByName('quantity'));
    var whatToReplace = document.getElementById("changePrice").firstChild;
    var newPriceNode = ("$"+quantityOptions*5);
    whatToReplace.nodeValue=newPriceNode;
    console.log(whatToReplace);
}

function populateCartHtml() {
    //get cart 
    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    var whatToReplace = document.getElementById("subtotalReplace").firstChild;
    var runningSubtotal = 0;
    
    if (cart.length == 0) {
        var itemList = document.getElementById("itemList");
        var noElement = document.createElement("h3");
        var noNode = document.createTextNode("You haven't added anything to your cart yet!");
        
        noElement.appendChild(noNode);
        itemList.appendChild(noElement);        
        whatToReplace.nodeValue="$0";
    }
    else {
        for (var i = 0; i < cart.length; i++){
            itemList = document.getElementById("itemList");
            var itemRow = document.createElement("div");

            itemRow.className = "orderitem";
            
            //create name html
            var nameElement = document.createElement("h7");
            var nameNode = document.createTextNode(cart[i].options.name);
            nameElement.appendChild(nameNode);
            
            //create glaze html
            var glazeElement = document.createElement("h7");
            var glazeNode = document.createTextNode(cart[i].options.glazing);
            glazeElement.appendChild(glazeNode);
            
            //create quantity html
            var quantityElement = document.createElement("h7");
            
            var quantityNode = document.createTextNode(cart[i].options.quantity);
            quantityElement.appendChild(quantityNode);
            
            //create price html
            var priceElement = document.createElement("h7");
            var priceNode = document.createTextNode("$"+cart[i].options.price);
            priceElement.appendChild(priceNode);
            runningSubtotal += cart[i].options.price;
            
            //delete button
            var deleteElement = document.createElement("button");
            var deleteNode = document.createTextNode("Remove");
            deleteElement.className ="removeButton";
            deleteElement.appendChild(deleteNode);
            
            //display everything onto DOM
            itemRow.appendChild(quantityElement);
            itemRow.appendChild(nameElement);
            itemRow.appendChild(glazeElement);
            itemRow.appendChild(priceElement);
            itemRow.appendChild(deleteElement);
            
            itemList.appendChild(itemRow);
        }
    }
        whatToReplace.nodeValue="$"+runningSubtotal;
}

function countItems(){
    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    console.log(cart);
    var whatToReplace = document.getElementById("cartCount").firstChild;
    if(cart.length>=1){
    whatToReplace.nodeValue=cart.length;
    } else{
        whatToReplace.nodeValue = "";
    }
}

var deleteButtonClicked = document.getElementsByClassName("removeButton");
deleteButtonClicked.addEventListener('click', deleteCartRow());
function deleteCartRow(){
    
}

function loadShoppingCart() {
    if (localStorage.getItem('shoppingCart')){
        cartFromStorage = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    countItems();
}

loadShoppingCart();