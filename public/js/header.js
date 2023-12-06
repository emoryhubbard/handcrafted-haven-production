import {select, setClicks, toggleClass, toggleClasses, hasClass, setClick} from './utils.mjs'

setDefaultStates()
toggleClass('html', '.hidden') // prevent unstyled flash of menu bar
setClicks(toggleSearchBar, '.search-icon', '.search-close-icon')
setClicks(toggleMenuBar, '.burger-icon', '.menu-close-icon')
setClick(submitSearchBar, '.submit-search-icon')
setClick(submitMenuSearch, '.menu-submit-search-icon')
setClick(focusMenuSearch, '.find-product-option')

function setDefaultStates() {
    toggleClass('.slideout-menu', '.slideout-menu-close')
    toggleClass('.search-bar', '.search-bar-close')
    toggleClass('.dark-overlay', '.dark-overlay-close')
}
function toggleSearchBar(e) {
    if (!hasClass('.slideout-menu', '.slideout-menu-open'))
        toggleClasses('.search-bar', '.search-bar-close', '.search-bar-open')
    if (hasClass('.search-bar', '.search-bar-open'))
        select('.search-input').focus()
    select('.search-input').value = ''
}
function toggleMenuBar(e) {
    if (!hasClass('.search-bar', '.search-bar-open')) {
        toggleClasses('.slideout-menu', '.slideout-menu-close', '.slideout-menu-open')
        toggleClasses('.dark-overlay', '.dark-overlay-close', '.dark-overlay-open')
    }
    select('.menu-search-input').value = ''
}
function submitSearchBar(e) {
    select('.search-bar-form').submit()
}
function submitMenuSearch(e) {
    select('.menu-search-form').submit()
}
function focusMenuSearch(e) {
    select('.menu-search-input').focus()
}