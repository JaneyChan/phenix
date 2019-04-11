CREATE TABLE `article` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '文章标题',
  `routeName` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '路由名称',
  `content` text COMMENT '文章内容',
  `publish` int(11) NOT NULL DEFAULT '0' COMMENT '是否公开，0不公开，1公开',
  `categoryId` bigint(20) DEFAULT NULL COMMENT '分类ID',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `updateTime` bigint(20) DEFAULT NULL COMMENT '修改时间',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '文章状态, 0:回车站 1:正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='文章表';


CREATE TABLE `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '分类名称',
  `routeName` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '路由名称',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `updateTime` bigint(20) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='文章分类表';


CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(25) CHARACTER SET utf8 NOT NULL COMMENT '用户名',
  `email` varchar(128) CHARACTER SET utf8 NOT NULL COMMENT '邮箱地址',
  `password` varchar(128) CHARACTER SET utf8 NOT NULL COMMENT '用户密码',
  `avatar` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '用户头像',
  `createTime` bigint(20) DEFAULT NULL COMMENT '创建时间',
  `updateTime` bigint(20) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';