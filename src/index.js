/* eslint-disable no-console */
// import { v4 as uuidv4 } from 'uuid'
import { nanoid } from 'nanoid/non-secure'

;(function () {
  const HEART_INTERVAL = 4000

  const DEFAULT_OPTIONS = {
    url: location.href,
  }

  class SWService {
    constructor(options = {}) {
      this.options = {
        ...DEFAULT_OPTIONS,
        ...options,
      }
    }

    init() {
      const sessionId = nanoid()
      let nIntervId = null
      const self = this
      function heartbeat() {
      // TODO 强制刷新丢失controller问题
        // console.log('navigator.serviceWorker.controller', navigator.serviceWorker.controller)
        navigator.serviceWorker.controller.postMessage({
          type: 'heartbeat',
          id: sessionId,
          data: self.options,
        })
      }

      window.addEventListener('load', () => {
        this.options.openDate = +new Date()
        navigator.serviceWorker.controller.postMessage({
          type: 'start',
          id: sessionId,
          data: self.options,
        })
        nIntervId = setInterval(heartbeat, HEART_INTERVAL)
        heartbeat()
      })
      window.addEventListener('beforeunload', () => {
        navigator.serviceWorker.controller.postMessage({
          type: 'unload',
          id: sessionId,
          data: self.options,
        })
        clearInterval(nIntervId)
      })
    }
  }

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(
        '/sw.js',
        {
          scope: '/',
        },
      ).then(() => {
        console.log('%c Service Worker registration succeeded', 'padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white; background-color: #4158D0; background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);')
        const sw = new SWService()
        sw.init()
      }).catch((error) => {
        console.log(`%cService worker registration failed ${error}`, 'padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white; background: #003366; cursor: pointer;')
      })
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload()
      })
    }
    else {
      console.log('%cService worker is not supported', 'padding: 0.3rem 1.5rem; font-family: Roboto; font-size: 1.2em; line-height: 1.4em; color: white; background: #003366; cursor: pointer;')
    }
  }
  registerServiceWorker()
})()