const route = require('express').Router()
const { fetchArticles, fetchArticleById,createArticle } = require('../../controllers/articles')

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
  res.send(article)
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
    const article = await fetchArticleById(articleId)
    console.log('articleId'+JSON.stringify(article))
    res.render('pages/id', { article })
  } catch (e) {
    throw e
  }
}else{
  res.redirect('/login')
}
})

module.exports = route
