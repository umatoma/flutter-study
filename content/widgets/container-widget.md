---
title: 'サイズ・背景・余白・枠線'
description: 'サイズ・背景・余白・枠線などを指定するためのWidgetを紹介'
slug: widgets-03
---

## このページのゴール

- サイズ・背景・余白・枠線などを指定するためのWidgetの扱いを知る


## Container

`Container` Widgetを使うことで、サイズ・背景・余白・枠線などを指定することができます。  
それでは、具体的な使い方を見ていきましょう。


### 背景色

背景色を変えたいWidgetを `Container` Widgetの `child` に指定し、 `color` を指定すればOKです 👍
```dart
Container(
  // 背景色
  color: Colors.blue,
  child: Text('blue'),
)
```

### サイズ

横幅・縦幅を変更したいときは `width` や `height` を指定すればOKです 👍
```dart
Container(
  // 横幅
  width: 200,
  // 縦幅
  height: 50,
  child: Text('200x50'),
)
```

### 余白

余白（マージン・パディング）を変更したいときは `margin` や `padding` を指定すればOKです 👍
```dart
Container(
  // 内側の余白（パディング）
  padding: EdgeInsets.all(8),
  // 外側の余白（マージン）
  margin: EdgeInsets.all(8),
  child: Text('padding / margin'),
)
```

### 枠線

枠線を変更したいときは `decoration` に `border` や `borderRadius` を指定すればOKです 👍
```dart
Container(
  decoration: BoxDecoration(
    // 枠線
    border: Border.all(color: Colors.blue, width: 2),
    // 角丸
    borderRadius: BorderRadius.circular(8),
  ),
  child: Text('border'),
)
```

### 背景画像

背景画像を変更したいときは `decoration` に `image` を指定すればOKです 👍
```dart
Container(
  decoration: BoxDecoration(
    // 背景画像
    image: DecorationImage(
      image: NetworkImage('https://placehold.jp/200x100.png'),
    ),
  ),
  child: Text('image'),
)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=514e924f4a09d99db516527b276cea3f">
</iframe>

この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- https://api.flutter.dev/flutter/widgets/Container-class.html


## まとめ

- サイズ・背景・余白・枠線などを指定するときは `Container` Widgetを使えばOK

次は、Widgetを縦・横に並べるためのWidgetを紹介していきます 💪💪💪


## 参考情報

- https://api.flutter.dev/flutter/widgets/Container-class.html
