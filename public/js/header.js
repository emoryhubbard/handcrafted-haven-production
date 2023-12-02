console.log("I'm running")
setDefaultStates()
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
  // wrapper for querySelector...returns matching element
function select(selector, parent = document) {
    return parent.querySelector(selector);
  }
  // or a more concise version if you are into that sort of thing:
  // export const qs = (selector, parent = document) => parent.querySelector(selector);

  // retrieve data from localstorage
 function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  // save data to local storage
  function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  // set a listener for both touchend and click
  function setClick(callback, selector) {
    select(selector).addEventListener("touchend", (event) => {
      event.preventDefault()
      callback()
    })
    select(selector).addEventListener("click", callback)
  }
function setClicks(callback, ...selectors) {
    for (const selector of selectors)
      setClick(callback, selector)
  }
  function toggleClass(selector, className) {
    select(selector).classList.toggle(removeDot(className))
  }
  function toggleClasses(selector, ...classNames) {
    for (const className of classNames) {
      select(selector).classList.toggle(removeDot(className))
    }
  }
  function hasClass(selector, className) {
    return select(selector).classList.contains(removeDot(className))
  }
  function removeDot(className) {
    return className.slice(1)
  }