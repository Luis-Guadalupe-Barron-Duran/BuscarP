const input = document.getElementById('input');
const buscarbtn = document.getElementById('buscarbtn');
const clearbtn = document.getElementById('clearbtn');
const tablaproductos = document.getElementById('tablaproductos');
const status = document.getElementById('status');
const encontrados = document.getElementById('encontrados');

const url = 'http://localhost:4000/api';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function cargarTodos() {
    iniciarSpinner('Cargando');
    try {
        await sleep(1000);
        const response = await fetch(`${url}/productos`);
        const productos = await response.json();
        mostrarProductos(productos, '');
    } catch (error) {
        console.error('Error:', error);
        tablaproductos.innerHTML = '<tr><td colspan="5">Error al cargar</td></tr>';
    } finally {
        detenerSpinner();
    }
}

async function buscar(produc) {
    iniciarSpinner('Buscando');
    try {
        await sleep(1000);
        const response = await fetch(`${url}/productos/search?q=${produc}`);
        const productos = await response.json();
        mostrarProductos(productos, produc);
    } catch (error) {
        console.error('Error:', error);
        tablaproductos.innerHTML = '<tr><td colspan="5">Error en la búsqueda</td></tr>';
    } finally {
        detenerSpinner();
    }
}

function mostrarProductos(productos, produc) {
    if (!productos || productos.length === 0) {
        tablaproductos.innerHTML = '<tr><td colspan="5">No encontramos productos que coincidan con</td></tr>';
        result(produc);
        return;
    }
result('');
let html = '';

    productos.forEach(producto => {
        html += `<tr>
                <td>${producto.nombre}</td>
                <td>${producto.descripcion || ''}</td>
                <td>${producto.categoria_nombre || ''}</td>
                <td>$${producto.precio}</td>
                <td>${producto.stock}</td>
            </tr>`;
    });
    tablaproductos.innerHTML = html;
}
function iniciarSpinner(mensaje) {
    if (!status) return;

    status.textContent = `${mensaje}...`;
}

function detenerSpinner() {
    if (status) status.textContent = '';
}

function result(produc) {
    if (!encontrados) return;

    if (!produc) {
        encontrados.textContent = '';
        return;
    }

    encontrados.textContent = `No encontramos productos que coincidan con '${produc}'`;
}


buscarbtn.addEventListener('click', () => {
    const produc = input.value.trim();
    if (produc) {
        buscar(produc);
        return;
    }
    result('');
});

clearbtn.addEventListener('click', () => {
    input.value = '';
    result('');
    cargarTodos();
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        buscarbtn.click();
    }
});

document.addEventListener('DOMContentLoaded', cargarTodos);

