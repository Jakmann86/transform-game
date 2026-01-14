// Particle system for celebration effects

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-5, 5);
        this.vy = random(-8, -3);
        this.life = 255;
        this.size = random(4, 12);
        this.color = random() > 0.5 ? color(0, 245, 255) : color(255, 0, 110);
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.3; // Gravity
        this.life -= 5;
    }
    
    display() {
        noStroke();
        fill(red(this.color), green(this.color), blue(this.color), this.life);
        circle(this.x, this.y, this.size);
    }
    
    isDead() {
        return this.life <= 0;
    }
}

function createParticleBurst() {
    let centerX = 0, centerY = 0;
    for (let point of gameState.currentShape.points) {
        centerX += gameState.gridOriginX + point[0] * gameState.gridSize;
        centerY += gameState.gridOriginY - point[1] * gameState.gridSize;
    }
    centerX /= gameState.currentShape.points.length;
    centerY /= gameState.currentShape.points.length;
    
    for (let i = 0; i < 50; i++) {
        gameState.particles.push(new Particle(centerX, centerY));
    }
}