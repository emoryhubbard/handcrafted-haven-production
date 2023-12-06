import {select, toggleClass} from './utils.mjs'

let topNavMoreLink = select('.top-nav .more-link')
topNavMoreLink.setAttribute('href', '#bottom-nav-title')
topNavMoreLink.setAttribute('title', 'View All Categories')
