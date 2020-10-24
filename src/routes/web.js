import express from "express";
import homepageController from "../controllers/homepageController";
import chatBotController from "../controllers/chatBotController";
import chatBotService from "../services/chatBotService";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
    router.get("/profile", homepageController.getFacebookUserProfile);
    router.post("/set-up-user-fb-profile", homepageController.setUpUserFacebookProfile);
    router.get("/test",async (req, res) =>{
        let user = await chatBotService.getFacebookUsername(3350311028355090);
    });

    return app.use("/", router);
};

module.exports = initWebRoutes;