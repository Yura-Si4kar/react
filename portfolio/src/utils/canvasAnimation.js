class Squares {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.squares = [];
        this.squareW = 450;
        this.squareH = 450;
        this.color = 'grey';
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        this.createSquaresArray();
        this.move();
    }

    create(x, y, width, height, color) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.rect(x, y, width, height);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    createSquaresArray() {
        for (let i = 0; i < 5; i++) {
        let square = {};
        square.x = this.centerX;
        square.y = this.centerY;
        square.width = this.squareW - i * 20;
        square.height = this.squareH - i * 20;
        square.color = this.color;
        square.angle = 0;
        square.speed = (0.01 + i * 0.01) / 5;
        this.squares.push(square);
        }
    }

    draw(square) {
        this.ctx.save();
        this.ctx.translate(square.x, square.y);
        this.ctx.rotate(square.angle);

        this.create(
        -(square.width / 2),
        -(square.height / 2),
        square.width,
        square.height,
        square.color
        );
        this.ctx.restore();
    }

    move() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.squares.forEach((square) => {
        this.draw(square);
        square.angle -= square.speed;
        });

        requestAnimationFrame(() => this.move());
    }

    updateDimensions() {
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        
        this.squares.forEach((square, index) => {
        square.x = this.centerX;
        square.y = this.centerY;
        square.width = this.squareW - index * 20;
        square.height = this.squareH - index * 20;
        });
    }
}

export default Squares;