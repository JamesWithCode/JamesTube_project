import routes from "./routes";
import multer from "multer"
import multerS3 from "multer-s3"
import aws from "aws-sdk"
import User from "./models/User"

import dotenv from "dotenv"
dotenv.config();

//multer
const s3 = new aws.S3({
    accessKeyId:process.env.AWS_KEY,
    secretAccessKey:process.env.AWS_PRIVATE_KEY,
    region:"ap-northeast-1"
})

const multerVideo = multer({
    storage:multerS3({
        s3,
        acl:"public-read",
        bucket:"jamestube/video"
    })
})
const multerBranding = multer({
    storage:multerS3({
        s3,
        acl:"public-read",
        bucket:"jamestube/branding"
    })
})

export const uploadVideo = multerVideo.single("videoFile")
export const uploadBranding = multerBranding.fields([{name:"avatar",maxCount:1},{name:"cover",maxCount:1},{name:"watermark",maxCount:1}])

//locals
export const localMiddleware = async(req,res,next) => {
    res.locals.siteName = "JamesTube";
    res.locals.routes = routes
    if(req.user){
        res.locals.user=await User.findById(req.user._id).populate('channel') || null 
    }

    res.locals.img={
        join:"https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGxhcHRvcHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
        noneUser:"https://648869380.r.worldcdn.net/app/views/client/lutfi-cloud-avatar/lutfi-file/images/avatar.png"
    }
    res.locals.domain=`https://jamestube.herokuapp.com`
    
    next();
} 

//distinguish private , public routers 
export const onlyPublic = (req,res,next)=>{
    if(req.user){
        res.redirect(routes.home)
    }else{
        next()
    }
}

export const onlyPrivate = (req,res,next)=>{
    if(req.user){
        next()
    }else{
        res.redirect(routes.home)
    }
}

//social login 
export const socialLoginToken = (req,res,next)=>{
    if(req.user.socialLoginToken==false){
        next()
    }else{
        res.redirect(routes.home)
    }
}


