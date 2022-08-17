import express from "express";
import { UserModel } from "../../Database/allmodels.js";
import passport from "passport";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
    try {
        console.log("chala")
        await UserModel.findByEmailandPhone(req.body.credentials);
        // console.log(req.body.credentials);
       
        const newUser = await UserModel.create(req.body.credentials);

        const token = newUser.generateJwtToken()

        return res.status(200).json({ token, status: "Success" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
})
Router.post("/signin", async (req, res) => {
    try {
        const user = await UserModel.findByEmailandPassword(req.body.credentials);


        const token = user.generateJwtToken()

        return res.status(200).json({ token, status: "Success" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

Router.get("/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
)

Router.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.redirect(
            `http://localhost:4000`
        )
    }
)



export default Router;

