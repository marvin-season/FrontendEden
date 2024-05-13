import {type App} from "vue"
import VueVirtualScroller from 'vue-virtual-scroller'


export function loadVirtualScroll(app: App) {
  /** Element Plus 组件完整引入 */
  app.use(VueVirtualScroller)
}
