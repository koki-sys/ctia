const router = require("express").Router()

router.get("/group/group", (req, res) => res.render("typing/group/group"))
router.get("/group/groupComplete", (req, res) => res.render("typing/group/groupComplete"))
router.get("/group/name", (req, res) => res.render("typing/group/name"))
router.get("/group/qr", (req, res) => res.render("typing/group/qr"))
router.get("/group/rule", (req, res) => res.render("typing/group/rule"))
router.get("/group/wait", (req, res) => res.render("typing/group/wait"))

router.get("/game/typing", (req, res) => res.render("typing/game/typing"))
router.get("/game/ranking", (req, res) => res.render("typing/game/ranking"))
router.get("/game/gameEnd", (req, res) => res.render("typing/game/gameEnd"))

module.exports = router
