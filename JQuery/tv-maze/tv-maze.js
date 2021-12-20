let api = {
    baseURL: "https://api.tvmaze.com",

    searchById: function (id) {
        let url = `${this.baseURL}/shows/${id}`;
        return $.get(url).done(function (res) {
            return res;
        });
    },

    searchByKeyword: function (kw) {
        let settings = {
            url: `${this.baseURL}/search/shows?q=${kw}`,
            method: "GET"
        };

        return $.ajax(settings).then(function (res) {
            return res;
        });
    },

    getImage: function (id) {
        let url = `${this.baseURL}/shows/${id}/images`;
        return $.get(url).done(function (res) {
            return res;
        });
    },

    getCast: function (id) {
        let url = `${this.baseURL}/shows/${id}/cast`;
        return $.get(url).done(function (res) {
            return res;
        });
    }
};

let getTVMazeInfo = {
    init() {
        this.addEventSearch();
    },

    id: 0,

    addEventSearch() {
        $(".btn-submit").click(this.searchList);
        $("#input-search").keypress(function (event) {
            if (event.key === "Enter") {
                getTVMazeInfo.searchList();
            }
        });

        $(".link").click(async function () {
            let cast = await api.getCast(getTVMazeInfo.id);
            getTVMazeInfo.renderCast(cast);
            $(".link").removeClass("active");
            $(this).addClass("active");
            $(".content").addClass("hidden");
            $(`.${$(this).attr("title")}-content`).removeClass("hidden");
        });

        $(".btn-back").click(() => {
            $(".information").addClass("hidden");
            $(".result").removeClass("hidden");
        });
    },

    async searchList() {
        const keyword = $("#input-search").val();
        try {
            if (keyword) {
                if (isNaN(keyword)) {
                    let res = await api.searchByKeyword(keyword);
                    $(".information").addClass("hidden");
                    $(".result").removeClass("hidden");
                    $(".result").empty();
                    $(".btn-back").show();
                    if (res.length > 0) {
                        for (let item of res) {
                            let movieList = document.createElement("div"),
                                movieDetail = document.createElement("a"),
                                img = document.createElement("img");
                            let linkTo = function () {
                                getTVMazeInfo.searchMovie(0, this);
                            };
                            img.classList.add("image", "lazy");
                            movieList.classList.add("result-item");
                            movieDetail.classList.add("movie-detail");
                            try {
                                img.setAttribute("data-src", item.show.image.original);
                            } catch (error) {
                                img.setAttribute(
                                    "data-src",
                                    "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
                                );
                            }
                            img.setAttribute("title", item.show.name);
                            movieDetail.classList.add("title");
                            movieDetail.setAttribute("title", item.show.name);
                            movieDetail.innerHTML = item.show.name;
                            movieList.appendChild(img);
                            movieList.appendChild(movieDetail);
                            img.onclick = linkTo.bind(item.show);
                            movieDetail.onclick = linkTo.bind(item.show);
                            $(".result").append(movieList);
                        }
                        $(".result").lazyLoadingImage();
                    } else {
                        $(".result").text("Not found!");
                    }
                } else {
                    $(".btn-back").hide();
                    $(".result").addClass("hidden");
                    getTVMazeInfo.searchMovie(keyword);
                }
            } else {
                alert("Please enter something!");
            }
        } catch (err) {
            alert("Something wrong! " + err + "");
        }
    },

    async searchMovie(id, res = null) {
        $(".result").addClass("hidden");
        try {
            if (!res) {
                res = await api.searchById(id);
            }
            getTVMazeInfo.renderGeneral(res);
            $(".link").removeClass("active");
            $(".link:first").addClass("active");
            $(".content").addClass("hidden");
            $(".main-content").removeClass("hidden");
            getTVMazeInfo.id = res.id;
            getTVMazeInfo.renderDetail(res);
        } catch (err) {
            getTVMazeInfo.renderGeneral(null);
        }
    },

    renderGeneral(content) {
        if (content) {
            let img = content.image
                ? content.image.original
                : "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png";
            $(".information img:first")
                .attr({ src: img, title: img, alt: img })
                .css({ width: "100%", height: "auto", marginRight: "10px" });
            $(".information .title:first").text(content.name);
            $(".information").removeClass("hidden");
        } else {
            alert("404 Error. Not found!");
        }
    },

    renderDetail(content) {
        let description = content.summary ? content.summary : "No description";
        $(".information .description").html(description);

        let detailList = $(".detail-list").empty();
        if (content) {
            let details = [
                "network",
                "schedule",
                "status",
                "type",
                "genres",
                "officialSite"
            ];
            for (let item of details) {
                let infoName = document.createElement("dt"),
                    infoContent = document.createElement("dd");
                switch (item) {
                    case "network":
                        try {
                            infoName.innerHTML = "Network: ";
                            infoContent.innerHTML = content[item].name;
                        } catch (err) {
                            console.log(err);
                        }
                        break;
                    case "schedule":
                        infoName.innerHTML = "Schedule: ";
                        infoContent.innerHTML = content[item].days[0];
                        if (content[item].time) {
                            infoContent.innerHTML += ` at ${content[item].time}`;
                        }
                        if (content.runtime) {
                            infoContent.innerHTML += ` (${content.runtime} min)`;
                        }
                        break;
                    case "status":
                        infoName.innerHTML = "Status: ";
                        infoContent.innerHTML = content[item];
                        break;
                    case "type":
                        infoName.innerHTML = "Show Type: ";
                        infoContent.innerHTML = content[item];
                        break;
                    case "genres":
                        if (content[item].length) {
                            infoName.innerHTML = "Genres: ";
                            infoContent.innerHTML = content[item][0];
                            for (let i = 1; i < content[item].length; i++) {
                                infoContent.innerHTML += ` | ${content[item][i]}`;
                            }
                        }
                        break;
                    case "officialSite":
                        let movieLink = document.createElement("a");
                        infoName.innerHTML = "Official site: ";
                        movieLink.setAttribute("href", content[item]);
                        movieLink.setAttribute("title", content[item]);
                        movieLink.innerHTML = content[item];
                        infoContent.appendChild(movieLink);
                        break;
                }
                if (infoContent.innerHTML) {
                    detailList.append(infoName);
                    detailList.append(infoContent);
                }
            }
        }
    },

    renderCast(content) {
        $(".cast-content").empty();
        if (content.length > 0) {
            for (let item of content) {
                let castItem = document.createElement("div"),
                    img = document.createElement("img"),
                    info = document.createElement("div"),
                    title = document.createElement("p"),
                    castName = document.createElement("a"),
                    detail = document.createElement("p"),
                    role = document.createElement("a");

                castItem.classList.add("cast-item");
                img.classList.add("img-cast", "image", "lazy");
                try {
                    img.setAttribute("data-src", item.character.image.medium);
                } catch (error) {
                    try {
                        img.setAttribute("data-src", item.person.image.medium);
                    } catch (error) {
                        img.setAttribute(
                            "data-src",
                            "https://static.tvmaze.com/images/no-img/no-img-portrait-clean.png"
                        );
                    }
                }
                img.setAttribute("title", item.person.name);

                info.classList.add("cast-info");
                castItem.appendChild(img);
                castItem.appendChild(info);

                title.classList.add("cast-title");
                castName.setAttribute("href", "#");
                castName.setAttribute("title", item.person.name);
                castName.innerHTML = item.person.name;
                title.appendChild(castName);

                detail.innerHTML = "as ";
                role.setAttribute("href", "#");
                role.setAttribute("title", item.character.name);
                role.innerHTML = item.character.name;
                detail.appendChild(role);

                info.appendChild(title);
                info.appendChild(detail);
                $(".cast-content").append(castItem);
            }
            setTimeout(function () {
                $(".cast-content").lazyLoadingImage({ beforeOffSet: 200 });
            }, 1);
        } else {
            $(".cast-content").text("Not found!");
        }
    }
};

(function ($) {
    $.fn.lazyLoadingImage = function (options) {
        let settings = $.extend({ beforeOffSet: 10 }, options);
        let lazyLoad = function () {
            let images = $(".image.lazy");
            for (let image of images) {
                if (
                    image.offsetTop <
                    window.innerHeight + window.pageYOffset + settings.beforeOffSet
                ) {
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
    getTVMazeInfo.init();
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
