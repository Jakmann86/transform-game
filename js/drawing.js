// All drawing functions for the game

function drawGrid() {
    let gridSize = gameState.gridSize;
    
    // Calculate grid boundaries
    let minX = gameState.gridOriginX - 10 * gridSize;
    let maxX = gameState.gridOriginX + 10 * gridSize;
    let minY = gameState.gridOriginY - 10 * gridSize;
    let maxY = gameState.gridOriginY + 10 * gridSize;
    
    // Vertical lines (only -10 to +10)
    for (let x = -10; x <= 10; x++) {
        let screenX = gameState.gridOriginX + x * gridSize;
        
        if (x % 5 === 0 && x !== 0) {
            stroke(100, 100, 130, 200);
            strokeWeight(2.5);
        } else if (x === 0) {
            continue;
        } else {
            stroke(70, 70, 95, 150);
            strokeWeight(1.5);
        }
        line(screenX, minY, screenX, maxY);  // Changed from full height
    }
    
    // Horizontal lines (only -10 to +10)
    for (let y = -10; y <= 10; y++) {
        let screenY = gameState.gridOriginY - y * gridSize;
        
        if (y % 5 === 0 && y !== 0) {
            stroke(100, 100, 130, 200);
            strokeWeight(2.5);
        } else if (y === 0) {
            continue;
        } else {
            stroke(70, 70, 95, 150);
            strokeWeight(1.5);
        }
        line(minX, screenY, maxX, screenY);  // Changed from full width
    }
}

function drawAxes() {
    stroke(150, 150, 180);
    strokeWeight(3);
    
    // Calculate grid boundaries
    let minX = gameState.gridOriginX - 10 * gameState.gridSize;
    let maxX = gameState.gridOriginX + 10 * gameState.gridSize;
    let minY = gameState.gridOriginY - 10 * gameState.gridSize;
    let maxY = gameState.gridOriginY + 10 * gameState.gridSize;
    
    // Draw x and y axes (only within grid)
    line(minX, gameState.gridOriginY, maxX, gameState.gridOriginY);
    line(gameState.gridOriginX, minY, gameState.gridOriginX, maxY);
    
    fill(200, 200, 220);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    textFont('monospace');
    
    // X-axis labels
    for (let x = -10; x <= 10; x++) {
        let screenX = gameState.gridOriginX + x * gameState.gridSize;
        if (x !== 0) {
            text(x, screenX, gameState.gridOriginY + 15);
        }
    }
    
    // Y-axis labels - moved left by half a square
    textAlign(RIGHT, CENTER);
    for (let y = -10; y <= 10; y++) {
        if (y !== 0) {
            let screenY = gameState.gridOriginY - y * gameState.gridSize;
            // Changed from -20 to -(gridSize/2 + 5) to move half a square left
            text(y, gameState.gridOriginX - (gameState.gridSize / 3 + 0), screenY);
        }
    }
    
    // Origin label - moved up and left toward center
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    // Changed from (-18, +18) to (-10, +10) to move closer to center
    text("O", gameState.gridOriginX - 10, gameState.gridOriginY + 10);
}

function drawRotationPoint() {
    let rx = parseFloat(document.getElementById('rotate-x').value) || 0;
    let ry = parseFloat(document.getElementById('rotate-y').value) || 0;
    
    let screenX = gameState.gridOriginX + rx * gameState.gridSize;
    let screenY = gameState.gridOriginY - ry * gameState.gridSize;
    
    // Draw crosshair
    stroke(255, 200, 0);
    strokeWeight(2);
    line(screenX - 15, screenY, screenX + 15, screenY);
    line(screenX, screenY - 15, screenX, screenY + 15);
    
    noStroke();
    fill(255, 200, 0);
    circle(screenX, screenY, 8);
    
    // Label
    fill(255, 200, 0);
    textSize(12);
    textAlign(CENTER);
    text(`(${rx}, ${ry})`, screenX, screenY - 25);
}

function drawReflectionLine() {
    let axis = document.getElementById('reflect-axis').value;
    let value = parseFloat(document.getElementById('reflect-value').value) || 0;
    
    stroke(255, 100, 200, 200);
    strokeWeight(3);
    
    // Calculate grid boundaries
    let minX = gameState.gridOriginX - 10 * gameState.gridSize;
    let maxX = gameState.gridOriginX + 10 * gameState.gridSize;
    let minY = gameState.gridOriginY - 10 * gameState.gridSize;
    let maxY = gameState.gridOriginY + 10 * gameState.gridSize;
    
    if (axis === 'y=') {
        // Horizontal line at y = value (stop at grid edges)
        let screenY = gameState.gridOriginY - value * gameState.gridSize;
        line(minX, screenY, maxX, screenY);  // Changed from (0, screenY, width, screenY)
    } else if (axis === 'x=') {
        // Vertical line at x = value (stop at grid edges)
        let screenX = gameState.gridOriginX + value * gameState.gridSize;
        line(screenX, minY, screenX, maxY);  // Changed from (screenX, 0, screenX, height)
    } else if (axis === 'y=x') {
        // Line from (-10, -10) to (10, 10) in grid coordinates
        let x1 = gameState.gridOriginX - 10 * gameState.gridSize;
        let y1 = gameState.gridOriginY + 10 * gameState.gridSize;
        let x2 = gameState.gridOriginX + 10 * gameState.gridSize;
        let y2 = gameState.gridOriginY - 10 * gameState.gridSize;
        line(x1, y1, x2, y2);
    } else if (axis === 'y=-x') {
        // Line from (-10, 10) to (10, -10) in grid coordinates
        let x1 = gameState.gridOriginX - 10 * gameState.gridSize;
        let y1 = gameState.gridOriginY - 10 * gameState.gridSize;
        let x2 = gameState.gridOriginX + 10 * gameState.gridSize;
        let y2 = gameState.gridOriginY + 10 * gameState.gridSize;
        line(x1, y1, x2, y2);
    }
}

function drawTargetShape() {
    if (!gameState.targetShape) return;
    
    fill(255, 0, 110, 40);
    stroke(255, 0, 110);
    strokeWeight(4);
    
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = 'rgba(255, 0, 110, 0.5)';
    
    drawShapeFromPoints(gameState.targetShape.points);
    
    drawingContext.shadowBlur = 0;
}

function drawCurrentShape() {
    if (!gameState.currentShape) return;
    
    fill(0, 245, 255, 200);
    stroke(0, 245, 255);
    strokeWeight(3);
    
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgba(0, 245, 255, 0.6)';
    
    drawShapeFromPoints(gameState.currentShape.points);
    
    drawingContext.shadowBlur = 0;
}

// Add this function to js/drawing.js (after drawCurrentShape)

function drawGhostShape() {
    if (!gameState.ghostShape || gameState.ghostOpacity <= 0) return;
    
    fill(0, 245, 255, gameState.ghostOpacity * 80);
    stroke(0, 245, 255, gameState.ghostOpacity * 150);
    strokeWeight(2);
    
    drawShapeFromPoints(gameState.ghostShape.points);
}

function drawShapeFromPoints(points) {
    if (points.length < 3) return;
    
    beginShape();
    for (let point of points) {
        let screenX = gameState.gridOriginX + point[0] * gameState.gridSize;
        let screenY = gameState.gridOriginY - point[1] * gameState.gridSize;
        vertex(screenX, screenY);
    }
    endShape(CLOSE);
}