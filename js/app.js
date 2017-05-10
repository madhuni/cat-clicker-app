/*
var $catImage = $(".cat-image");
console.log($catImage);
var counterFunction = function () {
    var counts = [0, 0];
    for (var i = 0; i < $catImage.length; i++) {
        $catImage[i].on("click", function (event) {
            var targetElement = event.target.parentElement.nextElementSibling;
            console.log(targetElement);
            count[i] = count + 1;
            $(targetElement).find('h2').text(count);
        });
    }
}
*/
var cats = [{
    name: "Mr. Tom",
    imgSrc: "images/cat-image.jpg",
    count: 0,
    id: 1
}, {
    name: "Mr. Tommy",
    imgSrc: "images/cat-image-2.jpg",
    count: 0,
    id: 2
}, {
    name: "Mr. Bob",
    imgSrc: "images/cat-image-3.jpg",
    count: 0,
    id: 3
}, {
    name: "Mr. Meow",
    imgSrc: "images/cat-image-4.jpg",
    count: 0,
    id: 4
}];

var displayList = function () {
    var template = document.getElementById("list-temp");
    for (var i = 0; i < cats.length; i++) {
        var cat = cats[i];
        var clone = template.content.cloneNode(true);
        $(clone).find('.list-items').text(cat.name);
        template.parentElement.appendChild(clone);
    }
};

// old function as per the requirement 2 of the project
/*var displayTemplate = function () {
    var template = document.getElementById('temp');
    for (var i = 0; i < cats.length; i++) {
        var cat = cats[i];
        var clone = template.content.cloneNode(true);
        $(clone).find('img').attr("src", cat.imgSrc);
        $(clone).find(".cat-name").text(cat.name);
        $(clone).find(".display-count").text(cat.count);
        template.parentElement.appendChild(clone);
    }
};*/

var displayTemplate = function (catName) {
    var nameOfCat = catName;
    var template = document.getElementById('temp');
    for (var i = 0; i < cats.length; i++) {
        var cat = cats[i];
        if (cat.name === nameOfCat) {
            var clone = template.content.cloneNode(true);
            $(clone).find('img').attr("src", cat.imgSrc);
            $(clone).find(".cat-name").text(cat.name);
            $(clone).find(".display-count").text(cat.count);
            template.parentElement.appendChild(clone);
        }
    }
};

// Old function as per the requirements-2 of the project
/*var displayClicks = function (cats) {
    var catElement = $(".cat-image");
    var catArray = cats;
    //    console.log(catArray);
    // Using 'closures' in order to acheive the functionality
    for (var i = 0; i < catElement.length; i++) {
        $(catElement[i]).on("click", (function (obj) {
            return function (event) {
                var targetElm = event.target.parentElement.nextElementSibling;
                obj.count++;
                $(targetElm).find(".display-count").text(obj.count);
            };
        })(catArray[i]));
    }

    // Adding the event listerner one by one to the objects (wrong way of doing and not scalable)

    /*$(catElement[0]).on("click", function (event) {
        var targetElm = event.target.parentElement.nextElementSibling;
        catArray[0].count++;
        $(targetElm).find(".display-count").text(catArray[0].count);
    });

    $(catElement[1]).on("click", function (event) {
        var targetElm = event.target.parentElement.nextElementSibling;
        catArray[1].count++;
        $(targetElm).find(".display-count").text(catArray[1].count);
    });*/

var displayClicks = function (catObject) {
    var catElement = $(".cat-image");
//    console.log(catObject);
    $(catElement).on("click", (function (obj) {
        return function (event) {
            var targetElm = event.target.parentElement.nextElementSibling;
            obj.count++;
            $(targetElm).find(".display-count").text(obj.count);
        };
    })(catObject));
};

var selectCat = function () {
    var catItem = $("#cat-list").find(".list-items");
    for (var i = 0; i < catItem.length; i++) {
        $(catItem[i]).on("click", (function (selectedCat) {
            return function (event) {
                var catName = $(selectedCat).text();
                $("#cat-count-container .row:last").remove();
                displayTemplate(catName);
                for (var i = 0; i < cats.length; i++) {
                    if (cats[i].name === catName) {
                        displayClicks(cats[i]);
                    }
                }
            };
        })(catItem[i]));
    }

};

$(document).ready(function () {
    displayList();
    selectCat();
    //    displayTemplate();
    //    displayClicks(cats);
});