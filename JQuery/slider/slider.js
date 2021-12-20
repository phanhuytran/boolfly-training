let slider = {
    currentImage: 1,
    sliderImage: $(".slider"),
    prevBtn: $("#prev"),
    nextBtn: $("#next"),
    pageSelector: $(".pagination"),
    paginationClass: "pageElement",
    currentActivePage: " activePage",
    option: {
        totalImage: 10,
        timoutPerImage: 6000
    },

    init: function () {
        this.create(10, 6000);
        this.data();
        this.event();
    },

    create: function (totalImage = 10, timoutPerImage = 6000) {
        this.option.totalImage = totalImage > 10 ? 10 : totalImage;
        this.option.timoutPerImage = timoutPerImage;
    },

    data: function () {
        this.renderPagination();
        this.renderImage();
        this.autoPlay(this.option.timoutPerImage);
    },

    event: function () {
        this.bindEventChangeImage();
    },

    renderImage: function () {
        let currentSlide = -(this.currentImage - 1) * 100;
        this.setActivePage();
        this.sliderImage.css('transform', 'translateX(' + currentSlide + '%)');
    },

    renderPagination: function () {
        let element = "";
        for (let i = 0; i < this.option.totalImage; i++) {
            element += `<span class=${this.paginationClass}></span>`;
        }
        this.pageSelector.append(element);
    },

    setActivePage: function () {
        this.removeActivePage();
        this.pageSelector.children()[this.currentImage - 1].className += this.currentActivePage;
    },

    removeActivePage: function () {
        for (let i = 0; i < this.option.totalImage; i++) {
            this.pageSelector.children()[i].className = this.paginationClass;
        }
    },

    bindEventChangeImage: function () {
        let self = this, oldImage;

        self.prevBtn.click(function () {
            oldImage = self.currentImage;
            self.currentImage - 1 < 1
                ? self.currentImage = self.option.totalImage : self.currentImage -= 1;
            self.renderImage();
        });

        self.nextBtn.click(function () {
            oldImage = self.currentImage
            self.currentImage + 1 > self.option.totalImage
                ? self.currentImage = 1 : self.currentImage += 1;
            self.renderImage();
        });

        $(`.${self.paginationClass}`).click(function () {
            oldImage = self.currentImage;
            self.currentImage = $(this).index() + 1;
            self.renderImage();
        });
    },

    autoPlay: function (time) {
        let self = this;
        setInterval(function () {
            self.currentImage + 1 > self.option.totalImage
                ? self.currentImage = 1 : self.currentImage += 1;
            self.renderImage();
        }, time)
    }
}

slider.init();
