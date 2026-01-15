// Challenge Mode - Timed transformation challenge
// Unlocks after completing all 30 levels

let challengeState = {
    active: false,
    timeRemaining: 180, // 3 minutes in seconds
    score: 0,
    streak: 0,
    bestStreak: 0,
    highScore: 0,
    difficulty: 1,
    shapesCompleted: 0,
    timerInterval: null
};

// Challenge mode shape generators
const challengeShapes = {
    triangle: (cx, cy) => [[cx, cy], [cx + 2, cy], [cx + 1, cy + 2]],
    square: (cx, cy) => [[cx, cy], [cx + 2, cy], [cx + 2, cy + 2], [cx, cy + 2]],
    lShape: (cx, cy) => [[cx, cy], [cx + 1, cy], [cx + 1, cy + 2], [cx + 2, cy + 2], [cx + 2, cy + 3], [cx, cy + 3]],
    tShape: (cx, cy) => [[cx, cy], [cx + 1, cy], [cx + 2, cy], [cx + 1, cy + 1], [cx + 1, cy + 2]],
    zShape: (cx, cy) => [[cx, cy], [cx + 1, cy], [cx + 1, cy + 1], [cx + 2, cy + 1]]
};

// Initialize challenge mode
function initChallengeMode() {
    document.getElementById('success-modal').classList.remove('active');
    
    challengeState.active = true;
    challengeState.timeRemaining = 180;
    challengeState.score = 0;
    challengeState.streak = 0;
    challengeState.bestStreak = 0;
    challengeState.difficulty = 1;
    challengeState.shapesCompleted = 0;
    
    challengeState.highScore = parseInt(localStorage.getItem('transformChallengeHighScore')) || 0;
    
    showChallengeUI();
    generateChallenge();
    startChallengeTimer();
}

