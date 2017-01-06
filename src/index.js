import $ from "jquery";
import noop from "lodash.noop";

export default class Component {
    constructor(selector, {name, onClicked, isRTL} = {}) {
        this._name = name;
        this.selector = selector;
        this.onClicked = onClicked;
        this.isRTL = isRTL;

        this.node = $('<div>')
          .addClass('demo-component')
          .on('click', () => {
            if (typeof this.onClicked === 'function') {
                this.onClicked();
            }
            this.node.toggleClass('active');
          });

        noop();
    }

    get name() {
        return this._name;
    }

    changeName(newName) {
        this._name = newName;
        this.update();
    }

    setRTL(isRTL) {
        this.isRTL = isRTL;
        this.update();
    }

    update() {
        this.node
          .attr({
            dir: this.isRTL ? 'rtl' : null,
          })
          .text(`Content from standalone component named ${ this.name }. Click it. I dare you!`);
    }


    render() {
        this.update();
        $(this.selector).append(this.node)
    }

    static jQueryVersion = $().jquery;
}
