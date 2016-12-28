import $ from "jquery";
import noop from "lodash.noop";

export default class Component {
    constructor(selector, {name, onClicked} = {}) {
        this._name = name;
        this.selector = selector;
        this.onClicked = onClicked;

        this.node = $('<div>').on('click', () => {
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
        this.updateText();
    }

    updateText() {
        this.node.text(`Content from standalone component named ${ this.name }. Click it. I dare you!`);
    }


    render() {
        this.updateText();
        $(this.selector).append(this.node)
    }

    static jQueryVersion = $().jquery;
}
