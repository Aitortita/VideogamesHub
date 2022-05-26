


// GET https://api.rawg.io/api/games
// GET https://api.rawg.io/api/games?search={game}
// GET https://api.rawg.io/api/genres






// https://api.rawg.io/api/games/{id}

let id = 300

axios.get(`https://api.rawg.io/api/games/${id}`)





// https://api.rawg.io/api/games/300

// https://api.rawg.io/api/games?search={id}






// router.get('/videogames', (req, res) => {
//     const { name } = req.query;
//         if (name) {
//             Promise.allSettled([
//                 axios.get('https://api.rawg.io/api/games', { params: { search: name, key : YOUR_API_KEY, page_size: 15 }}),
//                 Videogame.findAll({where : {name: {[Op.iLike]: `%${name}%`}}, limit:15, include : Genre})])
//                 .then(array => res.status(200).json([...array[0]?.value?.data?.results, ...array[1]?.value]))
//                 .catch(err => res.status(404).send(err.message))
//                 return
//         }
//             Promise.allSettled([
//                 axios.get('https://api.rawg.io/api/games', {params: {key : YOUR_API_KEY, page_size: 15}}),
//                 Videogame.findAll({limit:15, include : Genre})])
//                 .then(array =>res.status(200).json([...array[0]?.value?.data?.results, ...array[1]?.value]))
//                 .catch(err => res.status(404).send(err.message))
// });