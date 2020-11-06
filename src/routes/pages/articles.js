const route = require('express').Router()
const { fetchArticles, fetchArticleById,createArticle,fetchAnyArticleById } = require('../../controllers/articles')

route.get('/', async (req, res) => {
  try {
    const articles = await fetchArticles()
    res.render('pages/articles', { articles })
  } catch (e) {
    console.log(e)
    res.redirect('/')
  }
})

route.post('/', async (req, res) => {
  // Add a new article
  var id =1
  console.log('session'+JSON.stringify(req.session))
  console.log(JSON.stringify(req.body))
  if(req.session.passport){
  id=req.session.passport.user
  }
  if(id!=1){
  const article = await createArticle(   
    req.body.title,
    req.body.content,
    id // TODO: Use actual user id from req.user.id
  )
  res.redirect('articles/myArticle')
  }
  else{
    res.redirect('/login')
  }
})

route.get('/myArticle', async (req, res) => {
  // Fetch a particular article
  console.log('inside1')
  var id =1
  console.log('session'+JSON.stringify(req.session))
  console.log(JSON.stringify(req.body))
  if(req.session.passport){
  id=req.session.passport.user
  console.log('inside2')
  const articleId = id
  if (isNaN(parseInt(articleId))) {
    console.error(new Error('Article ID is not correct number'))
    res.redirect('/')
  }
  try {
    const articles = await fetchArticleById(articleId)
    console.log('articleId'+JSON.stringify(articles))
    res.render('pages/id', { articles })
  } catch (e) {
    throw e
  }
}else{
  res.redirect('/login')
}
})

route.get('/:id', async (req, res) => {
    // Fetch a particular article
    const articleId = req.params.id

    if (isNaN(parseInt(articleId))) {
      console.error(new Error('Article ID is not correct number'))
      res.redirect('/')
    }
    try {
      const articles = await fetchAnyArticleById(articleId)
      res.render('pages/id', { articles })
    } catch (e) {
      throw e
    }
  })

module.exports = route
