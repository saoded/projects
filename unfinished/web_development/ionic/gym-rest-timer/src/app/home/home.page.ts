import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  percent: number = 0;
  radius: number = 100;

  fullTime: any = '00:01:30';

  timer: any = false;
  progress: any = 0;
  minutes: number = 1;
  seconds: any = 30;

  overallTimer: any = false;
  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  }

  startTimer() {
    if (this.timer)
      clearInterval(this.timer);
    if (!this.overallTimer)
      this.progressTimer();

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    let timeSplit = this.fullTime.split(':');
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    let totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds)
    this.timer = setInterval(() => {
      if (this.percent == 100)
        clearInterval(this.timer);

      ++this.progress;
      this.percent = Math.floor((this.progress / totalSeconds) * 100)
    }, 1000)
  }

  progressTimer() {
    let countdownDate = new Date();

    this.overallTimer = setInterval(() => {
      let now = new Date().getTime();
      let distance = now - countdownDate.getTime()

      this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);

      this.elapsed.h = this.pad(this.elapsed.h, 2);
      this.elapsed.m = this.pad(this.elapsed.m, 2);
      this.elapsed.s = this.pad(this.elapsed.s, 2);

    }, 1000)
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size)
      s = "0" + s;
    return s;
  }

}