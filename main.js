class Square {
    constructor(el) {
        this.node = document.createElement('div');
        this.node.setAttribute('id', 'square');
        el.appendChild(this.node);

        if(sessionStorage.getItem('left')) {
            // console.log(sessionStorage.getItem('left'));
            // console.log(sessionStorage.getItem('top'));
            this.node.style.left = sessionStorage.getItem('left');
            this.node.style.top = sessionStorage.getItem('top');
        }
        else {
            this.node.style.bottom = '100px'; // this would make the entire div element and all the its child nodes start at this position
            this.node.style.left = '100px'; // we dont need these because we declare a fixed position in style.css for the square
        }
        console.log(this.node);
        // document.createElement('div').onmousedown = this.move
        // this.node.onmousedown = this.move;
        this.node.addEventListener('mousedown', e => { //on mousedown, initiate move function
            this.move(e)
        })
        // this.node.addEventListener('mouseup', e => { //on mouseup, remove 'moving' class that was placed by move method
        //     e.target.classList.remove('moving')
        // })
    }

    appendImg(img) {
        this.node.appendChild(img);
    }

    move(e) {
        const mySquare = this.node;
        let shiftX = e.clientX - e.target.getBoundingClientRect().left;
        let shiftY = e.clientY - e.target.getBoundingClientRect().top;
        this.node.classList.add('moving')
        // console.log(e.target.getBoundingClientRect())
        // console.log(mySquare.getBoundingClientRect());
        addEventListener('mouseup', e => {
            if(this.node.classList.contains('moving')){
                this.node.style.left = e.clientX - shiftX + 'px'
                this.node.style.top = e.clientY - shiftY + 'px'
            }
            sessionStorage.setItem('left', this.node.style.left);
            sessionStorage.setItem('top', this.node.style.top);
            this.node.classList.remove('moving')
        })
          
        addEventListener('mousemove', e => {
            if(this.node.classList.contains('moving')){
                this.node.style.left = e.clientX - shiftX + 'px'
                this.node.style.top = e.clientY - shiftY + 'px'
            }
        })
        // make absolute and on top by z-index
        // mySquare.position = 'absolute';
        // mySquare.style.zIndex = 1000;

        // let shiftX = e.clientX - mySquare.getBoundingClientRect().left;
        // let shiftY = e.clientY - mySquare.getBoundingClientRect().top;
        // // move it out of any current parents directly into body
        // // to make it positioned relative to the body
        // // window.onscroll = function(e) {
        // //     console.log(e);
        // //     e.preventDefault();
        // // }
        // // disableScroll();
        // //figure out mySquare.style.left/top 
        // //figure out "this.node.style.bottom/left"
        // function disableScroll(e) {
        //     e.preventDefault();
        // }
        // // window.addEventListener('wheel', disableScroll, { passive: false });

        // // center at (pageX, pageY) coordinates
        // function moveAt(pageX, pageY) {
        //     mySquare.style.left = pageX - shiftX + 'px';
        //     mySquare.style.top = pageY - shiftY + 'px';
        // }
        
        // // move our absolutely positioned ball under the pointer
        // moveAt(event.pageX, event.pageY);
        
        // function onMouseMove(event) { //use coord of event and input to moveAt function
        //     moveAt(event.pageX, event.pageY);
        // }
        
        // // on mousemove, call onMouseMove that reads event
        // document.addEventListener('mousemove', onMouseMove);
        
        // // mouseup to stop moving gif, remove unneeded handlers
        // mySquare.onmouseup = function() {
        //     document.removeEventListener('mousemove', onMouseMove);
        //     // window.addEventListener('wheel', (e) => {}, {passive: true})
        //     // window.removeEventListener('wheel', disableScroll, { passive: false })
        //     console.log(this.style.left);
        //     console.log(this.style.top);
        //     mySquare.onmouseup = null;
        //     // mySquare.style.position = 'fixed';
        //     // window.onscroll = function() {};
        // };

        // this.node.ondragstart = function() {
        //     return false;
        // };
    };
}

const square = new Square(document.body);
const img = new Image();
img.setAttribute('id', 'my-img');
img.ondragstart = function() {
    return false;
}
if(sessionStorage.getItem('URI')) { //if previous uri entered on refresh, saved into sessionStorage
    console.log(sessionStorage.getItem('URI'));
    let str = sessionStorage.getItem('str'); //retrieve previous str
    let num = sessionStorage.getItem('num'); //retrieve previous num
    img.src = sessionStorage.getItem('URI'); //uri
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`) //`https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`
    .then((data) => data.json())
    .then((res) => {
        img.src = res.data.images.downsized.url;
        sessionStorage.setItem('URI', `https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`);
        sessionStorage.setItem('str', str);
        sessionStorage.setItem('num', num);
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })
}
square.appendImg(img);
const input = document.querySelector("input");
console.log(input);
// input.onchange = fn();
// input.onchange(() => console.log(input.value));
input.addEventListener('input', fn);

function fn() {
    //api.giphy.com/v1/gifs/search
    let str = input.value;
    let num = Math.floor(Math.random() * (10 - 1) + 1);
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`) //`https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`
    .then((data) => data.json())
    .then((res) => {
        img.src = res.data.images.downsized.url;
        sessionStorage.setItem('URI', `https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`);
        sessionStorage.setItem('str', str);
        sessionStorage.setItem('num', num);
        console.log(res);
    })
    .catch((err) => {
        console.log(err); //if undefined error reading downsized, then because str is empty
    })
    // return input.value;
}

