import $ from "jquery";
import noop from "lodash.noop";

export default class Component {
    constructor(selector, {name, onClicked} = {}) {
        this._name = name;
        this.selector = selector;
        this.onClicked = onClicked;

        noop();
    }

    get name() {
        return this._name;
    }

    createNode() {
        if (this.node) {
            throw new Error('node already created');
        }
        this.node = $('<div>')
            .text(`Content from standalone component named ${ this.name }. Click it. I dare you!`)
            .on('click', () => {
                if (typeof this.onClicked === 'function') {
                    this.onClicked();
                }
                this.node.css('background', 'red');
            })
        ;

        return this.node;
    }


    render() {
        $(this.selector).append(this.createNode())
    }

    static jQueryVersion = $().jquery;
}
