import express from "express"
import multer from "multer"
import storage from "../middleware/upload.js"
import movieController from "../controller/movieController.js"

const router = express.Router()
const upload = multer({storage})

router.post("/addMovie",upload.single("poster"),movieController.addMovie)
router.get("/allMovie", movieController.allMovieList);
router.get("/:id", movieController.getMovieById);
router.delete("/:id", movieController.deleteMovie);
router.put("/:id", upload.single("poster"), movieController.updateMovie);


export default router