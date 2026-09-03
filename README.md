# 插画与立体书主页

静态站点，部署到 [Vercel](https://vercel.com) 后即可公网打开。

## 本地预览

```bash
npx --yes serve .
```

浏览器打开提示的地址，一般是 `http://localhost:3000`。

## 换成她的内容

编辑 `js/config.js`：

- `name` / `nameEn`：姓名
- `email`：对外邮箱
- `about`：简介
- `works` / `books`：作品标题，以及图片路径（例如 `assets/works/01.jpg`）

图片放到 `assets/works/` 和 `assets/books/`，不要用别人的原作。

## 发布到公网（GitHub Pages，推荐国内）

Vercel 对中国手机号经常发不出验证码，改用 GitHub Pages，一般只要 GitHub 账号。

1. 打开 [github.com/new](https://github.com/new)，新建仓库（Public），不要勾选 Add README
2. 在本文件夹打开终端，把 `你的用户名` 和 `仓库名` 换成你的：

```bash
git init
git add .
git commit -m "artist homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

3. 打开仓库 → **Settings** → 左侧 **Pages**
4. Source 选 **Deploy from a branch**，Branch 选 **main**，文件夹选 **/ (root)**，Save
5. 等一分钟，链接是：`https://你的用户名.github.io/仓库名/`

发给老婆用这个链接。以后改完再 `git add . && git commit -m "update" && git push`，页面会自己更新。

自己的域名以后再绑：Pages 同一页里有 Custom domain。`.com` 一年大约 70–100 元。托管本身 0 元。
