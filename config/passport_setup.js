const passport=require('passport')
const GoogleStrategy=require('passport-google-oauth20').Strategy
const keys=require('./keys')
const User=require('../models/User-model')



passport.serializeUser((user, done)=>{
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.findOne({id})
    .then((user)=>{
        done(null,user)
    })
  });

   
module.exports=(passport)=>{
passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/callback',
    clientID:keys.clientID,
    clientSecret:keys.clientSecret,
    
},(accessToken, refreshToken, profile, done)=>{
    console.log(profile);
    
    User.findOne({googleid:profile.id})
    .then((currentUser)=>{
        if(!currentUser){
            const user=new User({
                username:profile.displayName,
                googleid:profile.id,
                 thumbnail:profile._json.picture
            })
            user.save()
            .then((newUser)=>{
                console.log(`new user ${newUser}`);
                done(null,newUser)
            })
        }else{
            console.log('user Already exist');
            done(null,currentUser)
            
        }
    })


}

))}




// 620641326078-hnbueq322ab124qiuhaiurd4dfmige2v.apps.googleusercontent.com
// CDQwP3fM5PK97K_dm7r-6tLP

