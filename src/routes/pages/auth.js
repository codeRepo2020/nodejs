const route = require('express').Router()
const passport = require('../../auth/passport')
const { createUser } = require('../../controllers/users')

//res.render(path.join(__dirname, '../public', 'pages/auth/login'));
//route.get('/login', (req, res) => res.sendFile('pages/auth/login'), { root: 'pages/auth' })
route.get('/signup', (req, res) => res.render('pages/auth/signup'))
route.get('/login', (req, res) => res.render('pages/auth/login'))
route.post('/signup', async (req, res) => {
  try {
    await createUser(req.body.username, req.body.password)
  } catch (e) {
    throw e
  }
  res.redirect('/auth/login')
})

route.post('/login', passport.authenticate('local', {
  failureRedirect: '/',
  successRedirect: '/articles'
}))


module.exports = route
