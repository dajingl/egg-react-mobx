export default class Utils {

    static isMobile() {
        return 'ontouchend' in window;
    }

    static getQueryString(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const r = window.location.search.substr(1).match(reg);
        if (r !== null) return r[2];
        return null;
    }

    static addEvent(el, event, handler) {
        if (!el) return;
        if (el.attachEvent) {
            el.attachEvent('on' + event, handler);
        } else if (el.addEventListener) {
            el.addEventListener(event, handler, false);
        } else {
            el['on' + event] = handler;
        }
    }

    static removeEvent(el, event, handler) {
        if (!el) return;
        if (el.detachEvent) {
            el.detachEvent('on' + event, handler);
        } else if (el.removeEventListener) {
            el.removeEventListener(event, handler, false);
        } else {
            el['on' + event] = null;
        }
    }

}