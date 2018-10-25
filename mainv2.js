/*eslint-env browser*/
var shoppingCart = [];
//var glazingNames = ["noneGlaze", "Vanilla", "Sugar","Chocolate"];

function addToCart(glaze, price, quantity){
    var singleProduct={
        name: "name",
        glaze: "glaze",
        quantity: "quantity"
    }
    
    var quantityRadios = document.getElementsByName("quantity1");
    if (quantityRadios[0].checked) {
		singleProduct.glazing = 1;
    } else if (quantityRadios[1].checked) {
        singleProduct.glazing = 3;
    } else if (quantityRadios[2].checked) {
		singleProduct.glazing = 6;
    } else if (quantityRadios[3].checked) {
		singleProduct.glazing = 12;
    }
    
    var glazingRadios = document.getElementsByName("glazing");
    if (glazingRadios[0].checked) {
		singleProduct.glazing = glazingRadios[0].value;
    } else if (glazingRadios[1].checked) {
        singleProduct.glazing = glazingRadios[1].value
    } else if (glazingRadios[2].checked) {
		singleProduct.glazing = glazingRadios[2].value
    } else if (glazingRadios[3].checked) {
		singleProduct.glazing = glazingRadios[3].value
    }
    
    shoppingCart.push(singleProduct);
    localStorage
}

document.getElementsByClassName("button2").addEventListener("click", addToCart());