import express from "express";
import homepageController from "../controllers/homepageController";
import chatBotController from "../controllers/chatBotController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/webhook", chatBotController.getWebhook);
    router.post("/webhook", chatBotController.postWebhook);
    router.get("/profile", homepageController.getFacebookUserProfile);
    router.post("/set-up-user-fb-profile", homepageController.setUpUserFacebookProfile);
    return app.use("/", router);
};

module.exports = initWebRoutes;