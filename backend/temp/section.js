const { Pool } = require("pg");
const pool = require("../constants");
const table_name = "section";

const getSection = () => {
    return new Promise(function(resolve, reject) {
        Pool.query('SELECT * FROM ${table_name} ORDER BY s_id ASC', (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results.rows);
        });
    });
}

const createSection = (body) => {
    return new Promise(function(resolve, reject){
        pool.query('INSERT INTO ${table_name} () VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(`A new ${table_name} has been added added: ${results.rows[0]}`)
        });
    });
}

const deleteSection = () => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM ${table_name} WHERE id = $1', [id], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve('$(table_name) deleted with ID: ${id}');
    });
}

module.exports = {
    getSection,
    createSection,
    deleteSection
}