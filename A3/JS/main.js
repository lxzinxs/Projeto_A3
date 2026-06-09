// Inicializa o estado do usuário no localStorage se não existir
if (!localStorage.getItem('alunoXP')) {
    localStorage.setItem('alunoXP', '0');
    localStorage.setItem('alunoProgresso', '0');
}

// Atualiza os dados na tela ao carregar
window.onload = function() {
    atualizarInterface();
};

function atualizarInterface() {
    const xp = localStorage.getItem('alunoXP');
    const progresso = localStorage.getItem('alunoProgresso');
    
    if(document.getElementById('qtd-xp')) {
        document.getElementById('qtd-xp').innerText = xp;
    }
    if(document.getElementById('progresso-atual')) {
        document.getElementById('progresso-atual').style.width = progresso + '%';
    }
}

// Exemplo da lógica gamificada pedida no escopo do projeto
function ganharXP(dificuldade) {
    let xpGanho = 0;
    let atualXP = parseInt(localStorage.getItem('alunoXP'));
    let atualProgresso = parseInt(localStorage.getItem('alunoProgresso'));

    if (dificuldade === "facil") {
        xpGanho = 10; // Conforme lógica definida no slide 8
    } else if (dificuldade === "medio") {
        xpGanho = 20;
    }

    atualXP += xpGanho;
    atualProgresso = Math.min(atualProgresso + 15, 100); // Sobe o progresso até 100%

    localStorage.setItem('alunoXP', atualXP.toString());
    localStorage.setItem('alunoProgresso', atualProgresso.toString());

    atualInterface();
    alert(`Parabéns! Você resolveu o desafio e ganhou ${xpGanho} XP! ✨`);
}

function iniciarCurso(curso) {
    // Redireciona para o editor/ambiente de prática passando o curso escolhido
    window.location.href = `editor.html?curso=${curso}`;
}