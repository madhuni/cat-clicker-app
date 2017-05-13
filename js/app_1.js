$(function () {
    var model = {
        cats: [{
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
    }]
    };

    var controller = {
        getCats: function () {
            return model.cats;
        },
        init: function () {
            listView.init();
            view.init();
        }
    };

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

    var view = {
        init: function () {
            var catItems = $("#cat-list").find(".list-items");
            this.selectCat(catItems);
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
        },
        selectCat: function (catItems) {
            var cats = controller.getCats();
            for (var i = 0; i < catItems.length; i++) {
                var cat = catItems[i];
                $(cat).on("click", (function (cat) {
                    return function (event) {
                        var catName = $(cat).text();
                        $("#cat-count-container .row:last").remove();
                        for (var i = 0; i < cats.length; i++) {
                            if (cats[i].name === catName) {
                                view.renderCat(cats[i]);
                                view.renderClicks(cats[i]);
                            }
                        }
                    };
                })(cat));
            }
        }
    };
    
    controller.init();
});