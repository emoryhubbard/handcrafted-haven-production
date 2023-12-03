'use client'
import Script from 'next/script'

export default function Footer() {
    return (
        <>
        <footer className="footer bg-[color:var(--dgray)] pt-8 pb-4 px-4 sm:pl-12 lg:pl-[calc(50vw_-_30rem)]">
        <a className="has-bottom-logo" href="/">
            <img
            className="bottom-logo w-48 pb-12"
            src="/images/site/OuterWhiteInnerGrayTextWhite2.svg"
            alt="logo image"
            />
        </a>
        <p className="footer-description text-[1.1rem] text-[white] font-normal max-w-[80%] m-0 pb-8 p-0">
        Elevate your style with our handcrafted accessories.</p>
        <p className="footer-description text-[1.1rem] text-[white] font-normal max-w-[80%] m-0 pb-8 p-0">
        Explore a curated collection of items ranging from cozy blankets to decorative accents, all crafted with love and attention to detail.
        </p>
        <nav>
            <p
            id="bottom-nav-title"
            className="bottom-nav-title text-base text-[white] font-extrabold m-0 p-0"
            >
            ITEMS
            </p>
            <ul className="bottom-nav pl-0">
            <li>
                <a
                href="/search?category=Accessories"
                title="View Accessories products"
                className="block text-[white] pb-[0.4rem]"
                >
                Accessories
                </a>
            </li>
            <li>
                <a
                href="/search?category=Jewelry"
                title="View Jewelry products"
                className="block text-[white] pb-[0.4rem]"
                >
                Jewelry
                </a>
            </li>
            <li>
                <a
                href="/search?category=Art"
                title="View Art products"
                className="block text-[white] pb-[0.4rem]"
                >
                Art
                </a>
            </li>
            <li>
                <a
                href="/search?category=Bath"
                title="View Bath products"
                className="block text-[white] pb-[0.4rem]"
                >
                Bath
                </a>
            </li>
            <li>
                <a
                href="/search?category=Clothing"
                title="View Clothing products"
                className="block text-[white] pb-[0.4rem]"
                >
                Clothing
                </a>
            </li>
            <li>
                <a
                href="/search?category=Home"
                title="View Home products"
                className="block text-[white] pb-[0.4rem]"
                >
                Home
                </a>
            </li>
            <li>
                <a
                href="/search?category=Purses"
                title="View Purses products"
                className="block text-[white] pb-[0.4rem]"
                >
                Purses
                </a>
            </li>
            <li>
                <a
                className="more-link block text-[white] pb-[0.4rem]"
                href="/search?action=submit-search"
                title="View All Products"
                >
                More
                </a>
            </li>
            </ul>
        </nav>
        <p className="copyright text-center text-[0.9rem] text-[white] m-0 pt-4">
            © 2023 Handcrafted Haven. All rights reserved.
        </p>
        </footer>
        <Script src="/js/footer.js" />
        </>
        )}