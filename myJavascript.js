
function myHotDrinks() {
    var x = document.getElementById("hotDrinks");
    if (x.style.display !== "block") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function myColdDrinks() {
    var x = document.getElementById("coldDrinks");
    if (x.style.display !== "block") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function mySnacks() {
    var x = document.getElementById("snacks");
    if (x.style.display !== "block") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

var ItemInfo = function (name, cost, subcats, flavors) {
    this.name = name;
    this.cost = cost;
    this.subcats = subcats;
    this.flavors = flavors;
    // "function literal" (when a variable is defined as a function) using the "this" keyword effectively creates a "class"
};

ItemInfo = new ItemInfo("0", "0", "0", "0");

$(".order-button").click(function(event){
    var subcats = "";
    var flavors = "";
    var name = $(this).attr("data-item-name");
    var cost = $(this).attr("data-item-cost");
    subcats = $(this).attr("data-item-subcats");
    if($(this).attr("data-item-flavors") !== undefined){
        flavors = $(this).attr("data-item-flavors");
    }else{
        flavors = "0";
    }
    var addFlavors = $(this).attr("data-item-add-flavors");
    ItemInfo.name = name;
    ItemInfo.cost = cost;
    ItemInfo.subcats = subcats;
    ItemInfo.flavors = flavors;
    ItemInfo.addFlavors = addFlavors;
    saveInfo();
});

function saveInfo() {
    localStorage.setItem("itemInfo", JSON.stringify(ItemInfo));
}
