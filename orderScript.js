/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

allFlavors = ["Salted Caramel", "Caramel", "Fluffy Bunny", "Hazelnut", "Caramel", "Peppermint", "Raspberry"];
var addFlavorsArray = [];
var optionNumber = 0;
var numberOfFlavors = 0;
var flavorsArray = [];
var subcats = true;


var ItemInfo = function (name, cost, subcats, flavors, addFlavors) {
    this.name = name;
    this.cost = cost;
    this.subcats = subcats;
    this.flavors = flavors;
    this.addFlavors = addFlavors;
    // "function literal" (when a variable is defined as a function) using the "this" keyword effectively creates a "class"
};

ItemInfo = new ItemInfo("0", "0", "0", "0", "true");

function loadInfo() {
    if(JSON.parse(localStorage.getItem("itemInfo")) !== null){
        ItemInfo = JSON.parse(localStorage.getItem("itemInfo"));
    }
}

//function subcatsSelection(subcatsString) {
//    var subcats = [];
//    var string = "";
//    if(subcatsString !== "0"){
//        subcats = subcatsString.split(",");
//        string += "<h6>Flavors</h6>" + 
//            + "<select name='flavorTypes'>";
//        for (var i in subcats) {
//            string += "<option value='" + subcats[i] + "'>" + subcats[i] + "</option>";
//        }
//        string += "</select>";
//    }
//    return string;
//}

function splitFlavors() {
    if(ItemInfo.subcats === "0") {
        flavorsArray.push(false); //if index 0 is false then there are not subcats
        var flavors = ItemInfo.flavors.split("~");
        for (var i in flavors){
            flavorsArray.push(flavors[i]);
        }
    }else{
        flavorsArray.push(true); //if index 0 is true then there are subcats
        var firstSplit = ItemInfo.flavors.split(",");
        for (var i in firstSplit){
            var secondSplit = firstSplit[i].split("~");
            flavorsArray.push(secondSplit);
        }
    }
}



function displayOrder(){
    var output = "";
    var flavors = "";
    if (ItemInfo.flavors[0] === true ){
        optionNumber++;
//        flavors += "<tr><td><input type='hidden' name='on0' value='subcat'>Pick a type:</td></tr><tr><td><select name='os0'>";
//        for (var i = 1; i < ItemInfo.flavors.length; i++){
//            flavors += "<optgroup label='" + ItemInfo.flavors[i][0] + "'>";
//            var subcatName = ItemInfo.flavors[i][0];
//            for(var k = 1; k < ItemInfo.flavors[i].length; k++){
//                flavors += "<option class='.flavorOption' subcat='" + subcatName + "' value='" + subcatName + "/" + ItemInfo.flavors[i][k] + "'>" + ItemInfo.flavors[i][k] + "</option>";
//            }
//            flavors += "</optgroup>";
//        }
//        flavors += "</select> </td></tr>";
        flavors += "<tr><td><input type='hidden' name='on1' value='subcat'>Pick a type:</td></tr><tr><td><select name='os1' class='select' id='subcatSelection'>";
        for(var g = 1; g < ItemInfo.flavors.length; g++){
            flavors += "<option>" + ItemInfo.flavors[g][0] + "</option>";
        }
        flavors += "</select> </td></tr>";
    }
    output = "<h2>" + ItemInfo.name + "</h2>"
        + "<h3>Cost: $" + ItemInfo.cost + "</h3>"
        + flavors;
    $(".orderChanges").html(output);
    $(".itemName").attr("value", ItemInfo.name);
    $(".itemPrice").attr("value", ItemInfo.cost);
}

function createAddFlavorString(amount){
    if (amount <= 0){
        return;
    }else if (ItemInfo.addFlavors === "true" && optionNumber < 4){
        for (i = 0; i < amount; i++){
            var addFlavors = "";
            optionNumber++;
            numberOfFlavors++;
            addFlavors += "<tr><td><input type='hidden' name='on" + optionNumber + "' value='flavor'>Pick a flavor:</td></tr><tr><td><select name='os" + optionNumber + "' class='select'>";
            for(var k in allFlavors){
                addFlavors += "<option>" + allFlavors[k] + "</option>";
            }
            addFlavors += "</select><button class='removeFlavorButton' data-item-number='" + (optionNumber) + "'>Remove this flavor.</button> </td></tr>";
            addFlavorsArray.push(addFlavors);
        }
    }else if(optionNumber >= 4){
        alert("Only 4 flavors can be added to a drink");
    }else {
//        var subcatName = $("#subcatSelection option:selected").text();
//        for (i = 0; i < amount; i++){
//            var addFlavors = "";
//            optionNumber++;
//            numberOfFlavors++;
//            addFlavors += "<tr><td><input type='hidden' name='on" + optionNumber + "' value='flavor'>Pick a flavor:</td></tr><tr><td><select name='os" + optionNumber + "' class='select'>";
//            for(var k = 1; k < ItemInfo.flavors.length; k++){
//                for(var j in ItemInfo.flavors[k]){
//                    addFlavors += "<option>" + ItemInfo.flavors[k][j] + "</option>";
//                }
//            }
//            addFlavors += "</select><button class='removeFlavorButton' data-item-number='" + (optionNumber) + "'>Remove this flavor.</button> </td></tr>";
//            addFlavorsArray.push(addFlavors);
//        }
        console.log("Non Flavor Item refering to other functions.");
        return;
    }
}

