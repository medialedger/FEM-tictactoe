let ttt = {
	playing: false,
	x: null,
	o: null,
	current: null,
	scoreX: 0,
	scoreO: 0,
	ties: 0
}

// new game marks
const newMarks = document.querySelectorAll('.marks > button');
function selectMark() {
	newMarks.forEach(mark => {
		mark.dataset.selected = false;
	})
	this.dataset.selected = true;
}
newMarks.forEach(mark => {
	mark.addEventListener('click',selectMark);
})

// new game start
function newGameStart() {
	// make sure a mark is selected
	// error message if not
	// set mark to p1
	// set other mark to cpu or p2
	// add playing to body
}