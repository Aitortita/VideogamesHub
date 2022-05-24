const { Router } = require('express');
const { Op, Videogame, Genre } = require('../db.js')
const { YOUR_API_KEY } = process.env;
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', (req, res) => {
    const { name } = req.query;
    let videogamesArray = [];
        if (name) {
            Promise.allSettled([
                axios.get('https://api.rawg.io/api/games', { params: { search: name, key : YOUR_API_KEY, page_size: 15 }}),
                Videogame.findAll({where : {name: {[Op.iLike]: `%${name}%`}}, limit:15, include : Genre})])
                .then(array => {
                    videogamesArray= [...videogamesArray, ...array[0]?.value?.data?.results]
                    videogamesArray= [...videogamesArray, ...array[1]?.value]
                    return res.status(200).json(videogamesArray)
                })
                .catch(err => res.status(404).send(err.message))
                return
        }
            Promise.allSettled([
                axios.get('https://api.rawg.io/api/games', {params: {key : YOUR_API_KEY, page_size: 15}}),
                Videogame.findAll({limit:15, include : Genre})])
                .then(array =>{
                    videogamesArray= [...videogamesArray, ...array[0]?.value?.data?.results]
                    videogamesArray= [...videogamesArray, ...array[1]?.value]
                    return res.status(200).json(videogamesArray)
                })
                .catch(err => res.status(404).send(err.message))
});

router.get('/videogames/:idVideoGame', (req, res) => {
    const { idVideoGame } = req.params;
    // https://api.rawg.io/api/games/{id}
    Promise.allSettled([
        axios.get(`https://api.rawg.io/api/games/${idVideoGame}`, { params: {key : YOUR_API_KEY}}),
        Videogame.findByPk(idVideoGame, {include: Genre})])
        .then(array => {
            array[0]?.value?.data ? res.status(200).json(array[0].value.data) : null;
            array[1]?.value ? res.status(200).json(array[1].value) : null})
        .catch(err => res.status(404).send(err.message))
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
