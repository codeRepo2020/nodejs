const route = require('express').Router()

route.get('/', async (req, res) => {
  try {
    res.render('pages/homepage/homepage')
  } catch (e) {
    console.error(e)
    res.redirect('/')
  }
})

module.exports = route