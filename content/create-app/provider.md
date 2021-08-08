---
title: 'Providerで状態管理'
description: 'FlutterでProviderを使った状態管理の実装方法を紹介'
slug: create-app-02
---

## Providerで状態管理

ここでは、以下の内容について紹介していきたいと思います。

- 状態管理とは何なのか
- Providerの使い方


## 状態管理

### 状態管理とは

まずは状態管理とは何であるかについて理解していきましょう。

<aa href="/widgets/about-widget">Widgetとは</aa>で紹介したように、  
Flutterは `Widgetをツリー状に組み合わせUIを実現` しています。

そして、<aa href="/widgets/state-widget">状態を持ったWidget</aa>で紹介したように、  
`データを元にUIを作る` 仕組みのことを `状態を持つ` と呼びます。


<table>
    <thead>
        <tr>
            <th>Widgetをツリー状に組み合わせUIを実現</th>
            <th>データを元にUIを作る</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="40%"><img src="/images/about-widget.svg" /></td>
            <td width="60%"><img src="/images/state-widget.svg" /></td>
        </tr>
    </tbody>
</table>


これらの知識を組み合わせると、  
`様々なデータを元にアプリのUIを作っている` のです。

`様々なデータ` のことを `アプリの状態` と呼び、  
その `状態を扱いやすく管理する仕組み` のことを `状態管理` と言うのです。

状態管理を行っていないとデータの扱いが複雑になり、  
プログラムを書くのが大変になってしまうでしょう 😨😨😨

![](/images/provider/app-state.svg)


## Providerの使い方

### Provider

<aa href="/widgets/state-widget">状態を持ったWidget</aa>でも紹介したように、  
`StatefulWidget` と `State` を使えば状態を元にUIを作ることは可能です。

ですが、様々なWidgetが組み合わさったUIになり、  
`状態が複雑になってしまうと、管理しきれなくなってしまう` のです。

そこで、登場するのが `Provider` です。

