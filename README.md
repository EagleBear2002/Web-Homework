# Web前端开发 作业5

```sql
CREATE DATABASE IF NOT EXISTS web CHARACTER SET UTF8;
USE web;
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`email` varchar(64) NOT NULL,
	`name` varchar(64) NOT NULL,
	`password` varchar(64) NOT NULL,
	`gender` int NOT NULL,
	PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```



## 1. 作业要求

1. 必须nodejs， 数据库任选。
2. 可以邮箱注册/登录完成整体流程，其他方式（手机号、第三方账号等）仅体现在界面上，可不实现具体流程。
3. 密码、验证码可参考相应文献，选择合理实现方案。
4. 注册页面应提示密码规则和强度。合理使用正则表达式。
5. 登录页面可与一级页面结合，需在一二级页面中显示登录用户信息。
6. 自行确定鉴权方案。

## 2. 文件结构

```bash
│  login.html
│  package-lock.json
│  package.json
│  README.md
│  server.js
│
├─assets
│
├─css
|
├─html
```

## 3. 运行说明

> 运行前需要安装Node.js

因为我采用了在云服务器运行数据库，所以不需要本地建立数据库。

运行流程：

1. 需要在目录下打开终端，输入 `npm install`
2. 然后输入`node server.js`，启动服务端
3. 使用Chrome等浏览器打开index.html，即可进入登陆页面

## 4. 实现效果

### 4.1 注册流程

#### **密码强度**

密码强度分为4个等级：不满足条件、弱、中、强。

![pwdStrength](http://img.nebular.site/md/pwdStrength.gif)

其中，不满足条件的密码无法通过注册。

![image-20230103170230302](http://img.nebular.site/md/image-20230103170230302.png)

**验证码**

必须输入正确的验证码才能完成注册流程。

![image-20230103170413676](http://img.nebular.site/md/image-20230103170413676.png)

如果看不清验证码，点击验证码即可更换验证码

![verify](http://img.nebular.site/md/verify.gif)

**电子邮箱注册**

输入的电子邮箱必须是没有注册过的

![image-20230103170846585](http://img.nebular.site/md/image-20230103170846585.png)

**成功注册**

各项条件都满足后，即可成功注册账号，之后自动跳转至登录页面

![image-20230103170950467](http://img.nebular.site/md/image-20230103170950467.png)


### 4.2 登录流程

需要输入已经注册的邮箱账号

![image-20230103171326306](http://img.nebular.site/md/image-20230103171326306.png)

并且输入正确的密码![image-20230103171401562](http://img.nebular.site/md/image-20230103171401562.png)

输入正确的邮箱和密码后，自动跳转至一级页面

### 4.3 前端鉴权以及在一二级页面显示用户信息

我采用了session-cookie鉴权方式，用户信息存储在session中。

用户登录后，在一级页面和二级页面的顶部，会显示用户的邮箱以及欢迎语。

一级页面：

![image-20230103171519931](http://img.nebular.site/md/image-20230103171519931.png)

二级页面：

![image-20230103171550962](http://img.nebular.site/md/image-20230103171550962.png)

如果用户未登录就进入一二级页面，会弹窗提示需要先登录，之后自动跳转至登录页面。

![image-20230103171925886](http://img.nebular.site/md/image-20230103171925886.png)

## 5. 实现方案说明

### 5.1 框架

我使用了nodejs、express框架，MySQL数据库。

### 5.2 密码强度

我采用的密码强度规则基于参考文档https://www.woshipm.com/pd/595757.html中的常规版密码强度规则，具体细则如下：

1. 初始密码级别为0
2. 当密码长度小于6时，密码级别为0；
3. 当密码包含小写字母时，密码级别加1；
4. 当密码包含大写字母时，密码级别加1；
5. 当密码包含特殊字符时，密码级别加1；
6. 当密码包含数字时，密码级别加1；

最后得出密码强度：

| 密码级别 | 密码强度   |
| -------- | ---------- |
| <=0      | 不满足条件 |
| 1        | 弱         |
| 2        | 中         |
| >=3      | 强         |

### 5.3 验证码

我在前端使用canvas直接生成验证码，不使用后端接口，这样子做有以下优点：

1. 减少后端接口的使用，减轻服务器负担
2. 前端直接生成，响应速度更快

### 5.4 服务端

服务器端监听3001接口，提供2个接口：登录和注册，关键代码如下：

```js
app.get('/login',function (req, res) {
    const params = req.query;
    console.log(params)
    const query = "SELECT * from user where email=" + "\"" + params.email + "\"";
    console.log(query)
    connection.query(query, function (error, result) {
        if (error) throw error;
        if (result.length === 0) {
            console.log("账号不存在")
            res.send(1)
        } else {
            if (result[0].password === params.password) {
                console.log("登录成功")
                res.send(0)
            } else {
                res.send(2)
            }
        }
    })
})

app.get('/signup',function (req, res) {
    const params = req.query;
    console.log(params)
    const query = "select * from user where email=" + "\"" + params.email + "\"";
    connection.query(query, function (error, result) {
        if (error) throw error;
        if (result.length > 0) {
            console.log("邮箱已存在")
            res.send(1)
        } else {
            const signupQuery = "insert into user(email, name, password) values(" + "\"" + params.email + "\",\"" + params.userName + "\",\"" + params.password + "\")";
            console.log(signupQuery)
            connection.query(signupQuery, function (error, result) {
                if (error) throw error;
                console.log("注册成功")
                res.send(0)
            })
        }
    })
})
```



### 5.5 鉴权

我使用了session-cookie认证方式，该方式适用于一般中大型的网站，框架流程图如下：

![image-20230103172526436](http://img.nebular.site/md/image-20230103172526436.png)

该认证方式有以下优点：

1. Cookie 简单易用
2. Session 数据存储在服务端，相较于JWT 方便进行管理，也就是当用户登录和主动注销，只需要添加删除对应的Session 就可以了，方便管理
3. 只需要后端操作即可，前端可以无感进行操作；

