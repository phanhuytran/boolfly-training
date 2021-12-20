(function ($) {
    $.fn.shoppingCart = function () {
        let addToCart = $(".add-to-cart"),
            quantity = $(".quantity"),
            sum = 0,
            selectedProduct = {},
            init = function () {
                displayQuantity();
                getLocalStorageProducts();
                bindingEvent();
            },
            displayQuantity = function () {
                sum = +localStorage.getItem("sum");
                if (sum) {
                    quantity.css("display", "flex");
                    if (sum >= 100) {
                        quantity.html("99+");
                    } else {
                        quantity.html(sum);
                    }
                }
            },
            getLocalStorageProducts = function () {
                if (localStorage.getItem("products")) {
                    selectedProduct = JSON.parse(localStorage.getItem("products"));
                }
            },
            bindingEvent = function () {
                addToCart.on("click", function () {
                    let currentId = $(this).attr("id");
                    if (localStorage.products) {
                        selectedProduct = JSON.parse(localStorage.getItem("products"));
                    }

                    if (selectedProduct[currentId]) {
                        selectedProduct[currentId].quantity += 1;
                    } else {
                        selectedProduct[currentId] = {
                            cost: $(this).attr("cost"),
                            quantity: 1,
                            img: `${$(this).parent().children("img").attr("src")}`,
                            productName: $(this).attr("product-name")
                        };
                    }

                    if (selectedProduct[currentId].quantity <= 100) {
                        sum += 1 || 1;
                    } else {
                        selectedProduct[currentId].quantity = 100;
                    }

                    localStorage.setItem("sum", sum);
                    localStorage.setItem("products", JSON.stringify(selectedProduct));
                    displayQuantity();
                });
            };

        init();
    };
})(jQuery);

$(".body-content").shoppingCart();
