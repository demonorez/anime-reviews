import { Profile } from '../models/profile.js'
import { Anime } from '../models/anime.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "Anime Watchlist"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.id)
  .populate('watchlist')
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    Anime.find({_id: {$nin: profile.watchlist}})
    .then(animeNotInWatchlist => {
      res.render("profiles/show", {
        title: `${profile.name}'s profile`,
        profile,
        isSelf,
        animeNotInWatchlist,
      })
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

function addToWatchlist(req, res) {
  Profile.findById(req.user.profile._id)
  .then(profile => {
    profile.watchlist.push(req.body.animeId)
    profile.save()
    .then(() => {
      res.redirect(`/profiles/${profile._id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profile')
  })
}

export {
  index, 
  show,
  addToWatchlist
}