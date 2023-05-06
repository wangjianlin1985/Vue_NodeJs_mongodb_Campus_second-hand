/*
 Navicat Premium Data Transfer

 Source Server         : localhost_27017
 Source Server Type    : MongoDB
 Source Server Version : 40201
 Source Host           : localhost:27017
 Source Schema         : tiaoZao

 Target Server Type    : MongoDB
 Target Server Version : 40201
 File Encoding         : 65001

 Date: 02/09/2020 17:16:28
*/


// ----------------------------
// Collection structure for admins
// ----------------------------
db.getCollection("admins").drop();
db.createCollection("admins");

// ----------------------------
// Documents of admins
// ----------------------------
db.getCollection("admins").insert([ {
    _id: ObjectId("5f4e78260078e740c00063c2"),
    account: "admin",
    password: "e10adc3949ba59abbe56e057f20f883e",
    name: "大神",
    avatar: "/uploads/header.jpg"
} ]);
db.getCollection("admins").insert([ {
    _id: ObjectId("5f4f60cde057b38919a621e7"),
    account: "test",
    name: "测试",
    password: "e10adc3949ba59abbe56e057f20f883e",
    avatar: "/uploads/default.jpg",
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for infos
// ----------------------------
db.getCollection("infos").drop();
db.createCollection("infos");

// ----------------------------
// Documents of infos
// ----------------------------
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4e602f147f618f015bfaea"),
    status: NumberInt("1"),
    img: [
        "/uploads/2e7ad437383a500dabaae47a521d4a28"
    ],
    category: NumberInt("1"),
    title: "转让苹果二手手机",
    price: "800",
    description: "64G苹果6s手机",
    "owner_id": ObjectId("5f4e5f64147f618f015bfae9"),
    contact: "13508019342",
    createdTime: ISODate("2020-09-01T14:52:31.794Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f3c8fc2177fb3f9f690ef"),
    status: NumberInt("1"),
    img: [
        "/uploads/eb1c6589d4a317ec007f8bc36fedc1e7",
        "/uploads/e7e8cf9da39a8e43227e8d17a6cb6346",
        "/uploads/4d5e5663d06eed429f4560060ce99475"
    ],
    category: NumberInt("1"),
    title: "移动硬盘卖了",
    price: "160",
    description: "我的500G硬盘，因为买了固态硬盘，这个不需要了",
    "owner_id": ObjectId("5f4e5f64147f618f015bfae9"),
    contact: "13081083103",
    createdTime: ISODate("2020-09-02T06:32:47.801Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f3d51c2177fb3f9f690f0"),
    status: NumberInt("1"),
    img: [
        "/uploads/b8f6300392a6ac7fe8a2794e5334934e",
        "/uploads/455cca6ab015fe77b4b007f8209f8a8e",
        "/uploads/787a1871f58ea8f9bbb5ff553d979090",
        "/uploads/196d5adc7941bdb22ad8de1660a19ef5"
    ],
    category: NumberInt("2"),
    title: "笔记本内存条8G一根",
    price: "200",
    description: "最近电脑想升级内存，谁有8G的条子，给我来一个",
    "owner_id": ObjectId("5f4e5f64147f618f015bfae9"),
    contact: "13508081234",
    createdTime: ISODate("2020-09-02T06:36:01.929Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f4058c2177fb3f9f690f1"),
    status: NumberInt("1"),
    img: [
        "/uploads/226c3028b516e5b586100b4e3b695e13",
        "/uploads/df29c3a738ee08e996e2860266893dce"
    ],
    category: NumberInt("4"),
    title: "高等数学太难了",
    description: "老师讲课跟念经一样",
    "owner_id": ObjectId("5f4e5f64147f618f015bfae9"),
    createdTime: ISODate("2020-09-02T06:48:56.397Z"),
    __v: NumberInt("0"),
    contact: null,
    price: null
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f408cc2177fb3f9f690f2"),
    status: NumberInt("1"),
    img: [
        "/uploads/87ddd4b30b375c12f129837cdf2b03f6"
    ],
    category: NumberInt("3"),
    title: "本周6下午乒乓球比赛",
    description: "咱们计算机学院的3班和4班要打比赛，有热爱运动的赶紧来报名了哦！",
    "owner_id": ObjectId("5f4e5f64147f618f015bfae9"),
    contact: "15081081342",
    createdTime: ISODate("2020-09-02T06:49:48.397Z"),
    __v: NumberInt("0"),
    price: null
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f5b43e057b38919a621e2"),
    status: NumberInt("1"),
    img: [
        "/uploads/a24c9162ced01d8bdc82a1b476a4b004",
        "/uploads/d5e4b3db6d25252d4d23a9439b44be99"
    ],
    category: NumberInt("1"),
    title: "笔记本电脑换钱了",
    price: "1800",
    description: "最近生活紧张，把前年买的笔记本电脑卖了，谁要的话联系我",
    "owner_id": ObjectId("5f4f579fe057b38919a621e1"),
    contact: "13508108342",
    createdTime: ISODate("2020-09-02T08:43:47.419Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f5bd2e057b38919a621e3"),
    status: NumberInt("1"),
    img: [
        "/uploads/c13b4910af68b0b4605baf44d9428aaf"
    ],
    category: NumberInt("1"),
    title: "二手手机 OPPO R15",
    price: "678",
    description: "甩了还钱，要的速度了",
    "owner_id": ObjectId("5f4f579fe057b38919a621e1"),
    contact: "13510801342",
    createdTime: ISODate("2020-09-02T08:46:10.413Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f5cd9e057b38919a621e4"),
    status: NumberInt("1"),
    img: [
        "/uploads/e50b0cef0117be0c378c0c33df72873e"
    ],
    category: NumberInt("2"),
    title: "苹果8手机64G",
    price: "1200",
    description: "想买个苹果8手机",
    "owner_id": ObjectId("5f4f579fe057b38919a621e1"),
    contact: "13508103924",
    createdTime: ISODate("2020-09-02T08:50:33.493Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f5d68e057b38919a621e5"),
    status: NumberInt("1"),
    img: [
        "/uploads/6d44211afce6dfd04e8f7d1b26c12ee9"
    ],
    category: NumberInt("4"),
    title: "学校太偏僻了",
    description: "这学校太坑了，公交车都要走好远，还不知道啥时候能修地铁，烦死了！",
    "owner_id": ObjectId("5f4f579fe057b38919a621e1"),
    createdTime: ISODate("2020-09-02T08:52:56.682Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("infos").insert([ {
    _id: ObjectId("5f4f5eaee057b38919a621e6"),
    status: NumberInt("1"),
    img: [
        "/uploads/b6f96cbd5db6e2852c97abd1621d47bc"
    ],
    category: NumberInt("3"),
    title: "本周日下午游泳比赛",
    description: "咱们计算机系和电子信息系举行游泳比赛，要参加比赛的同学联系我赶紧报名了哦！",
    "owner_id": ObjectId("5f4f579fe057b38919a621e1"),
    contact: "15102983042",
    createdTime: ISODate("2020-09-02T08:58:22.241Z"),
    __v: NumberInt("0")
} ]);

// ----------------------------
// Collection structure for users
// ----------------------------
db.getCollection("users").drop();
db.createCollection("users");

// ----------------------------
// Documents of users
// ----------------------------
db.getCollection("users").insert([ {
    _id: ObjectId("5f4e5f64147f618f015bfae9"),
    gender: NumberInt("-1"),
    account: "user1",
    password: "d477887b0636e5d87f79cc25c99d7dc9",
    phone: 13688886666,
    nickName: "林哥哥",
    avatar: "/uploads/897b3aa593fbd71f972f51bd05e4eb49",
    createdTime: ISODate("2020-09-01T14:49:08.744Z"),
    lastModifiedTime: ISODate("2020-09-01T14:49:08.745Z"),
    __v: NumberInt("0")
} ]);
db.getCollection("users").insert([ {
    _id: ObjectId("5f4f579fe057b38919a621e1"),
    gender: NumberInt("-1"),
    account: "user2",
    password: "d477887b0636e5d87f79cc25c99d7dc9",
    phone: 13908134023,
    nickName: "王婷",
    avatar: "/uploads/f8be5b36fc4d11cff19cddc610430c98",
    createdTime: ISODate("2020-09-02T08:28:15.767Z"),
    lastModifiedTime: ISODate("2020-09-02T08:28:15.767Z"),
    __v: NumberInt("0")
} ]);
