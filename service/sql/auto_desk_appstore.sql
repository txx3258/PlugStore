
alter table bim_app add column hostapp_id int(20);
alter table bim_app add column apptype_id int(20);
alter table bim_app add column appEnName varchar (50);

alter table bim_app add column appEnName varchar (50);


alter table bim_app add column p varchar (50);

alter table bim_app add column apptype_id
appEnName

,appEnName,,,,,,,,,,,,,,,developer_id,hostapp_id,apptype_id) val

 appid |
     |
  |
  |
  |
  |
                     |
            |
  |
          |
  |
      |
  |
  |
      |
 hot_application |
  |





insert into bim_app_host(hostAppName,hostPackageName,own_version,remark)
values('Autodesk AutoCAD','com.bim.Autodesk.AutoCAD','2013;2015;','');

insert into bim_app_host(hostAppName,hostPackageName,own_version,remark)
values('Autodesk AutoCAD','com.bim.Autodesk.AutoCAD','2013;2015;','');


insert into bim_app_host(hostAppName,hostPackageName,own_version,remark)
values('Autodesk AutoCAD Architecture','com.bim.Autodesk.AutoCAD.Architecture','2011;2012;2015','');



insert into bim_app_host(hostAppName,hostPackageName,own_version,remark)
values('Autodesk AutoCAD ecscad ','com.bim.Autodesk.AutoCAD.ecscad','2013;2016;2018','');




insert into bim_app(appname,appEnName,uid,app_info,app_abstract,app_size,is_pay,app_price,app_publishdate,app_versioncode,app_version,support_version,app_status,available,developer_id,hostapp_id,apptype_id) values

('11','22','33,'999','1000000,'77','1','66','88','55','44,'2013;2015','1','1,'1234','2','2','{17}')



insert into bim_app(appname,appEnName,uid,app_info,app_abstract,app_size,is_pay,app_price,app_publishdate,app_versioncode,app_version,support_version,app_status,available,developer_id,hostapp_id,apptype_id) values('11','22','33,'999','10




00000,'77','1','66','88','55','44,'2013;2015','1','1,'1234','2','2')

insert into bim_app(appname,appEnName,uid,app_info,app_abstract,app_size,is_pay,app_price,app_publishdate,app_versioncode,app_version,support_version,app_status,available,developer_id,hostapp_id,apptype_id) values('11','22','33,'999','1000000,'77','1','66','88','55','44,'2013;2015','1','1,'1234','2','2'


insert into bim_app(appname,appEnName,uid,app_info,app_abstract,app_size,is_pay,app_price,app_publishdate,app_versioncode,app_version,support_version,app_status,available,developer_id,hostapp_id,apptype_id) values('wwwww','wwwww','wwwww,'wwww','wwwwwwww,'12,'1','12','2015-06-01','wwwww','wwwww,'2013,2015','1','1,'undefined','2','2','{17}')



alter table bim_app_user add column remark varchar(1000);
alter table bim_app_user add column certificate_type varchar(20);
alter table bim_app_user add column certificate_no varchar(50);

alter table bim_app_user add column nickname varchar(20);

alter table bim_app_user add column qq varchar(15);

alter table bim_app_user add column wechat varchar(30);


insert into bim_app(appname,appEnName,uid,app_info,app_abstract,app_size,is_pay,app_price,app_publishdate,app_versioncode,app_version,support_version,app_status,available,developer_id,hostapp_id,apptype_id)

 values('11','22','33','999','1000000','77','1','66','2015-08-01','55','44','2013;2015','1','1','1234','2','2')



select a.appname,a.appEnName,a.app_price,a.app_size,a.app_publishdate,a.support_version,a.icon_addr,a.app_status,b.name as appTypeName,c.hostAppName,d.name from bim_app as a left join  bim_apptype_info  b on a.apptype_id=b.id left join bim_app_host c on a.hostapp_id=c.id left join bim_app_user d on d.user_id=a.developer_id  where a.app_status='0'

insert into bim_app(appname,appEnName,uid,app_info,app_abstract,app_addr,icon_addr,app_size,is_pay,app_price,app_publishdate,app_versioncode,app_version,support_version,app_status,available,developer_id,hostapp_id,apptype_id) values('undefined','undefined','undefined,'undefined','undefined,'undefined,'undefined','undefined','undefined','undefined','undefined,'undefined','undefined','undefined,'1','1','undefined','undefined','undefined,'{19}')