import onify from 'onify'

let usedStyles = [
  'top',
  'left',
  'position',
  'pointer-events'
]

export default {
  bind(el, binding, {context}) {
    onify(el)
    el.on.follow.up   = upHandler
    el.on.follow.down = downHandler
    el.on.follow.drag = dragHandler

    let savedStyles = {}
    let baseTop = 0
    let baseLeft = 0

    function upHandler(e) {
      e.stopPropagation()
      baseTop = e.detail.clientY
      baseLeft = e.detail.clientX

      usedStyles.forEach(function(style) {
        savedStyles[style] = el.style[style]
      })

      el.style.position = 'relative'
      el.style.top = 0
      el.style.left = 0
      el.style['pointer-events'] = 'none'
    }

    function dragHandler(e) {
      e.stopPropagation()
      el.style.top = e.detail.clientY - baseTop + 'px'
      el.style.left = e.detail.clientX - baseLeft + 'px'
    }

    function downHandler(e) {
      e.stopPropagation()
      baseTop = 0
      baseLeft = 0

      usedStyles.forEach(function(style) {
        el.style[style] = savedStyles[style] || null
        delete savedStyles[style]
      })
    }
  },

  unbind(el, binding, {context: {_uid: id}}) {
    el.on.follow.clear()
  }
}
