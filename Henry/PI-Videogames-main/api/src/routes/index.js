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
        if (name) {
            Promise.allSettled([
                axios.get('https://api.rawg.io/api/games', { params: { search: name, key : YOUR_API_KEY, page_size: 15 }}),
                Videogame.findAll({where : {name: {[Op.iLike]: `%${name}%`}}, limit:15, include : Genre})])
                .then(array => res.status(200).json([...array[0]?.value?.data?.results, ...array[1]?.value]))
                .catch(err => res.status(404).send(err.message))
                return
        }
            Promise.allSettled([
                axios.get('https://api.rawg.io/api/games', {params: {key : YOUR_API_KEY, page_size: 15}}),
                Videogame.findAll({limit:15, include : Genre})])
                .then(array =>res.status(200).json([...array[0]?.value?.data?.results, ...array[1]?.value]))
                .catch(err => res.status(404).send(err.message))
});

router.get('/videogames/sorted', (req, res) => {
    Promise.allSettled([
        axios.get('https://api.rawg.io/api/games', {params: {key : YOUR_API_KEY, page_size: 15}}),
        Videogame.findAll({include : Genre})])
        .then(array =>res.status(200).json([...array[0]?.value?.data?.results, ...array[1]?.value][0]))
        .catch(err => res.status(404).send(err.message))
})

router.get('/videogames/:idVideoGame', (req, res) => {
    const { idVideoGame } = req.params;
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
    let {name, description, launchDate, rating, platform, image} = req.body;
    if (!name|| !description || !platform) return res.status(400).send('You are lacking important information');
    try {
        await Videogame.create({name, description, launchDate, rating, platform, image});
        res.status(200).send('Ya se creó loco')
    } catch (err) {
        res.status(404).send(err.message)
    }
})

router.get('/videogame', (req, res)=> {
    const { name } = req.query
    Videogame.findOne({where: {name: {[Op.iLike]: name}}})
    .then(resp => {resp ? res.status(200).send('Name is already taken') : res.status(404).send('Name is free')})
    .catch(err => res.status(400).send(err.message))
})

router.post('/genres', (req, res) =>{
    axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    .then(value => Genre.bulkCreate(value?.data?.results?.map(e => {return {name: e.name}})))
    .then(genres => res.status(200).json(genres))
    .catch(err => res.status(404).send(err.message))
})



module.exports = router;



