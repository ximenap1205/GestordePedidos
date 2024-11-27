// Obtener los formularios de login y pedido
const loginForm = document.getElementById('login-form');
const pedidoForm = document.getElementById('pedido-form');

// Manejador de inicio de sesión
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);  // Guarda el token en localStorage
            loginForm.style.display = 'none';
            pedidoForm.style.display = 'block'; // Muestra el formulario de pedidos
        } else {
            alert(data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Hubo un error con la solicitud de login');
    }
});

// Crear un pedido
pedidoForm.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const producto = document.getElementById('producto').value;
    const cantidad = document.getElementById('cantidad').value;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('No estás autenticado');
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Enviar token de autorización
            },
            body: JSON.stringify({ producto, cantidad })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Pedido creado exitosamente');
            // Puedes agregar lógica para limpiar el formulario o mostrar el nuevo pedido
        } else {
            alert(data.message || 'Error al crear el pedido');
        }
    } catch (error) {
        console.error('Error al crear el pedido:', error);
        alert('Hubo un error al crear el pedido');
    }
});
