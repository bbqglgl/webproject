var express = require('express');
var router = express.Router();
const upload = require('../fileupload');
const multer = require('multer');
const Tip = require('../models/tip');

router.post('/create', function (req, res, next) {
    console.log(req.session.user_id);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).end();
        } else if (err) {
            return res.status(500).end();
        }
        let media = [];
        req.files.map(file => media.push({ path: file.filename }));
        const tip = new Tip({
            title: req.body.title,
            content: req.body.content,
            writerId: req.session.user_id,
            location: {
                type: "Point",
                coordinates: [parseFloat(req.body.loc_lng), parseFloat(req.body.loc_lat)]
            },
            media: media
        });
        tip.save((err) => {
            console.log(err);
            if (err)
                return res.status(500).end();
        });
        return res.status(200).json(tip).end();
    });
});

router.get('/My', async function (req, res, next) {
    let tipsPerPage = 7;
    let title = req.query.title;
    let page = parseInt(req.query.page);
    let totalTips = 0;
    let user_id = req.session.user_id;
    await Tip.countDocuments({ writerId: user_id }, function (err, count) {
        totalTips = count;
    });
    let totalPages = parseInt(totalTips / tipsPerPage);
    let outList = [];
    if (totalTips % tipsPerPage > 0)
        totalPages++;

    await Tip.find({ writerId: user_id }).sort('-_id').skip(tipsPerPage * (page - 1)).limit(tipsPerPage).then((tips) => {
        tips.map(tip => outList.push(tip));
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
    //return { list:[{_id:0,title:"Test1", good:5},{_id:1,title:"Test2", good:2}], totalPages:20 };
    return res.status(200).json({ list: outList, totalPages: totalPages }).end();
});

router.get('/geoMarker', async function (req, res, next) {
    let zoom = req.query.zoom;
    let lat = req.query.lat;
    let lng = req.query.lng;
    let outList = [];
    await Tip.find({
        location : {
            $near : {
                $maxDistance : 1000,
                $geometry : {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            }
        }
    }).then((tips) => {
        tips.map(tip => outList.push(tip.location.coordinates));
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
    //return { list:[{_id:0,title:"Test1", good:5},{_id:1,title:"Test2", good:2}], totalPages:20 };
    return res.status(200).json( outList ).end();
});

router.get('/geoList', async function (req, res, next) {
    let zoom = req.query.zoom;
    let lat = req.query.lat;
    let lng = req.query.lng;
    let outList = [];
    await Tip.find({
        location : {
            $near : {
                $maxDistance : 100,
                $geometry : {
                    type: "Point",
                    coordinates: [lng, lat]
                }
            }
        }
    }).then((tips) => {
        tips.map(tip => outList.push(tip));
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
    //return { list:[{_id:0,title:"Test1", good:5},{_id:1,title:"Test2", good:2}], totalPages:20 };
    return res.status(200).json( {list : outList} ).end();
});

router.get('/', async function (req, res, next) {
    let tipsPerPage = 7;
    let title = req.query.title;
    let page = parseInt(req.query.page);
    let totalTips = 0;
    await Tip.countDocuments({ title: RegExp(title) }, function (err, count) {
        totalTips = count;
    });
    let totalPages = parseInt(totalTips / tipsPerPage);
    let outList = [];
    if (totalTips % tipsPerPage > 0)
        totalPages++;

    await Tip.find({ title: RegExp(title) }).sort('-_id').skip(tipsPerPage * (page - 1)).limit(tipsPerPage).then((tips) => {
        tips.map(tip => outList.push(tip));
    }).catch((err) => {
        console.log(err);
        res.status(500).end();
    });
    //return { list:[{_id:0,title:"Test1", good:5},{_id:1,title:"Test2", good:2}], totalPages:20 };
    return res.status(200).json({ list: outList, totalPages: totalPages }).end();
});


module.exports = router;