- [provider | Flutter Package](https://pub.dev/packages/provider)

これを使うことで `複雑な状態も簡単に管理することができる` のです。

### Providerで出来ること

では、Providerを使うと具体的には何が出来るのでしょうか？

とてもシンプルで `親Widgetから子Widgetにデータを受け渡す` ことが出来るのです。  
データを渡す先は、`子Widgetであれば何処でもOK` です。

![](/images/provider/provider-state.svg)

### データの受け渡し

Providerの基本的なデータの受け渡し方法を確認していきましょう。  
使い方は簡単で、親Widgetと子Widgetでデータの受け渡し用の処理を追加するだけで良いのです。

解説

- 親Widgetで `Provider<T>.value()` を使い `データを渡す`
- 子Widgetで `context.watch<T>()` を使い `データを受け取る`

ソースコード

```dart
// ChangeNotifierを継承すると変更可能なデータを渡せる
class CountData {
  int count = 0;
}

class ParentWidget extends StatelessWidget {
  // 渡すデータ
  final data = CountData();

  @override
  Widget build(BuildContext context) {
    // Provider<T>() で子Widgetにデータを渡す
    // ※ 渡すデータの クラス と <T> は揃えましょう
    return Provider<CountData>.value(
      value: data,
      child: Container(
        child: ChildWidget(),
      ),
    );
  }
}

class ChildWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // context.watch<T>() で親Widgetからデータを受け取る
    // ※ 受け取るデータの クラス と <T> は揃えましょう
    final CountData data = context.watch<CountData>(context);

    return Column(
      children: <Widget>[
        // 受け取ったデータを使いUI作成
        Text('count is ${data.count.toString()}'),
      ],
    );
  }
}
```

### 受け渡すデータを更新する

受け渡すデータを更新する方法も確認していきましょう。

こちらも難しいことはなく、  
`ChangeNotifier` を継承したデータを `ChangeNotifierProvider` を使って渡せば良いのです。

解説

- 受け渡すデータは `ChangeNotifier` を継承し `notifyListeners()` を使って変更を知らせる
- `ChangeNotifierProvider` を使ってデータを渡す

ソースコード

```dart
// ChangeNotifierを継承すると変更可能なデータを渡せる
class CountData extends ChangeNotifier {
  int count = 0;

  void increment() {
    count = count + 1;
    // 値が変更したことを知らせる
    //  >> UIを再構築する
    notifyListeners();
  }
}

class ParentWidget extends StatelessWidget {
  // 渡すデータ
  final data = CountData();

  @override
  Widget build(BuildContext context) {
    // Provider<T>() で子Widgetにデータを渡す
    // ※ 渡すデータの クラス と <T> は揃えましょう
    return ChangeNotifierProvider<CountData>.value(
      value: data,
      child: Container(
        child: ChildWidget(),
      ),
    );
  }
}

class ChildWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // context.watch<T>(context) で親Widgetからデータを受け取る
    // ※ 受け取るデータの クラス と <T> は揃えましょう
    final CountData data = context.watch<CountData>(context);

    return Column(
      children: <Widget>[
        // 受け取ったデータを使いUI作成
        Text('count is ${data.count.toString()}'),
        RaisedButton(
          child: Text('Increment'),
          onPressed: () {
            // データを更新
            data.increment();
          },
        ),
      ],
    );
  }
}
```

## Provider詳細

Providerの細かい使い方も確認しておきましょう。

### Provider と ChangeNotifierProvider の違い

では、Provider と ChangeNotifierProvider の違いは何なのでしょうか？  
どの様に使い分けていけば良いのでしょうか？

大まかな違いとしては以下のような感じになります。

- `Provider`：データを受け渡せればOKな時に使う(データは更新されない)
- `ChangeNotifierProvider`：データの受け渡しだけでなくデータの更新も行いたい

つまり、`ChangeNotifierを継承したクラス`の受け渡しを行う場合は`ChangeNotifierProvider`を使い、  
それ以外のデータを受け渡す時は`Provider`を使っていけば基本的な使い方としてはOKです。

### context.watch() と context.read() の違い

データを受け取る時の方法として `context.watch()` と `context.read()` の２種類が用意されています。  
どの様に使い分けていけば良いのでしょうか？

大まかな使い分けとしては以下のような感じになります。

- `context.watch()`：受け取ったデータを元にUIの構築を行う時に使う（Textにデータを渡す時など）
- `context.read()`：受け取ったデータを元にUIの構築を行わない時に使う（クリック時の処理など）

つまり、`受け取ったデータを元にUIを構築するかどうかで使い分け` を行う必要があるのです。

何でもかんでも `context.watch()` を使ってしまうと、  
不必要な画面の再描画が行われてパフォーマンスが低下してしまうので注意しましょう。

### Navigatorで画面遷移したWidgetにデータを受け渡したいとき

画面を跨いでデータの受け渡しを行いたい場合があると思います。  
Providerを使って実現する場合にはどの様な点に注意すればよいのでしょうか？

まず、`Navigator`を使った画面遷移を行う場合は、以下のようなツリー構造になります。  
全ての画面が `MaterialApp` の下にぶら下がるような形になってますね。

![](/images/create-app/material-app-tree.svg)

そして、Providerは `親Widgetから子Widgetにデータを受け渡す` ことが出来るものなので、  
複数の画面で同じデータを受け渡したい時は、  
親Widgetにあたる`MaterialApp` からデータを渡せばOKですね。

```dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider(
      create: (_) => 'HELLO WORLD',
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(primarySwatch: Colors.blue),
        home: PageA(),
      ),
    );
  }
}

class PageA extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(context.watch<String>()),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => PageB()),
          );
        },
        child: Icon(Icons.navigate_next),
      ),
    );
  }
}

class PageB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(context.watch<String>()),
      ),
    );
  }
}
```