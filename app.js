var app = new Vue({
    el: '#app',
    data: {
        score: 0,
        inGame: false,
        ended: false, 
        punched: false,
        lastBox: '',
        countSeconds: 0,
        click: 0,
        seconds: '',
        highscore: localStorage.getItem("highest-score"),
    },
    
    methods: {
        start: function () {
            this.inGame = true;
            app.guess();
            this.seconds = app.timer(20);
            setTimeout(() => this.ended = true, 20000)
        },


        getTime: function (min, max) {
            return Math.round(Math.random() * (max - min) + min);

        },

        getSouthPark: function (boxes) {
            boxes = document.querySelectorAll('.hole');
            const idBox = Math.floor(Math.random() * boxes.length);
            const selectedBox = boxes[idBox];
            if (selectedBox === this.lastBox) {
                console.log("duplicate box");
                return app.getSouthPark(boxes)
            }
            this.lastBox = selectedBox;
            return selectedBox;
        },

        highestScore: function () {
            let highscore = localStorage.getItem("highsest-score");
//            this.highestScore = 0;9
            localStorage.getItem("last-score") = app.score;
            if (localStorage.getItem("last-score") > localStorage.getItem("highest-score") || localStorage.getItem("highest-score") == null) {
                localStorage.getItem("highest-score") = localStorage.getItem("last-score");
            }
        },

        guess: function () {
            const time = app.getTime(900, 1800);
            let boxes = document.querySelectorAll('.hole');
            const box = app.getSouthPark(boxes);
            box.classList.add('kenny');
            setTimeout(() => {
                box.classList.remove('kenny');
                if (!this.ended) app.guess();
            }, time);
        },

        restart: function () {
            window.location.reload();
        },

        hitKenny: function (e) {
            console.log(e);
            let el = document.getElementsByClassName('hole');
            if (e.isTrusted) {
                this.score++;
                e.toElement.parentNode.classList.remove('kenny');

            } else {
                alert("Hey cheater!");
            }
        },
        timer: function (seconds) {
            const counting = new Date().getTime() + 20000;
            let x = setInterval(() => {
                let now = new Date().getTime();
                let distance = counting - now;
                let seconds = Math.floor((distance % (1000 * 60)) / 1000)
                app.seconds = 'Time left: ' + seconds + ' seconds left';
                if (distance <= 5) {
                    clearInterval(x);
                    app.seconds = "GAME OVER";
                }
            })
        },

    }

})