// Show challenge mode UI overlay
function showChallengeUI() {
    let challengeHeader = document.getElementById('challenge-header');
    if (!challengeHeader) {
        challengeHeader = document.createElement('div');
        challengeHeader.id = 'challenge-header';
        challengeHeader.innerHTML = `
            <div class="challenge-stat">
                <span class="challenge-label">TIME</span>
                <span class="challenge-value" id="challenge-time">3:00</span>
            </div>
            <div class="challenge-stat">
                <span class="challenge-label">SCORE</span>
                <span class="challenge-value" id="challenge-score">0</span>
            </div>
            <div class="challenge-stat">
                <span class="challenge-label">STREAK</span>
                <span class="challenge-value" id="challenge-streak">x1</span>
            </div>
            <div class="challenge-stat">
                <span class="challenge-label">HIGH</span>
                <span class="challenge-value" id="challenge-high">0</span>
            </div>
            <button class="challenge-quit" onclick="quitChallengeMode()">✕ Quit</button>
        `;
        challengeHeader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 60px;
            background: linear-gradient(135deg, #FF006E 0%, #8B0040 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 40px;
            z-index: 2000;
            box-shadow: 0 4px 20px rgba(255, 0, 110, 0.5);
        `;
        document.body.appendChild(challengeHeader);
        
        const style = document.createElement('style');
        style.id = 'challenge-styles';
        style.textContent = `
            .challenge-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .challenge-label {
                font-size: 10px;
                color: rgba(255,255,255,0.7);
                letter-spacing: 2px;
            }
            .challenge-value {
                font-size: 24px;
                font-weight: 900;
                color: white;
                text-shadow: 0 0 10px rgba(255,255,255,0.5);
            }
            #challenge-time {
                color: #00F5FF;
            }
            #challenge-streak {
                color: #FFD700;
            }
            .challenge-quit {
                position: absolute;
                right: 20px;
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                padding: 8px 16px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 700;
            }
            .challenge-quit:hover {
                background: rgba(255,255,255,0.3);
            }
            #game-container.challenge-mode {
                padding-top: 60px;
            }
            #game-container.challenge-mode #game-header {
                display: none;
            }
            @keyframes pointsFloat {
                0% { opacity: 1; transform: translate(-50%, -50%) scale(0.5); }
                50% { opacity: 1; transform: translate(-50%, -100%) scale(1.2); }
                100% { opacity: 0; transform: translate(-50%, -150%) scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    challengeHeader.style.display = 'flex';
    document.getElementById('game-container').classList.add('challenge-mode');
    document.getElementById('challenge-high').textContent = challengeState.highScore;
    document.getElementById('challenge-time').style.color = '#00F5FF';
}

// Hide challenge UI
function hideChallengeUI() {
    const challengeHeader = document.getElementById('challenge-header');
    if (challengeHeader) {
        challengeHeader.style.display = 'none';
    }
    document.getElementById('game-container').classList.remove('challenge-mode');
}

// Start challenge timer
function startChallengeTimer() {
    challengeState.timerInterval = setInterval(() => {
        challengeState.timeRemaining--;
        updateChallengeDisplay();
        
        if (challengeState.timeRemaining <= 0) {
            endChallengeMode();
        }
        
        if (challengeState.timeRemaining === 30) {
            document.getElementById('challenge-time').style.color = '#FF006E';
            playSound('error');
        }
    }, 1000);
}

// Update challenge display
function updateChallengeDisplay() {
    const minutes = Math.floor(challengeState.timeRemaining / 60);
    const seconds = challengeState.timeRemaining % 60;
    document.getElementById('challenge-time').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('challenge-score').textContent = challengeState.score;
    document.getElementById('challenge-streak').textContent = `x${Math.max(1, challengeState.streak)}`;
}

// Generate a challenge
function generateChallenge() {
    let availableTypes = ['translate'];
    if (challengeState.difficulty >= 2) availableTypes.push('reflect');
    if (challengeState.difficulty >= 3) availableTypes.push('rotate');
    
    const transformType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
    const shapeTypes = Object.keys(challengeShapes);
    const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    
    let startX = Math.floor(Math.random() * 6) - 3;
    let startY = Math.floor(Math.random() * 6) - 3;
    
    const shapePoints = challengeShapes[shapeType](startX, startY);
    let targetPoints;
    
    switch(transformType) {
        case 'translate':
            let dx = Math.floor(Math.random() * 8) - 4;
            let dy = Math.floor(Math.random() * 8) - 4;
            if (dx === 0 && dy === 0) {
                dx = 3;
                dy = 2;
            }
            targetPoints = shapePoints.map(p => [p[0] + dx, p[1] + dy]);
            break;
            
        case 'reflect':
            const axes = ['x', 'y'];
            const axis = axes[Math.floor(Math.random() * axes.length)];
            if (axis === 'x') {
                targetPoints = shapePoints.map(p => [p[0], -p[1]]);
            } else {
                targetPoints = shapePoints.map(p => [-p[0], p[1]]);
            }
            break;
            
        case 'rotate':
            const angles = [90, 180, 270];
            const angle = angles[Math.floor(Math.random() * angles.length)];
            const rad = (angle * Math.PI) / 180;
            targetPoints = shapePoints.map(p => {
                const newX = Math.round(p[0] * Math.cos(rad) - p[1] * Math.sin(rad));
                const newY = Math.round(p[0] * Math.sin(rad) + p[1] * Math.cos(rad));
                return [newX, newY];
            });
            break;
    }
    
    targetPoints = ensureInBounds(targetPoints);
    const adjustedShape = ensureInBounds(shapePoints);
    
    gameState.currentShape = {
        type: shapeType,
        points: adjustedShape.map(p => [...p])
    };
    
    gameState.targetShape = {
        type: shapeType,
        points: targetPoints.map(p => [...p])
    };
    
    gameState.moves = 0;
    gameState.moveHistory = [];
    gameState.ghostShape = null;
    gameState.ghostOpacity = 0;
    
    updateDisplay();
    
    document.getElementById('hint-box').innerHTML = 
        `⚡ <strong>CHALLENGE MODE</strong><br>Difficulty: ${challengeState.difficulty}/3 | Match shapes fast!`;
}

// Ensure points are within bounds
function ensureInBounds(points) {
    let minX = Math.min(...points.map(p => p[0]));
    let maxX = Math.max(...points.map(p => p[0]));
    let minY = Math.min(...points.map(p => p[1]));
    let maxY = Math.max(...points.map(p => p[1]));
    
    let shiftX = 0;
    let shiftY = 0;
    
    if (minX < -9) shiftX = -9 - minX;
    if (maxX > 9) shiftX = 9 - maxX;
    if (minY < -9) shiftY = -9 - minY;
    if (maxY > 9) shiftY = 9 - maxY;
    
    return points.map(p => [p[0] + shiftX, p[1] + shiftY]);
}

// Challenge mode level complete
function onChallengeLevelComplete() {
    if (!challengeState.active) return;
    
    const basePoints = 100;
    const speedBonus = Math.max(0, 50 - gameState.moves * 10);
    const streakMultiplier = Math.max(1, challengeState.streak);
    
    const points = (basePoints + speedBonus) * streakMultiplier;
    
    challengeState.score += points;
    challengeState.streak++;
    challengeState.bestStreak = Math.max(challengeState.bestStreak, challengeState.streak);
    challengeState.shapesCompleted++;
    
    if (challengeState.shapesCompleted % 5 === 0) {
        challengeState.difficulty = Math.min(3, challengeState.difficulty + 1);
    }
    
    playSound('streak');
    showPointsPopup(points);
    updateChallengeDisplay();
    
    setTimeout(() => {
        generateChallenge();
    }, 500);
}

// Show floating points popup
function showPointsPopup(points) {
    const popup = document.createElement('div');
    popup.textContent = `+${points}`;
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 48px;
        font-weight: 900;
        color: #FFD700;
        text-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
        pointer-events: none;
        animation: pointsFloat 1s ease-out forwards;
        z-index: 3000;
    `;
    
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
}

// Reset streak on out of bounds
function onChallengeWrongMove() {
    if (!challengeState.active) return;
    challengeState.streak = 0;
    updateChallengeDisplay();
}

// End challenge mode
function endChallengeMode() {
    clearInterval(challengeState.timerInterval);
    challengeState.active = false;
    
    if (challengeState.score > challengeState.highScore) {
        challengeState.highScore = challengeState.score;
        localStorage.setItem('transformChallengeHighScore', challengeState.highScore);
    }
    
    hideChallengeUI();
    showChallengeResults();
}

// Quit challenge mode
function quitChallengeMode() {
    if (confirm('Quit challenge mode? Your progress will be lost.')) {
        clearInterval(challengeState.timerInterval);
        challengeState.active = false;
        hideChallengeUI();
        
        gameState.currentLevel = 1;
        loadLevel(1);
    }
}

// Show challenge results
function showChallengeResults() {
    const modal = document.getElementById('success-modal');
    const isNewHighScore = challengeState.score >= challengeState.highScore && challengeState.score > 0;
    
    document.getElementById('modal-title').textContent = 
        isNewHighScore ? "🏆 NEW HIGH SCORE!" : "⏱️ TIME'S UP!";
    
    document.getElementById('modal-stars').textContent = 
        challengeState.score >= 2000 ? "⭐⭐⭐" :
        challengeState.score >= 1000 ? "⭐⭐" :
        challengeState.score >= 500 ? "⭐" : "💀";
    
    document.getElementById('modal-stats').innerHTML = `
        <div style="font-size: 48px; color: #FFD700; margin-bottom: 20px;">${challengeState.score}</div>
        <div style="margin-bottom: 8px;">Shapes Completed: <strong>${challengeState.shapesCompleted}</strong></div>
        <div style="margin-bottom: 8px;">Best Streak: <strong>x${Math.max(1, challengeState.bestStreak)}</strong></div>
        <div>High Score: <strong>${challengeState.highScore}</strong></div>
    `;
    
    document.getElementById('modal-buttons').innerHTML = `
        <button class="modal-button primary" onclick="initChallengeMode()">🔄 Try Again</button>
        <button class="modal-button secondary" onclick="returnToMainGame()">← Main Game</button>
    `;
    
    modal.classList.add('active');
}

// Return to main game
function returnToMainGame() {
    document.getElementById('success-modal').classList.remove('active');
    gameState.currentLevel = 1;
    gameState.totalMoves = 0;
    gameState.completedLevels = [];
    document.getElementById('level-display').textContent = 1;
    loadLevel(1);
}

// Check if challenge level is complete (called from transformations)
function checkChallengeComplete() {
    if (challengeState.active && shapesMatch()) {
        onChallengeLevelComplete();
        return true;
    }
    return false;
}