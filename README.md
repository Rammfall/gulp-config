# Gulp config

Super duper config



### Installing

Clone this repo.

Install packages

```
npm i
```


## Getting Started

```
npm run dev
```

## Build

```
npm run build
```

## Built With

* [Webpack](https://webpack.js.org/) - bundler for scripts
* [Gulp](https://gulpjs.com/) - Automate and enhance your workflow


# Validate

a. in main.js import this lib:
```
import FormValid from './helpers/validation';
```

b. create an instance of the class and call its method init:
```
const formValid = new FormValid();
formValid.init()
```
c. in html: <br> 
  - in form add class _valid-form
  - input must have a wrapper
  - in input add class _valid-input and attr required
  - validation runs on attr type
```
<form class="_valid-form">
  <div class="form-group">
    <input type="text" class="_valid-input" required>
  </div>
</form>
```
in styles ./customize/index.scss add file form.scss ad change style in this file
:
```
@import "form";
```

d. if you need custom type, in input add data-type="typeName" <br>
in html:
```
<input data-type="typeName" class="_valid-input" required>
```
in validation.js add static function :
```
 static typeName = (elem) => {
    if (elem.value === "") {
      ... custom checks
    } else if (!(/^(([^А-Яа-я<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(elem.value))) {
      ... custom checks
    }
    ... custom checks
    
    this.tipMessage(elem, tips.success, false);
    return false;
  };
```

e. if you need change notice text
in validation.js in tips change your text
```
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
```


# Timer

### Get starterd

a. in main.js import this lib
```
import Timer from './helpers/timer';
```

b. create an instance of the class and call its method init <br>
default date is 3 days in advance
```
const timer = new Timer();

// for defoult
timer.init()

/ for custom
timer.init(new Date('2019-12-17T03:25:00').getTime())
```

c. in html you definitely need id="timer"; you add only classes yuo need

```
<div id="timer">
  <div class="timer__days">
     <div class="number"></div>
  </div>
  <div class="timer__hours">
     <div class="number"></div>
  </div>
  <div class="timer__minutes">
     <div class="number"></div>
  </div>
  <div class="timer__seconds">
     <div class="number"></div>
  </div>
</div>
```

## Authors

* **Andrey Barchuk** - [HollyBang](https://github.com/HollyBang)
* **Bohdan Onatsky** - [Rammfall](https://github.com/Rammfall)
* **Igor Kolechkin** - [igorkolechkin](https://github.com/igorkolechkin)




