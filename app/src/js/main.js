const mainWrapper = document.querySelector('.main-wrapper');
const container = document.querySelector('.interactive-block');
const dragItem = document.querySelector('.student');
const handXY = document.querySelector('.student-hand');
const interactiveBlock = document.querySelector('.interactive-block');
const determinate = document.querySelector('.determinate');
const logo = document.querySelector('.logo');
const contentWrapeer = document.querySelector('.content-wrapeer');
const moneyInHand1 = document.querySelector('.money-in-hand1');
const moneyInHand2 = document.querySelector('.money-in-hand2');
const moneyInHand3 = document.querySelector('.money-in-hand3');
const title = document.querySelector('.title');
const subTitle = document.querySelector('.subtitle');
const dragBtn = document.querySelector('.drag-btn');
const tips = document.querySelector('.tips');


let active = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;
let moneyCash = [];
let delElInterval;
let addMoneyInterval;
let moneyGetRectUpdate;
let moneyX;
let moneyY;
let progressBar = 0;
let { width: interactiveBlockWidth, left: interactiveBlockLeft } = interactiveBlock.getBoundingClientRect();
let { width: studentWidth } = dragItem.getBoundingClientRect();


container.addEventListener("touchstart", dragStart, false);
container.addEventListener("touchend", dragEnd, false);
mainWrapper.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
mainWrapper.addEventListener("mousemove", drag, false);

function dragStart(e) {
  if (e.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  } else {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
  }

  if (e.target === dragItem) {
    active = true;
  }
}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;

  active = false;
}

function drag(e) {
  if (active) {

    e.preventDefault();

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;
    // console.log("currentX ---> ", currentX);
    // console.log("currentY ---> ", currentY);
    if(!(currentX < 0 - studentWidth / 2 || currentX > (interactiveBlockWidth - interactiveBlockLeft) + studentWidth / 2)) {
      setTranslate(currentX, currentY, dragItem);
    }
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + "0px, 0)";
}

class Money {
  constructor() {
    this.moneyCash = [];
  }
  addMoney = () => {
    let moneyEl = document.createElement('div');
    moneyEl.style.left = `${Math.floor(Math.random() * (70 - 25) + 25)}%`;
    mainWrapper.append(moneyEl);
    moneyEl.classList.add('money');
    this.moneyCash.push(moneyEl);
  }
  deleteFirstMoneyEl = () => {
    this.moneyCash[0].remove();
    this.moneyCash.shift();
  }
  checker = () => {
    this.moneyCash.forEach((item) => {
      const { left, top, width, height } = item.getBoundingClientRect();
      const { left: handLeft, top: handTop, width: handWidth, height: handHeight } = handXY.getBoundingClientRect();

      const right = left + width;
      const bottom = top + height;

      const handRight = handLeft + handWidth;
      const handBottom = handTop + handHeight;
      if(bottom >= handTop && top <= handBottom) {

        if(right >= handLeft && left <= handRight) {
          console.log('BINGO');
          item.remove();
          progressBar += 33.3;
          determinate.setAttribute('style', `width: ${progressBar}%`);
          if(progressBar > 30) {
            moneyInHand1.classList.remove('hidden');
          }
          if (progressBar > 60) {
            moneyInHand2.classList.remove('hidden');
          }
          if (progressBar >= 99) {
            stopAllInterval();
            dragItem.classList.add('happy');
            moneyInHand3.classList.remove('hidden');

            title.innerText = 'Запишись на курс';
            subTitle.innerText = 'Кращі студенти стануть тім-лідерами!';
            title.classList.remove('visibile');
            subTitle.classList.remove('visibile');
            tips.classList.add('hidden');

          }
        }
      }
    });
  }
}

function stopAllInterval() {
  clearInterval(addMoneyInterval);
  clearInterval(moneyGetRectUpdate);
  clearInterval(delElInterval);
}

let money = new Money();

function startMoneyDrop() {
  contentWrapeer.removeEventListener("mousedown", startMoneyDrop, false);
  addMoneyInterval = setInterval(() => {
    money.addMoney();
  }, 2000);
}

moneyGetRectUpdate = setInterval(() => {
  money.checker();
}, 16);


// setTimeout(() => {
//   delElInterval = setInterval(() => {
//     money.deleteFirstMoneyEl();
//     // console.log(money.moneyCash);
//   }, 2000);
// }, 10000);



// let timerId = setInterval(function() {
//   let money = document.createElement('div');
//   money.style.left = `${Math.floor(Math.random() * (75 - 25) + 25)}%`;
//   mainWrapper.append(money);
//   money.classList.add('money');
//   moneyCash.push(money);
//   console.log(moneyCash);
// }, 2000);

addEventListener('DOMContentLoaded', () => {
  logo.classList.remove('hidden');

  setTimeout(() => {
    logo.classList.add('logo-to-top');
  }, 3000);

  setTimeout(() => {
    contentWrapeer.classList.remove('hidden');
    // contentWrapeer.addEventListener("touchstart", startMoneyDrop, false);
    contentWrapeer.addEventListener("mousedown", startMoneyDrop, false);
  }, 5500);

  setTimeout(() => {
      title.classList.add('visibile');
      subTitle.classList.add('visibile');
      // dragBtn.classList.remove('hidden');
  }, 6500);
})
