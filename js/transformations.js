// All transformation functions

function applyTranslation() {
    if (gameState.animating) return;
    
    let dx = parseFloat(document.getElementById('translate-x').value) || 0;
    let dy = parseFloat(document.getElementById('translate-y').value) || 0;
    
    if (dx === 0 && dy === 0) {
        showMessage("⚠️ Vector cannot be (0, 0)!", "error");
        return;
    }
    
    let previousState = {
        points: gameState.currentShape.points.map(p => [...p])
    };
    gameState.moveHistory.push(previousState);
    
    gameState.animating = true;
    
    // Two-step animation: X first, then Y
    animateTranslation(dx, 0, () => {
        animateTranslation(0, dy, () => {
            gameState.animating = false;
            
            gameState.moves++;
            updateDisplay();
            
            document.getElementById('translate-x').value = 0;
            document.getElementById('translate-y').value = 0;
            
            showMessage(`✓ Applied T(${dx}, ${dy})`, "info");
            
            setTimeout(() => {
                if (shapesMatch()) {
                    onLevelComplete();
                }
            }, 300);
        });
    });
}

function animateTranslation(dx, dy, callback) {
    if (dx === 0 && dy === 0) {
        callback();
        return;
    }
    
    let steps = 20;
    let currentStep = 0;
    let startPoints = gameState.currentShape.points.map(p => [...p]);
    
    let interval = setInterval(() => {
        currentStep++;
        let progress = easeInOutCubic(currentStep / steps);
        
        for (let i = 0; i < gameState.currentShape.points.length; i++) {
            gameState.currentShape.points[i][0] = startPoints[i][0] + dx * progress;
            gameState.currentShape.points[i][1] = startPoints[i][1] + dy * progress;
        }
        
        if (currentStep >= steps) {
            clearInterval(interval);
            callback();
        }
    }, 16);
}

function applyRotation() {
    if (gameState.animating) return;
    
    let angle = parseFloat(document.getElementById('rotate-angle').value) || 0;
    let direction = document.getElementById('rotate-direction').value;
    let cx = parseFloat(document.getElementById('rotate-x').value) || 0;
    let cy = parseFloat(document.getElementById('rotate-y').value) || 0;
    
    // Clockwise = negative angle
    if (direction === 'clockwise') {
        angle = -angle;
    }
    
    let previousState = {
        points: gameState.currentShape.points.map(p => [...p])
    };
    gameState.moveHistory.push(previousState);
    
    gameState.animating = true;
    
    let rad = (angle * Math.PI) / 180;
    
    animateRotation(cx, cy, rad, () => {
        gameState.animating = false;
        
        gameState.moves++;
        updateDisplay();
        
        let dirText = direction === 'clockwise' ? 'clockwise' : 'anticlockwise';
        showMessage(`✓ Rotated ${Math.abs(angle)}° ${dirText} around (${cx}, ${cy})`, "info");
        
        setTimeout(() => {
            if (shapesMatch()) {
                onLevelComplete();
            }
        }, 300);
    });
}

function animateRotation(cx, cy, radians, callback) {
    let steps = 30;
    let currentStep = 0;
    let startPoints = gameState.currentShape.points.map(p => [...p]);
    
    let interval = setInterval(() => {
        currentStep++;
        let progress = easeInOutCubic(currentStep / steps);
        let currentAngle = radians * progress;
        
        for (let i = 0; i < gameState.currentShape.points.length; i++) {
            let x = startPoints[i][0] - cx;
            let y = startPoints[i][1] - cy;
            
            let newX = x * Math.cos(currentAngle) - y * Math.sin(currentAngle);
            let newY = x * Math.sin(currentAngle) + y * Math.cos(currentAngle);
            
            gameState.currentShape.points[i][0] = newX + cx;
            gameState.currentShape.points[i][1] = newY + cy;
        }
        
        if (currentStep >= steps) {
            clearInterval(interval);
            callback();
        }
    }, 16);
}

function applyReflection() {
    if (gameState.animating) return;
    
    let axis = document.getElementById('reflect-axis').value;
    let value = parseFloat(document.getElementById('reflect-value').value) || 0;
    
    let previousState = {
        points: gameState.currentShape.points.map(p => [...p])
    };
    gameState.moveHistory.push(previousState);
    
    gameState.animating = true;
    
    animateReflection(axis, value, () => {
        gameState.animating = false;
        
        gameState.moves++;
        updateDisplay();
        
        let msg = axis === 'y=' ? `y = ${value}` :
                  axis === 'x=' ? `x = ${value}` :
                  axis === 'y=x' ? 'y = x' : 'y = -x';
        showMessage(`✓ Reflected across ${msg}`, "info");
        
        setTimeout(() => {
            if (shapesMatch()) {
                onLevelComplete();
            }
        }, 300);
    });
}

function animateReflection(axis, value, callback) {
    let steps = 25;
    let currentStep = 0;
    let startPoints = gameState.currentShape.points.map(p => [...p]);
    let targetPoints = [];
    
    for (let point of startPoints) {
        let [x, y] = point;
        let newX, newY;
        
        if (axis === 'y=') {
            newX = x;
            newY = 2 * value - y;
        } else if (axis === 'x=') {
            newX = 2 * value - x;
            newY = y;
        } else if (axis === 'y=x') {
            newX = y;
            newY = x;
        } else if (axis === 'y=-x') {
            newX = -y;
            newY = -x;
        }
        
        targetPoints.push([newX, newY]);
    }
    
    let interval = setInterval(() => {
        currentStep++;
        let progress = easeInOutCubic(currentStep / steps);
        
        for (let i = 0; i < gameState.currentShape.points.length; i++) {
            gameState.currentShape.points[i][0] = 
                startPoints[i][0] + (targetPoints[i][0] - startPoints[i][0]) * progress;
            gameState.currentShape.points[i][1] = 
                startPoints[i][1] + (targetPoints[i][1] - startPoints[i][1]) * progress;
        }
        
        if (currentStep >= steps) {
            clearInterval(interval);
            
            // Snap to exact target
            for (let i = 0; i < gameState.currentShape.points.length; i++) {
                gameState.currentShape.points[i][0] = targetPoints[i][0];
                gameState.currentShape.points[i][1] = targetPoints[i][1];
            }
            
            callback();
        }
    }, 16);
}