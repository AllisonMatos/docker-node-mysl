const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const insertSql = `INSERT INTO people(name) VALUES ('Wesley')`;

connection.query(insertSql, (error, results, fields) => {
    if (error) throw error;

    // Recuperando os dados inseridos
    const selectSql = `SELECT * FROM people WHERE id = ${results.insertId}`;

    connection.query(selectSql, (error, results, fields) => {
        if (error) throw error;

        const name = results[0].name;

        // Iniciando o servidor após a inserção e recuperação dos dados
        app.get('/', (req, res) => {
            res.send(`<h1>SALVE OS POKEMONS</h1><p>Nome inserido no banco de dados: ${name}</p>`);
        });

        app.listen(port, () => {
            console.log('Rodando na porta ' + port);
        });
    });
});



