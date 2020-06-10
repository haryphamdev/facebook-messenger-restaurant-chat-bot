import cron from "cron";

let CronJob = cron.CronJob;

let format = "00 1-10 * * * *";
let initCronJob = () => {
    // let job = new CronJob(format, function() {
    //     console.log("cron job is running");
    // });
    // job.start();
};

module.exports = initCronJob;
