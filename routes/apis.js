const router = require('express').Router();
const async = require('async');

const Asset = require('../models/asset');
const Task = require('../models/task');
const Worker = require('../models/worker');
const Alloc = require('../models/taskalloc');

router.route('/add-asset')
    .get((req, res, next) => {
        res.render('landing/add-asset');
    })
    .post((req, res, next) => {
        async.waterfall([
            function (callback) {
                Asset.find({ assetID: req.body.Asset_Id })
                    .exec(function (err, data) {
                        console.log(data.length);
                        if (data.length != 0)
                            res.render('landing/err-message', { message: 'Asset Found' });
                        else {
                            var asset = new Asset();
                            asset.assetID = req.body.Asset_Id;
                            asset.assetName = req.body.Asset_Name;
                            asset.save(function (err) {
                                callback(err, asset);
                            });
                            res.redirect('/');
                        }
                    });

            }
        ]);
    });

router.route('/add-task')
    .get((req, res, next) => {
        res.render('landing/add-task');
    })
    .post((req, res, next) => {
        async.waterfall([
            function (callback) {
                Task.find({ taskID: req.body.Task_Id })
                    .exec(function (err, data) {
                        console.log(data.length);
                        if (data.length != 0)
                            res.render('landing/err-message', { message: 'Task Found' });
                        else {
                            var task = new Task();
                            task.taskID = req.body.Task_Id;
                            task.taskName = req.body.Task_Des;
                            task.taskDur = req.body.Task_Dur;
                            task.save(function (err) {
                                callback(err, task);
                            });
                            res.redirect('/');
                        }
                    });

            }
        ]);
    });

router.route('/add-worker')
    .get((req, res, next) => {
        res.render('landing/add-worker');
    })
    .post((req, res, next) => {
        async.waterfall([
            function (callback) {
                Worker.find({ workerID: req.body.Worker_Id })
                    .exec(function (err, data) {
                        console.log(data.length);
                        if (data.length != 0)
                            res.render('landing/err-message', { message: 'Worker Found' });
                        else {
                            var worker = new Worker();
                            worker.workerID = req.body.Worker_Id;
                            worker.workerName = req.body.Worker_Name;
                            worker.save(function (err) {
                                callback(err, worker);
                            });
                            res.redirect('/');
                        }
                    });
            }
        ]);
    });

router.route('/assets/all')
    .get((req, res, next) => {
        Asset.find({}, function (err, assets) {
            res.render('landing/assets-all', { assets: assets });
        });
    });

router.route('/allocate-task')
    .get((req, res, next) => {
        res.render('landing/allocate-task');
    })
    .post((req, res, next) => {
        async.waterfall([
            function (callback) {
                Asset.find({ assetID: req.body.Asset_Id })
                    .exec(function (err, data) {
                        console.log(data.length);
                        if (data.length == 0) {
                            res.render('landing/err-message', { message: 'Asset Not Found' });
                        }
                        else {
                            Task.find({ taskID: req.body.Task_Id })
                                .exec(function (err, data) {
                                    console.log(data.length);
                                    if (data.length == 0) {
                                        res.render('landing/err-message', { message: 'Task Not Found' });
                                    }
                                    else {
                                        Worker.find({ workerID: req.body.Worker_Id })
                                            .exec(function (err, data) {
                                                console.log(data.length);
                                                if (data.length == 0) {
                                                    res.render('landing/err-message', { message: 'Worker Not Found' });
                                                }
                                                else {
                                                    Alloc.find({ assetId: req.body.Asset_Id, taskId: req.body.Task_Id, workerId: req.body.Worker_Id })
                                                    .exec(function (err, data) {
                                                        console.log(data.length);
                                                        if (data.length > 0)
                                                            res.render('landing/err-message', { message: 'Data Already Exists' });
                                                        else {
                                                            var taskAlloc = new Alloc();
                                                            taskAlloc.assetId = req.body.Asset_Id;
                                                            taskAlloc.taskId = req.body.Task_Id;
                                                            taskAlloc.workerId = req.body.Worker_Id;
                                                            taskAlloc.timeOfAllocation = req.body.Time_Alloc;
                                                            taskAlloc.taskToBePerformedBy = req.body.Deadline;
                                                            taskAlloc.save(function (err) {
                                                                callback(err, taskAlloc);
                                                            });
                                                            res.redirect('/');
                                                        }
                                                    });
                                                }
                                            });
                                    }
                                });
                        }
                    });
            }
        ]);
    });

router.route('/get-task-for-worker')
    .get((req, res, next) => {
        res.render('landing/get-worker-id');
    })
    .post((req, res, next) => {
        res.redirect('/get-task-for-worker/' + req.body.workerId);
    });

router.route('/get-task-for-worker/:workerId')
    .get((req, res, next) => {
        Alloc.find({ workerId: req.params.workerId })
            .exec(function (err, data) {
                console.log(data.length);
                if (data.length != 0) 
                    res.render('landing/get-task', { data: data });
                else {
                    res.render('landing/err-message', { message: 'Data Not Found' });
                }
            });
    });

module.exports = router;