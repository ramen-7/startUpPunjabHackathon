const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const User = require('./models/user')
const articleRouter = require('./routes/articles')
const userRouter = require('./routes/users')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://0.0.0.0:27017/', (err)=>{
    if(err){
        console.log(err)
        throw err
    }}, 
    {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndexes: true    
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ stipend: 'desc' })
    res.render('articles/index', {articles : articles})
})
app.use('/articles', articleRouter)
app.use('/users', userRouter)

app.listen(5000,()=>{
    console.log('Listening on port 5000')
})
