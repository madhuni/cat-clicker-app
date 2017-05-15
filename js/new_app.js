$(function() {
var model = {
    currentCat: null,
    cats: [{
        name: "Mr. Tom",
        imgSrc: "images/cat-image.jpg",
        count: 0,
        viewPanal: false
    }, {
        name: "Mr. Tommy",
        imgSrc: "images/cat-image-2.jpg",
        count: 0,
        viewPanal: false
    }]
};

var controller = {
    init: function () {
        model.currentCat = model.cats[0]; //setting the first cat object to the current cat
        catListView.init();
        catView.init();
        adminView.init();
    },
    getCats: function () {
        return model.cats;
    },
    setCat: function (cat) {
        model.currentCat = cat;
    },
    getCurrentCat: function () {
        return model.currentCat;
    },
    updateCounter: function () {
        model.currentCat.count++; // updating the current count by 1
        catView.render(); // rendering the view again with the updated value
        adminView.render(); // rendering the updated placeholder in the admin block
    },
    updateData: function (cat, name, image, count) {
        cat.name = name; //setting the new name to current object
        cat.imgSrc = image; //setting the current image-source
        cat.count = count; // setting the current count
        $("#cat-list .list-items").remove(); // removing all the list elements before showing the updated list
        catListView.render(controller.getCats()); // rendering the list again with the new updated values
        catView.render(); // rendering the new cat with new updated properties
        $("#admin-form input").val(""); // clearing all the input filed in the form after updation
        adminView.render(); // rendering the admin-panel with the new updated placeholders.
        this.closeAdminPanel(cat); // closing the admin-panel after updation
    },
    closeAdminPanel: function (cat) {
        if (cat.viewPanal) {
            $("#admin-form").addClass("no-display");
            cat.viewPanal = false;
            $("#admin-form input").val("");
        }
    },
    openAdminPanel: function (cat) {
        $("#admin-form").removeClass("no-display");
        cat.viewPanal = true;
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
        /* Using the 'even-deligation' method to assign the events to each list element */
        $("#cat-list").on("click", ".list-items", function () {
            var name = $(this).text();
            for (var i = 0; i < cats.length; i++) {
                var cat = cats[i];
                if (name === cat.name) {
                    controller.setCat(cat);
                    catView.render();
                    adminView.render();
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
        /* Adding click event on the image to update the count when the image is clicked */
        this.catImage.on('click', function () {
            controller.updateCounter();
        });

        this.render();
    },
    render: function () {
        var currentCat = controller.getCurrentCat();
        this.catImage.attr('src', currentCat.imgSrc);
        this.catName.text(currentCat.name);
        this.displayCount.text(currentCat.count);
    },
};

var adminView = {
    init: function () {
        var self = this;
        /* Getting the dom objects of the admin-panel */
        self.nameInput = $("#admin-cat-name input");
        self.urlInput = $("#admin-img-url input");
        self.countInput = $("#admin-cat-count input");
        self.adminButton = $("#admin-btn");
        self.updateButton = $("#update-btn");
        self.cancelButton = $("#cancel-btn");
        
        /* Adding the event handler to the admin-button */
        self.adminButton.on("click", function (e) {
            controller.openAdminPanel(controller.getCurrentCat());
        });
        
        /* Adding the event listener to the form when it is submitted */
        $("#admin-form").submit(function (event) {
            var newName = self.nameInput.val();
            var newUrl = self.urlInput.val();
            var newCount = self.countInput.val();
            controller.updateData(controller.getCurrentCat(), newName, newUrl, newCount);
            event.preventDefault(); // to prevent the further event after submit
        });

        self.cancelButton.on("click", function () {
            controller.closeAdminPanel(controller.getCurrentCat());
        });
    },
    render: function () {
        var currentCat = controller.getCurrentCat();
        this.nameInput.attr("placeholder", currentCat.name);
        this.urlInput.attr("placeholder", currentCat.imgSrc);
        this.countInput.attr("placeholder", currentCat.count);
    }
};
    
controller.init();
    
}());