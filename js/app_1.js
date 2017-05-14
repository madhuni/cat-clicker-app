$(function () {
    /* Creating the model for the project */
    var model = {
        cats: [{
            name: "Mr. Tom",
            imgSrc: "images/cat-image.jpg",
            count: 0,
            id: 1,
            displayAdmin: false
    }, {
            name: "Mr. Tommy",
            imgSrc: "images/cat-image-2.jpg",
            count: 0,
            id: 2,
            displayAdmin: false
    }, {
            name: "Mr. Bob",
            imgSrc: "images/cat-image-3.jpg",
            count: 0,
            id: 3,
            displayAdmin: false
    }, {
            name: "Mr. Meow",
            imgSrc: "images/cat-image-4.jpg",
            count: 0,
            id: 4,
            displayAdmin: false
    }, {
            name: "Miss Cutee",
            imgSrc: "images/cat-image-5.jpg",
            count: 0,
            id: 5,
            displayAdmin: false
    }]
    };

    /* Creating the controller for the project. It will communicate between model and view */
    var controller = {
        getCats: function () {
            return model.cats;
        },
        init: function () {
            listView.init();
            view.init();
        },
        openAdminPanel: function (cat) {
            if (cat.displayAdmin === false) {
                $("#admin-form").addClass('no-display');
            }
            
            var adminBtn = $("#admin-btn");
        },
        selectCat: function (catItems) {
            var cats = this.getCats(); // getting 'cats' from model through controller
            for (var i = 0; i < catItems.length; i++) {
                var cat = catItems[i]; // getting individual cat from list
                /* Using 'closures' in order to bind the 'click' event to each individual cat */
                $(cat).on("click", (function (cat) {
                    return function (event) {
                        var catName = $(cat).text(); //getting cat-name from the list
                        $("#cat-count-container .admin-row:last").remove();
                        $("#cat-count-container .cat-row:last").remove(); // removing the elements from display block (if any exists) so that there be always be single cat picture and count-container
                        for (var i = 0; i < cats.length; i++) {
                            if (cats[i].name === catName) {
                                view.renderCat(cats[i]);
                                view.renderClicks(cats[i]);
                                controller.openAdminPanel(cats[i]);
                            }
                        }
                    };
                })(cat));
            }
        }
    };

    /* This view will display the list of cats in the app. The list will contains the
    name of the cats to be chosen by user. */
    var listView = {
        init: function () {
            var cats = controller.getCats();
            this.render(cats);
        },
        render: function (cats) {
            var template = document.getElementById("list-temp");
            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                var clone = template.content.cloneNode(true);
                $(clone).find('.list-items').text(cat.name);
                template.parentElement.appendChild(clone);
            }
        }
    };

    /* This view object will render the "no of clicks" and "cat-image" on the app. */
    var view = {
        init: function () {
            var catItems = $("#cat-list").find(".list-items");
            controller.selectCat(catItems); // Initializing the 'selectCat' method to get the cat object
        },
        renderClicks: function (cat) {
            var catElement = $(".cat-image");
            $(catElement).on("click", (function (obj) {
                return function (event) {
                    var targetElm = event.target.parentElement.nextElementSibling;
                    obj.count++;
                    $(targetElm).find(".display-count").text(obj.count);
                };
            })(cat));
        },
        renderCat: function (cat) {
            var template = document.getElementById('temp');
            var clone = template.content.cloneNode(true);
            $(clone).find('img').attr("src", cat.imgSrc);
            $(clone).find(".cat-name").text(cat.name);
            $(clone).find(".display-count").text(cat.count);
            template.parentElement.appendChild(clone);
        }
    };
    controller.init();
});