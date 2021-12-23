const performanceStart = performance.now();
class PriorityQueue {
    constructor() {
        this.dequeue = () => this.runners.shift();
        this.isEmpty = () => this.runners.length === 0;
        this.outputRunners = () => console.log(this.runners);
        this.runners = [];
    }
    enqueue(runner) {
        const currentRunner = {
            number: runner,
            priority: Math.round(Math.random() * 1000000),
        };
        if (this.isEmpty()) {
            this.runners.push(currentRunner);
        }
        else {
            let added = false;
            for (let i = 0; i < this.runners.length; i++) {
                if (currentRunner.priority < this.runners[i].priority) {
                    this.runners.splice(i, 0, currentRunner);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.runners.push(currentRunner);
            }
        }
    }
}
const runners = new PriorityQueue();
for (let i = 0; i < 10000; i++) {
    runners.enqueue(i + 1);
}
runners.outputRunners();
/********************************* SOMETHING******************************** */
const performanceEnd = performance.now();
const timer = document.getElementById("timer");
timer.innerHTML = (performanceEnd - performanceStart).toFixed();
