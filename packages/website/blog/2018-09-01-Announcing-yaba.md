---
title: Announcing yaba
author: Oz Sayag
authorURL: https://github.com/ozsay
authorImageURL: /img/oz.png
---

Yaba stands for "Yet Another Bundle Analyzer" and it's a new bundle analyzer for webpack.

<!--truncate-->

`yaba` is inspired by other bundle analyzers and tries to bring a whole solution to analyze the bundle created by `webpack`.
While other tools attempt to solve some difficulties understanding your bundle, `yaba` will display everything it about the output of your app.

> You can click on the images to enlarge them

## General

In this screen you can see general information about the bundle:

![general]

## Modules

![modules]

![modulesSearch]

![module1]

![module2]

## Assets

This screen shows a list of your assets (everything that `webpack` outputs):

![assets]

Here you can see detailed information about an asset:

1. MIME type
2. sizes: raw, gzip, deflate and brotli.
3. some asset types have preview.

![asset]

## Chunks

![chunks]

![chunk]

## Packages

This screen shows a list of your `npm` dependencies (both direct and indirect - dependencies of dependencies):

> you can search packages by clicking at the + sign in the top-left of the table.

![packages]

In the next screens you can see detailed information about a package:

1. the installed version and when it was published.
2. description.
3. license.
4. homepage link.
5. where it is installed.
6. size (of associated modules).
7. associated modules.
8. usages around the project.
9. popularity - how many downloads this package has.
10. latest versions - will show you the latest major, minor and patch versions according to the installed version.
11. raw `package.json` of the package.

![package1]

![package2]

## Analysis

Most of the information provided in `yaba` is raw collection from `webpack` and `yaba` plugin. 
You can run a deeper analysis on the bundle to detect issues.

Currently the analyzer only detects duplicated packages. 

![analyze1]

This is the results screen:

![analyze2]

[analyze1]: /blog/assets/2018-09-01-Announcing-yaba//analyze1.png
[analyze2]: /blog/assets/2018-09-01-Announcing-yaba//analyze2.png
[asset]: /blog/assets/2018-09-01-Announcing-yaba//asset.png
[assets]: /blog/assets/2018-09-01-Announcing-yaba//assets.png
[chunk]: /blog/assets/2018-09-01-Announcing-yaba//chunk.png
[chunks]: /blog/assets/2018-09-01-Announcing-yaba//chunks.png
[general]: /blog/assets/2018-09-01-Announcing-yaba//general.png
[module1]: /blog/assets/2018-09-01-Announcing-yaba//module1.png
[module2]: /blog/assets/2018-09-01-Announcing-yaba//module2.png
[modules]: /blog/assets/2018-09-01-Announcing-yaba//modules.png
[modulesSearch]: /blog/assets/2018-09-01-Announcing-yaba//modulesSearch.png
[package1]: /blog/assets/2018-09-01-Announcing-yaba//package1.png
[package2]: /blog/assets/2018-09-01-Announcing-yaba//package2.png
[packages]: /blog/assets/2018-09-01-Announcing-yaba//packages.png
[warnings]: /blog/assets/2018-09-01-Announcing-yaba//warnings.png

