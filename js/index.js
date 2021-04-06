// const refs = {
//   days: document.querySelector('span[data-value="days"]'),
//   hours: document.querySelector('span[data-value="hours"]'),
//   minutes: document.querySelector('span[data-value="mins"]'),
//   seconds: document.querySelector('span[data-value="secs"]'),
// };

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.element = document.querySelector(selector);
    this.targetDate = targetDate;

    this.initTimer();
  }

  initTimer() {
    const currentDate = Date.now();
    let time = this.targetDate.getTime() - currentDate;
    const intervalId = setInterval(() => {
      time -= 1000;
      if (time < 0) {
        time = 0;
        clearInterval(intervalId);
      }
      const timeComponentsValues = this.getTimeComponents(time);
      this.render(timeComponentsValues);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  render({ days, hours, mins, secs }) {
    return (this.element.innerHTML = `
    <div class="field">
      <span class="value" data-value="days">${days}</span>
      <span class="label">Days</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="hours">${hours}</span>
      <span class="label">Hours</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="mins">${mins}</span>
      <span class="label">Minutes</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="secs">${secs}</span>
      <span class="label">Seconds</span>
    </div>
    `);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("May 2, 2021"),
});
