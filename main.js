class Square {
    constructor(el) {
        this.node = document.createElement('div');
        this.node.setAttribute('id', 'square');
        el.appendChild(this.node);

        this.node.style.bottom = '100px';
        this.node.style.left = '100px';

        this.node.onmousedown = this.move;
    }

    move(event) {
        const mySquare = this.node;
        // (1) prepare to moving: make absolute and on top by z-index
        mySquare.style.position = 'absolute';
        mySquare.style.zIndex = 1000;
        
        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        // document.body.append(ball);
        
        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
            mySquare.style.left = pageX - mySquare.offsetWidth / 2 + 'px';
            mySquare.style.top = pageY - mySquare.offsetHeight / 2 + 'px';
        }
        
        // move our absolutely positioned ball under the pointer
        moveAt(event.pageX, event.pageY);
        
        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }
        
        // (2) move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
        
        // (3) drop the ball, remove unneeded handlers
        mySquare.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            mySquare.onmouseup = null;
            mySquare.style.position = 'fixed';
        };
    };
}

const square = new Square(document.body);
const img = new Image();
square.appendChild(img);
const input = document.querySelector("input");
// input.onchange = fn();
// input.onchange(() => console.log(input.value));
input.addEventListener('input', fn);

function fn() {
    //api.giphy.com/v1/gifs/search
    let str = input.value;
    let num = Math.floor(Math.random() * (10 - 1) + 1);
    console.log(num)
    // fetch() //`https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`
    // .then((data) => data.json())
    // .then((res) => {
    //     img.src = res.data.images.downsized.url;
    //     console.log(res);
    // })
    // .catch((err) => {
    //     console.log(err);
    // })
    // return input.value;
}

