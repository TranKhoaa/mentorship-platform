
window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const container = document.getElementById('indexActionButtons');
  
    if (!container) return;
  
    if (token && user) {
      container.innerHTML = `
        <a href="profile.html"><button>Update Your Profile</button></a>
        <a href="discovery.html"><button>Request a Mentor</button></a>
        <a href="requests.html"><button>Viewing your status</button></a>
      `;
    } else {
      container.innerHTML = `
        <a href="register.html"><button>Don't have an account? Register</button></a>
      `;
    }
  });
  