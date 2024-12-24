const router = require("express").Router();

router.get("/group/setting", (req, res) => res.render("group/setting"));
router.get("/group/setting_complete", (req, res) => res.render("group/setting_complete"));
router.get("/group/name_entry", (req, res) => res.render("group/name_entry"));
router.get("/group/qr_code_display", (req, res) => res.render("group/qr_code_display"));
router.get("/group/game_rule_description", (req, res) => res.render("group/game_rule_description"));
router.get("/group/creating_group", (req, res) => res.render("group/creating_group"));

module.exports = router;