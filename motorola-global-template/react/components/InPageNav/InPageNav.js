import React, { Component, Fragment } from "react";
import axios from "axios";
import Next from "./assets/next.svg";
import Previous from "./assets/previous.svg";
import InPageNavItem from "./InPageNavItem/index";
import "./InPageNav.global.css";
import $ from "jquery";

class InPageNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      outputs: props.data,
      selectedNavItem: "home",
      topPaddingForInPage: "",
      mainHeaderHeight: 0,
      stickyNavHeight: 0,
      isMobile: false,
      openMobileInPageNav: false,
      reduceTopPadding: this.props.reduceTopPadding
    };
  }

  expandedHeightInpageNav = 0;

  navHeightCalculate = () => {
    if (this.state.isMobile) {
      if (!this.state.reduceTopPadding) {
        return $("header.main-header").innerHeight();
      } else {
        return $(".product-page").innerHeight();
      }
    } else {
      if (!this.state.reduceTopPadding) {
        return (
          $("header.main-header").innerHeight() +
          $("div.sub-nav").innerHeight() +
          30
        );
      } else {
        return $(".product-page").innerHeight();
      }
    }
  };

  navItemClickedHandler = (event, field) => {
    this.setState({ selectedNavItem: event.target.href.split("#")[1] }, () => {
      if ($("#" + field)[0]) {
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop:
                field === "" || field === "home"
                  ? 0
                  : $("#" + field).offset().top - this.navHeightCalculate() + 1
            },
            850
          );
      }
    });

    event.preventDefault();

    if (this.state.isMobile) {
      if (
        !$(".in-page-navigation .in-page-navigation-block").hasClass("active")
      ) {
        this.setState({ openMobileInPageNav: true }, () => {
          this.expandInpageNavMobile();
        });
      } else {
        this.setState({ openMobileInPageNav: false }, () => {
          this.collapseInpageNavMobile();
        });
      }

      if (!this.state.openMobileInPageNav) {
        document.addEventListener(
          "click",
          e => {
            if (e.target.tagName.toLowerCase() !== "a") {
              e.preventDefault();
              if (this.state.openMobileInPageNav) {
                this.setState({ openMobileInPageNav: false }, () => {
                  this.collapseInpageNavMobile();
                });
              }
            }
          },
          true
        );
      }
    }
  };

  prevNextActiveLogic = () => {
    if (
      $(".in-page-navigation ul li")
        .first()
        .hasClass("active")
    ) {
      $(".in-page-navigation .previous").css({
        visibility: "hidden"
      });
    }
    if (
      !$(".in-page-navigation ul li")
        .first()
        .hasClass("active")
    ) {
      $(".in-page-navigation .previous").css({
        visibility: "visible"
      });
    }
    if (
      $(".in-page-navigation ul li")
        .eq(-1)
        .hasClass("active")
    ) {
      $(".in-page-navigation .next").css({
        visibility: "hidden"
      });
    }
    if (
      !$(".in-page-navigation ul li")
        .eq(-1)
        .hasClass("active")
    ) {
      $(".in-page-navigation .next").css({
        visibility: "visible"
      });
    }
  };

  expandInpageNavMobile = () => {
    $(".in-page-navigation-block")
      .show()
      .css({
        "max-height": "40px",
        height: "40px"
      })
      .animate(
        {
          "max-height": "300px",
          height: this.expandedHeightInpageNav + "px"
        },
        1000
      );
  };

  collapseInpageNavMobile = () => {
    $(".in-page-navigation-block")
      .show()
      .css({
        "max-height": "300px",
        height: this.expandedHeightInpageNav + "px"
      })
      .animate(
        {
          "max-height": "40px",
          height: "40px"
        },
        800
      );
  };

  setConfigInPageNav = () => {
    var current = this;
    this.setState({
      mainHeaderHeight:
        $("header.main-header").innerHeight() + $("div.sub-nav").innerHeight()
    });
    this.setState({ stickyNavHeight: $("header.product-page").innerHeight() });

    if ($(window).width() >= 768) {
      current.setState({ isMobile: false }, () => {
        $("div.flex.flex-grow-1.w-100.flex-column").css("margin-top", "30px");
      });
    } else {
      current.setState({ isMobile: true });
    }

    var lastId;
    var topMenu = $(".in-page-navigation");
    var menuItems = topMenu.find("a");
    this.expandedHeightInpageNav = (menuItems.length - 1) * 40;
    var scrollItems = menuItems.map(function() {
      var item = $($(this).attr("href"));

      if (item.length) {
        return item;
      }
    });

    $(window).scroll(function() {
      // Get container scroll position
      var fromTop = $(this).scrollTop() + current.navHeightCalculate() + 1;

      // Get id of current scroll item
      var cur;
      if (typeof scrollItems == 'undefined') {
        var topMenu = $(".in-page-navigation");
        var menuItems = topMenu.find("a");

        this.expandedHeightInpageNav = (menuItems.length - 1) * 40;

        var scrollItems = menuItems.map(function() {
          var item = $($(this).attr("href"));

          if (item.length) {
            return item;
          }
        });

        cur = scrollItems.map(function() {
          if ($(this)[0].offsetTop < fromTop) return this;
        });
      }
      else {
        cur = scrollItems.map(function() {
          if ($(this)[0].offsetTop < fromTop) return this;
        });
      }

      // Get the id of the current element
      cur = cur[cur.length - 1];
      var id = cur && cur.length ? cur[0].id : "";

      if (lastId !== id) {
        lastId = id;
        if (lastId != undefined && lastId !== "") {
          current.setState({ selectedNavItem: id });
        } else {
          current.setState({ selectedNavItem: "home" });
        }
      }
      current.prevNextActiveLogic();
    });

    current.prevNextActiveLogic();

    if (this.state.isMobile) {
      if (!$(".in-page-navigation-block").hasClass("active")) {
        setTimeout(function() {
          current.setState({ openMobileInPageNav: true }, () => {
            current.expandInpageNavMobile();
          });

          setTimeout(function() {
            current.setState({ openMobileInPageNav: false }, () => {
              current.collapseInpageNavMobile();
            });
          }, 2000);
        }, 1000);
      }

      if (!this.state.openMobileInPageNav) {
        document.removeEventListener(
          "click",
          e => {
            e.preventDefault();
          },
          true
        );
      }
    }
  };

  nextArrowClickHandler = e => {
    var count = $(".in-page-navigation ul li").length;
    if (count) {
      var currentActiveLiIndex = $(".in-page-navigation-block ul")
        .find("li.active")
        .index();
      if (currentActiveLiIndex <= count - 1) {
        var currentActiveLi = $(".in-page-navigation-block ul").find(
          "li.active"
        );
        this.setState({
          selectedNavItem: currentActiveLi
            .next("li")[0]
            .childNodes[0].href.split("#")[1]
        });

        this.prevNextActiveLogic();

        var href = currentActiveLi
          .next("li")
          .find("a")
          .attr("href");
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop:
                href === "#" || href === "#home"
                  ? 0
                  : $(href).offset().top - this.navHeightCalculate() + 1
            },
            850
          );
        e.preventDefault();
      }
    }
  };

  previousArrowClickHandler = e => {
    var count = $(".in-page-navigation ul li").length;
    if (count) {
      var currentActiveLiIndex = $(".in-page-navigation-block ul")
        .find("li.active")
        .index();
      if (currentActiveLiIndex <= count - 1) {
        var currentActiveLi = $(".in-page-navigation-block ul").find(
          "li.active"
        );
        this.setState({
          selectedNavItem: currentActiveLi
            .prev("li")[0]
            .childNodes[0].href.split("#")[1]
        });

        this.prevNextActiveLogic();

        var href = currentActiveLi
          .prev("li")
          .find("a")
          .attr("href");
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop:
                href === "#" || href === "#home"
                  ? 0
                  : $(href).offset().top - this.navHeightCalculate() + 1
            },
            850
          );
        e.preventDefault();
      }
    }
  };

  callJquery = () => {
    axios
      .get("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js")
      .then(data => {
        eval(data);
        setTimeout(() => {
          this.setConfigInPageNav();
        }, 2000);
      });
  };

  componentDidMount() {
    this.callJquery();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.reduceTopPadding !== this.props.reduceTopPadding) {
      this.setState({ reduceTopPadding: this.props.reduceTopPadding });
    }
  }

  render() {
    if (this.state.outputs.in_page_settings) {
      let inPageItems = null;
      if (this.state.outputs.in_page_settings) {
        inPageItems = this.state.outputs.in_page_settings.map((output, i) => {
          return (
            <InPageNavItem
              key={i}
              value={output.feature_name}
              linkValue={output.id_field}
              color={this.state.outputs.in_page_text_color}
              highlightColor={this.state.outputs.in_page_highlight_text_color}
              click={event =>
                this.navItemClickedHandler(event, output.id_field)
              }
              seletedItem={this.state.selectedNavItem}
            />
          );
        });
      }
      return (
        <Fragment>
          <div
            className="in-page-navigation clearfix"
            style={
              this.state.reduceTopPadding && !this.state.isMobile
                ? {
                  backgroundColor: this.state.outputs
                    .in_page_background_color,
                  top: this.navHeightCalculate() + "px",
                  marginTop: "0px"
                }
                : {
                  backgroundColor: this.state.outputs.in_page_background_color
                }
            }
          >
            <div className="col-xs-12">
              <div className="container">
                <div
                  className={
                    this.state.isMobile && this.state.openMobileInPageNav
                      ? "in-page-navigation-block active"
                      : "in-page-navigation-block"
                  }
                >
                  <span
                    className="previous"
                    onClick={this.previousArrowClickHandler}
                  >
                    <img src={Previous} alt="Up Arrow" />
                  </span>
                  <ul className="nav navbar-nav">
                    <li
                      className={
                        this.state.selectedNavItem == "home"
                          ? "active scroll-down"
                          : "scroll-down"
                      }
                      onClick={event =>
                        this.navItemClickedHandler(event, "home")
                      }
                    >
                      <a
                        href="#home"
                        style={
                          this.state.selectedNavItem == "home"
                            ? {
                              color: this.state.outputs
                                .in_page_highlight_text_color
                            }
                            : { color: this.state.outputs.in_page_text_color }
                        }
                      >
                        {decodeURIComponent(this.state.outputs.in_page_navigation_label)}
                      </a>
                    </li>
                    {inPageItems}
                  </ul>
                  <span className="next" onClick={this.nextArrowClickHandler}>
                    <img src={Next} alt="Down Arrow" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return null;
    }
  }
}

export default InPageNav;
