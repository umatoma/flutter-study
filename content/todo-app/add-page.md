---
title: 'Todoリスト追加画面'
description: 'Todoアプリのリスト追加画面作成方法を紹介'
next: firebase/about-firebase
slug: todo-app-03
---

## このページのゴール

- Todoアプリのリスト追加画面を作成する
- 追加したリストをリスト一覧画面に表示する


## リスト追加画面

### Todoアプリ全体像

前回作成したTodoアプリの雛形とリスト一覧画面を元に、ここではリスト追加画面を作っていきましょう 💪

![](/images/todo-app/about-todo-app.svg)


### リスト追加機能概要

追加機能を作り始める前に、機能の全体像を確認しましょう。

作っているTodoアプリは、リスト追加画面で追加したリストを  
リスト一覧画面に表示させる必要があります。

そこで、リスト一覧画面で**リスト一覧をデータとして持つ**ようにしたいと思います。  

こうすれば**データを元にリスト一覧を表示**でき、  
リストを追加する時は、**追加リストをデータに反映**すればOKです 👍

![](/images/todo-app/todo-app-about-add-list.svg)


### リスト追加フォームを表示する

はじめに、リスト追加フォームをリスト追加画面に表示してみましょう。

`lib/main.dart` の `TodoAddPage` Widget を以下のように書き換えましょう。

解説

- `TextField` を使いテキスト入力を表示

ソースコード

```dart
// リスト追加画面用Widget
class TodoAddPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // *** 追加する部分 ***
      appBar: AppBar(
        title: Text('リスト追加'),
      ),
      // *** 追加する部分 ***
      body: Container(
        // 余白を付ける
        padding: EdgeInsets.all(64),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // テキスト入力
            TextField(),
            const SizedBox(height: 8),
            Container(
              // 横幅いっぱいに広げる
              width: double.infinity,
              // リスト追加ボタン
              child: ElevatedButton(
                color: Colors.blue,
                onPressed: () {},
                child: Text('リスト追加', style: TextStyle(color: Colors.white)),
              ),
            ),
            const SizedBox(height: 8),
            Container(
              // 横幅いっぱいに広げる
              width: double.infinity,
              // キャンセルボタン
              child: TextButton(
                // ボタンをクリックした時の処理
                onPressed: () {
                  // "pop"で前の画面に戻る
                  Navigator.of(context).pop();
                },
                child: Text('キャンセル'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
```

この様に表示されていればOKです。

![](/images/todo-app/todo-app-add-page-form.png)


### 入力されたテキストを扱う

では、入力されたテキストを扱うにはどうすれば良いのでしょうか？

こういう時は、[状態を持ったWidget](/widgets/state-widget)で紹介したように、  
`StatefulWidget` と `State` を使うことで、入力されたテキストを元にUIが作れます。

ここでは、入力されたテキストを表示するようにしてみましょう。  
`lib/main.dart` の `TodoAddPage` Widget を以下のように書き換えましょう。

解説

- `StatefulWidget` と `State` を使い入力されたテキストを扱う
- `TextField` の `onChange` から入力されたテキストを受け取れる

ソースコード

```dart
class TodoAddPage extends StatefulWidget {
  @override
  _TodoAddPageState createState() => _TodoAddPageState();
}

class _TodoAddPageState extends State<TodoAddPage> {
  // 入力されたテキストをデータとして持つ
  String _text = '';

  // データを元に表示するWidget
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('リスト追加'),
      ),
      body: Container(
        // 余白を付ける
        padding: EdgeInsets.all(64),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // 入力されたテキストを表示
            Text(_text, style: TextStyle(color: Colors.blue)),
            const SizedBox(height: 8),
            // テキスト入力
            TextField(
              // 入力されたテキストの値を受け取る（valueが入力されたテキスト）
              onChanged: (String value) {
                // データが変更したことを知らせる（画面を更新する）
                setState(() {
                  // データを変更
                  _text = value;
                });
              },
            ),
            const SizedBox(height: 8),
            Container( /* --- 省略 --- */ ),
            const SizedBox(height: 8),
            Container( /* --- 省略 --- */ ),
          ],
        ),
      ),
    );
  }
}
```


## リストを追加し一覧に表示する

さあ、最後の仕上げです。

リスト追加画面に入力されたTodoリストを、  
リスト一覧画面に表示されるようにしましょう 💪💪💪


### リスト一覧画面にデータを渡す

リスト一覧画面で追加されたTodoリストが扱えるよう、  
リスト追加画面からリスト一覧画面にデータを渡せるようにしてみましょう。

方法は簡単で、`Navigator.of(context).pop()` にデータを渡すだけでOKです 👍  
`lib/main.dart` の `_TodoAddPageState` を以下のように書き換えましょう。

解説

- `Navigator.of(context).pop()` の引数から前画面にデータを渡す

