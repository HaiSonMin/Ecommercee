const express = require("express");
const router = express.Router();

const { createSiteInfo, getAllSiteInfo, getSiteInfo, updateSiteInfo, deleteSiteInfo } = require("../../controllers/site-info.controller");

router.route("/").get(getAllSiteInfo).post(createSiteInfo);
router.route("/:id").get(getSiteInfo).patch(updateSiteInfo).delete(deleteSiteInfo);

module.exports = router;
