'use client'
import Script from 'next/script'
import Header from './components/header'
import Footer from './components/footer'

export default function Home() {
    return (
        <>
        <title>Handcrafted Haven Home Page</title>
        <Header />
            <main>
            <section className="w-section">
                <div className='has-lcp relative before:content-[""] before:absolute before:w-full before:h-full before:bg-[url("/images/site/LCP34Left2.webp")] before:bg-cover before:bg-center before:brightness-[50%] before:z-[-9999] before:left-0 before:top-0 sm:before:bg-[url("/images/site/LCPTop2.webp")] lg:before:bg-[url("/images/site/2048LCP43Top2.webp")]'>
                <div className="cover-lcp w-[calc(100%_-_1rem)] pb-10 sm:ml-[calc(50vw_-_10rem)]">
                    <p className="lcp-first-text max-w-[18rem] text-[white] text-[2.5rem] leading-[2.3rem] font-bold m-0 pl-4 pt-24 p-0 font-sans">
                    Find Crafted Perfection for Home, Bath, and More.
                    </p>
                    <p className="lcp-small max-w-[22rem] text-[white] text-2xl font-light m-0 pl-4 pt-6 p-0 font-sans">
                    Discover <strong className="font-extrabold">handmade</strong>{" "}
                    marvels of decor, accessories, clothing...
                    </p>
                    <div className="lcp-find-product">
                    <p className="find-item block text-center text-[white] font-semibold text-[1.2rem] bg-[color:var(--logocolor)] w-[calc(100%_-_1rem)] ml-4 mt-16 p-4 hover:cursor-pointer font-sans sm:max-w-xs">
                        FIND ITEM
                    </p>
                    </div>
                </div>
                </div>
            </section>
            </main>
        <Footer />
        <Script src="/js/home.js" />
        </>
    )
}

