/*eslint-env browser*/
/*eslint-env document*/
/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */


//this checks if the add to cart button is being clicked
var elements = document.getElementsByClassName("button2 click");
for (var i=0; i<elements.length; i++){
    elements[i].addEventListener("click", addToCart);
}

//goes through the form inputs and looks for which item is selected by the user
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

//function that creates a cart item as an object
function buildCartItem(id, name, glazing, price, quantity){
    var cartItem = {
    id:id,
    options:{
        name: name,
        glazing: glazing,
        price: price,
        quantity: quantity,
        }
    };
        return cartItem;
    }

//this puts the cartItem into localStorage
function saveShoppingCart(cartItem){
    cartFromStorage = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cartFromStorage.push(cartItem);
    console.log("hi i'm in the save");

    console.log(cartFromStorage);
    localStorage.setItem('shoppingCart', JSON.stringify(cartFromStorage));
}

//array where items are stored
var cartFromStorage = [];

//this runs whenever users adds items to their cart
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
        
    //creates a random id for each item in the cart
    var idNumber = Math.random();
    var shoppingCartItem = buildCartItem(idNumber, nameOptions, glazeOptions, priceOptions, quantityOptions);
    
    //save to localStorage
    saveShoppingCart(shoppingCartItem);
        
    //update cart counter at the top of the page
    countItems();
        
    }
}

//this clears the entire shopping cart and localStorage on the cart page when the button is clicked
function clearShoppingCart(){
    console.log("shoppingcart cleared");
    localStorage.removeItem('shoppingCart');
    window.location.reload();
}

//this updates the price when the quantity is changed on each product details page
function updatePrice(){
    var quantityOptions = optionsVal(document.getElementsByName('quantity'));
    var whatToReplace = document.getElementById("changePrice").firstChild;
    var newPriceNode = ("$"+quantityOptions*5);
    whatToReplace.nodeValue=newPriceNode;
    console.log(whatToReplace);
}

//this writes the shopping cart in HTML
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
            var idAttr = document.createAttribute("id");
            idAttr.value = cart[i].id;
            console.log(cart[i]);
            itemRow.className = "orderitem";
            itemRow.setAttributeNode(idAttr);
            
            //create name html
            var nameElement = document.createElement("h6");
            var nameNode = document.createTextNode(cart[i].options.name);
            nameElement.appendChild(nameNode);
            
            //create glaze html
            var glazeElement = document.createElement("h6");
            var glazeNode = document.createTextNode(cart[i].options.glazing);
            glazeElement.appendChild(glazeNode);
            
            //create quantity html
            var quantityElement = document.createElement("h6");
            
            var quantityNode = document.createTextNode(cart[i].options.quantity);
            quantityElement.appendChild(quantityNode);
            
            //create price html
            var priceElement = document.createElement("h6");
            var priceNode = document.createTextNode("$"+cart[i].options.price);
            priceElement.appendChild(priceNode);
            runningSubtotal += cart[i].options.price;
            
            //delete button
            var deleteElement = document.createElement("button");
            
            var onClickAttr = document.createAttribute("onClick");
            onClickAttr.value = "deleteCartRow(this)";
            deleteElement.setAttributeNode(onClickAttr);
            
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

//this counts the number of items in the cart and displays it next to Cart in the navbar
function countItems(){
    var cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    console.log(cart);
    var whatToReplace = document.getElementById("cartCount").firstChild;
    
    if(cart.length>=1){
    whatToReplace.nodeValue=cart.length;
    whatToReplace.parentNode.className = "dot";
    
    
    } else{
        whatToReplace.nodeValue = "";
        }
}


var deleteButtonClicked = document.getElementsByClassName("removeButton");

//this allows you to delete items in your cart
function deleteCartRow(buttonNode){
    console.log(buttonNode);
    var deletedItemId = buttonNode.parentNode.id;
    console.log(deletedItemId);
    buttonNode.parentNode.remove();
    
    var cart = JSON.parse(localStorage.getItem('shoppingCart'));
    //goes through your cart array and removes the item with the matching id
    for(var i=0; i<cart.length; i++){
        if(cart[i].id == deletedItemId){
            cart.splice(i, 1);
            break;
        }    
    }
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    window.location.reload();
    
}

function loadShoppingCart() {
    if (localStorage.getItem('shoppingCart')){
        cartFromStorage = JSON.parse(localStorage.getItem('shoppingCart'));
    }
    countItems();
}

loadShoppingCart();