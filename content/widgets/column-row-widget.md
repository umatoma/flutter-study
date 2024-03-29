---
title: '縦・横に並べる'
description: '縦・横に並べるためのWidgetを紹介'
slug: widgets-04
---

## このページのゴール

- 縦・横に並べるためのWidgetの扱いを知る


## Column

`Column` Widgetを使うことで、Widgetを縦に並べることができます。  
それでは、具体的な使い方を見ていきましょう。


### 縦に並べる

縦にWidgetを並べるときは、`Column` Widgetを使い、`children` に並べたいWidget一覧を指定すればOKです 👍
```dart
Column(
  children: <Widget>[
    Text('first line'),
    Text('second line'),
    Text('third line'),
  ],
)
```

### 中央寄せ・下寄せ・均等配置

縦に並べるWidgetの配置を変えるときは、 `mainAxisAlignment` を指定すればOkです 👍
```dart
Column(
  // 中央寄せ
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[],
)
Column(
  // 下寄せ
  mainAxisAlignment: MainAxisAlignment.end,
  children: <Widget>[],
)
Column(
  // 均等配置
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: <Widget>[],
)
```

### 左寄せ・右寄せ

縦に並べたWidgetの横方向の配置を変えるときは、 `crossAxisAlignment` を指定すればOKです 👍
```dart
Column(
  // 左寄せ
  crossAxisAlignment: CrossAxisAlignment.start,
  children: <Widget>[],
)
Column(
  // 右寄せ
  crossAxisAlignment: CrossAxisAlignment.end,
  children: <Widget>[],
)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=5a144d02709a2e5762a1d8a103633717">
</iframe>


## Row

`Row` Widgetを使うことで、Widgetを横に並べることができます。  
それでは、具体的な使い方を見ていきましょう。

横にWidgetを並べるときは、`Row` Widgetを使い、`children` に並べたいWidget一覧を指定すればOKです 👍
```dart
Row(
  children: <Widget>[
    Text('first row'),
    Text('second row'),
    Text('third row'),
  ],
)
```

### 中央寄せ・右寄せ・均等配置

横に並べるWidgetの配置を変えるときは、 `mainAxisAlignment` を指定すればOKです 👍
```dart
Row(
  // 中央寄せ
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[],
)
Row(
  // 右寄せ
  mainAxisAlignment: MainAxisAlignment.end,
  children: <Widget>[],
)
Row(
  // 均等配置
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  children: <Widget>[],
)
```

### 上寄せ・下寄せ

横に並べたWidgetの縦方向の配置を変えるときは、 `crossAxisAlignment` を指定すればOKです 👍
```dart
Row(
  // 左寄せ
  crossAxisAlignment: CrossAxisAlignment.start,
  children: <Widget>[],
)
Row(
  // 右寄せ
  crossAxisAlignment: CrossAxisAlignment.end,
  children: <Widget>[],
)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=fe455b04f41f7abbaf784f5ffae663a0">
</iframe>


この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- [Column](https://api.flutter.dev/flutter/widgets/Column-class.html)
- [Row](https://api.flutter.dev/flutter/widgets/Row-class.html)


## まとめ

- 縦に並べるときは `Column` Widgetを使えばOK
- 横に並べるときは `Row` Widgetを使えばOK

次は、ボタンを表示するためのWidgetを紹介していきます 💪💪💪


## 参考情報

- [Column](https://api.flutter.dev/flutter/widgets/Column-class.html)
- [Row](https://api.flutter.dev/flutter/widgets/Row-class.html)
