const router = require("express").Router()

router.get("/group/group", (req, res) => res.render("illustgame/group/group"))
router.get("/group/groupComplete", (req, res) => res.render("illustgame/group/groupComplete"))
router.get("/group/name", (req, res) => res.render("illustgame/group/name"))
router.get("/group/qr", (req, res) => res.render("illustgame/group/qr"))
router.get("/group/rule", (req, res) => res.render("illustgame/group/rule"))
router.get("/group/wait", (req, res) => res.render("illustgame/group/wait"))

router.get("/game/announce", (req, res) => res.render("illustgame/game/announce"))
router.get("/game/shiritori2", (req, res) => res.render("illustgame/game/shiritori2"))
router.get("/game/shiritori_receive", (req, res) => res.render("illustgame/game/shiritori_receive"))
router.get("/game/taskComplete", (req, res) => res.render("illustgame/game/taskComplete"))

module.exports = router
