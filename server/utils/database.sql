CREATE TABLE `article` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(255) DEFAULT NULL COMMENT '文章标题',
  `content` text DEFAULT '' COMMENT '文章内容',
  `publish` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否公开，0不公开，1公开',
  `category_id` bigint DEFAULT NULL COMMENT '分类ID',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `updateTime` bigint(20) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章表';


CREATE TABLE `category` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(255) DEFAULT NULL COMMENT '分类名称',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `updateTime` bigint(20) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文章分类表';


CREATE TABLE `user` (
  `username` varchar(25) NOT NULL COMMENT '用户帐号',
  `email` varchar(128) NOT NULL COMMENT '邮箱地址',
  `password` varchar(128) NOT NULL COMMENT '用户密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `updateTime` bigint(20) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';