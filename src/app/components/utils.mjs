export function renderTemplate({element, template, callback,
    position = "after", clear = false }={}) {
    if (clear) {element.innerHTML = ""};  // empty element first if so directed
    element.insertAdjacentHTML(`${position}begin`, template);
  }

  export async function loadTemplate(path) {
    const response = await fetch(path);
    return response.text();
  }

  export async function loadHeaderFooter() {
    const header = await loadTemplate(`../templates/header.html`);
    const footer = await loadTemplate(`../templates/footer.html`);
   
    renderTemplate({element: select("header"), template: header, clear: true});
    renderTemplate({element: select("footer"), template: footer, clear: true});
  }

  export function renderList({templateFunction, element, list,
    position = "after", clear = false }={}) {
    let templates = "";
    for (const item of list) {
      templates += templateFunction(item); // add all templates
    }

    if (clear) {element.innerHTML = ""};  // empty element first if so directed
    element.insertAdjacentHTML(`${position}begin`, templates);
  }

  export function getParam(param) {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    return urlParams.get(param);
  }

  // wrapper for querySelector...returns matching element
  export function select(selector, parent = document) {
    return parent.querySelector(selector);
  }
  // or a more concise version if you are into that sort of thing:
  // export const qs = (selector, parent = document) => parent.querySelector(selector);

  // retrieve data from localstorage
  export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  // save data to local storage
  export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  // set a listener for both touchend and click
  export function setClick(callback, selector) {
    select(selector).addEventListener("touchend", (event) => {
      event.preventDefault()
      callback()
    })
    select(selector).addEventListener("click", callback)
  }
  export function setClicks(callback, ...selectors) {
    for (const selector of selectors)
      setClick(callback, selector)
  }
  export function toggleClass(selector, className) {
    select(selector).classList.toggle(removeDot(className))
  }
  export function toggleClasses(selector, ...classNames) {
    for (const className of classNames) {
      select(selector).classList.toggle(removeDot(className))
    }
  }
  export function hasClass(selector, className) {
    return select(selector).classList.contains(removeDot(className))
  }
  function removeDot(className) {
    return className.slice(1)
  }