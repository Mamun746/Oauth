const express=require('express')
const router=express.Router()
const passport=require('passport')



router.get('/login',(req,res)=>{
    res.render('login')
})


router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('/')
})

router.get('/google',passport.authenticate('google',{
    scope:['profile','email'],
}))

router.get('/google/callback',passport.authenticate('google',{
    failureRedirect: '/login'

}),(req,res)=>{
    res.redirect('/profile')
})

module.exports=router