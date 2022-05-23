const { Router } = require('express');
const { Op, Videogame, Genre } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const videogames = await Videogame.findAll({limit:15, where : {
                name: {
                    [Op.like]: `%${name}%`
                }
            }});
            if (videogames.length > 0) {
                return res.status(200).json(videogames)
            }
            else return res.status(404).send('Videogame not found')
        }
            const videogames = await Videogame.findAll({attributes: ['id', 'name', 'rating', 'platform']}, {
                include : Genre
            });
            res.status(200).json(videogames);
    } catch (err) {
        console.log(err.message)
    }
});

router.get('/videogames/:idVideoGame', async (req, res) => {
    const { idVideoGame } = req.params;
    try {
        const videogame = await Videogame.findByPk(idVideoGame, {
            include: Genre
        });
        if(videogame) {
           return res.status(200).json(videogame)
        }
        return res.status(404).send('Videogame not found')
    } catch (err) {
        return res.status(404).send(err.message)
    }
});

router.get('/genres', async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.status(200).json(genres)
    } catch (err) {
        res.status(404).send('Algo se rompió amigo')
    }
});

router.post('/videogame', async (req, res) => {
    let {id, name, description, launchDate, rating, platform} = req.body;
    name ? name = name.toLowerCase() : null;
    try {
        await Videogame.create({id, name, description, launchDate, rating, platform});
        res.status(200).send('Ya se creó loco')
    } catch (err) {
        res.status(404).send(err.message)
    }
})



module.exports = router;
