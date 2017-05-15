var model = {
    currentCat: null,
    cats: [{
        name: "Mr. Tom",
        imgSrc: "images/cat-image.jpg",
        count: 0,
    }, {
        name: "Mr. Tommy",
        imgSrc: "images/cat-image-2.jpg",
        count: 0,
    }]
};

var controller = {
    init: function () {
        model.currentCat = model.cats[0];
        catListView.init();
        catView.init();
    },
    getCats: function () {
        return model.cats;
    },
    setCat: function (cat) {
        model.currentCat = cat;
//        console.log(model.currentCat);
    },
    getCurrentCat: function () {
        return model.currentCat;
    },
    updateCounter: function () {
        model.currentCat.count++;
        //console.log(model.currentCat.count);
        catView.render();
    }
};

var catListView = {
    init: function () {
        var cats = controller.getCats();
        this.render(cats);
        this.selectCat(cats);
    },
    render: function (cats) {
        var template = document.getElementById("list-temp");
        for (var i = 0; i < cats.length; i++) {
            var cat = cats[i];
            var clone = template.content.cloneNode(true);
            $(clone).find('.list-items').text(cat.name);
            template.parentElement.appendChild(clone);
        }
    },
    selectCat: function (cats) {
        $("#cat-list").on("click", ".list-items", function () {
            var name = $(this).text();
            for (var i =0; i<cats.length; i++) {
                var cat = cats[i];
                if (name === cat.name) {
                    controller.setCat(cat);
                    catView.render();
                }
            }
        });
    }
};

var catView = {
    init: function () {
        this.catImage = $(".cat-image");
        this.catName = $(".cat-name");
        this.displayCount = $(".display-count");
        
        this.catImage.on('click', function () {
            controller.updateCounter();
        });
        
        this.render();
    },
    render: function () {
        var currentCat = controller.getCurrentCat();
//        console.log(currentCat);
        
        this.catImage.attr('src', currentCat.imgSrc);
        this.catName.text(currentCat.name);
        this.displayCount.text(currentCat.count);
    },
};

controller.init();