ソースコード

```dart
class _TodoAddPageState extends State<TodoAddPage> {
  // 入力されたテキストをデータとして持つ
  String _text = '';

  // データを元に表示するWidget
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('リスト追加'),
      ),
      body: Container(
        // 余白を付ける
        padding: EdgeInsets.all(64),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // 入力されたテキストを表示
            Text(_text, style: TextStyle(color: Colors.blue)),
            const SizedBox(height: 8),
            // テキスト入力
            TextField( /* --- 省略 --- */ ),
            const SizedBox(height: 8),
            Container(
              // 横幅いっぱいに広げる
              width: double.infinity,
              // リスト追加ボタン
              child: ElevatedButton(
                onPressed: () {
                  // *** 追加する部分 ***
                  // "pop"で前の画面に戻る
                  // "pop"の引数から前の画面にデータを渡す
                  Navigator.of(context).pop(_text);
                },
                child: Text('リスト追加', style: TextStyle(color: Colors.white)),
              ),
            ),
            const SizedBox(height: 8),
            Container( /* --- 省略 --- */ ),
          ],
        ),
      ),
    );
  }
}
```


### リスト追加画面からのデータを受け取る

リスト追加画面から渡されたデータを  
リスト一覧画面で受け取れるようにしてみましょう。

方法は簡単で、`Navigator.of(context).push()` から返ってくる値を見るだけでOKです 👍  
`lib/main.dart` の `TodoListPage` を以下のように書き換えましょう。

解説

- `Navigator.of(context).push()` から返ってくる値が遷移先の画面から渡されたデータ

ソースコード

```dart
// リスト一覧画面用Widget
class TodoListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // AppBarを表示し、タイトルも設定
      appBar: AppBar(
        title: Text('リスト一覧'),
      ),
      // ListViewを使いリスト一覧を表示
      body: ListView( /* --- 省略 --- */ ),
      floatingActionButton: FloatingActionButton(
        // *** 追加する部分 ***
        onPressed: () async {
          // "push"で新規画面に遷移
          // リスト追加画面から渡される値を受け取る
          final newListText = await Navigator.of(context).push(
            MaterialPageRoute(builder: (context) {
              // 遷移先の画面としてリスト追加画面を指定
              return TodoAddPage();
            }),
          );
          if (newListText != null) {
            // キャンセルした場合は newListText が null となるので注意
          }
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
```


### データを元にリスト一覧を表示する

さあ、後少しです頑張りましょう。

リスト追加画面から追加されたリストのデータを受け取ることができたので、  
Todoリストのデータを元にリスト一覧を表示するようにしてみましょう。

ここでも、[状態を持ったWidget](/widgets/state-widget)で紹介したように、  
`StatefulWidget` と `State` を使うことで、Todoリストのデータを元にUIが作れます。

`lib/main.dart` の `TodoListPage` Widget を以下のように書き換えましょう。

解説

ソースコード

```dart
// リスト一覧画面用Widget
class TodoListPage extends StatefulWidget {
  @override
  _TodoListPageState createState() => _TodoListPageState();
}

class _TodoListPageState extends State<TodoListPage> {
  // Todoリストのデータ
  List<String> todoList = [];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // AppBarを表示し、タイトルも設定
      appBar: AppBar(
        title: Text('リスト一覧'),
      ),
      // データを元にListViewを作成
      body: ListView.builder(
        itemCount: todoList.length,
        itemBuilder: (context, index) {
          return Card(
            child: ListTile(
              title: Text(todoList[index]),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          // "push"で新規画面に遷移
          // リスト追加画面から渡される値を受け取る
          final newListText = await Navigator.of(context).push(
            MaterialPageRoute(builder: (context) {
              // 遷移先の画面としてリスト追加画面を指定
              return TodoAddPage();
            }),
          );
          if (newListText != null) {
            // キャンセルした場合は newListText が null となるので注意
            setState(() {
              // リスト追加
              todoList.add(newListText);
            });
          }
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
```


## Todoアプリ完成

お疲れさまでした。  
これでTodoアプリの完成です 🎉

シンプルではありますが、  
動きのあるアプリを作る上での大切な要素を知ることができたと思います。

- 様々なWidgetを使ったUI作成
- 画面遷移
- データの入力
- データの受け渡し
- データを元にUI作成

この他にも、自身で削除機能や更新機能を付け足してみてもらえると  
更に理解が深まるので、ぜひチャレンジして見て下さい 💪💪💪


### ソースコード

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=91d796ea40c2e36c95ee5f34544fa307">
</iframe>


## まとめ

- 画面間のデータの受け渡しは `Navigator` を使う
- Todoアプリ完成
- 機能追加にチャレンジしてみると理解が深まる

次回からは、次のステップに進むためにFirebaseに関して紹介していきます 💪
