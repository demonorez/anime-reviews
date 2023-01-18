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
  req.body.creator = req.user.profile._id
  Performer.create(req.body)
  .then(performer => {
    res.redirect('performers/new')
  })
}

function deletePerformer(req, res) {
  Performer.findById(req.params.id)
  .then(performer => {
    if (performer.creator.equals(req.user.profile._id)) {
      performer.delete()
      .then(() => {
        res.redirect('/performers/new')
      })
    } else {
      throw new Error('Not authorized user!')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/performers/new')
  })
}

function edit(req, res) {
  Performer.findById(req.params.id)
  .then(performer => {
    res.render('performers/edit', {
      performer,
      title: "Edit Performer Details"
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
  Performer.findById(req.params.id)
  .then(performer => {
    if (performer.creator._id.equals(req.user.profile._id)) {
      performer.updateOne(req.body)
      .then(() => {
        res.redirect(`/performers/new`)
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

export {
  newPerformer as new,
  create,
  deletePerformer as delete,
  edit,
  update,
}