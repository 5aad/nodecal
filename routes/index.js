var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

/* GET home page. */
//Route Get /
//Desc Index
router.get("/", function(req, res, next) {
  res.render("index");
});

//Route Get /calculatorBMI
//Desc Calculator
router.get("/calculatorBMI", function(req, res, next) {
  res.render("BMI");
});

//Route Get /calculatorPPI
//Desc Calc PPI
router.get("/calculatorPPI", (req, res) => {
  res.render("PPI");
});

//Route Post /calculatorPPI
//Desc CALC PPI Result
router.post(
  "/calculatorPPI",
  [
    check("height", "Height required")
      .not()
      .isEmpty(),
    check("width", "Width required")
      .not()
      .isEmpty(),
    check("screensizeinches", "Diagnol screen size required")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { height, width, screensizeinches } = req.body;
    const diagnolPixels = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    const ppi = diagnolPixels / screensizeinches;

    res.render("PPI", {
      ppi: ppi.toFixed(2)
    });
  }
);

module.exports = router;
