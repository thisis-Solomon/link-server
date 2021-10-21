let inputBtn = document.querySelector('button')
let inputEl = document.getElementById('input_el')
let deleteLinks = document.getElementById('delete_btn')
let ulEl = document.getElementById('ul_el')
let tabBtn = document.getElementById('tab_btn')

let myLinks = []

const myLinksFromLocalStorage = JSON.parse(localStorage.getItem('myLinks'))

if (myLinksFromLocalStorage) {
  myLinks = myLinksFromLocalStorage
  render(myLinks)
}

function render (links) {
  let listItem = ''
  for (let myLink of links) {
    listItem += `<li> 
    <a target="_blank" href='${myLink}'> ${myLink} </a>
    </li>`
  }

  ulEl.innerHTML = listItem
}

inputBtn.addEventListener('click', function () {
  myLinks.push(inputEl.value)
  inputEl.value = ''
  localStorage.setItem('myLinks', JSON.stringify(myLinks))
  render(myLinks)
})

tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLinks.push(tabs[0].url)
    localStorage.setItem('myLinks', JSON.stringify(myLinks))
    render(myLinks)
  })
})

deleteLinks.addEventListener('dblclick', function (event) {
  localStorage.clear()
  myLinks = []
  render(myLinks)
})
