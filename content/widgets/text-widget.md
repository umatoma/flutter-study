---
title: 'テキストを表示'
description: 'テキストを表示するWidgetを紹介'
slug: widgets-02
---

## このページのゴール

- テキストを表示するためのWidgetの扱いを知る


## Text Widget

`Text` Widgetを使うことで、テキストを表示できます。  
それでは、具体的な使い方を見ていきましょう。

### テキスト表示

とりあえずテキストを表示したい場合は、引数に表示したい文字列を指定するだけでOKです 👍
```dart
Text('Default')
```

### スタイル

テキストの太さや色などスタイルを変更したい場合は、引数に `textStyle` を指定すればOKです 👍
```dart
// 太さを指定
Text('Bold', style: TextStyle(fontWeight: FontWeight.bold))
// スタイルを指定
Text('Italic', style: TextStyle(fontStyle: FontStyle.italic))
// サイズを指定
Text('fontSize = 36', style: TextStyle(fontSize: 36))
// 色を指定
Text('Red', style: TextStyle(color: Colors.red))
```

### 表示位置

テキストの右寄せや左寄せなど `textAlign` で表示位置を指定できます 👍
```dart
// 表示位置を指定
Text('TextAlign.right', textAlign: TextAlign.right)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=31cdf2baf6df6a11be4aaeb3baca1278">
</iframe>

この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- [Text](https://api.flutter.dev/flutter/widgets/Text-class.html)


## まとめ

- テキストを表示するには `Text` Widgetを使えばOK

次は、サイズ・背景・余白・枠線などを指定するためのWidgetを紹介していきます 💪💪💪


## 参考情報

- [Text](https://api.flutter.dev/flutter/widgets/Text-class.html)
