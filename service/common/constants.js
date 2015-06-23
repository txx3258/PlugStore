/**
 * Created by tangxx3 on 2015/5/5.
 */
var config=require('../../config.json');
var ROOT_PATH=require('./singleton').ROOT_PATH;

module.exports.PARM_ERROR=1;
module.exports.staticResourceHost=config.staticResourceHost;
module.exports.developerUploadPlugPath=config.developerUploadPlugPath;
module.exports.developerUploadIconPath=config.developerUploadIconPath;
module.exports.adminUploadAdsPath=config.adminUploadAdsPath;
module.exports.mysql=config.mysql;
module.exports.PART_VIEW=ROOT_PATH.getInstance().getPath()+config.PART_VIEW;
module.exports.icon_form=config.icon_form;
module.exports.upload_form=config.upload_form;
module.exports.ads_form=config.ads_form;
module.exports.security=config.security;
module.exports.INDEX=config.INDEX;

