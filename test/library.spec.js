import Component from '../dist/library.js';

import {expect} from 'chai';

describe('Given an instance of my Component', function () {
  let component;

  const selector = '#foo';
  const name = 'my-awesome-component';

  beforeEach(function () {
    component = new Component(selector, {name});
  });

  describe('when I need the name', function () {
    it('should return the name', () => {
      expect(component.name).to.be.equal(name);
    });
  });
});
