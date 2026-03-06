'use strict';

//Utilidades
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

//Variables
const $form = $('#formTarea');
const inputTitulo = $('#inputTitulo');
const selectTag = $('#selectTag');
const lista = $('#listaTareas');

//Crear tareas
const crearTarea = (titulo, tag) => {
    const li = document.createElement('li');

    li.className = 'card';
    li.dataset.tag = tag;
    li.dataset.fav = '0';

    li.innerHTML = `
    <div class="card__head">
        <span class="badge">${tag}</span>
        <div class="actions">
            <button class="icon" data-action="fav">☆</button>
            <button class="icon" data-action="done">✓</button>
            <button class="icon danger" data-action="del">🗑</button>
        </div>
    </div>
    <p class="card__title">${titulo}</p>
    `;

    return li;
};

//Agregar tarea
$form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = inputTitulo.value.trim();
    const tag = selectTag.value;

    if (!titulo) return;

    const tarea = crearTarea(titulo, tag);
    lista.appendChild(tarea);
    inputTitulo.value = '';

    actualizarStats();
});

//Eliminar tarea
lista.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="del');
    if (!btn) return;

    const card = btn.closest('.card');
    if(card){
        card.remove();

        actualizarStats();
    }
});

//Marcar tarea como completa
lista.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="done');
    if (!btn) return;

    const card = btn.closest('.card');
    if(card){
        card.classList.toggle('is-done');

        actualizarStats();
    }
});

//Marcar tarea como favorita
lista.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="fav"]');
    if (!btn) return;

    const card = btn.closest('.card');

    if(card.dataset.fav === '1'){
        card.dataset.fav = '0';
        btn.textContent = '☆';
    }else{
        card.dataset.fav = '1';
        btn.textContent = '★';

        lista.prepend(card);
    }
    actualizarStats();
});

//Filtrar tareas
const chips = document.querySelectorAll('.chip');
chips.forEach((chip) => {
    chip.addEventListener('click', () => {
        const filtro = chip.dataset.filter;
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');

        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            const tag = card.dataset.tag;
            const fav = card.dataset.fav;

            if (filtro === 'all') {
                card.style.display = '';
            }
            else if (filtro === 'fav') {
                card.style.display = fav === '1' ? '' : 'none';
            }
            else {
                card.style.display = tag === filtro ? '' : 'none';
            }
            actualizarStats();
        });
    });
});

//Buscar por texto
inputBuscar.addEventListener('input', () => {
    console.log('escribiendo...');
    const texto = inputBuscar.value.toLowerCase();
    const cards = $$('.card');

    cards.forEach(card => {

        const titulo = card.querySelector('.card__title').textContent.toLowerCase();

        if(titulo.includes(texto)){
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
        actualizarStats();
    });
});

//Limpiar busqueda
btnLimpiarBuscar.addEventListener('click', () => {
    inputBuscar.value = '';
    inputBuscar.dispatchEvent(new Event('input'));

    actualizarStats();
});

//Actualizar estadisticas
const actualizarStats = () => {
    const cards = $$('.card');
    const total = cards.length;
    const visibles = cards.filter(card => card.style.display !== 'none').length;
    const favs = cards.filter(card => card.dataset.fav === '1').length;

    statTotal.textContent = total;
    statVisibles.textContent = visibles;
    statFavs.textContent = favs;

    //estado vacío
    if(visibles === 0){
        emptyState.classList.remove('is-hidden');
    }else{
        emptyState.classList.add('is-hidden');
    }

};