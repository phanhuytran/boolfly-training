(function ($) {
    $.fn.shoppingCart = function () {
        let summary = $(".summary"),
            products = $(".products"),
            quantityInput = $("input"),
            updateCart = $(".update-cart"),
            deleteList = {},
            sum = 0,
            selectedProduct = {},
            init = function () {
                displayQuantity();
                getLocalStorageProducts();
                displaySummary();
                selectedProducts();
                bindingEvent();
            },
            displayQuantity = function () {
                sum = +localStorage.getItem("sum");
            },
            getLocalStorageProducts = function () {
                if (localStorage.getItem("products")) {
                    selectedProduct = JSON.parse(localStorage.getItem("products"));
                }
            },
            bindingEvent = function () {
                updateCart.on("click", function () {
                    let quantityInput = products.find("input"),
                        newQuantity = 0;
                    for (let i = 0; i < quantityInput.length; i++) {
                        console.log(quantityInput.length);
                        let currentVal = Math.floor(quantityInput.eq(i).val());
                        if (currentVal > 100) {
                            quantityInput.eq(i).val("100");
                            selectedProduct[
                                quantityInput.eq(i).parent().attr("id")
                            ].quantity = 100;
                            newQuantity += 100;
                        } else if (currentVal > 0 && currentVal <= 100) {
                            quantityInput.eq(i).val(currentVal);
                            newQuantity += parseInt(currentVal);
                            selectedProduct[
                                quantityInput.eq(i).parent().attr("id")
                            ].quantity = currentVal;
                        } else {
                            quantityInput.eq(i).val("0");
                            quantityInput.eq(i).value += 0;
                            selectedProduct[
                                quantityInput.eq(i).parent().attr("id")
                            ].quantity = 0;
                        }
                    }
                    sum = newQuantity;
                    localStorage.setItem("sum", sum);
                    localStorage.setItem("products", JSON.stringify(selectedProduct));
                    displaySummary();
                });

                deleteList.on("click", function () {
                    let deleteTarget = $(this).parent();
                    sum -= Math.floor(+selectedProduct[deleteTarget.attr("id")].quantity);
                    selectedProduct[deleteTarget.attr("id")].quantity = 0;
                    localStorage.setItem("products", JSON.stringify(selectedProduct));
                    localStorage.setItem("sum", sum);
                    deleteTarget.remove();
                    displaySummary();
                });
            },
            displaySummary = function () {
                let totalCart = summary.children(".total-cart"),
                    $totalCost = summary.children(".total-cost"),
                    totalCost = 0;
                for (let i in selectedProduct) {
                    totalCost += selectedProduct[i].cost * selectedProduct[i].quantity;
                }
                totalCart.html(`Total cart: <span class="total">${sum}</span>`);
                $totalCost.html(`Total cost: <span class="total">${totalCost}$</span>`);
            },
            selectedProducts = function () {
                let element = "";
                for (let id in selectedProduct) {
                    if (selectedProduct[id].quantity > 0) {
                        element += `<li id="${id}">
                                      <img src="${selectedProduct[id].img}"><br />
                    <span class="product-name">${selectedProduct[id].productName}</span><br />
                    <span class="cost">${selectedProduct[id].cost}$</span><br />
                    <label>Quantity:</label>
                                      <input type="number" min="1" max="100" value="${selectedProduct[id].quantity}">
                                      <button class="delete"><i class="far fa-times-circle"></i> Delete</button>
                                  </li>`;
                    }
                }
                products.html(element);
                deleteList = products.find(".delete");
            };

        init();
    };
})(jQuery);

$(".body-content").shoppingCart();
