const estudantesIniciais = [
    { nome: "Gustavo Henrique", xp: 120 },
    { nome: "Caio de Aquino", xp: 95 },
    { nome: "Lucas Felipe", xp: 80 },
    { nome: "Vitor de Paiva", xp: 60 },
    { nome: "Lucas Nery", xp: 200 }
];

const listaDesafios = [
    {
        id: "js_1", lang: "javascript", nivel: "facil", xp: 10,
        titulo: "Variáveis em JavaScript",
        instrucao: "A gamificação usa XP. Crie uma variável chamada <code>xp</code> e atribua o valor <code>10</code> a ela.",
        template: "let xp = ",
        validador: (cod) => cod.includes("let xp=10") || cod.includes("let xp = 10"),
        arquivo: "index.js"
    },
    {
        id: "js_2", lang: "javascript", nivel: "facil", xp: 10,
        titulo: "Constantes em JS",
        instrucao: "Crie uma constante chamada <code>PI</code> e atribua o valor <code>3.14</code>.",
        template: "const PI = ",
        validador: (cod) => cod.includes("const PI=3.14") || cod.includes("const PI = 3.14"),
        arquivo: "math.js"
    },
    {
        id: "js_3", lang: "javascript", nivel: "medio", xp: 20,
        titulo: "Função de Saudação",
        instrucao: "Complete a função para que ela retorne a string <code>'Olá Mundo'</code>.",
        template: "function saudar() {\n    return \n}",
        validador: (cod) => cod.includes("return'Olá Mundo'") || cod.includes('return "Olá Mundo"') || cod.includes("return 'Olá Mundo'"),
        arquivo: "utils.js"
    },
    {
        id: "js_4", lang: "javascript", nivel: "dificil", xp: 35,
        titulo: "Arrow Function Moderna",
        instrucao: "Declare uma arrow function chamada <code>dobrar</code> que recebe <code>n</code> e retorna <code>n * 2</code>.",
        template: "const dobrar = ",
        validador: (cod) => cod.includes("n=>n*2") || cod.includes("(n)=>n*2") || cod.includes("n => n * 2"),
        arquivo: "avancado.js"
    },

    {
        id: "java_1", lang: "java", nivel: "facil", xp: 10,
        titulo: "Impressão de Texto",
        instrucao: "Complete a linha de código clássica para imprimir <code>'Hello'</code> no console do Java.",
        template: "System.out.",
        validador: (cod) => cod.includes('System.out.println("Hello")') || cod.includes('System.out.print("Hello")'),
        arquivo: "Main.java"
    },
    {
        id: "java_2", lang: "java", nivel: "medio", xp: 20,
        titulo: "Métodos Estáticos",
        instrucao: "Escreva a assinatura de um método público e estático que não retorna nada (void) chamado <code>conectarBetoneira</code>.",
        template: "public static void ",
        validador: (cod) => cod.includes("public static void conectarBetoneira()"),
        arquivo: "Simulador.java"
    },
    {
        id: "java_3", lang: "java", nivel: "dificil", xp: 35,
        titulo: "Instanciação de Objetos",
        instrucao: "Instancie um objeto da classe <code>Calculadora</code> na variável <code>calc</code> usando a palavra-chave adequada.",
        template: "Calculadora calc = ",
        validador: (cod) => cod.includes("Calculadora calc=newCalculadora()") || cod.includes("Calculadora calc = new Calculadora()"),
        arquivo: "Programa.java"
    },

    {
        id: "csharp_1", lang: "csharp", nivel: "facil", xp: 10,
        titulo: "Tipagem Primitiva",
        instrucao: "Declare uma variável do tipo inteiro chamada <code>idade</code> com o valor <code>18</code>.",
        template: "int idade = ",
        validador: (cod) => cod.includes("int idade=18") || cod.includes("int idade = 18"),
        arquivo: "Cadastro.cs"
    },
    {
        id: "csharp_2", lang: "csharp", nivel: "medio", xp: 20,
        titulo: "Estruturas Condicionais",
        instrucao: "Escreva uma estrutura de validação IF onde: se a variável <code>erros</code> for idêntica a <code>0</code>.",
        template: "if (erros == 0)",
        validador: (cod) => cod.includes("if(erros==0)") || cod.includes("if (erros == 0)"),
        arquivo: "SuporteTerminal.cs"
    },
    {
        id: "csharp_3", lang: "csharp", nivel: "dificil", xp: 35,
        titulo: "Laço Foreach",
        instrucao: "Complete a assinatura do laço para percorrer cada item do tipo <code>string</code> chamado <code>nome</code> dentro da coleção <code>lista</code>.",
        template: "foreach (string nome ",
        validador: (cod) => cod.includes("foreach(stringnomeinlista)") || cod.includes("foreach (string nome in lista)"),
        arquivo: "Processador.cs"
    }
];

