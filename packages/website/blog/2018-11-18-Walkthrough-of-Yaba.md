---
title: Walkthrough of Yaba
author: Oz Sayag
authorURL: https:/github.com/ozsay
authorImageURL: /img/oz.png
---

In this blog post I will walk you through all currently available features in **yaba**.

<!--truncate-->

**yaba** is inspired by other bundle analyzers and tries to bring a whole solution to analyze the bundle created by **webpack**.
While other tools attempt to solve some difficulties understanding your bundle, 
**yaba** will attempt to display everything it can about the bundle 
as well as analyzing it for problems.

You can read the announcement [here](/blog/2018/11/11/Announcing-yaba).

> You can click on the images to enlarge them

## General

In this screen you can see general information about the bundle:

![general]

## Modules

Here you can see al the modules that exist in your bundle (all the source files):

![modules]

You can search for modules and exclude node modules:

![modulesSearch]

The next screens present detailed information about a module:

1. which module issued it (imported it first).
2. full path to the file.
3. in which package the module exists.
4. size of the module (exclusive - self size, inclusive - including children).
5. list of children modules (imported modules).
6. reasons - where this module is being imported.
7. associated chunks.
8. associated assets.
8. source code preview.

![module1]

![module2]

## Assets

This screen shows a list of your assets (all the files that **webpack** produces*):

![assets]

Here you can see detailed information about an asset:

1. MIME type
2. sizes: raw, gzip, deflate and brotli.
3. some asset types have preview.

![asset]

> \* Some files produced by plugins (such as webpack-copy-plugin) may not be displayed.
Integration with those plugins is planned for the future.

## Chunks

Chunks are collections of modules.

![chunks]

In the chunk screen you can see a graph of the modules inside the chunk ordered by size
as well as the list of modules associated with it. 

![chunk]

## Packages

This screen shows a list of your **npm** dependencies (both direct and indirect - dependencies of dependencies):

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
11. raw **package.json** of the package.

![package1]

![package2]

## Analysis

Most of the information provided in **yaba** is raw collection from **webpack** and the **yaba** plugin. 
You can run a deeper analysis on the bundle to detect issues.

Currently the analyzer only detects duplicated packages. 

![analyze1]

This is the results screen:

![analyze2]

[analyze1]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/analyze1.png
[analyze2]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/analyze2.png
[asset]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/asset.png
[assets]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/assets.png
[chunk]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/chunk.png
[chunks]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/chunks.png
[general]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/general.png
[module1]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/module1.png
[module2]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/module2.png
[modules]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/modules.png
[modulesSearch]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/modulesSearch.png
[package1]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/package1.png
[package2]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/package2.png
[packages]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/packages.png
[warnings]: /blog/assets/2018-11-11-Walkthrough-of-Yaba/warnings.png

