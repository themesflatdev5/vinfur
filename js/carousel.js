if ($(".modal-quick-view").length > 0) {
    var $modalRoot = $(".modal-quick-view");
    var mainQV = new Swiper(".modal-quick-view .tf-single-slide", {
        slidesPerView: 1,
        spaceBetween: 0,
        observer: true,
        observeParents: true,
        speed: 800,
        navigation: {
            nextEl: ".modal-quick-view .single-slide-next",
            prevEl: ".modal-quick-view .single-slide-prev",
        },
    });

    function updateModalActiveButton(type, activeIndex) {
        var btnClass = `.${type}-btn`;
        var dataAttr = `data-${type}`;
        var currentClass = `.value-current${capitalizeFirstLetter(type)}`;
        var selectClass = `.select-current${capitalizeFirstLetter(type)}`;
        $modalRoot.find(btnClass).removeClass("active");

        var currentSlide = $modalRoot
            .find(".tf-single-slide .swiper-slide")
            .eq(activeIndex);
        var currentValue = currentSlide.attr(dataAttr);

        if (currentValue) {
            $modalRoot
                .find(`${btnClass}[${dataAttr}='${currentValue}']`)
                .addClass("active");
            $modalRoot.find(currentClass).text(currentValue);
            $modalRoot.find(selectClass).text(currentValue);
        }
    }

    function scrollToModalSlide(type, value, color) {
        if (!value || !color) return;

        var matchingSlides = $modalRoot
            .find(".tf-single-slide .swiper-slide")
            .filter(function () {
                return (
                    $(this).attr(`data-${type}`) === value &&
                    $(this).attr("data-color") === color
                );
            });

        if (matchingSlides.length > 0) {
            var firstIndex = matchingSlides.first().index();
            mainQV.slideTo(firstIndex, 1000, false);
        } else {
            var fallbackSlides = $modalRoot
                .find(".tf-single-slide .swiper-slide")
                .filter(function () {
                    return $(this).attr(`data-${type}`) === value;
                });

            if (fallbackSlides.length > 0) {
                var fallbackIndex = fallbackSlides.first().index();
                mainQV.slideTo(fallbackIndex, 1000, false);
            }
        }
    }

    function setupModalVariantButtons(type) {
        $modalRoot.find(`.${type}-btn`).on("click", function (e) {
            var value = $(this).data(type);
            var color = $modalRoot.find(".value-currentColor").text();

            $modalRoot.find(`.${type}-btn`).removeClass("active");
            $(this).addClass("active");

            scrollToModalSlide(type, value, color);
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    ["color"].forEach((type) => {
        mainQV.on("slideChange", function () {
            updateModalActiveButton(type, this.activeIndex);
        });
        setupModalVariantButtons(type);
        updateModalActiveButton(type, mainQV.activeIndex);
    });
}

if ($(".sw-layout").length > 0) {
    $(".sw-layout").each(function () {
        var tfSwCategories = $(this);
        var swiperContainer = tfSwCategories.find(".swiper");
        if (swiperContainer.length === 0) return;
        var preview = swiperContainer.data("preview") || 1;
        var screenXl = swiperContainer.data("screen-xl") || preview;
        var tablet = swiperContainer.data("tablet") || 1;
        var mobile = swiperContainer.data("mobile") || 1;
        var mobileSm = swiperContainer.data("mobile-sm") || mobile;
        var spacing = swiperContainer.data("space") || 0;
        var spacingMd = swiperContainer.data("space-md") || spacing;
        var spacingLg = swiperContainer.data("space-lg") || spacing;
        var spacingXl = swiperContainer.data("space-xl") || spacingLg;
        var perGroup = swiperContainer.data("pagination") || 1;
        var perGroupMd = swiperContainer.data("pagination-md") || 1;
        var perGroupLg = swiperContainer.data("pagination-lg") || 1;
        var center = swiperContainer.data("slide-center") || false;
        var initSlide = swiperContainer.data("init-slide") || 0;
        var autoplay =
            swiperContainer.data("autoplay") == true ||
            swiperContainer.data("autoplay") == "true";
        var paginationType = swiperContainer.data("progressbar") || "bullets";
        var loop =
            swiperContainer.data("loop") == true ||
            swiperContainer.data("loop") == "true";
        var effect = swiperContainer.data("effect") || "slide";
        var nextBtn = tfSwCategories.find(".nav-next-layout")[0] || null;
        var prevBtn = tfSwCategories.find(".nav-prev-layout")[0] || null;
        var progressbar =
            tfSwCategories.find(".sw-pagination-layout")[0] ||
            tfSwCategories.find(".sw-progress-layout")[0] ||
            null;
        var fractionEl = tfSwCategories.find(".sw-fraction-layout")[0] || null;

        var swiperOptions = {
            slidesPerView: mobile,
            spaceBetween: spacing,
            speed: 1000,
            centeredSlides: center,
            initialSlide: initSlide,
            loop: loop,
            observer: true,
            observeParents: true,
            autoplay: autoplay
                ? {
                      delay: 4000,
                      disableOnInteraction: false,
                  }
                : false,
            pagination: progressbar
                ? {
                      el: progressbar,
                      clickable: true,
                      type: paginationType,
                  }
                : false,
            navigation: {
                nextEl: nextBtn,
                prevEl: prevBtn,
            },
            breakpoints: {
                575: {
                    slidesPerView: mobileSm,
                    spaceBetween: spacing,
                    slidesPerGroup: perGroup,
                },
                768: {
                    slidesPerView: tablet,
                    spaceBetween: spacingMd,
                    slidesPerGroup: perGroupMd,
                },
                992: {
                    slidesPerView: preview,
                    spaceBetween: spacingLg,
                    slidesPerGroup: perGroupLg,
                },
                1200: {
                    slidesPerView: screenXl,
                    spaceBetween: spacingXl,
                    slidesPerGroup: perGroupLg,
                },
            },
        };

        if (effect === "fade") {
            swiperOptions.effect = "fade";
            swiperOptions.fadeEffect = { crossFade: true };
        } else if (effect === "creative") {
            swiperOptions.effect = "creative";
            swiperOptions.creativeEffect = {
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
            };
        }

        var swiper = new Swiper(swiperContainer[0], swiperOptions);

        if (fractionEl) {
            swiper.on("init slideChange", function () {
                const current = String(swiper.realIndex + 1).padStart(2, "0");
                const totalSlides = String(
                    swiperContainer.find(
                        ".swiper-slide:not(.swiper-slide-duplicate)"
                    ).length
                ).padStart(2, "0");
                fractionEl.innerHTML = `<span class="current">${current}</span> / <span class="total">${totalSlides}</span>`;
            });
            swiper.emit("init");
        }
    });
}

$(".flat-thumbs-tes").each(function (index, container) {
    const $container = $(container);

    const $thumb = $container.find(".tf-thumb-tes");
    const $main = $container.find(".tf-tes-main");

    if ($thumb.length && $main.length) {
        const spaceThumbLg = $thumb.data("space-lg");
        const spaceThumb = $thumb.data("space");
        const effect = $thumb.data("effect") || "slide";

        const spaceTesLg = $main.data("space-lg");
        const spaceTes = $main.data("space");
        const effect2 = $main.data("effect") || "slide";

        const swThumb = new Swiper($thumb[0], {
            speed: 800,
            spaceBetween: spaceThumb,
            effect: effect,
            fadeEffect: effect === "fade" ? { crossFade: true } : undefined,
            breakpoints: {
                768: {
                    spaceBetween: spaceThumbLg,
                },
            },
        });

        const swTesMain = new Swiper($main[0], {
            speed: 800,
            navigation: {
                nextEl: $container.find(".nav-next-tes")[0],
                prevEl: $container.find(".nav-prev-tes")[0],
            },
            pagination: {
                el: $container.find(".sw-pagination-tes")[0],
                clickable: true,
            },
            effect: effect2,
            fadeEffect: effect2 === "fade" ? { crossFade: true } : undefined,
            spaceBetween: spaceTes,
            breakpoints: {
                768: {
                    spaceBetween: spaceTesLg,
                },
            },
        });

        // Kết nối 2 swiper
        swThumb.controller.control = swTesMain;
        swTesMain.controller.control = swThumb;
    }
});

if ($(".tf-sw-lookbook").length > 0) {
    var tfSwLb = $(".tf-sw-lookbook");
    var preview = tfSwLb.data("preview");
    var tablet = tfSwLb.data("tablet");
    var mobile = tfSwLb.data("mobile");
    var spacingLg = tfSwLb.data("space-lg");
    var spacingMd = tfSwLb.data("space-md");
    var spacing = tfSwLb.data("space");
    var perGroup = tfSwLb.data("pagination") || 1;
    var perGroupMd = tfSwLb.data("pagination-md") || 1;
    var perGroupLg = tfSwLb.data("pagination-lg") || 1;
    var loop = tfSwLb.data("loop");

    var mobileSm =
        tfSwLb.data("mobile-sm") !== undefined
            ? tfSwLb.data("mobile-sm")
            : mobile;
    var swiperLb = new Swiper(".tf-sw-lookbook", {
        slidesPerView: mobile,
        spaceBetween: spacing,
        observer: true,
        observeParents: true,
        speed: 1000,
        loop: loop,
        centeredSlides: true,
        pagination: {
            el: ".sw-pagination-lookbook",
            clickable: true,
        },
        slidesPerGroup: perGroup,
        navigation: {
            clickable: true,
            nextEl: ".nav-prev-lookbook",
            prevEl: ".nav-next-lookbook",
        },
        breakpoints: {
            575: {
                slidesPerView: mobileSm,
                spaceBetween: spacing,
                slidesPerGroup: perGroup,
            },
            768: {
                slidesPerView: tablet,
                spaceBetween: spacingMd,
                slidesPerGroup: perGroupMd,
            },
            1200: {
                slidesPerView: preview,
                spaceBetween: spacingLg,
                slidesPerGroup: perGroupLg,
            },
        },
    });

    $(".swiper-button").on("mousemove", function () {
        var slideIndex = $(this).data("slide");
        swiperLb.slideTo(slideIndex, 500, false);
    });
}
