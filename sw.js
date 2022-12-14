/* eslint-disable no-console */
const CHECK_CRASH_INTERVAL = 4000
const CRASH_THRESHOLD = 10000

// send log
function _sendlog(data) {
  console.log(`%c${JSON.stringify(data)}`, 'padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white; background-color: #4158D0; background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);')
  // TODO 切换上报url
  const url = 'http://localhost:3000/log'
  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

function initLogSWCrashWatch() {
  const pages = {}
  let timer
  function _checkCrash() {
    console.log('check', pages)
    const now = Date.now()
    Object.keys(pages).forEach((id) => {
      const page = pages[id]
      if ((now - page.lastReportDate) > CRASH_THRESHOLD) {
        let surviveTime
        if (page.data.openDate)
          surviveTime = page.lastReportDate - page.data.openDate
        console.log('==== crash ====', page, surviveTime)
        page.data = {
          ...page.data,
          surviveTime,
        }
        _sendlog(page.data)
        delete pages[id]
      }
    })
    if (Object.keys(pages).length === 0) {
      clearInterval(timer)
      timer = null
    }
  }
  // monitor message
  self.addEventListener('message', (e) => {
    const eventData = e.data
    console.log('eventData', eventData)
    if (eventData.type === 'heartbeat') {
      pages[eventData.id] = {
        lastReportDate: Date.now(),
        data: eventData.data,
      }
      if (!timer) {
        timer = setInterval(() => {
          _checkCrash()
        }, CHECK_CRASH_INTERVAL)
      }
    }
    else if (eventData.type === 'unload') {
      _sendlog(eventData)
      delete pages[eventData.id]
    }
    else if (eventData.type === 'start') {
      _sendlog(eventData)
    }
  })
  // TODO 强制刷新丢失controller问题
  self.addEventListener('install', (event) => {
    event.waitUntil(self.skipWaiting())
  })

  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim())
  })
}

initLogSWCrashWatch()
