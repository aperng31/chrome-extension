class Square {
    constructor(el) {
        this.node = document.createElement('div');
        this.node.setAttribute('id', 'square');
        el.appendChild(this.node);

        // this.node.style.bottom = '100px'; // this would make the entire div element and all the its child nodes start at this position
        // this.node.style.left = '100px';  // we dont need these because we declare a fixed position in style.css for the square
        console.log(this.node);
        // document.createElement('div').onmousedown = this.move
        this.node.onmousedown = this.move;
    }

    appendImg(img) {
        this.node.appendChild(img);
    }

    move(event) {
        const mySquare = this;
        // (1) prepare to moving: make absolute and on top by z-index
        mySquare.position = 'absolute';
        mySquare.style.zIndex = 1000;

        let shiftX = event.clientX - mySquare.getBoundingClientRect().left;
        let shiftY = event.clientY - mySquare.getBoundingClientRect().top;
        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        // document.body.append(ball);
        // function disableScroll() {
        //     // Get the current page scroll position
        //     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        //     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          
        //         // if any scroll is attempted, set this to the previous value
        //         window.onscroll = function() {
        //             window.scrollTo(scrollLeft, scrollTop);
        //         };
        // }
        // window.onscroll = function(e) {
        //     console.log(e);
        //     e.preventDefault();
        // }
        // disableScroll();
        //figure out mySquare.style.left/top 
        //figure out "this.node.style.bottom/left"
        function disableScroll(e) {
            e.preventDefault();
        }
        window.addEventListener('wheel', disableScroll, { passive: false });

        // centers the ball at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
            mySquare.style.left = pageX - shiftX + 'px';
            mySquare.style.top = pageY - shiftY + 'px';
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
            // window.addEventListener('wheel', (e) => {}, {passive: true})
            window.removeEventListener('wheel', disableScroll, { passive: false })
            mySquare.onmouseup = null;
            mySquare.style.position = 'fixed';
            // window.onscroll = function() {};
        };

        mySquare.ondragstart = function() {
            return false;
          };
    };

    
}

const square = new Square(document.body);
const img = new Image();
img.setAttribute('id', 'my-img');
square.appendImg(img);
const input = document.querySelector("input");
// input.onchange = fn();
// input.onchange(() => console.log(input.value));
input.addEventListener('input', fn);
// function disableScroll() {
//     // Get the current page scroll position
//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
//         // if any scroll is attempted, set this to the previous value
//         window.onscroll = function() {
//             window.scrollTo(scrollLeft, scrollTop);
//         };
// }

// disableScroll();

function fn() {
    //api.giphy.com/v1/gifs/search
    let str = input.value;
    let num = Math.floor(Math.random() * (10 - 1) + 1);
    console.log(num)
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`) //`https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`
    .then((data) => data.json())
    .then((res) => {
        img.src = res.data.images.downsized.url;
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
    return input.value;
}

