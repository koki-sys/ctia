const router = require("express").Router();

const accessTargetGameName = "goodnew"

router.get("/group/setting", (req, res) => res.render("group/setting"));
router.get("/group/setting_complete", (req, res) => res.render("group/setting_complete"));
router.get("/group/name_entry", (req, res) => res.render("group/name_entry"));
router.get("/group/qr_code_display", (req, res) => res.render("group/qr_code_display", {accessTargetGameName}));
router.get("/group/game_rule_description", (req, res) => res.render("group/game_rule_description", {accessTargetGameName}));
router.get("/group/creating_group", (req, res) => res.render("group/creating_group"));

router.get("/game/announce", (req, res) => res.render("goodnew/game/announce"));
router.get("/game/gameEnd", (req, res) => res.render("goodnew/game/gameEnd"));
router.get("/game/taskComplete", (req, res) => res.render("goodnew/game/taskComplete"));

module.exports = router;