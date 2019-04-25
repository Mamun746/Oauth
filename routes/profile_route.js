const router=require('express').Router()


const checkUser=(req,res,next)=>{
    if(!req.user){
        res.redirect('/auth/login')
    }else{
        next()
    }
}

router.get('/',checkUser, (req,res)=>{
    res.render('profile',{
        user:req.user.username
    })
})

module.exports=router