const calendar = document.getElementById('calendar')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('previous')
const display = document.getElementById('display')

display.innerText = ''
const today = new Date();
let currentYear = today.getFullYear()
let currentMonth = today.getMonth()

function displayCalendar(month, year) {
   const monthStr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
   const firstDay = (new Date(year, month)).getDay();
   const daysInMonth = (iMonth, iYear) => 32 - new Date(iYear, iMonth, 32).getDate();

   const table = { row: 6, column: 7 }
   let day = 1;

   for (let i = 0; i < table.row; i++) {
      const tr = document.createElement('tr')

      for (let j = 0; j < table.column; j++) {

         if (i === 0 && j < firstDay) {
            const td = document.createElement('td')

            // TODO: populate with previous month and add className to make it lighter
            td.textContent = ''
            tr.appendChild(td)

         } else if (day > daysInMonth(month, year)) {

            // TODO: populate with next month and add className to make it lighter
            break;

         } else {

            const td = document.createElement('td')
            td.textContent = day
            tr.appendChild(td)

            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
               td.classList.add('active')
            }

            day++

         }

      }
      calendar.appendChild(tr)
   }
   display.innerText = `${today.getDate()} ${monthStr[month]}, ${year}`
}
displayCalendar(currentMonth, currentYear)

function next() {
   currentMonth += 1;
   currentMonth > 11 ? (currentYear++, currentMonth = 0) : currentYear
   calendar.innerText = ''
   displayCalendar(currentMonth, currentYear)
}

function previous() {
   currentMonth -= 1;
   currentMonth < 0 ? (currentYear--, currentMonth = 11) : currentYear
   calendar.innerText = ''
   displayCalendar(currentMonth, currentYear)
}

let selMonth = document.querySelector('#month')
const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
for (let i = 0; i < monthString.length; i++) {
   const opt = document.createElement('option')
   opt.innerText = monthString[i]
   opt.value = monthString[i]
   selMonth.appendChild(opt)
}

let theYear = 1980
let selYear = document.querySelector('#year')
while (theYear <= 2030) {
   const opt = document.createElement('option')
   opt.value = theYear
   opt.innerText = theYear
   selYear.appendChild(opt)
   theYear++
}

selMonth.addEventListener('change', function () {
   const month = monthString.indexOf(this.value)
   const year = formatYear(display)
   if (month) {
      calendar.innerText = ''
      displayCalendar(month, year)
   }
})

nextBtn.addEventListener('click', next)
prevBtn.addEventListener('click', previous)

document.getElementById('today').addEventListener('click', () => {
   calendar.innerText = ''
   displayCalendar(today.getMonth(), today.getFullYear())
})

selYear.addEventListener('change', function () {
   const month = formatYear(display, false)
   const monthIndex = monthString.indexOf(month)
   const year = this.value
   if (year) {
      calendar.innerText = ''
      displayCalendar(monthIndex, year)
   }
})

function formatYear(el, isMonth = true) {
   let arr = el.textContent.split(' ')
   if (isMonth) {
      return parseInt(arr[arr.length - 1])
   } else {
      return arr[1].replace(',', '')
   }
}