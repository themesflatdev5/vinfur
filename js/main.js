/**
 
 * 
 
**/

(function ($) {
    ("use strict");

    /* headerFixed
  -------------------------------------------------------------------------*/
    const headerFixed = () => {
        const $header = $(".header-fixed");
        if ($header.length === 0) return;

        let isFixed = false;
        const scrollThreshold = 200;

        const handleScroll = () => {
            const shouldBeFixed = $(window).scrollTop() >= scrollThreshold;
            if (shouldBeFixed !== isFixed) {
                $header.toggleClass("is-fixed", shouldBeFixed);
                isFixed = shouldBeFixed;
            }
        };

        $(window).on("scroll", handleScroll);
        handleScroll();
    };

    /* Variant Picker
    -------------------------------------------------------------------------*/
    var variantPicker = function () {
        if ($(".variant-picker-item").length) {
            $(".color-btn").on("click", function (e) {
                var value = $(this).data("scroll");
                var value2 = $(this).data("color");

                $(".value-currentColor").text(value);
                $(".value-currentColor").text(value2);

                $(this)
                    .closest(".variant-picker-values")
                    .find(".color-btn")
                    .removeClass("active");
                $(this).addClass("active");
            });
            $(".size-btn").on("click", function (e) {
                var value = $(this).data("size");
                $(".value-currentSize").text(value);

                $(this)
                    .closest(".variant-picker-values")
                    .find(".size-btn")
                    .removeClass("active");
                $(this).addClass("active");
            });
            $(".tf-main-product .wg-quantity").on("click", function () {
                var value = $(this).find("input.quantity-product").val();
                $(".value-currentQuantity").text(value);
            });
        }
    };

    /* Select Image
    -------------------------------------------------------------------------*/
    var dropdownSelect = function () {
        // $(".tf-dropdown-select").selectpicker();
        if ($(".tf-dropdown-select").length > 0) {
            const selectIMG = $(".tf-dropdown-select");
            selectIMG.find("option").each((idx, elem) => {
                const selectOption = $(elem);
                const imgURL = selectOption.attr("data-thumbnail");
                if (imgURL) {
                    selectOption.attr(
                        "data-content",
                        `<img src="${imgURL}" alt="Country" /> ${selectOption.text()}`
                    );
                }
            });
            selectIMG.selectpicker();
        }
    };

    /* Handle Mobile Menu
    -------------------------------------------------------------------------*/
    var handleMobileMenu = function () {
        const $desktopMenu = $(".box-nav-menu:not(.not-append)").clone();
        $desktopMenu
            .find(".list-ver, .list-hor,.mn-none,.demo-label,.wrap-banner")
            .remove();

        const $mobileMenu = $('<ul class="nav-ul-mb"></ul>');

        $desktopMenu.find("> li.menu-item").each(function (i, menuItem) {
            const $item = $(menuItem);
            const text = $item
                .find("> a.item-link")
                .clone()
                .children()
                .remove()
                .end()
                .text()
                .trim();
            const submenu = $item.find("> .sub-menu");
            const id = "dropdown-menu-" + i;
            if (text.toLowerCase() === "home") {
                const $li = $(`
              <li class="nav-mb-item">
                  <a href="#${id}" class="collapsed mb-menu-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${id}">
                      <span>${text}</span>
                      <span class="icon icon-arrow-down"></span>
                  </a>
                  <div id="${id}" class="collapse">
                      <ul class="sub-nav-menu"></ul>
                  </div>
              </li>
          `);
                $(".modalDemo .demo-name").each(function () {
                    const $demoName = $(this);
                    const link = $demoName.attr("href") || "#";
                    const title = $demoName.text().trim();
                    const isActive = $demoName.hasClass("active");
                    if (title) {
                        const activeClass = isActive ? "active" : "";
                        $li.find(".sub-nav-menu").append(
                            `<li><a href="${link}" class="sub-nav-link ${activeClass}">${title}</a></li>`
                        );
                    }
                });
                $mobileMenu.append($li);
                return;
            }

            if (submenu.length > 0) {
                const $li = $(`
                <li class="nav-mb-item">
                    <a href="#${id}" class="collapsed mb-menu-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${id}">
                        <span>${text}</span>
                        <span class="icon icon-arrow-down"></span>
                    </a>
                    <div id="${id}" class="collapse"></div>
                </li>
            `);

                const $subNav = $('<ul class="sub-nav-menu"></ul>');

                submenu.find(".mega-menu-item").each(function (j) {
                    const heading = $(this).find(".menu-heading").text().trim();
                    const subId = `${id}-group-${j}`;
                    const $group = $(`
                    <li>
                        <a href="#${subId}" class="collapsed sub-nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="${subId}">
                            <span>${heading}</span>
                            <span class="icon icon-arrow-down"></span>
                        </a>
                        <div id="${subId}" class="collapse">
                            <ul class="sub-nav-menu sub-menu-level-2"></ul>
                        </div>
                    </li>
                `);

                    $(this)
                        .find(".sub-menu_list a")
                        .each(function () {
                            const $link = $(this);
                            const linkHref = $link.attr("href") || "#";
                            const title = $link.text().trim();
                            const isActive = $link.hasClass("active");

                            if (title !== "") {
                                const activeClass = isActive ? "active" : "";
                                $group
                                    .find(".sub-menu-level-2")
                                    .append(
                                        `<li><a href="${linkHref}" class="sub-nav-link ${activeClass}">${title}</a></li>`
                                    );
                            }
                        });

                    $subNav.append($group);
                });

                if ($subNav.children().length === 0) {
                    submenu.find("a").each(function () {
                        const link = $(this).attr("href") || "#";
                        const title = $(this).text().trim();
                        if (title !== "") {
                            $subNav.append(
                                `<li><a href="${link}" class="sub-nav-link">${title}</a></li>`
                            );
                        }
                    });
                }
                $li.find(`#${id}`).append($subNav);
                $mobileMenu.append($li);
            } else {
                $mobileMenu.append(
                    `<li class="nav-mb-item"><a href="${$item
                        .find("a")
                        .attr(
                            "href"
                        )}" class="mb-menu-link"><span>${text}</span></a></li>`
                );
            }
        });

        $("#wrapper-menu-navigation").empty().append($mobileMenu.html());
    };

    /* Total Price Variant
    -------------------------------------------------------------------------*/
    var totalPriceVariant = function () {
        $(
            ".tf-product-info-list,.tf-cart-item,.tf-mini-cart-item,.tf-sticky-btn-atc"
        ).each(function () {
            var productItem = $(this);
            var basePrice =
                parseFloat(
                    productItem.find(".price-on-sale").data("base-price")
                ) ||
                parseFloat(
                    productItem
                        .find(".price-on-sale")
                        .text()
                        .replace("$", "")
                        .replace(/,/g, "")
                );
            var quantityInput = productItem.find(".quantity-product");
            var personSale = parseFloat(
                productItem.find(".number-sale").data("person-sale") || 5
            );
            var compareAtPrice = basePrice * (1 + personSale / 100);

            productItem.find(".compare-at-price").text(
                `$${compareAtPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                })}`
            );
            productItem.find(".color-btn, .size-btn").on("click", function () {
                quantityInput.val(1);
            });

            productItem.find(".btn-increase").on("click", function () {
                var currentQuantity = parseInt(quantityInput.val(), 10);
                quantityInput.val(currentQuantity + 1);
                updateTotalPrice(null, productItem);
            });

            productItem.find(".btn-decrease").on("click", function () {
                var currentQuantity = parseInt(quantityInput.val(), 10);
                if (currentQuantity > 1) {
                    quantityInput.val(currentQuantity - 1);
                    updateTotalPrice(null, productItem);
                }
            });

            function updateTotalPrice(price, scope) {
                var currentPrice =
                    price ||
                    parseFloat(
                        scope
                            .find(".price-on-sale")
                            .text()
                            .replace("$", "")
                            .replace(/,/g, "")
                    );
                var quantity = parseInt(
                    scope.find(".quantity-product").val(),
                    10
                );
                var totalPrice = currentPrice * quantity;

                scope.find(".price-add").text(
                    `$${totalPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                    })}`
                );
            }
        });
    };

    /* Add Wishlist
    -------------------------------------------------------------------------*/
    var addWishList = function () {
        $(".btn-add-wishlist, .card-product .wishlist").on(
            "click",
            function () {
                let $this = $(this);
                let icon = $this.find(".icon");
                let tooltip = $this.find(".tooltip");

                $this.toggleClass("addwishlist");

                if ($this.hasClass("addwishlist")) {
                    icon.removeClass("icon-heart").addClass("icon-trash");
                    tooltip.text("Remove Wishlist");
                } else {
                    icon.removeClass("icon-trash").addClass("icon-heart");
                    tooltip.text("Add to Wishlist");
                }
            }
        );
        $(".btn-add-wishlist2").on("click", function () {
            let $this = $(this);
            let icon = $this.find(".icon");
            let text = $this.find(".text");

            $this.toggleClass("addwishlist");

            if ($this.hasClass("addwishlist")) {
                icon.removeClass("icon-heart").addClass("icon-trash");
                text.text("Remove List");
            } else {
                icon.removeClass("icon-trash").addClass("icon-heart");
                text.text("Add to List");
            }
        });
    };

    /* modal second
  -------------------------------------------------------------------------*/
    var clickModalSecond = function () {
        $(".btn-add-to-cart").on("click", function () {
            $(".tf-add-cart-success").addClass("active");
        });
        $(".tf-add-cart-success .tf-add-cart-close").on("click", function () {
            $(".tf-add-cart-success").removeClass("active");
        });
        $(".show-compare").on("click", function () {
            $("#compare").modal("show");
        });
        $(".show-size-guide").on("click", function () {
            $("#size-guide").modal("show");
        });
        $(".show-shopping-cart").on("click", function () {
            $("#shoppingCart").modal("show");
        });
        $(".btn-icon-action.wishlist").on("click", function () {
            $("#wishlist").modal("show");
        });

        $(".btn-add-note").on("click", function () {
            $(".add-note").addClass("open");
        });
        $(".btn-add-gift").on("click", function () {
            $(".add-gift").addClass("open");
        });
        $(".btn-estimate-shipping").on("click", function () {
            $(".estimate-shipping").addClass("open");
        });
        $(".tf-mini-cart-tool-close").on("click", function () {
            $(".tf-mini-cart-tool-openable").removeClass("open");
        });
    };

    /* Delete file 
  -------------------------------------------------------------------------------------*/
    var delete_file = function (e) {
        $(".remove").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest(".file-delete").remove();
        });
        $(".clear-file-delete").on("click", function (e) {
            e.preventDefault();
            $(this).closest(".list-file-delete").find(".file-delete").remove();
        });
    };

    /* Estimate Shipping
  -------------------------------------------------------------------------*/
    var estimateShipping = function () {
        if ($(".form-estimate-shipping").length) {
            const countrySelect = document.getElementById(
                "shipping-country-form"
            );
            const provinceSelect = document.getElementById(
                "shipping-province-form"
            );
            const zipcodeInput = document.getElementById("zipcode");
            const zipcodeMessage = document.getElementById("zipcode-message");
            const zipcodeSuccess = document.getElementById("zipcode-success");

            function updateProvinces() {
                const selectedCountry = countrySelect.value;
                const selectedOption =
                    countrySelect.options[countrySelect.selectedIndex];
                const provincesData =
                    selectedOption.getAttribute("data-provinces");

                const provinces = JSON.parse(provincesData);

                provinceSelect.innerHTML = "";

                if (provinces.length === 0) {
                    const option = document.createElement("option");
                    option.textContent = "------";
                    provinceSelect.appendChild(option);
                } else {
                    provinces.forEach((province) => {
                        const option = document.createElement("option");
                        option.value = province[0];
                        option.textContent = province[1];
                        provinceSelect.appendChild(option);
                    });
                }
            }

            countrySelect.addEventListener("change", updateProvinces);

            function validateZipcode(zipcode, country) {
                let regex;

                switch (country) {
                    case "Australia":
                        regex = /^\d{4}$/;
                        break;
                    case "Austria":
                        regex = /^\d{4}$/;
                        break;
                    case "Belgium":
                        regex = /^\d{4}$/;
                        break;
                    case "Canada":
                        regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
                        break;
                    case "Czech Republic":
                        regex = /^\d{5}$/;
                        break;
                    case "Denmark":
                        regex = /^\d{4}$/;
                        break;
                    case "Finland":
                        regex = /^\d{5}$/;
                        break;
                    case "France":
                        regex = /^\d{5}$/;
                        break;
                    case "Germany":
                        regex = /^\d{5}$/;
                        break;
                    case "United States":
                        regex = /^\d{5}(-\d{4})?$/;
                        break;
                    case "United Kingdom":
                        regex = /^[A-Za-z]{1,2}\d[A-Za-z\d]? \d[A-Za-z]{2}$/;
                        break;
                    case "India":
                        regex = /^\d{6}$/;
                        break;
                    case "Japan":
                        regex = /^\d{3}-\d{4}$/;
                        break;
                    case "Mexico":
                        regex = /^\d{5}$/;
                        break;
                    case "South Korea":
                        regex = /^\d{5}$/;
                        break;
                    case "Spain":
                        regex = /^\d{5}$/;
                        break;
                    case "Italy":
                        regex = /^\d{5}$/;
                        break;
                    case "Vietnam":
                        regex = /^\d{6}$/;
                        break;
                    default:
                        return true;
                }

                return regex.test(zipcode);
            }

            document
                .getElementById("form-estimate-shipping")
                .addEventListener("submit", function (event) {
                    const zipcode = zipcodeInput.value.trim();
                    const country = countrySelect.value;

                    if (!validateZipcode(zipcode, country)) {
                        zipcodeMessage.style.display = "block";
                        zipcodeSuccess.style.display = "none";
                        event.preventDefault();
                    } else {
                        zipcodeMessage.style.display = "none";
                        zipcodeSuccess.style.display = "block";
                        event.preventDefault();
                    }
                });

            window.onload = updateProvinces;
        }
    };

    /* Update Compare Empty
    -------------------------------------------------------------------------*/
    var tableCompareRemove = function () {
        $(".remove").on("click", function () {
            let $clickedCol = $(this).closest(".compare-col");
            let colIndex = $clickedCol.index();
            let $rows = $(".compare-row");
            let visibleCols = $(
                ".compare-row:first .compare-col:visible"
            ).length;

            if (visibleCols > 4) {
                $rows.each(function () {
                    $(this).find(".compare-col").eq(colIndex).fadeOut(300);
                });
            } else {
                $rows.each(function () {
                    let $cols = $(this).find(".compare-col");
                    let $colToMove = $cols.eq(colIndex);

                    $colToMove.children().fadeOut(300, function () {
                        let $parentRow = $(this).closest(".compare-row");
                        $colToMove.appendTo($parentRow);
                    });
                });
            }
        });
    };

    /* Color Swatch Product
  -------------------------------------------------------------------------*/
    var swatchColor = function () {
        if ($(".card-product, .banner-card_product").length > 0) {
            $(".color-swatch").on("click mouseover", function () {
                var $swatch = $(this);
                var swatchColor = $swatch
                    .find("img:not(.swatch-img)")
                    .attr("src");
                var imgProduct = $swatch
                    .closest(".card-product, .banner-card_product")
                    .find(".img-product");
                var colorLabel = $swatch.find(".color-label").text().trim();
                imgProduct.attr("src", swatchColor);
                $swatch
                    .closest(".card-product, .banner-card_product")
                    .find(".quickadd-variant-color .variant-value")
                    .text(colorLabel);
                $swatch
                    .closest(".card-product, .banner-card_product")
                    .find(".color-swatch.active")
                    .removeClass("active");
                $swatch.addClass("active");
            });
        }
    };

    /* Bottom Sticky
    --------------------------------------------------------------------------------------*/
    var scrollBottomSticky = function () {
        if ($("footer").length > 0) {
            $(window).on("scroll", function () {
                var scrollPosition = $(this).scrollTop();
                var myElement = $(".tf-sticky-btn-atc");
                var footerOffset = $("footer").offset().top;
                var windowHeight = $(window).height();

                if (
                    scrollPosition >= 500 &&
                    scrollPosition + windowHeight < footerOffset
                ) {
                    myElement.addClass("show");
                } else {
                    myElement.removeClass("show");
                }
            });
        }
    };

    /* Button Quantity
    -------------------------------------------------------------------------*/
    var btnQuantity = function () {
        $(".minus-btn").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest("div").find("input");
            var value = parseInt($input.val(), 10);

            if (value > 1) {
                value = value - 1;
            }
            $input.val(value);
        });

        $(".plus-btn").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            var $input = $this.closest("div").find("input");
            var value = parseInt($input.val(), 10);

            if (value > -1) {
                value = value + 1;
            }
            $input.val(value);
        });
    };

    /* Stagger Wrap
    -------------------------------------------------------------------------*/
    var staggerWrap = function () {
        if ($(".stagger-wrap").length) {
            var count = $(".stagger-item").length;
            for (var i = 1, time = 0.2; i <= count; i++) {
                $(".stagger-item:nth-child(" + i + ")")
                    .css("transition-delay", time * i + "s")
                    .addClass("stagger-finished");
            }
        }
    };

    /* Check Active 
    -------------------------------------------------------------------------*/
    var checkClick = function () {
        $(".flat-check-list").on("click", ".check-item", function () {
            $(this)
                .closest(".flat-check-list")
                .find(".check-item")
                .removeClass("active");
            $(this).addClass("active");
        });
    };

    /* infiniteslide
  -------------------------------------------------------------------------------------*/
    const infiniteslide = () => {
        if ($(".infiniteslide").length > 0) {
            $(".infiniteslide").each(function () {
                var $this = $(this);
                var style = $this.data("style") || "left";
                var clone = $this.data("clone") || 4;
                var speed = $this.data("speed") || 50;
                $this.infiniteslide({
                    speed: speed,
                    direction: style,
                    clone: clone,
                });
            });
        }
    };

    /* Handle Sidebar Filter 
    -------------------------------------------------------------------------*/
    var handleSidebarFilter = function () {
        $(".tf-btn-filter ,.sidebar-btn").on("click", function () {
            if ($(window).width() <= 1200) {
                $(".sidebar-filter,.overlay-filter").addClass("show");
            }
        });
        $(".close-filter,.overlay-filter").on("click", function () {
            $(".sidebar-filter,.overlay-filter").removeClass("show");
        });
    };

    /* Delete File 
    -------------------------------------------------------------------------*/
    var deleteFile = function (e) {
        function updateCount() {
            var count = $(".list-file-delete .file-delete").length;
            $(".prd-count").text(count);
        }

        function updateTotalPrice() {
            var total = 0;

            $(".list-file-delete .tf-mini-cart-item").each(function () {
                var priceText = $(this).find(".tf-mini-card-price").text().replace("$", "").replace(",", "").trim();
                var price = parseFloat(priceText);
                if (!isNaN(price)) {
                    total += price;
                }
            });

            var formatted = total.toLocaleString("en-US", { style: "currency", currency: "USD" });
            $(".tf-totals-total-value").text(formatted);
        }

        function updatePriceEach() {
            $(".each-prd").each(function () {
                var priceText = $(this).find(".each-price").text().replace("$", "").replace(",", "").trim();
                var price = parseFloat(priceText);
                var quantity = parseInt($(this).find(".quantity-product").val(), 10);
                if (!isNaN(price) && !isNaN(quantity)) {
                    var subtotal = price * quantity;
                    var formatted = subtotal.toLocaleString("en-US", { style: "currency", currency: "USD" });
                    $(this).find(".each-subtotal-price").text(formatted);
                }
            });
        }

        function updateTotalPriceEach() {
            var total = 0;

            $(".each-list-prd .each-prd").each(function () {
                var priceText = $(this).find(".each-subtotal-price").text().replace("$", "").replace(",", "").trim();
                var price = parseFloat(priceText);
                var quantity = parseInt($(this).find(".quantity-product").val(), 10);

                if (!isNaN(price) && !isNaN(quantity)) {
                    total += price * quantity;
                }
            });

            var formatted = total.toLocaleString("en-US", { style: "currency", currency: "USD" });
            $(".each-total-price").text(formatted);
        }

        function checkListEmpty() {
            $(".wrap-empty_text").each(function () {
                var $listEmpty = $(this);
                var $textEmpty = $listEmpty.find(".box-text_empty");
                var $otherChildren = $listEmpty.find(".list-empty").children().not(".box-text_empty");
                var $boxEmpty = $listEmpty.find(".box-empty_clear");
                if ($otherChildren.length > 0) {
                    $textEmpty.hide();
                } else {
                    $textEmpty.show();
                    $boxEmpty.hide();
                }
            });
        }

        if ($(".main-list-clear").length) {
            $(".main-list-clear").each(function () {
                var $mainList = $(this);

                $mainList.find(".clear-list-empty").on("click", function () {
                    $mainList.find(".list-empty").children().not(".box-text_empty").remove();
                    checkListEmpty();
                });
            });
        }
        function ortherDel() {
            $(".container .orther-del").remove();
        }
        $(".list-file-delete").on("input", ".quantity-product", function () {
            updateTotalPrice();
        });

        $(".list-file-delete,.each-prd").on("click", ".minus-quantity, .plus-quantity", function () {
            var $quantityInput = $(this).siblings(".quantity-product");
            var currentQuantity = parseInt($quantityInput.val(), 10);

            if ($(this).hasClass("plus-quantity")) {
                $quantityInput.val(currentQuantity + 1);
            } else if ($(this).hasClass("minus-quantity") && currentQuantity > 1) {
                $quantityInput.val(currentQuantity - 1);
            }

            updateTotalPrice();
            updatePriceEach();
            updateTotalPriceEach();
        });

        $(".remove").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.closest(".file-delete").remove();
            updateCount();
            updateTotalPrice();
            checkListEmpty();
            updateTotalPriceEach();
            ortherDel();
        });

        $(".clear-file-delete").on("click", function (e) {
            e.preventDefault();
            $(this).closest(".list-file-delete").find(".file-delete").remove();
            updateCount();
            updateTotalPrice();
            checkListEmpty();
        });
        checkListEmpty();
        updateCount();
        updateTotalPrice();
        updatePriceEach();
        updateTotalPriceEach();
    };


    // Dom Ready
    $(function () {
        variantPicker();
        dropdownSelect();
        handleMobileMenu();
        totalPriceVariant();
        addWishList();
        clickModalSecond();
        delete_file();
        estimateShipping();
        tableCompareRemove();
        swatchColor();
        scrollBottomSticky();
        btnQuantity();
        staggerWrap();
        checkClick();
        headerFixed();
        infiniteslide();
        handleSidebarFilter();
        deleteFile();
    });
})(jQuery);
