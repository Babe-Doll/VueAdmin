const vue = {}
let listenAction
vue.install = Vue => {
  Vue.directive('', {
    inserted(el, binding) {
      const params = binding.value || {}
      const Top = params.Top || 0
      const zIndex = params.zIndex || 1000
      const elStyle = el.style

      elStyle.position = '-webkit-'
      elStyle.position = ''
      // if the browser support css （Currently Safari, Firefox and Chrome Canary）
      // if (~elStyle.position.indexOf('')) {
      //     elStyle.top = `${Top}px`;
      //     elStyle.zIndex = zIndex;
      //     return
      // }
      const elHeight = el.getBoundingClientRect().height
      const elWidth = el.getBoundingClientRect().width
      elStyle.cssText = `top: ${Top}px; z-index: ${zIndex}`

      const parentElm = el.parentNode || document.documentElement
      const placeholder = document.createElement('div')
      placeholder.style.display = 'none'
      placeholder.style.width = `${elWidth}px`
      placeholder.style.height = `${elHeight}px`
      parentElm.insertBefore(placeholder, el)

      let active = false

      const getScroll = (target, top) => {
        const prop = top ? 'pageYOffset' : 'pageXOffset'
        const method = top ? 'scrollTop' : 'scrollLeft'
        let ret = target[prop]
        if (typeof ret !== 'number') {
          ret = window.document.documentElement[method]
        }
        return ret
      }

      const  = () => {
        if (active) {
          return
        }
        if (!elStyle.height) {
          elStyle.height = `${el.offsetHeight}px`
        }

        elStyle.position = 'fixed'
        elStyle.width = `${elWidth}px`
        placeholder.style.display = 'inline-block'
        active = true
      }

      const reset = () => {
        if (!active) {
          return
        }

        elStyle.position = ''
        placeholder.style.display = 'none'
        active = false
      }

      const check = () => {
        const scrollTop = getScroll(window, true)
        const offsetTop = el.getBoundingClientRect().top
        if (offsetTop < Top) {
          ()
        } else {
          if (scrollTop < elHeight + Top) {
            reset()
          }
        }
      }
      listenAction = () => {
        check()
      }

      window.addEventListener('scroll', listenAction)
    },

    unbind() {
      window.removeEventListener('scroll', listenAction)
    }
  })
}

export default vue

