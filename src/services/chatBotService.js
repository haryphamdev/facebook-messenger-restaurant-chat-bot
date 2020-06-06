import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};

let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try{
            let response_first = {"text": `Welcome ${username} to HaryPhamDev's Restaurant`};
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "list",
                        "top_element_style": "compact",
                        "elements": [
                            {
                                "title": "Classic T-Shirt Collection",
                                "subtitle": "See all our colors",
                                "image_url": "https://bit.ly/imageToSend",
                                "buttons": [
                                    {
                                        "title": "View",
                                        "type": "web_url",
                                        "url": "https://restaurant-bot-haryphamdev.herokuapp.com/",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://restaurant-bot-haryphamdev.herokuapp.com/"
                                    }
                                ]
                            },
                            {
                                "title": "Classic White T-Shirt",
                                "subtitle": "See all our colors",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://restaurant-bot-haryphamdev.herokuapp.com/",
                                    "messenger_extensions": false,
                                    "webview_height_ratio": "tall"
                                }
                            },
                            {
                                "title": "Classic Blue T-Shirt",
                                "image_url": "https://bit.ly/imageToSend",
                                "subtitle": "100% Cotton, 200% Comfortable",
                                "default_action": {
                                    "type": "web_url",
                                    "url": "https://restaurant-bot-haryphamdev.herokuapp.com/",
                                    "messenger_extensions": true,
                                    "webview_height_ratio": "tall",
                                    "fallback_url": "hhttps://restaurant-bot-haryphamdev.herokuapp.com/"
                                },
                                "buttons": [
                                    {
                                        "title": "Shop Now",
                                        "type": "web_url",
                                        "url": "https://restaurant-bot-haryphamdev.herokuapp.com/",
                                        "messenger_extensions": true,
                                        "webview_height_ratio": "tall",
                                        "fallback_url": "https://restaurant-bot-haryphamdev.herokuapp.com/"
                                    }
                                ]
                            }
                        ],
                        "buttons": [
                            {
                                "title": "View More",
                                "type": "postback",
                                "payload": "payload"
                            }
                        ]
                    }
                }
            };

            //send a welcome message
            await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendMessage(sender_psid, response_second);

            resolve("done!")
        }catch (e) {
            reject(e);
        }

    });
};

let sendMessage = (sender_psid, response) => {
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        console.log(res);
        console.log(body)
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
};

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer
};