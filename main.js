/*eslint-env browser*/

var glazingNames = ["NoneGlaze", "Vanilla", "Sugar", "Chocolate"];
var shoppingCart = [];

//function clearShoppingCart() {
//    var glazingRadios = document.getElementsByName('glazing');
//	for (var i = 0; i< glazingRadios.length; i++) {
//        localStorage.removeItem(glazingRadios[i].value)
//	}
//}

function addToCart() {
    var quantityToAdd = 0;
	var quantityRadios = document.getElementsByName('quantity1');
    if (quantityRadios[0].checked) {
		quantityToAdd = 1;
    } else if (quantityRadios[1].checked) {
        quantityToAdd = 3;
    } else if (quantityRadios[2].checked) {
		quantityToAdd = 6;
    } else if (quantityRadios[3].checked) {
		quantityToAdd = 12;
    }
    
    var glazingRadios = document.getElementsByName('glazing');
	for (var i = 0; i<glazingRadios.length; i++) {
        if (glazingRadios[i].checked) {
            
            //Store into browser cache
            var storedValue = localStorage.setItem("Glazing Type", glazingRadios[i].value);
            if (storedValue===null) {
				storedValue = '0';
           }
            var countInTheCart = parseInt(storedValue);
            var itemName = glazingRadios[i].value;

            countInTheCart = countInTheCart + quantityToAdd;
            localStorage.setItem(itemName, String(countInTheCart));
            
            shoppingCart.push(itemName);
            //do whatever you want with the checked radio
            //alert("The original cinnamon bun with "+ glazingRadios[i].value + " glazing was added to your cart!");	  
            //only one radio can be logically checked, don't check the rest
            break;
        }
    }
    
    var subTotal = 0;
    for (var j=0; j<quantityRadios.length; j++){
        subTotal+=quantityRadios[j].value;
        alert("the subtotal is"+subTotal);
	}
    displayShoppingCart();
}
document.getElementsByClassName("button2").addEventListener("click", addToCart());

function displayShoppingCart(){
    var innerHTML = ""
	
	var total = 0;
	for (var i = 0; i< glazingNames.length; i++){
		var itemCount = JSON.parse(localStorage.getItem(glazingNames[i]));
		if(itemCount>0)
		{
			total = total + 5*itemCount;
			innerHTML = "<h7>" + String(itemCount)+"</h7>	<h7>"+ glazingNames[i]+"</h7>	<h7>"+ "Original" + "</h7>	<h7>$5/ea</h7>"
		}
	}
    document.getElementById("itemList").innerHTML=innerHTML;
}
