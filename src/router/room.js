const router = require("express").Router();

router.get("/setting", (req, res) => res.render("room/setting", {gameName: req.query.game}));
router.get("/setting_complete", (req, res) => res.render("room/setting_complete", {gameName: req.query.game}));
router.get("/name_entry", (req, res) => res.render("room/name_entry", {gameName: req.query.game}));
router.get("/qr_code_display", (req, res) => res.render("room/qr_code_display", {gameName: req.query.game}));
router.get("/game_rule_description", (req, res) => res.render("room/game_rule_description", {gameName: req.query.game}));
router.get("/creating_room", (req, res) => res.render("room/creating_room", {gameName: req.query.game}));

module.exports = router;