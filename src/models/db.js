const Sequelize = require('sequelize')
const DT = Sequelize.DataTypes

const db = new Sequelize(
  'sampleblogdb', 'samplebloguser', 'sampleblogpass',
  {
    dialect: 'mysql',
    host: 'database-1.c0r4pfaajeuc.us-east-2.rds.amazonaws.com',
    user:'admin',
    password:'shubham.2',
    port:'3306',
    logging: false
  }
)

const User = db.define('user', {
  username: { type: DT.STRING(30), unique: true, allowNull: false },
  password: { type: DT.STRING, allowNull: true }
})

const Article = db.define('article', {
  title: {
    type: DT.STRING(150),
    allowNull: true
  },
  content: {
    type: DT.TEXT
  }
})

const Comment = db.define('comment', {
  title: {
    type: DT.STRING(150),
    allowNull: true
  },
  message: {
    type: DT.TEXT
  }
})

Article.belongsTo(User, { as: 'author' })
User.hasMany(Article, { foreignKey: 'authorId' })

Comment.belongsTo(Article)
Article.hasMany(Comment)

Comment.belongsTo(User)
User.hasMany(Comment)

module.exports = {
  db,
  User,
  Comment,
  Article
}
