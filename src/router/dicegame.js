const router = require("express").Router();

router.get("/group/group", (req, res) => res.render("dicegame/group/group"));
router.get("/group/groupComplete", (req, res) => res.render("dicegame/group/groupComplete"));
router.get("/group/name", (req, res) => res.render("dicegame/group/name"));
router.get("/group/qr", (req, res) => res.render("dicegame/group/qr"));
router.get("/group/rule", (req, res) => res.render("dicegame/group/rule"));
router.get("/group/wait", (req, res) => res.render("dicegame/group/wait"));

router.get("/game/announce", (req, res) => res.render("dicegame/game/announce"));
router.get("/game/gameEnd", (req, res) => res.render("dicegame/game/gameEnd"));
router.get("/game/taskComplete", (req, res) => res.render("dicegame/game/taskComplete"));

module.exports = router;
