import SendData from './sendData.js';
import Validation from './validation.js';

export default class ValidForm {
  constructor(formsSelector = '._valid-form', inputsSelector = '._valid-input') {
    let forms = document.querySelectorAll(formsSelector);
    let inputs = document.querySelectorAll(inputsSelector);

    this.forms = forms.length ? forms : null;
    this.inputs = inputs.length ? inputs : null;
    this.success = this.forms ? this.inputs ? 2 : 1 : null;
  }

  init = () => {
    if (this.success) {
      this.listeners();
    }
  };

  listeners = () => {
    if (this.success === 2) {
      setListeners('focus', this.inputs, function () {
        this.removeEventListener('blur', callbackInputs);
        this.addEventListener('blur', callbackInputs);
        this.removeEventListener('input', callbackInputs);
        this.addEventListener('input', callbackInputs);
      });
    }

    if (this.success !== 0) {
      for (let i = 0; i < this.forms.length; i++) {
        this.forms[i].setAttribute('novalidate', '');
      }

      setListeners('submit', this.forms, callbackForms);
    }

    function callbackInputs(e) {
      e.preventDefault();

      Validation.check(this);
    }

    function callbackForms(e) {
      e.preventDefault();

      let elements = this.elements;
      let error = false;

      for (let i = 0; i < elements.length; i++) {
        if (Validation.check(elements[i])) {
          error = Validation.check(elements[i]);
        }
      }

      !error ? SendData.send(this) : null;
    }
  };
}

function setListeners(eventString, htmlElements, eventCallback) {
  for (let i = 0; i < htmlElements.length; i++) {
    htmlElements[i].addEventListener(eventString, eventCallback);
  }
}