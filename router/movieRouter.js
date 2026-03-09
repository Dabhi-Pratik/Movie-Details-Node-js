import express from "express"
import uploads from "../middleware/upload.js"
import movieController from "../controller/movieController.js"

const router = express.Router()

router.post("/addMovie", uploads.single("poster"), movieController.addMovie)
router.get("/allMovie", movieController.allMovieList)
router.get("/:id", movieController.getMovieById)
router.delete("/:id", movieController.deleteMovie)
router.put("/:id", uploads.single("poster"), movieController.updateMovie)

export default router