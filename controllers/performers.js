import { Performer } from '../models/performer.js'

function newPerformer(req, res) {
  Performer.find({})
  .then(performers => {
    res.render('performers/new', {
      title: 'Add Performer',
      performers,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/anime')
  })
}

function create(req, res) {
  console.log("adding new guy/grill")
  Performer.create(req.body)
  .then(performer => {
    res.redirect('performers/new')
  })
}

export {
  newPerformer as new,
  create,
}