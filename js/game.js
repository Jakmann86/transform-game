// Game state and main p5.js loop

let gameState = {
    currentLevel: 1,
    moves: 0,
    totalMoves: 0,
    moveHistory: [],
    gridSize: 45,
    gridOriginX: 0,
    gridOriginY: 0,
    currentShape: null,
    targetShape: null,
    animating: false,
    particles: [],
    activeTool: 'translate',
    completedLevels: [],
    // Ghost trail
    ghostShape: null,
    ghostOpacity: 0,
    ghostFadeStart: 0
};

// P5.js setup
function setup() {
    let canvasDiv = document.getElementById('canvas-container');
    
    let canvasWidth = canvasDiv.offsetWidth;
    let canvasHeight = canvasDiv.offsetHeight;
    
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');
    
    let gridDimension = Math.min(canvasWidth, canvasHeight) * 0.90;
    gameState.gridSize = gridDimension / 21;
    gameState.gridOriginX = canvasWidth / 2;
    gameState.gridOriginY = canvasHeight / 2;
    
    loadLevel(gameState.currentLevel);
}

// P5.js draw loop
function draw() {
    background(26, 26, 46);
    
    drawGrid();
    drawAxes();
    drawTargetShape();
    
    // Draw ghost trail (fading previous position)
    drawGhostShape();
    
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
    
    // Update ghost opacity
    if (gameState.ghostOpacity > 0) {
        let elapsed = millis() - gameState.ghostFadeStart;
        let fadeDuration = 1000; // 1 second fade
        gameState.ghostOpacity = Math.max(0, 1 - (elapsed / fadeDuration));
    }
}

// Handle window resize
function windowResized() {
    let canvasDiv = document.getElementById('canvas-container');
    resizeCanvas(canvasDiv.offsetWidth, canvasDiv.offsetHeight);
    
    let gridDimension = Math.min(width, height) * 0.90;
    gameState.gridSize = gridDimension / 21;
    gameState.gridOriginX = width / 2;
    gameState.gridOriginY = height / 2;
}

// Load a level
function loadLevel(levelNum) {
    if (levelNum > levels.length) {
        showFinalResults();
        return;
    }
    
    // Get random variation for this level
    let level = getRandomVariation(levelNum);
    
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
    gameState.ghostShape = null;
    gameState.ghostOpacity = 0;
    
    updateDisplay();
    hideMessage();
    
    document.getElementById('hint-box').innerHTML = 
        `💡 <strong>Level ${level.id}: ${level.name}</strong><br>${level.hint}`;
    
    // Update world display in header
    updateWorldDisplay(level.world);
}

// Update world display
function updateWorldDisplay(worldNum) {
    let worldDisplay = document.querySelector('.game-stats .stat:nth-child(3) .stat-value');
    if (worldDisplay) {
        worldDisplay.textContent = worldNum;
    }
}

// Check if shape is within grid bounds (-10 to 10)
function isShapeInBounds(points) {
    const limit = 10;
    for (let point of points) {
        if (point[0] < -limit || point[0] > limit || 
            point[1] < -limit || point[1] > limit) {
            return false;
        }
    }
    return true;
}

// Handle out of bounds - revert and penalize
function handleOutOfBounds() {
    // Revert to previous state
    if (gameState.moveHistory.length > 0) {
        let previousState = gameState.moveHistory.pop();
        gameState.currentShape.points = previousState.points;
    }
    
    // Add move penalty
    gameState.moves++;
    gameState.totalMoves++;
    
    // Play error sound
    playSound('error');
    
    // Show warning message
    showMessage("⚠️ Shape left the grid! +1 move penalty", "error");
    
    updateDisplay();
}

// Start ghost trail
function startGhostTrail() {
    gameState.ghostShape = {
        points: gameState.currentShape.points.map(p => [...p])
    };
    gameState.ghostOpacity = 1;
    gameState.ghostFadeStart = millis();
}

