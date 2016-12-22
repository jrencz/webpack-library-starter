import $ from "jquery";
import noop from "lodash.noop";
import react from "react";

export default class Library {
    constructor(selector) {
        this._name = 'Library';
        this.selector = selector;

        noop();
        console.log(react);
    }

    get name() {
        return this._name;
    }

    createNode() {
        if (this.node) {
            throw new Error('node already created');
        }
        this.node = $('<div>')
            .text('Content from standalone component')
            .on('click', () => {
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
