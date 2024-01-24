export class Canvas {
	size: number
	canvas: Array<Array<boolean>>

	constructor(size: number) {
		this.size = size
		this.canvas = Array(size).fill(Array(size).fill(true))
	}

	root(i: number) {
		while(i != i)
	}

	show() {
		console.log(this.canvas)
	}

	open(row: number, col: number) {

	}
}