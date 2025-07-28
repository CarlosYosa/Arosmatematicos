let currentRound = 1;

// Función para cambiar de ronda
function switchRound(round) {
    currentRound = round;
    document.getElementById('currentRound').textContent = round;
    
    // Actualizar botones activos
    document.querySelectorAll('.round-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-round="${round}"]`).classList.add('active');
    
    // Generar primer problema de la nueva ronda
    generateProblem();
}

// Funciones auxiliares
function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function simplifyFraction(num, den) {
    if (den === 0) return [num, 1];
    const g = gcd(num, den);
    const sign = (den < 0) ? -1 : 1;
    return [sign * num / g, sign * den / g];
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

// Ronda 1: a × b = r
function generateRound1() {
    const a = Math.floor(Math.random() * 12) + 1;
    const b = Math.floor(Math.random() * 12) + 1;
    const r = a * b;
    
    document.getElementById('problemDisplay').innerHTML = `${a} × ${b} = ?`;
    document.getElementById('solutionDisplay').textContent = `Resultado: ${r}`;
}

// Ronda 2: a × b ± c = r
function generateRound2() {
    const a = Math.floor(Math.random() * 15) + 1;
    const b = Math.floor(Math.random() * 15) + 1;
    const c = Math.floor(Math.random() * 15) + 1;
    
    // Primero multiplicamos (orden de operaciones)
    const multiplication = a * b;
    
    // Aleatoriamente elegimos suma o resta
    const isAddition = Math.random() < 0.5;
    const r = isAddition ? multiplication + c : multiplication - c;
    
    const operator = isAddition ? '+' : '-';
    
    document.getElementById('problemDisplay').innerHTML = `${a} × ${b} ${operator} ${c} = ?`;
    document.getElementById('solutionDisplay').textContent = `Resultado: ${r}`;
}

// Ronda 3: a/b ± c/d = r
function generateRound3() {
    // Generar fracciones
    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;
    let c = Math.floor(Math.random() * 10) + 1;
    let d = Math.floor(Math.random() * 10) + 1;
    
    // Simplificar fracciones
    [a, b] = simplifyFraction(a, b);
    [c, d] = simplifyFraction(c, d);
    
    // Aleatoriamente elegimos suma o resta
    const isAddition = Math.random() < 0.5;
    
    // Calcular resultado
    const lcd = lcm(b, d);
    const num1 = a * (lcd / b);
    const num2 = c * (lcd / d);
    let resultNum = isAddition ? num1 + num2 : num1 - num2;
    let resultDen = lcd;
    
    // Simplificar resultado
    [resultNum, resultDen] = simplifyFraction(resultNum, resultDen);
    
    const operator = isAddition ? '+' : '−';
    
    document.getElementById('problemDisplay').innerHTML = `
        <div class="fraction">
            <span class="fraction-numerator">${a}</span>
            <span class="fraction-denominator">${b}</span>
        </div>
        <span class="operation-sign">${operator}</span>
        <div class="fraction">
            <span class="fraction-numerator">${c}</span>
            <span class="fraction-denominator">${d}</span>
        </div>
        <span class="operation-sign">= ?</span>
    `;
    
    if (resultDen === 1) {
        document.getElementById('solutionDisplay').innerHTML = `Resultado: ${resultNum}`;
    } else {
        document.getElementById('solutionDisplay').innerHTML = `
            Resultado: 
            <div class="fraction" style="display: inline-block; margin-left: 10px;">
                <span class="fraction-numerator">${resultNum}</span>
                <span class="fraction-denominator">${resultDen}</span>
            </div>
        `;
    }
}

// Función principal para generar problemas
function generateProblem() {
    switch (currentRound) {
        case 1:
            generateRound1();
            break;
        case 2:
            generateRound2();
            break;
        case 3:
            generateRound3();
            break;
    }
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos a los botones de ronda
    document.querySelectorAll('.round-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const round = parseInt(this.getAttribute('data-round'));
            switchRound(round);
        });
    });
    
    // Asignar evento al botón siguiente
    document.getElementById('nextBtn').addEventListener('click', generateProblem);
});