---
title: 'Flutter概要'
description: 'Flutterの特徴や仕組みを紹介'
next: getting-started/install
slug: introduction-01
---

## このページのゴール
- Flutterの特徴・仕組みを知る


## Flutter

![](/images/logo_lockup_flutter_horizontal.svg)

### Flutterとは

Flutterは**優れたUIのiOS/Android/Webアプリを作る**ための  
Googleが提供しているツールです。

Flutterを使うと、  
**1つのソースコードでiOS/Android/Webアプリが同時に開発**できるのです。

さらに、UIを作るために必要なパーツも整っていて、  
**簡単に凝ったUI**が作れちゃいます。

### Flutterの特徴

- ⚡️ 高速に開発できる
    - エディタ周りのサポートも厚く、簡単かつ高速に開発できる環境が整っている
- ✨ いい感じのUIが簡単に作れる
    - Android/iOSスタイルのデザインパーツを使って、誰でも整ったUIが簡単に作れる
- 🚀 さくさく動く
    - パフォーマンス面も問題なし

### 公式サイト

- https://flutter.dev/


### サンプルアプリ

Flutterを使ったアプリのサンプルです。  
少ないコードで動きのあるアプリを作ることができてますね 👍👍👍

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=1a28bdd9203250d3226cc25d512579ec">
</iframe>


## Flutterの仕組み

### どうやって動いているのか？

Flutterでプログラムを書くと、  
**1つのソースコードでiOS/Android/Webそれぞれ同じUIのアプリ**が作れます。

どうやって実現してるんでしょうか 🤔

まず、Flutterでアプリを作るときは  
**Dartというプログラミング言語で開発**をします。

このDartは  
**1つのソースコードからiOS/Android/Webで動作する形式に変換**できるのです。  

FlutterはDartのこの仕組みを利用し、  
**iOS/Android/Web上でDartで書いた処理を動かしている**のです 👀

![](/images/introduction/flutter-how-it-works.svg)

### Dart

**DartはFlutterで採用されているプログラミング言語**です。

JavaScriptに似た書き方なので、  
プログラミング初心者の方でも扱いやすい言語ですね 👍

- https://dart.dev/


## まとめ
- Flutterを使うと簡単にアプリが作れる
- FlutterはDartを使いiOS/Android/Web上で動かしている

何となくFlutterの事が分かったでしょうか 🤔  
次はFlutterをインストールしてみましょう 😆


## 参考情報
- https://flutter.dev/
- https://github.com/flutter/flutter/wiki
- https://dart.dev/