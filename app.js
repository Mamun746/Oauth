const express=require('express')
const exphbs  = require('express-handlebars');
const auth=require('./routes/auth_route')
const passport=require('passport')
const mongoose=require('mongoose')
const cookieSession = require('cookie-session')
const keys=require('./config/keys')
const profileRoute=require('./routes/profile_route')

require('./config/passport_setup')(passport)


const app=express()
// Mongoose Connect
mongoose.connect('mongodb://localhost/Oauth',{
    useCreateIndex:true,
    useNewUrlParser:true
})

// Cookie-session
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys: [keys.session.cookieKey]
  }))
  app.use(passport.initialize());
  app.use(passport.session());



const PORT=process.env.PORT||8080

// View Engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/',(req,res)=>{
    res.render('home')
})

app.use('/auth',auth)
app.use('/profile',profileRoute)




app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)
)