if (!localStorage.getItem('alunoLogado')) {
    localStorage.setItem('alunoLogado', JSON.stringify({ nome: "Lucas Nery", xp: 0, progresso: 0 }));
}
if (!localStorage.getItem('rankingGlobal')) {
    localStorage.setItem('rankingGlobal', JSON.stringify(estudantesIniciais));
}

function getUsuario() {
    return JSON.parse(localStorage.getItem('alunoLogado'));
}

function saveUsuario(usuario) {
    localStorage.setItem('alunoLogado', JSON.stringify(usuario));
    atualizarRankingGlobal(usuario);
}

function atualizarRankingGlobal(usuario) {
    let ranking = JSON.parse(localStorage.getItem('rankingGlobal'));
    let index = ranking.findIndex(e => e.nome === usuario.nome);
    
    if (index !== -1) {
        ranking[index].xp = usuario.xp;
    } else {
        ranking.push({ nome: usuario.nome, xp: usuario.xp });
    }
    ranking.sort((a, b) => b.xp - a.xp);
    localStorage.setItem('rankingGlobal', JSON.stringify(ranking));
}

function premiarUsuario(xpGanho) {
    let usuario = getUsuario();
    usuario.xp += xpGanho;
    usuario.progresso = Math.min(usuario.progresso + 10, 100);

    saveUsuario(usuario);
    verificarConquistas(usuario.xp);
}

function verificarConquistas(xpAtual) {
    let conquistas = [];
    if (xpAtual >= 10) conquistas.push("🏅 Primeiro Passo");
    if (xpAtual >= 40) conquistas.push("⚡ Código Veloz");
    if (xpAtual >= 80) conquistas.push("🧠 Mestre da Lógica");
    if (xpAtual >= 150) conquistas.push("🚀 Dev Sênior");
    
    localStorage.setItem('conquistasAluno', JSON.stringify(conquistas));
}

function renderDashboard() {
    const usuario = getUsuario();
    const conquistas = JSON.parse(localStorage.getItem('conquistasAluno')) || [];

    if(document.getElementById('qtd-xp')) document.getElementById('qtd-xp').innerText = usuario.xp;
    if(document.getElementById('progresso-atual')) document.getElementById('progresso-atual').style.width = usuario.progresso + '%';
    if(document.getElementById('nome-aluno')) document.getElementById('nome-aluno').innerText = usuario.nome;

    const containerConquistas = document.getElementById('lista-conquistas');
    if (containerConquistas) {
        containerConquistas.innerHTML = conquistas.length === 0 
            ? "<p style='color:#aaa;'>Nenhuma medalha desbloqueada ainda. Pratique!</p>" 
            : conquistas.map(c => `<span class="badge-conquista">${c}</span>`).join('');
    }
}

function irParaExercicio(idExercicio) {
    window.location.href = `editor.html?id=${idExercicio}`;
}

function filtrarCursos(linguagem) {
    const cards = document.querySelectorAll('.card-curso');
    cards.forEach(card => {
        if (linguagem === 'todos' || card.getAttribute('data-lang') === linguagem) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function renderRanking() {
    const ranking = JSON.parse(localStorage.getItem('rankingGlobal'));
    const usuarioAtual = getUsuario();
    const tabela = document.getElementById('corpo-tabela-ranking');
    
    if (!tabela) return;

    tabela.innerHTML = ranking.map((estudante, index) => {
        const ehUsuarioAtual = estudante.nome === usuarioAtual.nome ? 'class="linha-destaque"' : '';
        return `
            <tr ${ehUsuarioAtual}>
                <td><strong>${index + 1}º</strong></td>
                <td>${estudante.nome}</td>
                <td><span class="badge-xp">${estudante.xp} XP</span></td>
            </tr>
        `;
    }).join('');
}