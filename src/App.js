import React, { useEffect } from "react";
// import "./App.css";
// import Main from './Component/Main.js';
import { preloadImages } from "./Component/js/utils.js";
import { Slideshow } from "./Component/js/slideshow.js";
import gsap from "gsap";
import "./Component/css/base.css";
function App() {
    document.documentElement.className = "js";
    var supportsCssVars = function () {
        var e,
            t = document.createElement("style");
        return (
            (t.innerHTML = "root: { --tmp-var: bold; }"),
            document.head.appendChild(t),
            (e = !!(
                window.CSS &&
                window.CSS.supports &&
                window.CSS.supports("font-weight", "var(--tmp-var)")
            )),
            t.parentNode.removeChild(t),
            e
        );
    };
    supportsCssVars() ||
        alert(
            "Please view this demo in a modern browser that supports CSS Variables."
        );
    useEffect(() => {
        // body element
        const bodyEl = document.body;
        // body color
        const bodyColor =
            getComputedStyle(bodyEl).getPropertyValue("--color-bg");
        // Three Slideshow instances: main, and two for the navigation items
        const slideshowMain = new Slideshow(
            document.querySelector(".slideshow > div.slides")
        );
        const slideshowNavNext = new Slideshow(
            document.querySelector(".slideshow nav.nav--next .slides"),
            { duration: 1, filtersAnimation: false }
        );
        const slideshowNavPrev = new Slideshow(
            document.querySelector(".slideshow nav.nav--prev .slides"),
            { duration: 1, filtersAnimation: false }
        );
        // Nav controls to navigate the main slideshow
        const navCtrls = {
            prev: document.querySelector(".slideshow nav.nav--prev"),
            next: document.querySelector(".slideshow nav.nav--next"),
        };
        // title elements
        const titleElems = [
            ...document.querySelectorAll(
                ".meta__content > .meta__content-title"
            ),
        ];

        // Animates the body color
        const animateBodyBGColor = () => {
            gsap.timeline()
                .to(
                    bodyEl,
                    {
                        duration: slideshowMain.duration / 2,
                        ease: "power3.in",
                        backgroundColor: "#2b0889",
                    },
                    "start"
                )
                .to(
                    bodyEl,
                    {
                        duration: slideshowMain.duration,
                        ease: "power3",
                        backgroundColor: bodyColor,
                    },
                    "start+=" + slideshowMain.duration / 2
                );
        };

        // Set the current slide
        slideshowMain.setInitialSlide();
        // Set up the current slide values for the navigation elements, which are based on the slideshowMain's current value
        slideshowNavPrev.setInitialSlide(
            slideshowMain.current
                ? slideshowMain.current - 1
                : slideshowMain.slidesTotal - 1
        );
        slideshowNavNext.setInitialSlide(
            slideshowMain.current < slideshowMain.slidesTotal - 1
                ? slideshowMain.current + 1
                : 0
        );

        // Set initial title
        gsap.set(titleElems[slideshowMain.current], { opacity: 1 });

        // Change slides for the three slideshows
        const onClickNavCtrlEv = (dir) => {
            if (slideshowMain.isAnimating) return;

            // Slide out current title
            gsap.to(titleElems[slideshowMain.current], {
                duration: slideshowMain.duration / 2,
                ease: "power3.in",
                y: dir === "next" ? "-100%" : "100%",
                opacity: 0,
            });

            slideshowMain[dir]();
            slideshowNavPrev[dir]();
            slideshowNavNext[dir]();
            animateBodyBGColor();

            // Slide in the new (current) title
            gsap.to(titleElems[slideshowMain.current], {
                duration: slideshowMain.duration / 2,
                ease: "power3",
                startAt: { y: dir === "next" ? "100%" : "-100%" },
                y: "0%",
                opacity: 1,
                delay: slideshowMain.duration / 2,
            });
        };
        navCtrls.prev.addEventListener("click", () => onClickNavCtrlEv("prev"));
        navCtrls.next.addEventListener("click", () => onClickNavCtrlEv("next"));

        // Preload images then remove loader (loading class)
        preloadImages(".slides__img-inner").then(() =>
            document.body.classList.remove("loading")
        );
    }, []);

    return (
            <main>
                <svg
                    className="vector vector--lines"
                    width="100%"
                    height="100%"
                    viewBox="0 0 1441 790"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path
                        vectorEffect="non-scaling-stroke"
                        d="M1035.5 790V0m-315 790V0m-317 790V0M.5 490h1440M.5 725h1440M.5 490l403 235m633 .5 403-235"
                    />
                </svg>
                <svg
                    className="vector vector--circle"
                    width="100%"
                    height="100%"
                    viewBox="0 0 634 634"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                >
                    <circle
                        vectorEffect="non-scaling-stroke"
                        cx={316}
                        cy={316}
                        r={316}
                    />
                </svg>
                <h1 className="title">Paranoia Diaries</h1>
                <nav className="menu">
                    <a className="menu__item" href="/#" rel="noopener noreferrer">
                        Contact
                    </a>
                    <a className="menu__item" href="/#" rel="noopener noreferrer">
                        Projects
                    </a>
                    <a className="menu__item" href="/#" rel="noopener noreferrer">
                        About me
                    </a>
                    <a className="menu__item" href="/#" rel="noopener noreferrer">
                        Gaming
                    </a>
                    <a className="menu__item" href="/#" rel="noopener noreferrer">
                        Books
                    </a>
                </nav>
                <div className="slideshow">
                    <div className="meta">
                        <span className="meta__heading">Now seeing</span>
                        <div className="meta__content">
                            <span className="meta__content-title">
                                Gravity is a b****
                            </span>
                            <span className="meta__content-title">
                                Clock's not right
                            </span>
                            <span className="meta__content-title">
                                Hot jungle speed
                            </span>
                            <span className="meta__content-title">
                                Crisps gone wild
                            </span>
                            <span className="meta__content-title">
                                Who's Walter?
                            </span>
                            <span className="meta__content-title">
                                Fancy franky
                            </span>
                            <span className="meta__content-title">
                                Step up gurl
                            </span>
                            <span className="meta__content-title">
                                Cold eye
                            </span>
                            <span className="meta__content-title">
                                Sparkling mind
                            </span>
                        </div>
                    </div>
                    <nav className="nav nav--prev">
                        <div className="nav__imgwrap slides">
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/1.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/2.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/3.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/4.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/5.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/6.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/7.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/8.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/9.jpg)",
                                    }}
                                />
                            </div>
                        </div>
                        <button className="unbutton nav__text no-select">
                            Previous
                        </button>
                    </nav>
                    <nav className="nav nav--next">
                        <div className="nav__imgwrap slides">
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/1.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/2.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/3.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/4.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/5.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/6.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/7.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/8.jpg)",
                                    }}
                                />
                            </div>
                            <div className="nav__img slides__img">
                                <div
                                    className="nav__img-inner slides__img-inner"
                                    style={{
                                        backgroundImage: "url(img/9.jpg)",
                                    }}
                                />
                            </div>
                        </div>
                        <button className="unbutton nav__text no-select">
                            Next
                        </button>
                    </nav>
                    <div className="gallery slides">
                        <div className="gallery__img slides__img slides__img--current">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/1.jpg)" }}
                            />
                        </div>
                        <div className="gallery__img slides__img">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/2.jpg)" }}
                            />
                        </div>
                        <div className="gallery__img slides__img">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/3.jpg)" }}
                            />
                        </div>
                        <div className="gallery__img slides__img">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/4.jpg)" }}
                            />
                        </div>
                        <div className="gallery__img slides__img">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/5.jpg)" }}
                            />
                        </div>
                        <div className="gallery__img slides__img">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/6.jpg)" }}
                            />
                        </div>
                        <div className="gallery__img slides__img">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/7.jpg)" }}
                            />
                        </div>
                        <div className="gallery__img slides__img">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/8.jpg)" }}
                            />
                        </div>
                        <div className="gallery__img slides__img">
                            <div
                                className="gallery__img-inner slides__img-inner"
                                style={{ backgroundImage: "url(img/9.jpg)" }}
                            />
                        </div>
                    </div>
                </div>
                <div className="intro">
                    <h2 className="intro__title">Ernesto productions</h2>
                    <p className="intro__description">
                        {' Mr Reis is a multi-disciplinary juggler who wrote an '}
                        <a href="https://tympanus.net/codrops/?p=57421"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            {'article'}
                        </a>
                        {" on creative stuff and prayed for the "}
                        <a href="https://tympanus.net/Development/Theodore/" target="_blank"
                        rel="noopener noreferrer">
                            {" previous demo "}
                        </a>
                        {" to wake him from oblivion. Sparkling water led him to realize that the only cozy place is "}
                        <a href="https://github.com/codrops/ParanoiaSlideshow" target="_blank"
                        rel="noopener noreferrer">
                           {" GitHub "}
                        </a>
                        {" rather than the urban jungle. "}
                    </p>
                    <a
                        className="intro__link"
                        href="https://tympanus.net/codrops/category/playground/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {" View more "}
                    </a>
                </div>
                <div className="author">
                    by <a href="https://twitter.com/codrops"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Codrops</a>
                </div>
                <a
                    className="showreel"
                    href="/#"
                    rel="noopener noreferrer"
                    aria-label="Play the showreel video"
                >
                    Showreel
                </a>
            </main>

    );
}

export default App;
