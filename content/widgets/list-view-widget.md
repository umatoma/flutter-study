---
title: 'リストを表示'
description: 'リストを表示するためのWidgetを紹介'
slug: widgets-06
---

## このページのゴール

- リストを表示するためのWidgetの扱いを知る


## ListView

`Column` Widgetを使うことで複数のWidgetを縦に並べることができます、  
ですがスクロールに対応していないので、縦幅が足りない場合は見切れてしまいます。

そこで、スクロールに対応したリストを表示したい場合は `ListView` を使いましょう 👍

### リスト表示

`ListView` Widgetを使うことでスクロール可能なリストを表示することができます。  
`children` に並べたいWidget一覧を指定すればOKです 👍

```dart
ListView(
  children: <Widget>[
    Text('Item 1'),
    Text('Item 2'),
    Text('Item 3'),
  ],
)
```

### 配列からリスト作成

配列（List）で表示したいデータを持っている場合は、`ListView.build` を使うことで簡単にリストが作れます。  
`builder` を指定し、配列のデータを元に表示したいWidgetを作ればOKです 👍

```dart
final listItems = [
  'Item 1',
  'Item 2',
  'Item 3',
];

ListView.builder(
  itemCount: listItems.length,
  itemBuilder: (context, index) {
    return Text(listItems[index]);
  },
)
```

### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=635de826cbc8ddfcc92692ac1aa0791a">
</iframe>

この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html)


## ListTile・Card

リストのアイテムを作るときに、`ListTile` や `Card` を使うと簡単に整ったUIを作ることができます。

```dart
// タイトル・サブタイトル・画像・アイコン等を含めたアイテムが作れる
ListTile(
  leading: Image.network('https://placehold.jp/50x50.png'),
  title: Text('ListTile'),
  subtitle: Text('subtitle'),
  trailing: Icon(Icons.more_vert),
)
// 影のついたカードUIが作れる
Card(
  child: Container(
    height: 60,
    width: double.infinity,
    child: Text('Card'),
  ),
)
// 組み合わせることもOK
Card(
  child: ListTile(
    leading: Image.network('https://placehold.jp/50x50.png'),
    title: Text('Card and ListTile'),
    subtitle: Text('subtitle'),
    trailing: Icon(Icons.more_vert),
  ),
)
```
### 使ってみる

実際に使ってみるとこんな感じになります。  
👇 色々と書き換えて動かしてみましょう 💪💪💪

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=4871a3feb05b6103b31ef407243a1e95">
</iframe>

この他にも、色々と機能はあるので気になるときは公式ドキュメントを見てみましょう 👀

- [ListTile](https://api.flutter.dev/flutter/material/ListTile-class.html)
- [Card](https://api.flutter.dev/flutter/material/Card-class.html)


## まとめ

- `ListView` Widgetを使うとスクロールに対応したリストを作ることができる
- 配列を元にリストを作る時は `ListView.builder` を使えばOK
- `ListTile` Widget や `Card` Widgetを使うと簡単に整ったUIが作れる

次は、AppBarを表示するためのWidgetを紹介していきます 💪💪💪


## 参考情報

- [ListView](https://api.flutter.dev/flutter/widgets/ListView-class.html)
- [ListTile](https://api.flutter.dev/flutter/material/ListTile-class.html)
- [Card](https://api.flutter.dev/flutter/material/Card-class.html)

