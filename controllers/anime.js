import { Anime } from '../models/anime.js'
import { Performer } from '../models/performer.js'

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
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  req.body.owner = req.user.profile._id
  Anime.create(req.body)
  .then(anime => {
    res.redirect(`/anime/${anime._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/anime')
  })
}

function show(req, res) {
  Anime.findById(req.params.id)
  .populate('cast')
  .populate('owner')
  .populate('reviews.creator')
  .then(anime => {
    Performer.find({_id: {$nin: anime.cast}})
    .then(performersNotInCast => {
      res.render('anime/show', {
        title: 'Anime Details',
        anime,
        performersNotInCast,
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function deleteAnime(req, res) {
  Anime.findById(req.params.id)
  .then(anime => {
    if (anime.owner.equals(req.user.profile._id)) {
      anime.delete()
      .then(() => {
        res.redirect(`/anime`)
      })
    } else {
      throw new Error('Not authorized user!')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/anime')
  })
}

function edit(req, res) {
  Anime.findById(req.params.id)
  .then(anime => {
    res.render('anime/edit', {
      anime,
      title: "Edit Anime Details"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function update(req, res) {
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  Anime.findById(req.params.id)
  .then(anime => {
    if (anime.owner.equals(req.user.profile._id)) {
      anime.updateOne(req.body)
      .then(() => {
        res.redirect(`/anime/${anime._id}`)
      })
    } else {
      throw new Error('Not authorized user!')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function createReview(req, res) {
  Anime.findById(req.params.id)
  .then(anime => {
    req.body.creator = req.user.profile._id
    anime.reviews.push(req.body)
    anime.save()
    .then(() => {
      res.redirect(`/anime/${anime._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function addToCast(req, res) {
  Anime.findById(req.params.id)
  .then(anime => {
    anime.cast.push(req.body.performerId)
    anime.save()
    .then(() => {
      res.redirect(`/anime/${anime._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/anime')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/anime')
  })
}

function deleteReview(req, res) {
  Anime.findById(req.params.animeId)
  .then(anime => {
    anime.reviews.remove({ _id: req.params.reviewId})
    anime.save()
    .then(() => {
      res.redirect(`/anime/${anime._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/anime')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('anime')
  })
}

function editReview(req, res) {
  Anime.findById(req.params.animeId)
  .then(anime => {
    if (anime.owner.equals(req.user.profile._id)) {
      const reviewDoc = anime.reviews.id(req.params.reviewId)
      res.render('anime/editReview', {
        anime,
        review: reviewDoc,
        title: 'Update Review'
      })
    } else {
      throw new Error('Not authorized to edit this review!')
    }
  })
}

function updateReview(req, res) {
  Anime.findById(req.params.animeId)
  .then(anime => {
    if(anime.owner.equals(req.user.profile._id)) {
      const reviewDoc = anime.reviews.id(req.params.reviewId)
      reviewDoc.set(req.body)
      anime.save()
      .then(() => {
        res.redirect(`/anime/${anime._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/anime')
      })
    } else {
      throw new Error('Not authorized to change reviews')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/anime')
  })
}

export {
  index,
  newAnime as new,
  create,
  show,
  deleteAnime as delete,
  edit,
  update, 
  createReview,
  addToCast,
  deleteReview,
  editReview,
  updateReview,
}