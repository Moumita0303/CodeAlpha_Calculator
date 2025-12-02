const display = document.getElementById('display');
const keys = document.querySelector('.keys');
let current = '';


function updateDisplay(){ display.textContent = current || '0'; }


keys.addEventListener('click', e=>{
const btn = e.target.closest('button'); if(!btn) return;
const action = btn.dataset.action;
const value = btn.textContent;
if(!action){ // number or dot
if(value === '.' && current.slice(-1) === '.') return;
current += value;
} else if(action === 'clear'){
current = '';
} else if(action === 'delete'){
current = current.slice(0,-1);
} else if(action === 'operator'){
const op = value === '×' ? '*' : value === '÷' ? '/' : value;
if(!current) return; // ignore
current += op;
} else if(action === 'equals'){
try{ current = String(eval(current)); }catch(e){ current = 'Error'; }
}
updateDisplay();
});


// keyboard support
window.addEventListener('keydown', e=>{
const allowed = '0123456789+-*/.';
if(allowed.includes(e.key)){
current += e.key; updateDisplay();
} else if(e.key === 'Enter'){
try{ current = String(eval(current)); }catch(e){ current='Error'; } updateDisplay();
} else if(e.key === 'Backspace'){
current = current.slice(0,-1); updateDisplay();
} else if(e.key === 'c' || e.key === 'C'){
current = ''; updateDisplay();
}
});