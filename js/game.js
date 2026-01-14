// Game state and main p5.js loop

let gameState = {
    currentLevel: 1,
    moves: 0,
    moveHistory: [],
    gridSize: 45,
    gridOriginX: 0,
    gridOriginY: 0,
    currentShape: null,
    targetShape: null,
    animating: false,
    particles: [],
    activeTool: 'translate'
};

// P5.js setup
function setup() {
    let canvasDiv = document.getElementById('canvas-container');
    
    let canvasWidth = canvasDiv.offsetWidth;
    let canvasHeight = canvasDiv.offsetHeight;
    
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');
    
    // 0.85 = bigger grid! Try 0.90 if you want even bigger
    let gridDimension = Math.min(canvasWidth, canvasHeight) * 0.85;
    gameState.gridSize = gridDimension / 21;
    gameState.gridOriginX = canvasWidth / 2;
    gameState.gridOriginY = canvasHeight / 2;
    
    loadLevel(gameState.currentLevel);
}

function windowResized() {
    let canvasDiv = document.getElementById('canvas-container');
    resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    
    let gridDimension = Math.min(width, height) * 0.9;  // Match the 0.85 here too
    gameState.gridSize = gridDimension / 21;
    gameState.gridOriginX = width / 2;
    gameState.gridOriginY = height / 2;
}

// P5.js draw loop
function draw() {
    background(26, 26, 46);
    
    drawGrid();
    drawAxes();
    drawTargetShape();
    drawCurrentShape();
    
    // Draw visual guides for active tool
    if (gameState.activeTool === 'rotate' && !gameState.animating) {
        drawRotationPoint();
    } else if (gameState.activeTool === 'reflect' && !gameState.animating) {
        drawReflectionLine();
    }
    
    // Update and draw particles
    for (let i = gameState.particles.length - 1; i >= 0; i--) {
        gameState.particles[i].update();
        gameState.particles[i].display();
        if (gameState.particles[i].isDead()) {
            gameState.particles.splice(i, 1);
        }
    }
}

// Handle window resize
function windowResized() {
    let canvasDiv = document.getElementById('canvas-container');
    resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    gameState.gridSize = (height * 0.9) / 21;
    gameState.gridOriginX = width / 2;
    gameState.gridOriginY = height / 2;
}

// Load a level
function loadLevel(levelNum) {
    if (levelNum > levels.length) {
        showMessage("🏆 All levels complete!", "success");
        return;
    }
    
    let level = levels[levelNum - 1];
    
    gameState.currentShape = {
        type: level.shape.type,
        points: level.shape.points.map(p => [...p])
    };
    
    gameState.targetShape = {
        type: level.target.type,
        points: level.target.points.map(p => [...p])
    };
    
    gameState.moves = 0;
    gameState.moveHistory = [];
    gameState.particles = [];
    
    updateDisplay();
    hideMessage();
    
    document.getElementById('hint-box').innerHTML = 
        `💡 <strong>Level ${level.id}: ${level.name}</strong><br>${level.hint}`;
}

// Check if shapes match
function shapesMatch() {
    if (!gameState.currentShape || !gameState.targetShape) return false;
    
    let current = gameState.currentShape.points;
    let target = gameState.targetShape.points;
    
    if (current.length !== target.length) return false;
    
    const tolerance = 0.01;
    for (let i = 0; i < current.length; i++) {
        let dx = Math.abs(current[i][0] - target[i][0]);
        let dy = Math.abs(current[i][1] - target[i][1]);
        
        if (dx > tolerance || dy > tolerance) {
            return false;
        }
    }
    
    return true;
}

// Check solution
function checkSolution() {
    if (gameState.animating) return;
    
    if (shapesMatch()) {
        onLevelComplete();
    } else {
        showMessage("❌ Not quite there yet! Keep trying!", "error");
    }
}

// Level complete handler
function onLevelComplete() {
    let level = levels[gameState.currentLevel - 1];
    let stars = gameState.moves <= level.parMoves ? "⭐⭐⭐" : 
                gameState.moves <= level.parMoves + 1 ? "⭐⭐" : "⭐";
    
    createParticleBurst();
    
    setTimeout(() => {
        let modal = document.getElementById('success-modal');
        let buttons = document.getElementById('modal-buttons');
        
        if (gameState.currentLevel < levels.length) {
            document.getElementById('modal-title').textContent = "🎉 LEVEL COMPLETE!";
            buttons.innerHTML = '<button class="modal-button primary" onclick="nextLevel()">Next Level →</button>';
        } else {
            document.getElementById('modal-title').textContent = "🏆 ALL LEVELS COMPLETE!";
            buttons.innerHTML = `
                <button class="modal-button primary" onclick="restartGame()">Play Again</button>
                <button class="modal-button secondary" onclick="document.getElementById('success-modal').classList.remove('active')">Close</button>
            `;
        }
        
        document.getElementById('modal-stars').textContent = stars;
        document.getElementById('modal-stats').innerHTML = 
            `Completed in <strong>${gameState.moves} moves</strong><br>Par: <strong>${level.parMoves} moves</strong>`;
        modal.classList.add('active');
    }, 800);
}

// Next level
function nextLevel() {
    document.getElementById('success-modal').classList.remove('active');
    gameState.currentLevel++;
    document.getElementById('level-display').textContent = gameState.currentLevel;
    loadLevel(gameState.currentLevel);
}

// Restart game
function restartGame() {
    document.getElementById('success-modal').classList.remove('active');
    gameState.currentLevel = 1;
    document.getElementById('level-display').textContent = 1;
    loadLevel(1);
}

// Undo move
function undoMove() {
    if (gameState.moveHistory.length === 0 || gameState.animating) return;
    
    let previousState = gameState.moveHistory.pop();
    gameState.currentShape.points = previousState.points;
    
    gameState.moves++; // Penalty
    
    updateDisplay();
    showMessage("↩️ Undo used (+1 move penalty)", "info");
}

// Reset level
function resetLevel() {
    if (gameState.animating) return;
    loadLevel(gameState.currentLevel);
    showMessage("🔄 Level reset", "info");
}

// Easing function
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}