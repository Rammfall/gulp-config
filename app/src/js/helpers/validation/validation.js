//TIPS

const tips = {
  required: "Обязательное поле",
  requiredFile: "Прикрепите резюме",
  requiredPhone: "Введите номер телефона",
  requiredName: "Введите имя",
  requiredMail: "Введите почту",
  requiredText: "Введите текст",
  lengthMinName: "Минимум 2 символа",
  lengthMinPassword: "Не менее 4 символов",
  lengthMaxName: "",
  lengthMinMessage: "",
  lengthMaxMessage: "",
  validEmail: "Введите правильный формат почты",
  validPhone: "Введите правильный номер телефона",
  onlyNumbers: "Только цифры",
  validName: "Только буквы",
  formatFile: "Неверный формат файла",
  sizeFile: "Размер файла должен быть до 2 МБ",
  success: "",
  conform: "Поля пароля не совпадают",
};

export default class Validation {
  static check = (elem) => {
    const type = elem.getAttribute('data-type') ? elem.getAttribute('data-type') : elem.type;

    if (type && this[type]) {
      return this[type](elem);
    } else if (type === 'submit' || type === 'hidden') {

    } else if (!this[type]) {
      console.warn('No method for this type field');
    } else {
      console.warn('Check');
    }
  };

  static name = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, tips.requiredName, true);
      return true;
    } else if (elem.value.length < 2) {
      this.tipMessage(elem, tips.lengthMinName, true);
      return true;
    } else if (!(/^[а-яА-ЯёЁa-zA-Z\s\'\-]{2,40}$/.test(elem.value))) {
      this.tipMessage(elem, tips.validName, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  };

  static text = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, tips.requiredText, true);
      return true;
    } else if (elem.value.length < 2) {
      this.tipMessage(elem, tips.lengthMinName, true);
      return true;
    } else if (!(/^[а-яА-ЯёЁa-zA-Z\s\'\-]{2,40}$/.test(elem.value))) {
      this.tipMessage(elem, tips.validName, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  };

  static email = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, tips.requiredMail, true);
      return true;
    } else if (!(/^(([^А-Яа-я<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(elem.value))) {
      this.tipMessage(elem, tips.validEmail, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  };


  static tel = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, tips.requiredPhone, true);
      return true;
    } else if (!(/^[\d\s\+\(\)]{1,}$/.test(elem.value))) {
      this.tipMessage(elem, tips.onlyNumbers, true);
      return true;
    } else if (elem.value.length <= 5 || elem.value.length > 21) {
      this.tipMessage(elem, tips.validPhone, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  };

  static message = (elem) => {
    if (elem.value === "") {
      this.tipMessage(elem, tips.required, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  };

  static textarea = this.message;

  static file = (elem) => {
    let extension = elem.value ? elem.value.slice(elem.value.lastIndexOf('.')) : null;

    if (elem.value === "") {
      this.tipMessage(elem, tips.requiredFile, true);
      return true;
    } else if (extension !== '.rtf' && extension !== '.doc' && extension !== '.pdf' && extension !== '.docx') {
      this.tipMessage(elem, tips.formatFile, true);
      return true;
    } else if (elem.files[0].size / 1024 / 1024 > 2) {
      this.tipMessage(elem, tips.sizeFile, true);
      return true;
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  };

  static password = (elem) => {
    const pass = document.querySelector('#_pass');
    const state = elem.getAttribute('data-confirm');

    if (elem.value === "") {
      this.tipMessage(elem, tips.required, true);
      return true;
    } else if (elem.value.length < 4) {
      this.tipMessage(elem, tips.lengthMinPassword, true);
      return true;
    } else if (elem.value !== pass.value) {
      if (state) {
        this.tipMessage(elem, tips.conform, true);
        return true;
      }
    }

    this.tipMessage(elem, tips.success, false);
    return false;
  };

  static tipMessage = (elem, tip, status) => {
    if (!status) {
      elem.parentElement.classList.remove('error');
      elem.parentElement.classList.add('success');
      elem.parentElement.setAttribute('data-error', tip);
    } else {
      elem.parentElement.classList.add('error');
      elem.parentElement.classList.remove('success');
      elem.parentElement.setAttribute('data-error', tip);
    }
  };
}
