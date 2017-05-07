import onify from 'onify'
import throttle from 'throttle-debounce/throttle'

onify(document)

let draggables = 0
export default {
  bind(el, binding) {
    let id = draggables++
    el.dataset.dragId = id

    // Flag to block last mousemove from firing
    let isUp = false

    onify(el)
    el.on.mousedown = downHandler

    function downHandler(e) {
      isUp = true
      e.stopPropagation()
      document.on[id].mousemove = throttle(15, moveHandler)
      // document.on[id].mouseover = mouseOverHandler
      document.on[id].mouseout  = mouseOutHandler
      document.on[id].mouseup = upHandler


      // Kill default drag and drop
      e.preventDefault()
      el.dispatchEvent(new CustomEvent('up', {detail: e, bubbles: true, cancelable: true}))
    }

    function moveHandler(e) {
      if (!isUp) return
      el.dispatchEvent(new CustomEvent('drag', {detail: e, bubbles: true, cancelable: true}))
      e.target.dispatchEvent(new CustomEvent('dragover', {detail: {value: binding.value, e}, bubbles: true, cancelable: true}))
    }

    function mouseOutHandler(e) {
      e.target.dispatchEvent(new CustomEvent('dragout', {detail: binding.value, bubbles: true, cancelable: true}))
    }

    function upHandler(e) {
      isUp = false
      document.on[id].mouseup = null
      document.on[id].mousemove = null
      document.on[id].mouseover = null
      document.on[id].mouseout = null
      e.target.dispatchEvent(new CustomEvent('drop', {detail: {value: binding.value, e, el}, bubbles: true, cancelable: true}))
      el.dispatchEvent(new CustomEvent('down', {detail: e, bubbles: true, cancelable: true}))
    }
  },

  unbind(el, binding) {
    el.on.clear()
    document.on[el.dataset.dragId].clear()
  }
}
