let speed = 20;
let scale = 0.17; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let logoColor;

function createImage(url) {
	const img = new Image();
	img.src = url;
	return img;
}

let clicks = [];
const phrases = [
	"britmoji.",
	"no bitches?",
	createImage("https://media.discordapp.net/stickers/958516600296865843.png?size=160"),
	"\"the pipeline isnt real\"",
	"* racial slur *",
	"\"this doesn't affect my baby\"",
	createImage("https://media.discordapp.net/stickers/966761901780504597.png?size=160"),
	createImage("https://media.discordapp.net/stickers/960619462460076092.png?size=160"),
	createImage("https://media.discordapp.net/stickers/968699293370310666.png?size=160"),
	createImage("https://media.discordapp.net/stickers/887267915102056460.png?size=160"),
	"banger",
	"(autism diagnosis)",
	"${jndi:ldap://192.168.1.1:6969/britmoji}",
	"poggingfile:///home/britmoji/Pictures/Screenshot%20from%202021-04-11%2023-09-14.png",
	"* moans *",
	"calling all oomfies",
	"@oomfies",
	"hi oomfies",
	createImage("https://media.discordapp.net/stickers/983690705727815731.webp?size=160"),
	createImage("https://pbs.twimg.com/media/FcJpjQMWQAEI31Z?format=jpg&name=orig")
];

let dvd = {
	x: 200,
	y: 300,
	xspeed: 10,
	yspeed: 10,
	img: new Image()
};

(function main() {
	Notification.requestPermission();

	canvas = document.getElementById("tv-screen");
	if (!canvas) return;

	ctx = canvas.getContext("2d");

	dvd.img.src = 'https://media.discordapp.net/stickers/902594793266356284.png?size=512';

	//Draw the "tv screen"
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	document.body.onclick = onClick;

	onHit();
	update();
})();

function onClick(e) {
	const x = e.clientX;
	const y = e.clientY;
	clicks.push({
		x: x,
		y: y,
		scale: 30,
		phrase: phrases[Math.floor(Math.random() * phrases.length)],
		color: randColor()
	});

	// Check if they click on the logo
	if (x > dvd.x && x < dvd.x + dvd.img.width * scale && y > dvd.y && y < dvd.y + dvd.img.height * scale) {
		window.location.pathname = "/run.html";
	}

	theOnePiece();
}

function update() {
	setTimeout(() => {
		ctx.drawImage(ctx.canvas, 0, 0);
		ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		//Draw DVD Logo and his background
		ctx.fillStyle = logoColor;
		ctx.fillRect(dvd.x, dvd.y, dvd.img.width * scale, dvd.img.height * scale);
		ctx.drawImage(dvd.img, dvd.x, dvd.y, dvd.img.width * scale, dvd.img.height * scale);

		//Move the logo
		dvd.x += dvd.xspeed;
		dvd.y += dvd.yspeed;

		// Process clicks
		for (let click of clicks) {
			if (click.phrase instanceof Image) {
				const size = click.scale * 5;
				ctx.drawImage(click.phrase, click.x - size / 2, click.y - size / 2, size, size);
			} else {
				// Draw text
				ctx.font = `${click.scale}px Comic Sans MS, cursive`;
				ctx.fillStyle = click.color;
				ctx.textAlign = "center";
				ctx.fillText(click.phrase, click.x, click.y + 10);
			}
			click.scale -= 1;
		}

		clicks = clicks.filter(click => click.scale > 0);

		//Check for collision
		checkHitBox();
		update();
	}, speed);
}

//Check for border collision
function checkHitBox() {
	if (dvd.x + dvd.img.width * scale >= canvas.width || dvd.x <= 0) {
		dvd.xspeed *= -1;
		onHit();
	}

	if (dvd.y + dvd.img.height * scale >= canvas.height || dvd.y <= 0) {
		dvd.yspeed *= -1;
		onHit();
	}
}

function randomBetween(min, max) { // min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randColor() {
	const r = randomBetween(0, 255);
	const g = randomBetween(0, 255);
	const b = randomBetween(0, 255);
	return `rgb(${r}, ${g}, ${b})`;
}

//Pick a random color in RGB format
function onHit() {
	logoColor = randColor();

	dvd.img.width = randomBetween(300, 1000);
	dvd.img.height = randomBetween(300, 1000);

	if (dvd.y + dvd.img.height * scale >= canvas.height) {
		dvd.y = canvas.height - dvd.img.height * scale;
	}

	if (dvd.x + dvd.img.width * scale >= canvas.width) {
		dvd.x = canvas.width - dvd.img.width * scale;
	}
}

if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

function wheel(event) {
	var delta = 0;
	if (event.wheelDelta) delta = event.wheelDelta / 120;
	else if (event.detail) delta = -event.detail / 3;
	handle(delta);
	if (event.preventDefault) event.preventDefault();
	event.returnValue = false;
}

function handle(delta) {
	var time = 1000;
	var distance = 300;
	$('html, body').stop().animate({
		scrollTop: $(window).scrollTop() - (distance * delta)
	}, time);
}

const randomizeCapitalization = (str) => {
	return str.split('').map(c => {
		let result = Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase();
		if (Math.random() > 0.9) result += " ";
		return result;
	}).join('');
};

const funnyElements = {
	"notes": "notes!!!",
	"britmoji-inc": "Britmoji Inc.",
	"peep": "ayo peep this one!!!"
};

setInterval(() => {
	for (let id in funnyElements) {
		const element = document.getElementById(id);
		if (element) {
			element.innerHTML = randomizeCapitalization(funnyElements[id]);
		}
	}
}, 500);

function theOnePiece() {
	const audio = new Audio("https://cdn.discordapp.com/attachments/392884654333493269/1016833949621817424/can_we_get_much_higher_sound_effect.mp3");
	audio.type = "audio/mp3";
	try {
		audio.play();
	} catch (e) {
		console.log(e);
	}
}