// Check if shapes match
function shapesMatch() {
    if (!gameState.currentShape || !gameState.targetShape) return false;
    
    let current = gameState.currentShape.points;
    let target = gameState.targetShape.points;
    
    if (current.length !== target.length) return false;
    
    const tolerance = 0.2; // Slightly higher for rotation precision
    
    // For each current point, find if there's a matching target point
    let matchedTargetIndices = new Set();
    
    for (let i = 0; i < current.length; i++) {
        let foundMatch = false;
        
        for (let j = 0; j < target.length; j++) {
            if (matchedTargetIndices.has(j)) continue;
            
            let dx = Math.abs(current[i][0] - target[j][0]);
            let dy = Math.abs(current[i][1] - target[j][1]);
            
            if (dx < tolerance && dy < tolerance) {
                matchedTargetIndices.add(j);
                foundMatch = true;
                break;
            }
        }
        
        if (!foundMatch) {
            return false;
        }
    }
    
    return true;
}

// Get star rating based on moves and par
function getStarRating(moves, par) {
    if (moves <= par) {
        return { stars: "⭐⭐⭐", count: 3 };
    } else if (moves === par + 1) {
        return { stars: "⭐⭐", count: 2 };
    } else if (moves === par + 2) {
        return { stars: "⭐", count: 1 };
    } else {
        return { stars: "💀", count: 0 };
    }
}

// Level complete handler
function onLevelComplete() {
    let level = levels[gameState.currentLevel - 1];
    
    // Play success sound
    playSound('success');
    
    // Add moves to total
    gameState.totalMoves += gameState.moves;
    
    // Track completed level
    gameState.completedLevels.push({
        level: gameState.currentLevel,
        moves: gameState.moves,
        par: level.parMoves
    });
    
    let rating = getStarRating(gameState.moves, level.parMoves);
    
    createParticleBurst();
    
    setTimeout(() => {
        let modal = document.getElementById('success-modal');
        let buttons = document.getElementById('modal-buttons');
        
        // Check if this is the last level of a world
        let isWorldComplete = false;
        let nextLevel = gameState.currentLevel + 1;
        
        if (nextLevel <= levels.length) {
            let currentWorld = levels[gameState.currentLevel - 1].world;
            let nextWorld = levels[nextLevel - 1].world;
            isWorldComplete = (currentWorld !== nextWorld);
        }
        
        if (gameState.currentLevel < levels.length) {
            document.getElementById('modal-title').textContent = "🎉 LEVEL COMPLETE!";
            
            if (isWorldComplete) {
                let worldName = levels[gameState.currentLevel - 1].worldName;
                document.getElementById('modal-stats').innerHTML = 
                    `<strong>🌍 ${worldName} COMPLETE!</strong><br><br>` +
                    `Level completed in <strong>${gameState.moves} moves</strong><br>` +
                    `Par: <strong>${level.parMoves} moves</strong>`;
            } else {
                document.getElementById('modal-stats').innerHTML = 
                    `Completed in <strong>${gameState.moves} moves</strong><br>` +
                    `Par: <strong>${level.parMoves} moves</strong>`;
            }
            
            buttons.innerHTML = '<button class="modal-button primary" onclick="nextLevel()">Next Level →</button>';
        } else {
            showFinalResults();
            return;
        }
        
        document.getElementById('modal-stars').textContent = rating.stars;
        modal.classList.add('active');
    }, 800);
}

// Next level
function nextLevel() {
    document.getElementById('success-modal').classList.remove('active');
    
    let currentWorld = levels[gameState.currentLevel - 1].world;
    gameState.currentLevel++;
    
    if (gameState.currentLevel <= levels.length) {
        let nextWorld = levels[gameState.currentLevel - 1].world;
        
        if (currentWorld !== nextWorld) {
            showWorldFlash(nextWorld);
        } else {
            document.getElementById('level-display').textContent = gameState.currentLevel;
            loadLevel(gameState.currentLevel);
        }
    }
}

