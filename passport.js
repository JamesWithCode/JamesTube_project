import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
import KakaoStrategy from "passport-kakao"
import NaverStrategy from "passport-naver"
import GithubStrategy from "passport-github"
import User from "./src/models/User";
import dotenv from "dotenv"
import { googleLoginCallback, kakaoLoginCallback, naverLoginCallback } from "./src/controllers/userControllers";
dotenv.config();

passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SEC,
    callbackURL: "https://evening-journey-26910.herokuapp.com//auth/google/callback"
},googleLoginCallback))

passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SEC,
    callbackURL: "https://evening-journey-26910.herokuapp.com//auth/kakao/callback"
},kakaoLoginCallback))

passport.use(new NaverStrategy({
    clientID: process.env.NAVER_ID,
    clientSecret: process.env.NAVER_SEC,
    callbackURL: "https://evening-journey-26910.herokuapp.com//auth/naver/callback"
},naverLoginCallback))

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SEC,
    callbackURL: "https://evening-journey-26910.herokuapp.com//auth/github/callback"
},naverLoginCallback))


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());