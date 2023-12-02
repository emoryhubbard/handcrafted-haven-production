setClick(toggleSearchBar, '.find-a-pc')

function toggleSearchBar(e) {
    if (!hasClass('.slideout-menu', '.slideout-menu-open'))
        toggleClasses('.search-bar', '.search-bar-close', '.search-bar-open')
    if (hasClass('.search-bar', '.search-bar-open'))
        select('.search-input').focus()
    select('.search-input').value = ''
}
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