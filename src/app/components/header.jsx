'use client'
import Script from 'next/script'

export default function Header() {
    return (
        <>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=product-width, initial-scale=1" />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
            media="screen"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />
            <div className="sticky-header sticky z-[9] top-0">
            <header>
                <div className="has-header flex justify-between relative bg-[white]">
                <a
                    className="has-top-logo sm:ml-8 lg:ml-[calc(50vw_-_31rem)]"
                    href="/"
                >
                    <img
                    className="top-logo w-32 box-content p-4"
                    src="/images/site/OuterBlueInnerWhiteBlackText3.svg"
                    alt="logo image"
                    />
                </a>
                <div className="has-my-account flex gap-[1.2rem] pr-4 pt-4 sm:mr-8 lg:mr-[calc(50vw_-_30rem)]">
                    <a href="javascript:">
                    <img
                        className="search-icon h-[1.6rem] box-content"
                        src="/images/site/Search2.svg"
                        alt="search icon"
                    />
                    </a>
                    <a href="/account?action=login">
                    <img
                        className="account-icon h-[1.6rem] box-content"
                        src="/images/site/AccountCropped2.svg"
                        alt="account icon"
                    />
                    </a>{" "}
                    <a href="javascript:">
                    <img
                        className="burger-icon h-[1.6rem] box-border p-[0.2rem]"
                        src="/images/site/Burger2.svg"
                        alt="burger icon"
                    />
                    </a>
                </div>
                <div className="search-bar absolute justify-between w-full h-full bg-[white] top-0 sm:gap-4 sm:w-auto sm:ml-[calc(100vw_-_25.8rem)] lg:gap-4 lg:w-auto lg:ml-[calc(50vw_+_6.2rem)]">
                    <form
                    className="search-bar-form flex gap-[1.2rem] pl-4 py-4 sm:pl-12 lg:pl-12"
                    action="/search"
                    method="get"
                    >
                    <input
                        className="search-input"
                        type="text"
                        name="keywords"
                        placeholder="Search..."
                    />
                    <input type="hidden" name="action" defaultValue="submit-search" />
                    <a href="javascript:">
                        <img
                        className="submit-search-icon h-[1.6rem] box-content"
                        src="/images/site/Search2.svg"
                        alt="search icon"
                        />
                    </a>
                    </form>
                    <div className="has-search-close-icon pr-4 pt-4 sm:pr-12 lg:pr-12">
                    <a href="javascript:">
                        <img
                        className="search-close-icon h-[1.6rem] box-content"
                        src="/images/site/CloseIcon.svg"
                        alt="close (as in the verb close) icon"
                        />
                    </a>
                    </div>
                </div>
                <div className="slideout-menu absolute w-full max-w-[25rem] bg-[white] z-[999] top-0">
                    <div className="has-menu-search-form flex justify-between">
                    <form
                        className="menu-search-form flex gap-[1.2rem] pl-4 py-4"
                        action="/search"
                        method="get"
                    >
                        <input
                        className="menu-search-input"
                        type="text"
                        name="keywords"
                        placeholder="Search..."
                        />
                        <input
                        type="hidden"
                        name="action"
                        defaultValue="submit-search"
                        />
                        <a href="javascript:">
                        <img
                            className="menu-submit-search-icon h-[1.6rem] box-content"
                            src="/images/site/Search2.svg"
                            alt="search icon"
                        />
                        </a>
                    </form>
                    <div className="has-menu-close-icon pr-4 pt-4">
                        <a href="javascript:">
                        <img
                            className="menu-close-icon h-[1.6rem] box-content pr-4"
                            src="/images/site/CloseIcon.svg"
                            alt="close (as in the verb close) icon"
                        />
                        </a>
                    </div>
                    </div>
                    <ul className="menu-nav pl-4 pb-[0.3rem]">
                    <li>
                        <a
                        href="/account?action=login"
                        className="flex justify-between items-center"
                        >
                        <p>Sign In / Create Account</p>
                        <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                        />
                        </a>
                    </li>{" "}
                    <hr className="menu-hr text-transparent mr-4 my-4 border-t-[solid] border-" />
                    <li>
                        <a
                        className="find-product-option flex justify-between items-center"
                        href="javascript:"
                        >
                        <p>Find Product</p>
                        <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                        />
                        </a>
                    </li>
                    <hr className="menu-hr text-transparent mr-4 my-4 border-t-[solid] border-" />
                    <ul className="menu-nav-products">
                        <li className="first-product hidden">
                        <a
                            href="/search?category=accessories"
                            title="View Accessories products"
                            className="mb-[1.2rem] flex justify-between items-center"
                        >
                            <p className="my-[0rem]">Accessories</p>
                            <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                            />
                        </a>
                        </li>
                        <li className="second-product hidden">
                        <a
                            href="/search?category=jewelry"
                            title="View Jewelry products"
                            className="mb-[1.2rem] flex justify-between items-center"
                        >
                            <p className="my-[0rem]">Jewelry</p>
                            <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                            />
                        </a>
                        </li>
                        <li className="third-product block">
                        <a
                            href="/search?category=Art"
                            title="View Art products"
                            className="mb-[1.2rem] flex justify-between items-center"
                        >
                            <p className="my-[0rem]">Art</p>
                            <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                            />
                        </a>
                        </li>
                        <li className="fourth-product block">
                        <a
                            href="/search?category=Bath"
                            title="View Bath products"
                            className="mb-[1.2rem] flex justify-between items-center"
                        >
                            <p className="my-[0rem]">Bath</p>
                            <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                            />
                        </a>
                        </li>
                        <li className="fifth-product block">
                        <a
                            href="/search?category=Clothing"
                            title="View Clothing products"
                            className="mb-[1.2rem] flex justify-between items-center"
                        >
                            <p className="my-[0rem]">Clothing</p>
                            <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                            />
                        </a>
                        </li>
                        <li className="sixth-product block">
                        <a
                            href="/search?category=Home"
                            title="View Home products"
                            className="mb-[1.2rem] flex justify-between items-center"
                        >
                            <p className="my-[0rem]">Home</p>
                            <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                            />
                        </a>
                        </li>
                        <li className="seventh-product hidden">
                        <a
                            href="/search?category=purses"
                            title="View Purses products"
                            className="mb-[1.2rem] flex justify-between items-center"
                        >
                            <p className="my-[0rem]">Purses</p>
                            <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                            />
                        </a>
                        </li>
                        <li className="more-product block">
                        <a
                            className="more-link mb-[1.2rem] flex justify-between items-center"
                            href="/search?action=submit-search"
                            title="View All Products"
                        >
                            <p className="my-[0rem]">More</p>
                            <img
                            className="menu-arrow-icon h-[1.6rem] box-content pr-8"
                            src="/images/site/RightArrowIcon.svg"
                            alt="arrow icon"
                            />
                        </a>
                        </li>{" "}
                    </ul>
                    </ul>
                </div>
                <div className="dark-overlay fixed w-full h-full bg-[rgba(0,0,0,0.5)] z-[99] left-0 top-0" />
                </div>{" "}
            </header>
            <nav>
                <ul className="top-nav flex gap-6 bg-[color:var(--dgray)] m-0 px-4 py-[0.8rem] p-0 sm:gap-4 sm:pl-12 md:justify-start md:gap-4 lg:justify-start lg:gap-4 lg:pl-[calc(50vw_-_30rem)]">
                <li className="top-nav-first-product text-[color:var(--lgray)] hidden sm:inline">
                    <a
                    href="/search?category=Accessories"
                    title="View Accessories products"
                    className="text-[white] py-[0.8rem] hover:bg-[color:var(--mblue)] hover:text-[color:var(--dgray)] hover:py-4"
                    >
                    Accessories
                    </a>
                </li>
                <li className="top-nav-second-product text-[color:var(--lgray)] hidden sm:inline">
                    <a
                    href="/search?category=Jewelry"
                    title="View Jewelry products"
                    className="text-[white] py-[0.8rem] hover:bg-[color:var(--mblue)] hover:text-[color:var(--dgray)] hover:py-4"
                    >
                    Jewelry
                    </a>
                </li>
                <li className="top-nav-third-product text-[color:var(--lgray)] inline sm:inline">
                    <a
                    href="/search?category=Art"
                    title="View Art products"
                    className="text-[white] py-[0.8rem] hover:bg-[color:var(--mblue)] hover:text-[color:var(--dgray)] hover:py-4"
                    >
                    Art
                    </a>
                </li>
                <li className="top-nav-fourth-product text-[color:var(--lgray)] inline sm:inline">
                    <a
                    href="/search?category=Bath"
                    title="View Bath products"
                    className="text-[white] py-[0.8rem] hover:bg-[color:var(--mblue)] hover:text-[color:var(--dgray)] hover:py-4"
                    >
                    Bath
                    </a>
                </li>
                <li className="top-nav-fifth-product text-[color:var(--lgray)] inline sm:inline">
                    <a
                    href="/search?category=Clothing"
                    title="View Clothing products"
                    className="text-[white] py-[0.8rem] hover:bg-[color:var(--mblue)] hover:text-[color:var(--dgray)] hover:py-4"
                    >
                    Clothing
                    </a>
                </li>
                <li className="top-nav-sixth-product text-[color:var(--lgray)] inline sm:inline">
                    <a
                    href="/search?category=Home"
                    title="View Home products"
                    className="text-[white] py-[0.8rem] hover:bg-[color:var(--mblue)] hover:text-[color:var(--dgray)] hover:py-4"
                    >
                    Home
                    </a>
                </li>
                <li className="top-nav-seventh-product text-[color:var(--lgray)] hidden sm:inline">
                    <a
                    href="/search?category=Purses"
                    title="View Purses products"
                    className="text-[white] py-[0.8rem] hover:bg-[color:var(--mblue)] hover:text-[color:var(--dgray)] hover:py-4"
                    >
                    Purses
                    </a>
                </li>
                <li className="top-nav-more-product text-[color:var(--lgray)] inline sm:inline">
                    <a
                    className="more-link text-[white] py-[0.8rem] hover:bg-[color:var(--mblue)] hover:text-[color:var(--dgray)] hover:py-4"
                    href="/search?action=submit-search"
                    title="View All Products"
                    >
                    More
                    </a>
                </li>
                </ul>
            </nav>
            </div>
            <Script type='module' src="/js/header.js" />
        </>
    );
}

