const router = require("express").Router()

router.get("/group/group", (req, res) => res.render("namegame/group/group"))
router.get("/group/groupComplete", (req, res) => res.render("namegame/group/groupComplete"))
router.get("/group/name", (req, res) => res.render("namegame/group/name"))
router.get("/group/qr", (req, res) => res.render("namegame/group/qr"))
router.get("/group/rule", (req, res) => res.render("namegame/group/rule"))
router.get("/group/wait", (req, res) => res.render("namegame/group/wait"))

router.get("/game/banme", (req, res) => res.render("namegame/game/banme"))
router.get("/game/correctAnswerer", (req, res) => res.render("namegame/game/correctAnswerer"))
router.get("/game/gameEnd", (req, res) => res.render("namegame/game/gameEnd"))
router.get("/game/namaeoboeta", (req, res) => res.render("namegame/game/namaeoboeta"))
router.get("/game/nameAnswer", (req, res) => res.render("namegame/game/nameAnswer"))
router.get("/game/namegame", (req, res) => res.render("namegame/game/namegame"))
router.get("/game/winner", (req, res) => res.render("namegame/game/winner"))

module.exports = router