// Show world flash screen
function showWorldFlash(worldNum) {
    let worldName = levels[gameState.currentLevel - 1].worldName;
    
    // Play world transition sound
    playSound('worldComplete');
    
    let flash = document.createElement('div');
    flash.id = 'world-flash';
    flash.innerHTML = `
        <div class="world-flash-content">
            <div class="world-number">WORLD ${worldNum}</div>
            <div class="world-name">${worldName}</div>
        </div>
    `;
    document.body.appendChild(flash);
    
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        animation: fadeIn 0.5s ease;
    `;
    
    let content = flash.querySelector('.world-flash-content');
    content.style.cssText = `text-align: center;`;
    
    let worldNumber = flash.querySelector('.world-number');
    worldNumber.style.cssText = `
        font-family: 'Russo One', sans-serif;
        font-size: 48px;
        color: #00F5FF;
        margin-bottom: 20px;
        letter-spacing: 4px;
    `;
    
    let worldNameEl = flash.querySelector('.world-name');
    worldNameEl.style.cssText = `
        font-family: 'Russo One', sans-serif;
        font-size: 64px;
        background: linear-gradient(45deg, #00F5FF, #FF006E);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        letter-spacing: 6px;
    `;
    
    setTimeout(() => {
        flash.remove();
        document.getElementById('level-display').textContent = gameState.currentLevel;
        loadLevel(gameState.currentLevel);
    }, 2000);
}

// Show final results
function showFinalResults() {
    let modal = document.getElementById('success-modal');
    let buttons = document.getElementById('modal-buttons');
    
    let totalPar = levels.reduce((sum, level) => sum + level.parMoves, 0);
    
    let stars;
    let performance;
    if (gameState.totalMoves <= totalPar) {
        stars = "⭐⭐⭐";
        performance = "PERFECT!";
    } else if (gameState.totalMoves <= totalPar + 10) {
        stars = "⭐⭐";
        performance = "EXCELLENT!";
    } else if (gameState.totalMoves <= totalPar + 20) {
        stars = "⭐";
        performance = "COMPLETE!";
    } else {
        stars = "💀";
        performance = "SURVIVED!";
    }
    
    document.getElementById('modal-title').textContent = "🏆 GAME COMPLETE!";
    document.getElementById('modal-stars').textContent = stars;
    document.getElementById('modal-stats').innerHTML = 
        `<div style="font-size: 24px; margin-bottom: 20px; color: #00F5FF;">${performance}</div>` +
        `Total Moves: <strong>${gameState.totalMoves}</strong><br>` +
        `Par Score: <strong>${totalPar}</strong><br><br>` +
        `<div style="font-size: 14px; opacity: 0.8;">You completed all 30 levels!</div>`;
    
    buttons.innerHTML = `
        <button class="modal-button primary" onclick="restartGame()">🔄 Play Again</button>
        <button class="modal-button secondary" onclick="viewStats()">📊 View Stats</button>
        <button class="modal-button secondary" onclick="startChallengeMode()">⚡ Challenge Mode</button>
    `;
    
    modal.classList.add('active');
}

// View stats
function viewStats() {
    let statsHTML = '<div style="max-height: 400px; overflow-y: auto; text-align: left;">';
    statsHTML += '<h3 style="text-align: center; margin-bottom: 20px;">Your Performance</h3>';
    
    let currentWorld = 0;
    gameState.completedLevels.forEach(level => {
        let levelData = levels[level.level - 1];
        
        if (levelData.world !== currentWorld) {
            currentWorld = levelData.world;
            statsHTML += `<div style="margin-top: 20px; padding: 10px; background: rgba(0,245,255,0.1); border-left: 4px solid #00F5FF;">
                <strong>WORLD ${currentWorld}: ${levelData.worldName}</strong>
            </div>`;
        }
        
        let rating = getStarRating(level.moves, level.par);
        
        statsHTML += `<div style="padding: 8px; display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <span>Level ${level.level}</span>
            <span>${rating.stars} ${level.moves}/${level.par} moves</span>
        </div>`;
    });
    
    statsHTML += '</div>';
    
    document.getElementById('modal-stats').innerHTML = statsHTML;
}

// Restart game
function restartGame() {
    document.getElementById('success-modal').classList.remove('active');
    gameState.currentLevel = 1;
    gameState.totalMoves = 0;
    gameState.completedLevels = [];
    document.getElementById('level-display').textContent = 1;
    loadLevel(1);
}

// Undo move
function undoMove() {
    if (gameState.moveHistory.length === 0 || gameState.animating) return;
    
    let previousState = gameState.moveHistory.pop();
    
    // Start ghost trail from current position
    startGhostTrail();
    
    gameState.currentShape.points = previousState.points;
    
    gameState.moves++;
    gameState.totalMoves++;
    
    // Play undo sound
    playSound('undo');
    
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

// Placeholder for challenge mode (will be implemented in challengeMode.js)
function startChallengeMode() {
    if (typeof initChallengeMode === 'function') {
        initChallengeMode();
    } else {
        document.getElementById('success-modal').classList.remove('active');
        showMessage("⚡ Challenge Mode coming soon!", "info");
        setTimeout(() => {
            restartGame();
        }, 2000);
    }
}