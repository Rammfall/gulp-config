export default class Timer {
  constructor () {
    this.timer = document.getElementById('timer');
    this.daysElem = this.timer.querySelector('.timer__days .number');
    this.hoursElem = this.timer.querySelector('.timer__hours .number');
    this.minutesElem = this.timer.querySelector('.timer__minutes .number');
    this.secondsElem = this.timer.querySelector('.timer__seconds .number');
    this.countdoun = '';
  }

  start(finishDate = Date.now() + 345600000) {
    this.countdoun = setInterval(() => {
      const timeToLeft = Math.round((finishDate - Date.now()) / 1000);
      this.renderToHtml(timeToLeft);
      if (timeToLeft <= 0) clearInterval(this.countdoun);
    }, 1000);
  }

  renderToHtml(time) {
    let days = Math.floor(time / (24 * 60 * 60));
    let hours = Math.floor(time / (60 * 60)) - (days * 24);
    let minutes = Math.floor((time / 60) % 60);
    let seconds = time % 60;

    this.daysElem !== null ? this.daysElem.textContent = `${days < 10 ? 0 : ''}${days}` : true;
    this.hoursElem !== null ? this.hoursElem.textContent = `${hours < 10 ? 0 : ''}${hours}` : true;
    this.minutesElem !== null ? this.minutesElem.textContent = `${minutes < 10 ? 0 : ''}${minutes}` : true;
    this.secondsElem !== null ? this.secondsElem.textContent = `${seconds < 10 ? 0 : ''}${seconds}` : true;
  }

  init(finishDate) {
    return this.start(finishDate);
  }
}
