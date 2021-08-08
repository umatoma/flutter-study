---
title: 'AppBarを表示'
description: 'AppBarを表示するためのWidgetを紹介'
slug: widgets-07
---

## このページのゴール

- AppBarを表示するためのWidgetの扱いを知る

## AppBar

Androidでよく使われるアプリバー・アクションバーを表示するには `AppBar` Widgetを使えばOKです 👍  
基本的には `Scaffold` Widgetと組み合わせて使います。

```dart
Scaffold(
  appBar: AppBar(
    // 左側のアイコン
    leading: Icon(Icons.arrow_back),
    // タイトルテキスト
    title: Text('Hello'),
    // 右側のアイコン一覧
    actions: <Widget>[
      IconButton(
        onPressed: () {},
        icon: Icon(Icons.favorite),
      ),
      IconButton(
        onPressed: () {},
        icon: Icon(Icons.more_vert),
      ),
    ],
  ),
)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=89d80bb7d7220bb5b8cfc0acbce1e78c">
</iframe>

この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- https://api.flutter.dev/flutter/material/AppBar-class.html


## まとめ

- AppBarを表示するには `AppBar` Widgetを使えばOK

次は、状態を持ったWidgetを紹介していきます 💪💪💪


## 参考情報

- https://api.flutter.dev/flutter/material/AppBar-class.html
