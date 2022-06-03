const { Router } = require('express');
const { Op, Videogame, Genre, Platform } = require('../db.js')
const { YOUR_API_KEY } = process.env;
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/videogames', (req, res) => {
    const { name, sort, sorting } = req.query;
    if (sort) {
        function merge(left, right) {
            let sortedArr = []
            while (left.length && right.length) {
                if (sorting === "ASC") {
                    if (left[0][sort] < right[0][sort]) {
                      sortedArr.push(left.shift())
                    } else {
                      sortedArr.push(right.shift())
                    }
                }
                if (sorting === "DESC"){
                    if (left[0][sort] > right[0][sort]) {
                        sortedArr.push(left.shift())
                      } else {
                        sortedArr.push(right.shift())
                      }
                }
            }
            return [...sortedArr, ...left, ...right]
          }
        function mergeSort(arr) {
            if (arr.length <= 1) return arr
            let mid = Math.floor(arr.length / 2)
            let left = mergeSort(arr.slice(0, mid))
            let right = mergeSort(arr.slice(mid))
            return merge(left, right)
          }
        if (name) {
            axios.get('https://api.rawg.io/api/games', { params: { search: name, key : YOUR_API_KEY, page_size: 100 }})
            .then(({data}) => res.status(200).json(mergeSort(data?.results)))
            .catch(err => res.status(404).send(err.message))
                return
        }
        axios.get('https://api.rawg.io/api/games', {params: {key : YOUR_API_KEY, page_size: 100}})
        .then(({data}) => res.status(200).json(mergeSort(data?.results)))
        .catch(err => res.status(404).send(err.message))
        return
    }
        if (name) {
            Promise.allSettled([
                axios.get('https://api.rawg.io/api/games', { params: { search: name, key : YOUR_API_KEY, page_size: 100 }}),
                Videogame.findAll({where : {name: {[Op.iLike]: `%${name}%`}}, limit:100, include : [{model: Genre}, {model:Platform}]})])
                .then(array => res.status(200).json([...array[0]?.value?.data?.results, ...array[1]?.value]))
                .catch(err => res.status(404).send(err.message))
                return
        }
            Promise.allSettled([
                axios.get('https://api.rawg.io/api/games', {params: {key : YOUR_API_KEY, page_size: 100}}),
                Videogame.findAll({limit:100, include : [{model: Genre}, {model:Platform}]})])
                .then(array => res.status(200).json([...array[0]?.value?.data?.results, ...array[1]?.value]))
                .catch(err => res.status(404).send(err.message))
});

router.get('/videogamesRawg', (req, res) => {
    const { name, sort, sorting } = req.query;
    if (sort) {
        function merge(left, right) {
            let sortedArr = []
            while (left.length && right.length) {
                if (sorting === "ASC") {
                    if (left[0][sort] < right[0][sort]) {
                      sortedArr.push(left.shift())
                    } else {
                      sortedArr.push(right.shift())
                    }
                }
                if (sorting === "DESC"){
                    if (left[0][sort] > right[0][sort]) {
                        sortedArr.push(left.shift())
                      } else {
                        sortedArr.push(right.shift())
                      }
                }
            }
            return [...sortedArr, ...left, ...right]
          }
        function mergeSort(arr) {
            if (arr.length <= 1) return arr
            let mid = Math.floor(arr.length / 2)
            let left = mergeSort(arr.slice(0, mid))
            let right = mergeSort(arr.slice(mid))
            return merge(left, right)
          }
        if (name) {
            axios.get('https://api.rawg.io/api/games', { params: { search: name, key : YOUR_API_KEY, page_size: 100 }})
            .then(({data}) => res.status(200).json(mergeSort(data?.results)))
            .catch(err => res.status(404).send(err.message))
                return
        }
        axios.get('https://api.rawg.io/api/games', {params: {key : YOUR_API_KEY, page_size: 100}})
        .then(({data}) => res.status(200).json(mergeSort(data?.results)))
        .catch(err => res.status(404).send(err.message))
        return
    }
        if (name) {
            axios.get('https://api.rawg.io/api/games', { params: { search: name, key : YOUR_API_KEY, page_size: 100 }})
                .then(({data}) => res.status(200).json(data?.results))
                .catch(err => res.status(404).send(err.message))
                return
        }
            axios.get('https://api.rawg.io/api/games', {params: {key : YOUR_API_KEY, page_size: 100}})
                .then(({data}) => res.status(200).json(data?.results))
                .catch(err => res.status(404).send(err.message))
});

