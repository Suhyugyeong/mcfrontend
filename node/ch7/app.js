//>npm i express morgan mysql2 nunjucks sequelize sequelize-cli
//>npm i -D nodemon
//sequelize-cli 에서 제공하는 명령어를 이용해서 프로그램의 구조 설정
//>npx sequelize init

//models/index.js 에 초기 설정... 기존 내용 전체 지우고, 작성
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const nunjucks = require('nunjucks')

const { sequelize } = require('./models')//파일명 명시하지 않으면 index.js

const indexRouter = require('./routes')
const userRouter = require('./routes/users')
const commentRouter = require('./routes/comments')
const testRouter = require('./routes/test')

const app = express()
app.set('port', process.env.PORT || 3000)

app.set('view engine', 'html')
nunjucks.configure('views',{
  express: app,
  watch: true,
})

//데이터베이스 연결 시도.. 
//force : true - 기존 테이블이 존재하면 삭제하고 새로 만든다..
//false - 테이블은 건드리지 않는다..
sequelize.sync({force: false})
  .then(()=> {
    console.log('데이터베이스 연결 성공')
  })
  .catch((err) => {
    console.error(err)
  })

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/comments', commentRouter)
app.use('/test', testRouter)

//404처리..
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
  error.status = 404
  next(error)
})
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = err 
  res.status(err.status || 500)
  res.render('error')
})

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트로 대기중')
})