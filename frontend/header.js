async function loadHeader() {
  const response = await fetch('header.html');
  const headerHtml = await response.text();
  document.getElementById('headerContainer').innerHTML = headerHtml;

  const headerButtons = document.getElementById('headerButtons');
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const currentPage = window.location.pathname.split('/').pop();

  if (token && user) {
    if (currentPage === 'profile.html') {
      headerButtons.innerHTML = `<button onclick="logout()">Logout</button>`;
      return;
    }
    try {
      const profileRes = await fetch('http://localhost:3000/api/profile', {
        headers: { 'Authorization': 'Bearer ' + token }
      });

      if (profileRes.ok) {
        const text = await profileRes.text();
        if (text) {
          const profileData = JSON.parse(text);

          if (profileData.name && profileData.name.trim() !== '') {
            headerButtons.innerHTML = `
              <span>${profileData.name}</span>
              <button onclick="logout()">Logout</button>
            `;
            return;
          }
        }
      }
    } catch (err) {
      console.warn('Profile fetch failed:', err);
    }
    headerButtons.innerHTML = `<button onclick="logout()">Logout</button>`;
  } else {
    headerButtons.innerHTML = `
      <a href="register.html"><button>Sign Up</button></a>
      <a href="login.html"><button>Login</button></a>
    `;
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

loadHeader();
