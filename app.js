'use strict';

//Utilidades
const $ = (sel) => document.querySelector(sel);

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
});