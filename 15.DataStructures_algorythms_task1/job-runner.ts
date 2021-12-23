const performanceStart = performance.now();

/********************** 4x faster than priority queue *********************** */

// interface Runner {
//     position: number;
//     priority: number;
// }

// class Runner {
//     position: number;
//     priority: number;
//     constructor(position: number, priority: number) {
//         this.position = position;
//         this.priority = priority;
//     }
// }

// class Runners {
//     protected _runnerPosition: number = 0;
//     protected _runners: Array<Runner> = [];

//     makeRunner() {
//         this._runners.push(
//             new Runner(
//                 this._runnerPosition++,
//                 Math.round(Math.random() * 1000000)
//             )
//         );
//     }

//     sortPriority() {
//         return this._runners.sort((a, b) => {
//             return b.priority - a.priority;
//         });
//     }
// }

// const runners = new Runners();

// for (let i = 0; i < 10000; i++) {
//     runners.makeRunner();
// }

// console.log(runners.sortPriority());

/****************************** Priority queue ***************************** */

interface Runner {
    number: number;
    priority: number;
}

class PriorityQueue {
    runners: Array<Runner>;
    constructor() {
        this.runners = [];
    }

    enqueue(runner: number) {
        const currentRunner: Runner = {
            number: runner,
            priority: Math.round(Math.random() * 1000000),
        };

        if (this.isEmpty()) {
            this.runners.push(currentRunner);
        } else {
            let added: boolean = false;
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

    dequeue = () => this.runners.shift();

    isEmpty = () => this.runners.length === 0;

    outputRunners = () => console.log(this.runners);
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