function displayFlavors() {
    var newHtml = "";
    for (var i in addFlavorsArray){
        newHtml += addFlavorsArray[i];
    }
    $(".addFlavors").html(newHtml);
}

function checkSubcats() {
    if (ItemInfo.flavors[0] === true){
        subcats = true;
    }else {
        subcats = false;
    }
    
}

function checkAddFlavors() {
    if (ItemInfo.addFlavors === "false"){
        $(".addFlavorButton").remove();
        if (subcats === true){
            nonFlavorItems(1, ItemInfo.flavors[1][0]);
        }else {
            nonFlavorItems(1, "");
        }
        displayFlavors();
    }
}

function nonFlavorItems(amount, subcatName) {
    if(subcatName !== ""){
        for (i = 0; i < amount; i++){
            var addFlavors = "";
            optionNumber = 2;
            numberOfFlavors = 1;
            addFlavorsArray = [];
            addFlavors += "<tr><td><input type='hidden' name='on" + optionNumber + "' value='flavor'>Pick a flavor:</td></tr><tr><td><select name='os" + optionNumber + "' class='select'>";
            for(var k = 1; k < ItemInfo.flavors.length; k++){
                if (ItemInfo.flavors[k][0] === subcatName){
                    for(var j = 1; j < ItemInfo.flavors[k].length; j++){
                        addFlavors += "<option>" + ItemInfo.flavors[k][j] + "</option>";
                    }
                }
            }
            addFlavors += "</select></td></tr>";
            addFlavorsArray.push(addFlavors);
        }
    }else {
        for (i = 0; i < amount; i++){
            var addFlavors = "";
            optionNumber = 2;
            numberOfFlavors = 1;
            addFlavorsArray = [];
            addFlavors += "<tr><td><input type='hidden' name='on" + optionNumber + "' value='flavor'>Pick a flavor:</td></tr><tr><td><select name='os" + optionNumber + "' class='select'>";
            for(var k = 1; k < ItemInfo.flavors.length; k++){
                addFlavors += "<option>" + ItemInfo.flavors[k] + "</option>";
            }
            addFlavors += "</select></td></tr>";
            addFlavorsArray.push(addFlavors);
        }
    }
}


$(".addFlavorButton").click(function(event){
    event.preventDefault();
    createAddFlavorString(1);
    displayFlavors();
});

$(".addFlavors").on("click", ".removeFlavorButton",function(event){    
    
    addFlavorsArray = [];
    if (ItemInfo.flavors[0] === true) {
        var newAmount = numberOfFlavors - 1;
        optionNumber -= numberOfFlavors;
        createAddFlavorString(newAmount);
        numberOfFlavors = newAmount;
    }else {
        var newAmount = numberOfFlavors - 1;
        optionNumber -= numberOfFlavors;
        createAddFlavorString(newAmount);
        numberOfFlavors = newAmount;
    }
    displayFlavors();
});


$(".orderChanges").on("click", "#subcatSelection", function(event){
    $(".addFlavors").empty();
    for(i = 1; i < ItemInfo.flavors.length; i++){
        if(ItemInfo.flavors[i][0] === $("#subcatSelection option:selected").text()){
            nonFlavorItems(1, ItemInfo.flavors[i][0]);
            displayFlavors();
            return;
        }
    }
});

$(".cartButton").click(function(event){
    event.preventDefault();            //*************************Stops people from ordering**********************************
    var orderReady = true;
    if (ItemInfo.name === "0"){
        event.preventDefault();
        alert("Please go to the menu page and pick an Item.");
        orderReady = false;
    }
    if ($(".nameText").val() === ""){
        event.preventDefault();
        alert("Please enter a name.");
        orderReady = false;
    }
    
    
    
    if (orderReady === true){
        alert("If you are a student ordering your drink will not be given to you and no money will be refunded.");
    }
});

loadInfo();
splitFlavors();
ItemInfo.flavors = flavorsArray;
checkSubcats();
checkAddFlavors();
console.log(ItemInfo);
displayOrder();
