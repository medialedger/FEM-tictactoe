// objects
const body = document.querySelector('body');
const scoreXlabel = document.getElementById('score-x');
const scoreX = document.querySelector('.score-x b');
const scoreOlabel = document.getElementById('score-o');
const scoreO = document.querySelector('.score-o b');
const scoreTie = document.querySelector('.score-tie b');
const allGridButtons = document.querySelectorAll('.board button');
const dialogWin = document.getElementById('dialog-win');
const dialogP = dialogWin.querySelector('p');
const dialogH3 = dialogWin.querySelector('h3');
const dialogTie = document.getElementById('dialog-tie');
const dialogRestart = document.getElementById('dialog-restart');


// grid functions
function selectGrid() {
	if(!this.dataset.selected) {
		this.dataset.selected = localStorage.getItem('current');
		if(localStorage.getItem(localStorage.getItem('current'))) {
			let thisGrid = localStorage.getItem(localStorage.getItem('current'));
			thisGrid += `,${this.dataset.grid}`;
			localStorage.setItem(localStorage.getItem('current'), thisGrid);
		} else {
			localStorage.setItem(localStorage.getItem('current'), this.dataset.grid);
		}
		evaluateGrid();
	}
}
function evaluateGrid() {
	let currentGrid = [];
	let allGrids = [];
	allGridButtons.forEach(btn => {
		if(btn.dataset.selected) {
			allGrids.push(btn.dataset.grid);
			if(btn.dataset.selected === localStorage.getItem('current')) {
				currentGrid.push(btn.dataset.grid);
			}
		}
	})
	if(currentGrid.length >= 3) {
		// check for winner
		if (
			(currentGrid.includes('1') && currentGrid.includes('2') && currentGrid.includes('3')) ||
			(currentGrid.includes('4') && currentGrid.includes('5') && currentGrid.includes('6')) ||
			(currentGrid.includes('7') && currentGrid.includes('8') && currentGrid.includes('9')) ||
			(currentGrid.includes('1') && currentGrid.includes('4') && currentGrid.includes('7')) ||
			(currentGrid.includes('2') && currentGrid.includes('5') && currentGrid.includes('8')) ||
			(currentGrid.includes('3') && currentGrid.includes('6') && currentGrid.includes('9')) ||
			(currentGrid.includes('1') && currentGrid.includes('5') && currentGrid.includes('9')) ||
			(currentGrid.includes('3') && currentGrid.includes('5') && currentGrid.includes('7'))
		) {
			showWinner(localStorage.getItem('current'));
			return;
		}
		// check for tie
		if(allGrids.length === 9) {
			showTie();
		}
	}
	nextPlay();
}

function showWinner(winner) {
	console.log(winner);
	if(winner === 'x') {
		localStorage.setItem(`score-x`, Number(localStorage.getItem(`score-x`)) + 1);
	} else {
		localStorage.setItem(`score-o`, Number(localStorage.getItem(`score-o`)) + 1);
	}
	scoreX.textContent = localStorage.getItem('score-x');
	scoreO.textContent = localStorage.getItem('score-o');
	scoreTie.textContent = localStorage.getItem('score-tie');
	dialogP.hidden = false;
	dialogP.textContent = `Player ${localStorage.getItem('p1') === localStorage.getItem('current') ? '1' : '2'} wins!`;
	dialogH3.innerHTML = `<svg width="16" height="16"><title>${winner}</title><use href="#icon-${winner}"></use></svg> takes the round`;
	dialogH3.classList.remove('x','o');
	dialogH3.classList.add(winner);
	dialogWin.open = true;
}

function showTie() {
	localStorage.setItem(`score-tie`, Number(localStorage.getItem(`score-tie`)) + 1);
	scoreX.textContent = localStorage.getItem('score-x');
	scoreO.textContent = localStorage.getItem('score-o');
	scoreTie.textContent = localStorage.getItem('score-tie');
	dialogTie.open = true;
}