router.get('/videogamesHUB', (req, res) => {
    const { name, sort, sorting } = req.query;
    if (sort) {
        if (name) {
            Videogame.findAll({where : {name: {[Op.iLike]: `%${name}%`}}, order: [[sort, sorting]], limit:100, include : [{model: Genre}, {model:Platform}]})
            .then(value => res.status(200).json(value))
            .catch(err => res.status(404).send(err.message))
                return
        }
        Videogame.findAll({order: [[sort, sorting]], limit:100, include : [{model: Genre}, {model:Platform}]})
        .then(value => res.status(200).json(value))
        .catch(err => res.status(404).send(err.message))
        return
    }
        if (name) {
            Videogame.findAll({where : {name: {[Op.iLike]: `%${name}%`}}, limit:100, include : [{model: Genre}, {model:Platform}]})
                .then(value => res.status(200).json(value))
                .catch(err => res.status(404).send(err.message))
                return
        }
            Videogame.findAll({limit:100, include : [{model: Genre}, {model:Platform}]})
                .then(value => res.status(200).json(value))
                .catch(err => res.status(404).send(err.message))
});

router.get('/videogames/:idVideoGame', (req, res) => {
    const { idVideoGame } = req.params;
    Promise.allSettled([
        axios.get(`https://api.rawg.io/api/games/${idVideoGame}`, { params: {key : YOUR_API_KEY}}),
        Videogame.findByPk(idVideoGame, {include: [{model: Genre}, {model:Platform}]})])
        .then(array => {
            array[0]?.value?.data ? res.status(200).json(array[0].value.data) : null;
            array[1]?.value ? res.status(200).json(array[1].value) : null})
        .catch(err => res.status(404).send(err.message))
});


router.post('/videogame', async (req, res) => {
    let {name, description, launchDate, rating, platform, genre, image} = req.body;
    if (!name|| !description || !genre || !platform) return res.status(400).send('You are lacking important information');
    try {
        const videogame = await Videogame.create({name, description, launchDate, rating, background_image: image})
        const genresDb = await Genre.findAll({where: {name: genre}})
        await videogame.addGenre(genresDb)
        const platformsDb = await Platform.findAll({where: {name: platform}})
        await videogame.addPlatform(platformsDb)
        const videogameFinal = await Videogame.findOne({ where: {name: videogame.name}, include : [{model: Genre}, {model:Platform}]});
        res.status(200).json(videogameFinal)
    } catch (err) {
        console.log(err.message)
        res.status(404).send(err.message)
    }
})

router.get('/videogame', (req, res)=> {
    const { name } = req.query
    Videogame.findOne({where: {name: {[Op.iLike]: name}}})
    .then(resp => {resp ? res.status(200).send('Name is already taken') : res.status(200).send('Name is free')})
    .catch(err => {console.log(err.message); res.status(400).send(err.message)})
})

router.get('/genres', (req, res) => {
    Genre.findAll().then(genres => res.status(200).json(genres))
    .catch(err => res.status(404).send(err.message))
})

router.get('/platforms', (req, res) => {
    Platform.findAll().then(platforms => res.status(200).json(platforms))
    .catch((err) => res.status(404).send(err.message))
})

router.post('/genres', (req, res) =>{
    axios.get(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
    .then(resp => Genre.bulkCreate(resp?.data?.results?.map(e => {return {name: e.name}})))
    .then(genres => res.status(200).json(genres))
    .catch(err => res.status(404).send(err.message))
})

router.post('/platforms', (req, res) => {
    axios.get(`https://api.rawg.io/api/platforms?key=${YOUR_API_KEY}`)
    .then(resp => Platform.bulkCreate(resp?.data?.results?.map(e => {return {name: e.name}})))
    .then(platforms => res.status(200).json(platforms))
    .catch(err => res.status(404).send(err.message))
})

module.exports = router;



