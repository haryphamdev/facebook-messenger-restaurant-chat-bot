import homepageService from "../services/homepageService";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getHomepage = (req, res) => {
    let fbPageId = process.env.PAGE_ID;
    return res.render("homepage.ejs",{
        fbPageId
    });
};

let getFacebookUserProfile = (req, res) => {
    return res.render("profile.ejs");
};

let setUpUserFacebookProfile = async (req, res) => {
    // Send the HTTP request to the Messenger Platform
    try{
        await homepageService.setUpMessengerPlatform(PAGE_ACCESS_TOKEN);
        return res.status(200).json({
            message: "OK"
        });
    }catch (e) {
        return res.status(500).json({
            "message": "Error from the node server"
        })
    }
};

module.exports = {
    getHomepage: getHomepage,
    getFacebookUserProfile: getFacebookUserProfile,
    setUpUserFacebookProfile: setUpUserFacebookProfile
};