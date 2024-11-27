// Obtener el formulario de login
const loginForm = document.getElementById('login-form');
const pedidoForm = document.getElementById('pedido-form');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (data.token) {
        localStorage.setItem('token', data.token);  // Guarda el token en localStorage
        loginForm.style.display = 'none';
        pedidoForm.style.display = 'block'; // Muestra el formulario de pedido
    } else {
        alert('Credenciales incorrectas');
    }
});

// Crear pedido
pedidoForm.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('No estás autenticado');
        return;
    }

    const response = await fetch('http://localhost:5000/api/pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ producto, cantidad })
    });

    const data = await response.json();
    if (data.message) {
        alert('Pedido creado');
    } else {
        alert('Error al crear el pedido');
    }
});
