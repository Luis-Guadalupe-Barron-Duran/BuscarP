const pool = require('../config/db');

const obtenerp=async (req, res) =>{
try{
    const {nombre} = req.params;
        const query= `SELECT p.*, c.nombre AS categoria_nombre
            FROM productos p
            INNER JOIN categoria c ON p.id_categoria = c.id
            WHERE p.nombre ILIKE $1
        `
        const { rows } = await pool.query(query, [`%${nombre}%`]);
        res.json(rows);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error al leer bd' });
    }
};

const buscarProductos = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || !q.trim()) {
            return res.status(400).json({
                 error: 'No se envio ningun parametro' 
                });
        }
        const query = `SELECT p.*, c.nombre AS categoria_nombre
            FROM productos p INNER JOIN categoria c ON p.id_categoria = c.id
            WHERE p.nombre ILIKE $1 OR p.descripcion ILIKE $1`;

        const { rows } = await pool.query(query, [`%${q}%`]);
        return res.json(rows);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al leer bd' });
    }
};


module.exports = { obtenerp, buscarProductos };
