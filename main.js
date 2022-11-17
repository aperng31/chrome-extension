// const body = document.body;

const square = document.createElement("div");
square.id = "square";
const img = new Image();
square.appendChild(img);
const input = document.querySelector("input");
// input.onchange = fn();
// input.onchange(() => console.log(input.value));
input.addEventListener('input', fn);

document.body.appendChild(square);

function fn() {
    //api.giphy.com/v1/gifs/search
    let str = input.value;
    let num = Math.floor(Math.random() * (10 - 1) + 1);
    console.log(num)
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Q67Xtt3mKHApXtX7oXiQ2sEimxiGUKtv&s=${str}&weirdness=${num}`)
    .then((data) => data.json())
    .then((res) => {
        img.src = res.data.images.downsized.url;
        console.log(res);
    })
    // return input.value;
}

// fetch('https://curriculum-api.codesmith.io/messages')
// .then((data) => data.json())
// .then((data) => {
//   console.log(data);
//   //iterate through data to get each message
//   for (let i = 0; i < data.length; i++) {
//     //dom manipulation to add each comment in the window for users to see.
//     let messageList = document.getElementById('message-history');
//     let message = document.createElement('li');
//     message.innerHTML = `user: ${data[i].created_by} <br> message: ${data[i].message} <br> date posted: ${data[i].created_at}`;
//     messageList.appendChild(message);
//   }
// });