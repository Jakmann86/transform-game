// UI functions: tool activation, messages, display updates

function activateTool(tool) {
    if (gameState.animating) return;
    
    gameState.activeTool = tool;
    
    ['translate', 'rotate', 'reflect'].forEach(t => {
        let elem = document.getElementById(t + '-tool');
        let status = elem.querySelector('.tool-status');
        
        if (t === tool) {
            elem.classList.add('active');
            elem.classList.remove('inactive');
            status.textContent = 'Active';
            status.classList.add('active-status');
        } else {
            elem.classList.remove('active');
            elem.classList.add('inactive');
            status.textContent = 'Click to activate';
            status.classList.remove('active-status');
        }
    });
}

function updateReflectInput() {
    let axis = document.getElementById('reflect-axis').value;
    let valueRow = document.getElementById('reflect-value-row');
    
    if (axis === 'y=' || axis === 'x=') {
        valueRow.style.display = 'flex';
    } else {
        valueRow.style.display = 'none';
    }
}

function updateDisplay() {
    document.getElementById('moves-display').textContent = gameState.moves;
    document.getElementById('undo-btn').disabled = gameState.moveHistory.length === 0;
}

function showMessage(text, type) {
    let msgBox = document.getElementById('message-box');
    msgBox.innerHTML = text;
    msgBox.className = type;
    
    setTimeout(() => hideMessage(), 3000);
}

function hideMessage() {
    let msgBox = document.getElementById('message-box');
    msgBox.style.display = 'none';
    msgBox.className = '';
}

// Enter key handling
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('translate-x').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('translate-y').focus();
        }
    });
    document.getElementById('translate-y').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applyTranslation();
    });
    
    updateReflectInput();
});