function nextPlay() {
	localStorage.getItem('current') === 'x' ? localStorage.setItem('current', 'o') : localStorage.setItem('current', 'x');
	body.dataset.current = localStorage.getItem('current');
}

function restartGame() {
	dialogRestart.open = true;
}

function doRestartGame() {
	localStorage.removeItem('round');
	localStorage.removeItem('x');
	localStorage.removeItem('o');
	localStorage.setItem('score-x', 0);
	localStorage.setItem('score-o', 0);
	localStorage.setItem('score-tie', 0);
	location.href = '/index.html';
}
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartGame);
const quitButtons = document.querySelectorAll('.btn-quit');
quitButtons.forEach(btn => {
	btn.addEventListener('click', restartGame);
})
const cancelButton = document.querySelector('.btn-cancel');
cancelButton.addEventListener('click', () => {
	dialogRestart.close();
})
const yesRestartButton = document.querySelector('.btn-restart');
yesRestartButton.addEventListener('click', doRestartGame)

function nextRound() {
	let round = Number(localStorage.getItem('round'));
	localStorage.setItem('round', round + 1);
	localStorage.removeItem('x');
	localStorage.removeItem('o');
	localStorage.setItem('current', 'x');
	scoreX.textContent = localStorage.getItem('score-x');
	scoreO.textContent = localStorage.getItem('score-o');
	body.dataset.current = localStorage.getItem('current');
	allGridButtons.forEach(btn => {
		btn.removeAttribute('data-selected');
	})
}
const nextButtons = document.querySelectorAll('.btn-next');
nextButtons.forEach(btn => {
	btn.addEventListener('click', nextRound);
})

function initGame() {
	if(!localStorage.getItem('round')) {
		const setup = new URL(location).searchParams;
		if((setup.get('p1') === 'x' || setup.get('p1') === 'o') && (setup.get('opponent') === 'cpu' || setup.get('opponent') === 'player')) {
			localStorage.setItem('opponent', setup.get('opponent'));
			localStorage.setItem('p1', setup.get('p1'));
			localStorage.setItem('current', 'x');
			localStorage.setItem('round', '1');
			localStorage.setItem('score-x', '0');
			localStorage.setItem('score-o', '0');
			localStorage.setItem('score-tie', '0');
			if(setup.get('p1') === 'x') {
				localStorage.setItem('p2', 'o');
				scoreXlabel.textContent = 'you';
				scoreOlabel.textContent = setup.get('opponent');
			} else {
				localStorage.setItem('p2', 'x');
				scoreOlabel.textContent = 'you';
				scoreXlabel.textContent = setup.get('opponent');
			}
			scoreX.textContent = localStorage.getItem('score-x');
			scoreO.textContent = localStorage.getItem('score-o');
			scoreTie.textContent = localStorage.getItem('score-tie');
			body.dataset.current = localStorage.getItem('current');
			allGridButtons.forEach(btn => {
				btn.addEventListener('click', selectGrid);
			})
		} else {
			location.href = '/index.html';
		}
	} else {
		if(localStorage.getItem('p1') === 'x') {
			scoreXlabel.textContent = 'you';
			scoreOlabel.textContent = localStorage.getItem('opponent');
		} else {
			scoreOlabel.textContent = 'you';
			scoreXlabel.textContent = localStorage.getItem('opponent');
		}
		scoreX.textContent = localStorage.getItem('score-x');
		scoreO.textContent = localStorage.getItem('score-o');
		scoreTie.textContent = localStorage.getItem('score-tie');
		body.dataset.current = localStorage.getItem('current');
		allGridButtons.forEach(btn => {
			btn.addEventListener('click', selectGrid);
			if(localStorage.getItem('x') && localStorage.getItem('x').includes(btn.dataset.grid)) {
				btn.dataset.selected = 'x';
			}
			if(localStorage.getItem('o') &&localStorage.getItem('o').includes(btn.dataset.grid)) {
				btn.dataset.selected = 'o';
			}
		})
	}
}

initGame();
