(function ($) {
    $.fn.lazyLoadingImage = function (options) {
        let settings = $.extend(options);

        let lazyLoad = function () {
            let images = $("img");
            for (image of images) {
                if (image.offsetTop < window.innerHeight + window.pageYOffset) {
                    $(image).attr("src", $(image).attr("data-src"));
                }
            }
        };

        lazyLoad();
        window.onscroll = function () {
            lazyLoad();
        };
    };
})(jQuery);

$(function () {
    $(".image-lazy").lazyLoadingImage({
        beforeOffSet: 20
    });
});

$(document).ready(function () {
    $(".go-to-top > a").hide();
    $(".go-to-top > a").click(function () {
        $("html, body").animate(
            {
                scrollTop: 0
            },
            800
        );
    });

    $(window).scroll(function () {
        if ($("html, body").scrollTop() > 200) {
            $(".go-to-top > a").fadeIn("slow");
        } else {
            $(".go-to-top > a").fadeOut("slow");
        }
    });
});
