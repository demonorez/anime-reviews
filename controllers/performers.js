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

export {
  newPerformer as new,
}