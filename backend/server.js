// Serveur Node.js ultra-simple
const http = require('http');
const mysql = require('mysql2/promise');

const PORT = 3000;

// Configuration base de données
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'secret',
  database: process.env.DB_NAME || 'tuto_db'
};

// Créer le serveur HTTP
const server = http.createServer(async (req, res) => {
  // Headers CORS pour permettre les requêtes du frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  // Route: GET /users - Liste tous les utilisateurs
  if (req.method === 'GET' && req.url === '/users') {
    try {
      const connection = await mysql.createConnection(dbConfig);
      const [users] = await connection.execute('SELECT * FROM users');
      await connection.end();
      
      res.writeHead(200);
      res.end(JSON.stringify({ success: true, users }));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ success: false, error: error.message }));
    }
  }
  
  // Route: GET /status - Vérifier que l'API fonctionne
  else if (req.method === 'GET' && req.url === '/status') {
    res.writeHead(200);
    res.end(JSON.stringify({ 
      success: true, 
      message: 'API fonctionne !',
      date: new Date().toISOString()
    }));
  }
  
  // Route non trouvée
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ success: false, message: 'Route non trouvée' }));
  }
});

server.listen(PORT, () => {
  console.log(`✅ Serveur Node.js démarré sur le port ${PORT}`);
  console.log(`📊 Connexion à MySQL: ${dbConfig.host}/${dbConfig.database}`);
});
