import { Anime } from '../models/anime.js'

function index(req, res) {
  Anime.find({})
  .then(anime => {
    res.render('anime/index', {
      anime, 
      title: "All Anime"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function newAnime(req, res) {
  res.render("anime/new", {
    title: "Add an Anime",
  })
}

function create(req, res) {
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(', ')
  }
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Anime.create(req.body)
  .then(anime => {
    res.redirect('/anime/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/anime/new')
  })
}

export {
  index,
  newAnime as new,
  create
}