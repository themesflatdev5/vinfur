/**
 * isMobile
 * headerFixed
 * responsiveMenu
 * themesflatSearch
 * detectViewport
 * blogLoadMore
 * commingsoon
 * goTop
 * retinaLogos
 * customizable_carousel
 * parallax
 * iziModal
 * bg_particles
 * pagetitleVideo
 * toggleExtramenu
 * removePreloader
 */

(function ($) {
    "use strict";

    /* Range Two Price
  -------------------------------------------------------------------------------------*/
    var rangeTwoPrice = function () {
        if ($("#price-value-range").length > 0) {
            var skipSlider = document.getElementById("price-value-range");
            var skipValues = [
                document.getElementById("price-min-value"),
                document.getElementById("price-max-value"),
            ];

            var min = parseInt(skipSlider.getAttribute("data-min"), 10) || 0;
            var max = parseInt(skipSlider.getAttribute("data-max"), 10) || 500;

            noUiSlider.create(skipSlider, {
                start: [min, max],
                connect: true,
                step: 1,
                range: {
                    min: min,
                    max: max,
                },
                format: {
                    from: function (value) {
                        return parseInt(value, 10);
                    },
                    to: function (value) {
                        return parseInt(value, 10);
                    },
                },
            });

            skipSlider.noUiSlider.on("update", function (val, e) {
                skipValues[e].innerText = val[e];
            });
        }
    };

    var handleProgress = function () {
        function handleProgressBar(showEvent, hideEvent, target) {
            $(".tf-progress-bar .value").css("width", "0%");
            $(target).on(hideEvent, function () {
                $(".tf-progress-bar .value").css("width", "0%");
            });

            $(target).on(showEvent, function () {
                setTimeout(function () {
                    var progressValue = $(".tf-progress-bar .value").data(
                        "progress"
                    );
                    $(".tf-progress-bar .value").css(
                        "width",
                        progressValue + "%"
                    );
                }, 600);
            });
        }

        if ($(".modal-shopping-cart").length > 0) {
            handleProgressBar(
                "show.bs.offcanvas",
                "hide.bs.offcanvas",
                ".modal-shopping-cart"
            );
        }

        if ($(".modal-shopping-cart").length > 0) {
            handleProgressBar(
                "show.bs.modal",
                "hide.bs.modal",
                ".modal-shopping-cart"
            );
        }
    };

    /* Switch Layout 
    -------------------------------------------------------------------------*/
    var swLayoutShop = function () {
        let isListActive = $(".sw-layout-list").hasClass("active");
        let userSelectedLayout = null;

        function hasValidLayout() {
            return (
                $("#gridLayout").hasClass("tf-col-2") ||
                $("#gridLayout").hasClass("tf-col-3") ||
                $("#gridLayout").hasClass("tf-col-4") ||
                $("#gridLayout").hasClass("tf-col-5") ||
                $("#gridLayout").hasClass("tf-col-6") ||
                $("#gridLayout").hasClass("tf-col-7")
            );
        }

        function updateLayoutDisplay() {
            const windowWidth = $(window).width();
            const currentLayout = $("#gridLayout").attr("class");

            if (!hasValidLayout()) {
                return;
            }

            if (isListActive) {
                $("#gridLayout").hide();
                $("#listLayout").show();
                $(".wrapper-control-shop")
                    .addClass("listLayout-wrapper")
                    .removeClass("gridLayout-wrapper");
                return;
            }

            if (userSelectedLayout) {
                if (windowWidth <= 767) {
                    setGridLayout("tf-col-2");
                } else if (
                    windowWidth <= 1200 &&
                    userSelectedLayout !== "tf-col-2"
                ) {
                    setGridLayout("tf-col-3");
                } else if (
                    windowWidth <= 1400 &&
                    (userSelectedLayout === "tf-col-5" ||
                        userSelectedLayout === "tf-col-6" ||
                        userSelectedLayout === "tf-col-7")
                ) {
                    setGridLayout("tf-col-4");
                } else {
                    setGridLayout(userSelectedLayout);
                }
                return;
            }

            if (windowWidth <= 767) {
                if (!currentLayout.includes("tf-col-2")) {
                    setGridLayout("tf-col-2");
                }
            } else if (windowWidth <= 1200) {
                if (!currentLayout.includes("tf-col-3")) {
                    setGridLayout("tf-col-3");
                }
            } else if (windowWidth <= 1400) {
                if (
                    currentLayout.includes("tf-col-5") ||
                    currentLayout.includes("tf-col-6") ||
                    currentLayout.includes("tf-col-7")
                ) {
                    setGridLayout("tf-col-4");
                }
            } else {
                $("#listLayout").hide();
                $("#gridLayout").show();
                $(".wrapper-control-shop")
                    .addClass("gridLayout-wrapper")
                    .removeClass("listLayout-wrapper");
            }
        }

        function setGridLayout(layoutClass) {
            $("#listLayout").hide();
            $("#gridLayout")
                .show()
                .removeClass()
                .addClass(`wrapper-shop tf-grid-layout ${layoutClass}`);
            $(".tf-view-layout-switch").removeClass("active");
            $(
                `.tf-view-layout-switch[data-value-layout="${layoutClass}"]`
            ).addClass("active");
            $(".wrapper-control-shop")
                .addClass("gridLayout-wrapper")
                .removeClass("listLayout-wrapper");
            isListActive = false;
        }

        $(document).ready(function () {
            if (isListActive) {
                $("#gridLayout").hide();
                $("#listLayout").show();
                $(".wrapper-control-shop")
                    .addClass("listLayout-wrapper")
                    .removeClass("gridLayout-wrapper");
            } else {
                $("#listLayout").hide();
                $("#gridLayout").show();
                updateLayoutDisplay();
            }
        });

        $(window).on("resize", updateLayoutDisplay);

        $(".tf-view-layout-switch").on("click", function () {
            const layout = $(this).data("value-layout");
            $(".tf-view-layout-switch").removeClass("active");
            $(this).addClass("active");
            $(".wrapper-control-shop").addClass("loading-shop");
            setTimeout(() => {
                $(".wrapper-control-shop").removeClass("loading-shop");
                if (isListActive) {
                    $("#gridLayout").css("display", "none");
                    $("#listLayout").css("display", "");
                } else {
                    $("#listLayout").css("display", "none");
                    $("#gridLayout").css("display", "");
                }
            }, 500);

            if (layout === "list") {
                isListActive = true;
                userSelectedLayout = null;
                $("#gridLayout").hide();
                $("#listLayout").show();
                $(".wrapper-control-shop")
                    .addClass("listLayout-wrapper")
                    .removeClass("gridLayout-wrapper");
            } else {
                userSelectedLayout = layout;
                setGridLayout(layout);
            }
        });
    };

    /* filterSort 
    -------------------------------------------------------------------------*/
    var filterSort = function () {
        let isListActive = $(".sw-layout-list").hasClass("active");
        let originalProductsList = $("#listLayout .card-product").clone();
        let originalProductsGrid = $("#gridLayout .card-product").clone();
        let paginationList = $("#listLayout .wg-pagination").clone();
        let paginationGrid = $("#gridLayout .wg-pagination").clone();

        $(".select-item").on("click", function () {
            const sortValue = $(this).data("sort-value");
            $(".select-item").removeClass("active");
            $(this).addClass("active");
            $(".text-sort-value").text($(this).find(".text-value-item").text());

            applyFilter(sortValue, isListActive);

            if ($(".meta-filter-shop").hasClass("active")) {
                $("#listLayout").append(
                    paginationList.clone().css("display", "none")
                );
                $("#gridLayout").append(
                    paginationGrid.clone().css("display", "none")
                );
            } else {
                $("#listLayout").append(
                    paginationList.clone().css("display", "flex")
                );
                $("#gridLayout").append(
                    paginationGrid.clone().css("display", "flex")
                );
            }
        });

        $(".tf-view-layout-switch").on("click", function () {
            const layout = $(this).data("value-layout");

            if (layout === "list") {
                isListActive = true;
                $("#gridLayout").hide();
                $("#listLayout").show();
            } else {
                isListActive = false;
                $("#listLayout").hide();
                setGridLayout(layout);
            }
        });

        function applyFilter(sortValue, isListActive) {
            let products;

            if (isListActive) {
                products = $("#listLayout .card-product");
            } else {
                products = $("#gridLayout .card-product");
            }

            if (sortValue === "best-selling") {
                if (isListActive) {
                    $("#listLayout")
                        .empty()
                        .append(originalProductsList.clone());
                } else {
                    $("#gridLayout")
                        .empty()
                        .append(originalProductsGrid.clone());
                }
                bindProductEvents();
                limitLayout();
                return;
            }

            if (sortValue === "price-low-high") {
                products.sort(
                    (a, b) =>
                        parseFloat(
                            $(a).find(".price-new").text().replace("$", "")
                        ) -
                        parseFloat(
                            $(b).find(".price-new").text().replace("$", "")
                        )
                );
            } else if (sortValue === "price-high-low") {
                products.sort(
                    (a, b) =>
                        parseFloat(
                            $(b).find(".price-new").text().replace("$", "")
                        ) -
                        parseFloat(
                            $(a).find(".price-new").text().replace("$", "")
                        )
                );
            } else if (sortValue === "a-z") {
                products.sort((a, b) =>
                    $(a)
                        .find(".name-product")
                        .text()
                        .localeCompare($(b).find(".name-product").text())
                );
            } else if (sortValue === "z-a") {
                products.sort((a, b) =>
                    $(b)
                        .find(".name-product")
                        .text()
                        .localeCompare($(a).find(".name-product").text())
                );
            }

            if (isListActive) {
                $("#listLayout").empty().append(products);
            } else {
                $("#gridLayout").empty().append(products);
            }

            bindProductEvents();
        }

        function setGridLayout(layoutClass) {
            $("#gridLayout")
                .show()
                .removeClass()
                .addClass(`wrapper-shop tf-grid-layout ${layoutClass}`);
            $(".tf-view-layout-switch").removeClass("active");
            $(
                `.tf-view-layout-switch[data-value-layout="${layoutClass}"]`
            ).addClass("active");
        }
        function bindProductEvents() {
            if ($(".card-product").length > 0) {
                $(".color-swatch").on("click, mouseover", function () {
                    var swatchColor = $(this).find("img").attr("src");
                    var imgProduct = $(this)
                        .closest(".card-product")
                        .find(".img-product");
                    imgProduct.attr("src", swatchColor);
                    $(this)
                        .closest(".card-product")
                        .find(".color-swatch.active")
                        .removeClass("active");
                    $(this).addClass("active");
                });
            }
            $(".size-box").on("click", ".size-item", function () {
                $(this)
                    .closest(".size-box")
                    .find(".size-item")
                    .removeClass("active");
                $(this).addClass("active");
            });
        }
        bindProductEvents();
    };

    /* Filter Products
  -------------------------------------------------------------------------------------*/
    var filterProducts = function () {
        const priceSlider = document.getElementById("price-value-range");

        const minPrice = parseInt(priceSlider.dataset.min, 10) || 0;
        const maxPrice = parseInt(priceSlider.dataset.max, 10) || 500;

        const filters = {
            minPrice: minPrice,
            maxPrice: maxPrice,
            category: [],
            style: [],
            material: [],
            availability: null,
            room: [],
        };

        priceSlider.noUiSlider.on("update", function (values) {
            filters.minPrice = parseInt(values[0], 10);
            filters.maxPrice = parseInt(values[1], 10);

            $("#price-min-value").text(filters.minPrice);
            $("#price-max-value").text(filters.maxPrice);

            applyFilters();
            updateMetaFilter();
            updatePagination();
        });
        $('input[name="category"]').on("change", function () {
            const categoryId = $(this).attr("id");
            const label = $(`label[for="${categoryId}"]`);
            const categoryLabel = label.find(".cate-text").text().trim();

            if ($(this).is(":checked")) {
                filters.category.push({ id: categoryId, label: categoryLabel });
            } else {
                filters.category = filters.category.filter(
                    (cate) => cate.id !== categoryId
                );
            }
            applyFilters();
            updateMetaFilter();
            updatePagination();
        });
        $('input[name="material"]').off("change").on("change", function () {
            const materialId = $(this).attr("id");
            const label = $(`label[for="${materialId}"]`);
            const materialLabel = label.find(".material-text").text().trim();
        
            if ($(this).is(":checked")) {
                if (!filters.material.some(m => m.id === materialId)) {
                    filters.material.push({ id: materialId, label: materialLabel });
                }
            } else {
                filters.material = filters.material.filter(
                    mat => mat.id !== materialId
                );
            }
        
            applyFilters();
            updateMetaFilter();
        });
        $('input[name="style"]').off("change").on("change", function () {
            const styleId = $(this).attr("id");
            const label = $(`label[for="${styleId}"]`);
            const styleLabel = label.find(".style-text").text().trim();
        
            if ($(this).is(":checked")) {
                if (!filters.style.some(m => m.id === styleId)) {
                    filters.style.push({ id: styleId, label: styleLabel });
                }
            } else {
                filters.style = filters.style.filter(
                    sty => sty.id !== styleId
                );
            }
        
            applyFilters();
            updateMetaFilter();
            updatePagination();
        });
        $('input[name="availability"]').on("change", function () {
            filters.availability =
                $(this).attr("id") === "inStock" ? "In Stock" : "Out of stock";
            applyFilters();
            updateMetaFilter();
            updatePagination();
        });

        $('input[name="room"]').on("change", function () {
            const roomId = $(this).attr("id");
            const label = $(`label[for="${roomId}"]`);
            console.log(label);
            const roomLabel = label.find(".room-text").text().trim();
            if ($(this).is(":checked")) {
                filters.room.push({ id: roomId, label: roomLabel });
            } else {
                filters.room = filters.room.filter(
                    (room) => room.id !== roomId
                );
            }
            applyFilters();
            updateMetaFilter();
            updatePagination();
        });

        function updatePagination() {
            if ($(".meta-filter-shop").hasClass("active") == true) {
                $("#listLayout .wd-full").css("display", "none");
                $("#gridLayout .wd-full").css("display", "none");
            }
        }
        function updateMetaFilter() {
            const appliedFilters = $("#applied-filters");
            const metaFilterShop = $(".meta-filter-shop");
        
            appliedFilters.html("");
        
            if (filters.minPrice > minPrice || filters.maxPrice < maxPrice) {
                appliedFilters.append(`
                    <span class="filter-tag remove-tag" data-filter="price">
                        <span class="icon icon-close"></span>
                        $${filters.minPrice} - $${filters.maxPrice}
                    </span>
                `);
            }
        
            if (filters.category.length > 0) {
                filters.category.forEach(cate => {
                    appliedFilters.append(`
                        <span class="filter-tag remove-tag"
                              data-filter="category"
                              data-value="${cate.id}">
                            <span class="icon icon-close"></span>
                            ${cate.label}
                        </span>
                    `);
                });
            }
        
            if (filters.material.length > 0) {
                filters.material.forEach(mat => {
                    appliedFilters.append(`
                        <span class="filter-tag remove-tag"
                              data-filter="material"
                              data-value="${mat.id}">
                            <span class="icon icon-close"></span>
                            ${mat.label}
                        </span>
                    `);
                });
            }
        
 
            if (filters.style.length > 0) {
                filters.style.forEach(sty => {
                    appliedFilters.append(`
                        <span class="filter-tag remove-tag"
                              data-filter="style"
                              data-value="${sty.id}">
                            <span class="icon icon-close"></span>
                            ${sty.label}
                        </span>
                    `);
                });
            }
        
            // AVAILABILITY (radio – single)
            if (filters.availability) {
                appliedFilters.append(`
                    <span class="filter-tag remove-tag" data-filter="availability">
                        <span class="icon icon-close"></span>
                        ${filters.availability}
                    </span>
                `);
            }
        
            // ROOM (checkbox – multiple)
            if (filters.room.length > 0) {
                filters.room.forEach(room => {
                    appliedFilters.append(`
                        <span class="filter-tag remove-tag"
                              data-filter="room"
                              data-value="${room.id}">
                            <span class="icon icon-close"></span>
                            ${room.label}
                        </span>
                    `);
                });
            }
        
            // TOGGLE UI
            const hasFiltersApplied = appliedFilters.children().length > 0;
            metaFilterShop.toggle(hasFiltersApplied);
            metaFilterShop.toggleClass("active", hasFiltersApplied);
            $("#remove-all").toggle(hasFiltersApplied);
        
            if (!hasFiltersApplied) {
                limitLayout();
            }
        }

        $("#applied-filters").on("click", ".remove-tag", function () {
            const filterType = $(this).data("filter");
            const filterValue = $(this).data("value");

            if (filterType === "price") {
                filters.minPrice = minPrice;
                filters.maxPrice = maxPrice;
                priceSlider.noUiSlider.set([minPrice, maxPrice]);
            }
            if (filterType === "category") {
                filters.category = filters.category.filter(
                    (cate) => cate.id !== filterValue
                );
                $(`input[name="category"][id="${filterValue}"]`).prop(
                    "checked",
                    false
                );
            }
            if (filterType === "material") {
                filters.material = filters.material.filter(
                    (mat) => mat.id !== filterValue
                );
                $(`input[name="material"][id="${filterValue}"]`).prop(
                    "checked",
                    false
                );
            }
            if (filterType === "style") {
                filters.style = filters.style.filter(
                    (sty) => sty.id !== filterValue
                );
                $(`input[name="style"][id="${filterValue}"]`).prop(
                    "checked",
                    false
                );
            }
            if (filterType === "availability") {
                filters.availability = null;
                $('input[name="availability"]').prop("checked", false);
            }

            if (filterType === "room") {
                filters.room = filters.room.filter(
                    (room) => room.id !== filterValue
                );
                $(`input[name="room"][id="${filterValue}"]`).prop(
                    "checked",
                    false
                );
            }

            applyFilters();
            updateMetaFilter();
        });

        function resetAllFilters() {
            filters.availability = null;
            filters.minPrice = minPrice;
            filters.maxPrice = maxPrice;
            filters.category = [];
            filters.material = [];
            filters.style = [];
            filters.room = [];

            priceSlider.noUiSlider.set([minPrice, maxPrice]);
            $('input[name="category"]').prop("checked", false);
            $('input[name="material"]').prop("checked", false);
            $('input[name="style"]').prop("checked", false);
            $('input[name="availability"]').prop("checked", false);
            $('input[name="room"]').prop("checked", false);

            applyFilters();
            updateMetaFilter();
        }

        $("#remove-all,#reset-filter,.remove-all-filters").on(
            "click",
            function () {
                resetAllFilters();
                limitLayout();
            }
        );

        $(".reset-price").on("click", function () {
            filters.minPrice = minPrice;
            filters.maxPrice = maxPrice;
            priceSlider.noUiSlider.set([minPrice, maxPrice]);
            applyFilters();
            updateMetaFilter();
        });

        function applyFilters() {
            let visibleProductCountGrid = 0;
            let visibleProductCountList = 0;

            $(".wrapper-shop .card-product").each(function () {
                const product = $(this);
                let showProduct = true;

                const priceText = product
                    .find(".price-new")
                    .text()
                    .replace("$", "");
                const price = parseFloat(priceText);

                if (price < filters.minPrice || price > filters.maxPrice) {
                    showProduct = false;
                }
                if (filters.category.length > 0) {
                    const cateId = product.data("category");
                    if (!filters.category.some((c) => c.id === cateId)) {
                        showProduct = false;
                    }
                }
                if (filters.material.length > 0) {
                    const mateId = product.data("material");
                    if (!filters.material.some((m) => m.id === mateId)) {
                        showProduct = false;
                    }
                }

                if (filters.style.length > 0) {
                    const styleId = product.data("style");
                    if (!filters.style.some((s) => s.id === styleId)) {
                        showProduct = false;
                    }
                }

                if (filters.availability) {
                    const availabilityStatus = product.data("availability");
                    if (filters.availability !== availabilityStatus) {
                        showProduct = false;
                    }
                }

                if (filters.room.length > 0) {
                    const roomId = product.data("room");
                    if (!filters.room.some((r) => r.id === roomId)) {
                        showProduct = false;
                    }
                }

                product.toggle(showProduct);

                if (showProduct) {
                    if (product.hasClass("grid")) {
                        visibleProductCountGrid++;
                    } else if (product.hasClass("product-list")) {
                        visibleProductCountList++;
                    }
                }
            });

            $("#product-count-grid").html(
                `<span class="count">${visibleProductCountGrid}</span> ${
                    visibleProductCountGrid === 1 ? "Product" : "Products"
                } found`
            );

            $("#product-count-list").html(
                `<span class="count">${visibleProductCountList}</span> ${
                    visibleProductCountList === 1 ? "Product" : "Products"
                } found`
            );
        }
    };

    /* Limit Layout
    -------------------------------------------------------------------------------------*/
    function limitLayout() {
        const $gridLayout = $("#gridLayout");
        const $listLayout = $("#listLayout");
        const gridItems = $("#gridLayout .card-product");
        const listItems = $("#listLayout .card-product");
        const layoutClassGrid = $gridLayout.attr("class") || "";
        const $btn = $("#loadMoreBtn");

        let maxItems = 0;
        let initItem = 0;
        let maxItemList = 5;

        if (layoutClassGrid.includes("tf-grid-1")) {
            maxItems = 3;
            initItem = 1;
        } else if (layoutClassGrid.includes("tf-col-2")) {
            maxItems = 6;
            initItem = 2;
        } else if (layoutClassGrid.includes("tf-col-3")) {
            maxItems = 12;
            initItem = 3;
        } else if (layoutClassGrid.includes("tf-col-4")) {
            maxItems = 16;
            initItem = 4;
        } else if (layoutClassGrid.includes("tf-col-5")) {
            maxItems = 10;
            initItem = 5;
        } else if (layoutClassGrid.includes("tf-col-6")) {
            maxItems = 12;
            initItem = 6;
        } else if (layoutClassGrid.includes("tf-col-7")) {
            maxItems = 14;
            initItem = 7;
        }

        function renderGrid() {
            gridItems.each(function (index) {
                if (index < maxItems) $(this).css("display", "flex");
                else $(this).hide();
            });

            const $wdFullGrid = $gridLayout.find(".wd-full");
            if (gridItems.length <= maxItems) $wdFullGrid.hide();
            else $wdFullGrid.css("display", "flex");
        }

        function renderList() {
            listItems.each(function (index) {
                if (index < maxItemList) $(this).css("display", "flex");
                else $(this).hide();
            });
        }

        function isElementAtHalfViewport($el) {
            if (!$el.length || !$el.is(":visible")) return false;

            const rect = $el[0].getBoundingClientRect();
            const vh =
                window.innerHeight || document.documentElement.clientHeight;

            return rect.top <= vh * 0.6;
        }

        let isLoading = false;

        function loadMore() {
            if (isLoading) return;
            if (gridItems.length <= maxItems) return;

            isLoading = true;
            $btn.addClass("loading").prop("disabled", true);

            setTimeout(function () {
                maxItems += initItem;
                renderGrid();

                isLoading = false;
                $btn.removeClass("loading").prop("disabled", false);

                if (
                    $btn.hasClass("infinite-scroll") &&
                    gridItems.length > maxItems
                ) {
                    if (isElementAtHalfViewport($btn)) {
                        loadMore();
                    }
                }
            }, 500);
        }

        renderGrid();
        renderList();

        $btn.off("click.limitLayout").on("click.limitLayout", function () {
            loadMore();
        });

        $(window)
            .off("scroll.limitLayout")
            .on("scroll.limitLayout", function () {
                if (!$btn.hasClass("infinite-scroll")) return;

                if (!$gridLayout.is(":visible")) return;

                if (isElementAtHalfViewport($btn)) {
                    loadMore();
                }
            });

        if ($btn.hasClass("infinite-scroll")) {
            $(window).trigger("scroll.limitLayout");
        }
    }

    // Dom Ready
    $(function () {
        rangeTwoPrice();
        handleProgress();
        swLayoutShop();
        filterSort();
        filterProducts();
        limitLayout();
    });
})(jQuery);
