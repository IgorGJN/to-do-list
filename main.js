'use strict';

const botaoMenu = document.querySelector('.button_menu');
const menu = document.querySelector('.menu_lateral');
const colorTheme = document.querySelector('.color_theme');
const modeDark = document.querySelector('.light');
const icon = document.querySelector('.icon');
const botaoJW = document.querySelector('.jw');
const botaoTrabalho = document.querySelector('.trabalho');
const botaoHome = document.querySelector('.home');
const botaoCursos = document.querySelector('.cursos');
const botaoDev = document.querySelector('.dev');



botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('menu_lateral-ativo')
})

colorTheme.addEventListener('click', () => {
    modeDark.classList.toggle('dark')
    if (icon.textContent === "dark_mode") {
        icon.textContent="light_mode"
    } else {
        icon.textContent="dark_mode"
    }
})

botaoJW.addEventListener('click', () => {
    localBD = "jw"
    console.log(localBD);
    menu.classList.toggle('menu_lateral-ativo')
    atualizarTela();
})

botaoTrabalho.addEventListener('click', () => {
    localBD = "trabalho"
    console.log(localBD);
    menu.classList.toggle('menu_lateral-ativo')
    atualizarTela();
})

botaoHome.addEventListener('click', () => {
    localBD = "todoList"
    console.log(localBD);
    menu.classList.toggle('menu_lateral-ativo')
    atualizarTela();
})

botaoCursos.addEventListener('click', () => {
    localBD = "cursos"
    console.log(localBD);
    menu.classList.toggle('menu_lateral-ativo')
    atualizarTela();
})

botaoDev.addEventListener('click', () => {
    localBD = "dev"
    console.log(localBD);
    menu.classList.toggle('menu_lateral-ativo')
    atualizarTela();
})


var localBD = "todoList"; 

// let banco = []; 

const getBanco = () => JSON.parse(localStorage.getItem(localBD)) ?? [];

const setBanco = (banco) => localStorage.setItem(localBD, JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }

}

const atualizarTela = () => {
    limparTarefas();
     const banco = getBanco();
    banco.forEach  ((item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem =(evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
        if (tecla === 'Enter') {
            const banco = getBanco();
            banco.push({'tarefa': texto, 'status': ''});
            setBanco(banco);
            atualizarTela();
            evento.target.value = '';
        }
    }
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }  
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();
