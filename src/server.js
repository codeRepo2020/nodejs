const express = require('express')
const path = require('path')
const hbs = require('express-hbs')
const session = require('express-session')

const passport = require('./auth/passport')
const { createUser } = require('./controllers/users')

const app = express()

app.engine('hbs', hbs.express4({
  partialsDir: path.join(__dirname, '../views/partials'),
  layoutsDir: path.join(__dirname, '../views/layouts'),
  defaultLayout: path.join(__dirname, '../views/layouts/main.hbs')
}))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'some super secret string',
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
//app.use(path.join(__dirname, '../public', './routes/pages/auth/login'));
app.use('/', express.static(path.join(__dirname, '../public/')))
app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/articles', express.static(__dirname + '../public'));
app.use('articles', express.static(__dirname + '../public'));
app.use('/articles/myArticle', express.static(__dirname + '../public/'));
app.use('/id', express.static(__dirname + '../public/'));
app.use('/myArticle', express.static(__dirname + '../public/'));
app.use('myArticle', express.static(__dirname + '../public/'));
console.log('path'+path.join(__dirname, '../public/'))
app.use(express.static(__dirname + '../public/'));
app.use('/articles/img',express.static(path.join(__dirname, '../public/img')));
app.use('/articles/js',express.static(path.join(__dirname, '../public/js')));
app.use('/articles/css',express.static(path.join(__dirname, '../public/css')));
app.use('/articles/fontawesome-5.5',express.static(path.join(__dirname, '../public/fontawesome-5.5')));
app.use('/articles/magnific-popup',express.static(path.join(__dirname, '../public/magnific-popup')));
app.use('/articles/slick',express.static(path.join(__dirname, '../public/slick')));
app.use(express.static('../public/')); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', require('./routes/pages'))
app.use('/api', require('./routes/api'))

app.post('/login', (req, res, next) => {
  passport.authenticate('local',
  (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.redirect('/login?info=' + info);
    }

    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/');
    });

  })(req, res, next);
});

app.get('/login',
  (req, res) => res.sendFile('./html/login.html',
  { root: __dirname })
);
app.get('/signup',
  (req, res) => res.sendFile('./html/signup.html',
  { root: __dirname })
);

app.post('/signup',async (req, res, next) => {
  try {
    await createUser(req.body.username, req.body.password)
  } catch (e) {
    throw e
  }
  res.redirect('/login')
})

app.get('/createArticle',
  (req, res) => res.sendFile('./html/createArticle.html',
  { root: __dirname })
);

module.exports = {
  app
}
