---
title: 'ボタンを表示'
description: 'ボタンを表示するためのWidgetを紹介'
slug: widgets-05
---

## このページのゴール

- ボタンを表示するためのWidgetの扱いを知る


## TextButton・OutlinedButton・ElevatedButton

基本的なボタン表示用Widgetとしては以下の3種類があります。

- TextButton
    - 影のないボタン
- OutlinedButton
    - 枠線のあるボタン
- ElevatedButton
    - 影のあるボタン

### ボタンを表示する

各ボタン表示用Widgetの基本的な使い方としては、  
`child` にボタン内に表示したいWidgetを指定し、  
`onPressed` にタップされた時の処理を指定すればOKです 👍

```dart
TextButton(
  onPressed: () { /* ボタンがタップされた時の処理 */ },
  child: Text('click here'),
)
OutlinedButton(
  onPressed: () { /* ボタンがタップされた時の処理 */ },
  child: Text('click here'),
)
ElevatedButton(
  onPressed: () { /* ボタンがタップされた時の処理 */ },
  child: Text('click here'),
)
```

### 押せなくする

ボタンを押せないようにする（無効化）する時は、`onPressed` に `null` を指定すればOKです 👍  
ボタンが押せるときと押せないときでデザインが自動的に切り替わったりします。

```dart
TextButton(
  onPressed: () { /* ボタンが押せる時 */ },
  child: Text('押せるよ'),
)
OutlinedButton(
  onPressed: null,
  child: Text('押せないよ'),
)
```

### テーマ色を変える

各ボタンのテーマ色を変えるときは `style` を指定すればOKです 👍  

```dart
TextButton(
  onPressed: () { /* ボタンが押せる時 */ },
  style: TextButton.styleFrom(
    primary: Colors.red,
  ),
  child: Text('押せるよ'),
)
OutlinedButton(
  onPressed: () { /* ボタンが押せる時 */ },
  style: OutlinedButton.styleFrom(
    primary: Colors.red,
  ),
  child: Text('押せるよ'),
)
ElevatedButton(
  onPressed: () { /* ボタンが押せる時 */ },
  style: ElevatedButton.styleFrom(
    primary: Colors.red,
  ),
  child: Text('押せるよ'),
)
```

### 影の深さを変える

`ElevatedButton` の影の深さを変えるときは `elevation` を指定すればOKです 👍

```dart
ElevatedButton(
  onPressed: () { /* ボタンが押せる時 */ },
  style: ElevatedButton.styleFrom(
    primary: Colors.red,
    elevation: 16,
  ),
  child: Text('押せるよ'),
)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=8895e0cd80d94a5dad10d01a35193d71">
</iframe>

この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- [TextButton](https://api.flutter.dev/flutter/material/TextButton-class.html)
- [OutlinedButton](https://api.flutter.dev/flutter/material/OutlinedButton-class.html)
- [ElevatedButton](https://api.flutter.dev/flutter/material/ElevatedButton-class.html)


## IconButton

### アイコンボタンを表示する

アイコンボタンを表示する時は `IconButton` を使えばOKです 👍

```dart
IconButton(
  onPressed: () {},
  // 表示アイコン
  icon: Icon(Icons.thumb_up),
  // アイコン色
  color: Colors.pink,
  // サイズ
  iconSize: 64,
)
```

### テキスト＋アイコンボタンを表示する

テキストとアイコンを含めたボタンを表示する時は、  
`TextButton.icon`・`OutlinedButton.icon`・`ElevatedButton.icon` を使えばOKです 👍

基本的な使い方は `TextButton`・`OutlinedButton`・`ElevatedButton` と同じですが、  
`icon` でアイコンを指定し、`label` でテキストを指定する部分が異なってます 🤔

```dart
TextButton.icon(
  onPressed: () {},
  icon: Icon(Icons.thumb_up),
  label: Text('Good'),
)
OutlinedButton.icon(
  onPressed: () {},
  icon: Icon(Icons.favorite),
  label: Text('Like'),
)
ElevatedButton.icon(
  onPressed: () {},
  icon: Icon(Icons.flight),
  label: Text('Flight'),
)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=fa5998d385f170991028243f07fa0154">
</iframe>

この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- [IconButton](https://api.flutter.dev/flutter/material/IconButton-class.html)


## FloatingActionButton

### FloatingActionButtonを表示する

マテリアルデザインを採用したアプリで表示されるFloatingActionButtonを表示する時は、  
`FloatingActionButton` を使えばOKです 👍

`Scaffold` の `floatingActionButton` に指定することで手軽に表示できます。

```dart
Scaffold(
  floatingActionButton: FloatingActionButton(
    backgroundColor: Colors.green,
    onPressed: () {},
    child: Icon(Icons.add),
  ),
)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=7231428026257bbbf2ff4db338833172">
</iframe>

この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- [FloatingActionButton](https://api.flutter.dev/flutter/material/FloatingActionButton-class.html)


## まとめ

- 基本的なボタンは `TextButton`・`OutlinedButton`・`ElevatedButton` Widgetを使えばOK
- アイコンボタンは `IconButton` Widgetを使えばOK
- アイコン＋テキストボタンは `TextButton.icon`・`OutlinedButton.icon`・`ElevatedButton.icon`  Widgetを使えばOK
- `FloatingActionButton` を使う時は `Scaffold` と組み合わせればOK

次は、リストを表示するためのWidgetを紹介していきます 💪💪💪


## 参考情報

- [TextButton](https://api.flutter.dev/flutter/material/TextButton-class.html)
- [OutlinedButton](https://api.flutter.dev/flutter/material/OutlinedButton-class.html)
- [ElevatedButton](https://api.flutter.dev/flutter/material/ElevatedButton-class.html)
- [IconButton](https://api.flutter.dev/flutter/material/IconButton-class.html)
- [FloatingActionButton](https://api.flutter.dev/flutter/material/FloatingActionButton-class.html)
