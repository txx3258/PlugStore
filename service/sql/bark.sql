{
    "delete_table":"delete from {0} where {1}='{2}'",
    "checkUser":"select count(*) as count,type,registerName from bim_app_user where registerName='{0}' and password='{1}'",

    "hostAppName_Select":"select * from bim_app_host order by id asc",
    "hostAppType_Select":"select b.id,b.hostAppName,b.hostPackageName,b.own_version,b.app_product_id,c.name,c.code from bim_app_host as b left join hostapp_and_type_mp as a on a.hostapp_id=b.id  left join bim_apptype_info as c on c.id=a.apptype_id order by id asc",
    "hostAppName_Insert":"insert into bim_app_host(hostAppName,hostPackageName,own_version,app_product_id) values('{0}','{1}','{2}','{3}')",
    "hostAppName_Update":"update bim_app_host set hostAppName='{0}',hostPackageName='{1}',own_version='{2}',app_product_id='{3}' where id='{4}'",

    "appTypeRoot_Select":"select * from bim_apptype_info where parentID=-1",
    "appTypeRoot_Insert":"insert into bim_apptype_info(code,name,parentID) values('{0}','{1}','{2}')",
    "appTypeRoot_Update":"update bim_apptype_info set code='{0}',name='{1}' where id='{2}'",

    "appTypeList_Insert":"insert into hostapp_and_type_mp(hostapp_id,apptype_id,available) values('{0}','{1}','{3}')",
    "appTypeList_Delete":"delete from hostapp_and_type_mp where hostapp_id='{0}'",

    "appHostTypeInfo_Select":"select b.id,b.name,b.code from hostapp_and_type_mp as a,bim_apptype_info as b where a.apptype_id=b.id and a.hostapp_id='{0}'",
    "appTypeInfo_Select":"select * from bim_apptype_info",
    "appTypeInfo_Insert":"insert bim_apptype_info(name,code,parentId,available,is_default,remark) values('{0}','{1}','{2}','{3}','{4},'{5}','{6},'{7}')",
    "appTypeInfo_Update":"update bim_apptype_info set name='{0}',code='{1}',remark='{3}' where id='{4}'",
    "appTypeInfo_Delete":"update bim_apptype_info set available='0'",

    "bimAppInfo_Select":"select a.appid,a.uid, a.app_abstract, e.id as hostapp_id,b.code,e.hostAppName,a.appname,a.upgrade_code,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.icon_addr,a.app_status,c.name as appTypeName from bim_free_newtype_day as b left join bim_app as a on a.uid=b.uid left join bim_apptype_info as c on b.code=c.code left join bim_app_host as e on e.id=a.hostapp_id where a.appid='{0}' order by e.id asc,c.name desc,b.order_num asc",

    "bimApp_Select":"select * from bim_app",
    "bimApp_Insert":"insert into bim_app(appname,uid,app_info,app_abstract,app_size,is_pay,app_price,app_publishdate,app_version,support_version,app_status,available,developer_id,hostapp_id,apptype_id,upgrade_code) values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}','{14}','{15}')",
    "bimApp_Delete":"update bim_app set available='0' where id='{0}'",

    "develop_applist_select":"select a.appid,a.appname,a.upgrade_code,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.app_version as app_versioncode,a.icon_addr,a.app_status,c.hostAppName from bim_app as a left join bim_app_host c on a.hostapp_id=c.id left join  bim_app_user as d on a.developer_id=d.user_id where a.app_status='{0}' and a.developer_id='{1}'",
    "query_dev_applist_select":"select a.appname,a.upgrade_code,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.icon_addr,a.app_status,b.name as appTypeName,c.hostAppName from bim_app as a left join  bim_apptype_info  b on a.apptype_id=b.id left join bim_app_host c on a.hostapp_id=c.id where a.appname like '%{0}%' and a.developer_id='{1}'",

    "developer_register_Insert":"insert into bim_app_user(registerName,password,name,email,qq,wechat,phone,certificate_type,certificate_no,remark,nickname,registerDate,type,state) values('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}','{8}','{9}','{10}','{11}','{12}','{13}')",

    "bimUser_Select":"select * from bim_app_user where type='{0}' and state='{1}'",

    "list_app_Select":"select a.appid,a.uid,a.appname,a.upgrade_code,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.icon_addr,a.app_status,a.app_version as app_versioncode,c.hostAppName,d.name from bim_app as a left join bim_app_host c on a.hostapp_id=c.id left join bim_app_user d on d.user_id=a.developer_id  where a.app_status='{0}'",

    "list_app_other_Select":"select a.appid,a.uid,a.appname,a.upgrade_code,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.icon_addr,a.app_status,b.name as appTypeName,c.hostAppName,d.name from bim_app as a left join  bim_apptype_info  b on a.apptype_id=b.id left join bim_app_host c on a.hostapp_id=c.id left join bim_app_user d on d.user_id=a.developer_id  where a.app_status>='{0}' and a.uid not in (select uid from bim_list where type='{1}')",

    "list_choose_Select":"select b.id,a.appid,a.uid,a.appname,a.upgrade_code,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.icon_addr,a.app_version as app_versioncode,c.hostAppName from bim_list as b left join bim_app as a on a.uid=b.uid left join bim_app_host c on a.hostapp_id=c.id where b.type='{0}' order by b.order_num asc ",
    "list_choose_Update":"update bim_list set  order_num='{0}' where uid='{1}'",
    "type_choose_Update":"update bim_free_newtype_day set  order_num='{0}' where uid='{1}' and code='{2}'",

    "flowerSubmit_Update":"update {0} set {1}='{2}' where {3}='{4}'",
    "flower_query_app_Select":"select a.appid,a.uid,a.appname,a.upgrade_code,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.icon_addr,a.app_status,a.app_version as app_versioncode,c.hostAppName,d.name from bim_app as a left join bim_app_host c on a.hostapp_id=c.id left join bim_free_newtype_day as e on e.uid=a.uid left join bim_apptype_info as d on d.code=e.code where a.app_status='{0}' or a.hostapp_id='{1}' or d.id in ({2})",

    "list_app_Insert":"insert into bim_list(uid,type,available,order_num) values('{0}','{1}','{2}','{3}') ",
    "free_newtype_day_Insert":"insert into bim_free_newtype_day(uid,code,order_num,avabilable) values('{0}','{1}','{2}','{3}')",

    "app_icon_file_Update":"update bim_app set icon_addr='{0}',app_addr='{1}' where uid='{2}' and upgrade_code='{4}'",

    "list_choose_type_Select":"select a.uid, e.id as hostapp_id,b.code,e.hostAppName,a.appname,a.upgrade_code,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.icon_addr,a.app_status,c.name as appTypeName from bim_free_newtype_day as b left join bim_app as a on a.uid=b.uid left join bim_apptype_info as c on b.code=c.code left join bim_app_host as e on e.id=a.hostapp_id where a.app_status='9' order by e.id asc,c.name desc,b.order_num asc",
    "developer_uidfor_comment":"select uid,appname,upgrade_code from bim_app where developer_id='{0}'",

    "bim_ad_Select":"select * from bim_appimg_resource where appid='-1'",
    "bim_ad_Insert":"insert into bim_appimg_resource(appid,appimg_name,appimg_path,appimg_mime) values('{0}','{1}','{2}','{3}')",

    "ad_choose_Update":"update bim_ad set order_num='{0}' where ad_id='{1}'",

    "list_choose_ad_Insert":"insert into bim_ad(img_resource_id,ad_name,ad_url,create_time,order_num,available) values('{0}','{1}','{2}','{3}','{4}','{5}')",
    "list_choose_ad_Select":"select * from bim_ad order by order_num asc",
    "list_choose_ad_add_Select":"select * from bim_appimg_resource where appid='-1' and appimg_id not in(select img_resource_id from bim_ad)"
}