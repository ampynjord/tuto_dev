const API = '/api';

async function testAPI() {
    const result = document.getElementById('result');
    result.innerHTML = 'Connexion à l\'API...';
    
    try {
        const res = await fetch(`${API}/status`);
        const data = await res.json();
        
        result.innerHTML = `
            <div class="success">✅ API fonctionne !</div>
            <p><strong>Message:</strong> ${data.message}</p>
        `;
    } catch (error) {
        result.innerHTML = `<div class="error">❌ Erreur: ${error.message}</div>`;
    }
}

async function getUsers() {
    const result = document.getElementById('result');
    result.innerHTML = 'Chargement des utilisateurs...';
    
    try {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        
        if (data.success) {
            let html = `<div class="success">✅ ${data.users.length} utilisateurs trouvés</div>`;
            
            data.users.forEach(user => {
                html += `
                    <div class="user">
                        <strong>${user.name}</strong><br>
                        ${user.email}
                    </div>
                `;
            });
            
            result.innerHTML = html;
        }
    } catch (error) {
        result.innerHTML = `<div class="error">❌ Erreur: ${error.message}</div>`;
    }
}
