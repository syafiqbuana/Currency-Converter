function showLogin() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('registerForm').classList.add('hidden');
}

function showRegister() {
  document.getElementById('registerForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const error = document.getElementById('loginError');
  error.textContent = '';

  if (username === '' || password === '') {
    error.textContent = 'Please fill out all fields.';
    return;
  }

  const savedUser = localStorage.getItem(username);
  if (savedUser && JSON.parse(savedUser).password === password) {
    alert('Login successful!');
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'konversi.html';
  } else {
    error.textContent = 'Invalid username or password.';
  }
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const error = document.getElementById('registerError');
  error.textContent = '';

  if (username === '' || password === '') {
    error.textContent = 'Please fill out all fields.';
    return;
  }

  if (localStorage.getItem(username)) {
    error.textContent = 'Username already exists.';
    return;
  }

  localStorage.setItem(username, JSON.stringify({ username, password }));
  alert('Registration successful!');
  showLogin();
});
