## Usage

The package uses two directives: drag and follow.
```
import {drag, follow} from 'vue-dragon'
Vue.directive('drag', drag)
Vue.directive('follow', follow)
```

Put the drag directive on the element you want to drag, or its drag handle.
Put the follow directive anywhere on or above the drag directive.
The drag directive does all of the event handling and dispatching while
the follow directive responds to those events and applies the necessary styles.
```
<div class="infoCard" v-follow>
  <div class="dragHandle" v-drag="anyExpression">
    ...
  </div>
  Here is some info!
</div>
```
When you drop a v-drag element it will emit a drop event on whatever your mouse
is over. Catch the event like this:
```
<div @drop="yourDropHandler">
  Drop something here!
</div>
```
The drop event is a [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) so you
can grab the data from the detail property. Here's what you can get:
```
...
  methods: {
    yourDropHandler(e) {
      let passedExpression = e.detail.value
      let originalEvent = e.detail.e //The mouseup event that caused the drop
      let draggedElement = e.detail.el
    }
  }
...
```
Target elements can also respond to these events for additional interaction:
```
<div @dragover="yourDragoverHandler">
  As mousemove events are triggered on me while dragging I will handle them.
</div>

<div @dragout="yourDragoutHandler">
  If a mouseout event is triggered on me while dragging I will handle it.
</div>
```
The drag directive will trigger three different events on the element it
belongs to. These are the events the follow directive uses to apply styles
to the element it belongs to.

The *up* event will be dispatched as the element is picked up, on mousedown. The *drag*
event will be dispatched whenever a mousemove is caught while dragging.
The *down* event is fired at the end of a drag, on mouseup.
```
<div @up="upHandler" @drag="dragHandler" @down="downHandler">
  <div v-drag>
    Drag me!
  </div>
</div>
```
You could omit the follow directive entirely and make your own prettier follow
directive using these three events.

Get the original event on any of these custom events like this:
```
...
  methods: {
    yourHandler(e) {
      let originalEvent = e.detail.e
      // With this you can grab details about mouse movement and position
    }
  }
...
```
