---
title: 'Todoアプリ概要'
description: '作成していくTodoアプリの概要を紹介'
slug: todo-app-01
---

## このページのゴール

- Todoアプリの概要を知る
- Todoアプリの雛形を作成する


## Todoアプリ

ここからは、今までの知識をフル活用してTodoアプリを作っていきましょう。  
まずは、作成するアプリの概要を紹介します。

### アプリ概要

機能一覧

- ✨ Todoリストを追加できる
- ✨ Todoリストを表示できる

画面一覧

- Todoリスト一覧画面（トップ画面）
- Todoリスト追加画面

イメージ図

![](/images/todo-app/about-todo-app.svg)

作るアプリのイメージは掴めましたか？ 🤔  
さっそく、プロジェクトの作成から始めましょう 🚀🚀🚀

## アプリ雛形作成

アプリの雛形として、プロジェクトと各画面のベースを作成していきます。

- プロジェクト作成
- リスト一覧画面（トップ画面）作成
- リスト追加画面作成

### プロジェクト作成

<aa href="/getting-started/run-app/">アプリ起動のページ</aa> で説明したのと同じように、  
まずはTodoアプリ用のプロジェクトを作成しましょう。

```bash
$ flutter create mytodoapp
...
In order to run your application, type:

  $ cd mytodoapp
  $ flutter run

Your application code is in mytodoapp/lib/main.dart.
```

うまく作成できたでしょうか？  
念の為 VSCode で作成したプロジェクトを開き、アプリを起動できることを確認しましょう。  

![](/images/todo-app/todo-app-open-project.png)

![](/images/todo-app/todo-app-run-app.png)

### リスト一覧画面（トップ画面）作成

まずは、`lib/main.dart`を開き、空の画面を作るため、以下のように書き換えましょう。

解説

- アプリ起動時に最初に表示するWidgetとして `MyTodoApp` を指定
- `TodoListPage` を表示することで、リスト一覧画面がトップ画面となる

ソースコード

```dart
import 'package:flutter/material.dart';

void main() {
  // 最初に表示するWidget
  runApp(MyTodoApp());
}

class MyTodoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // アプリ名
      title: 'My Todo App',
      theme: ThemeData(
        // テーマカラー
        primarySwatch: Colors.blue,
      ),
      // リスト一覧画面を表示
      home: TodoListPage(),
    );
  }
}

// リスト一覧画面用Widget
class TodoListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('リスト一覧画面'),
      ),
    );
  }
}
```

この様に表示されていればOKです。

![](/images/todo-app/todo-app-list-page-new.png)


### リスト追加画面作成

次は、2つ目の画面であるリスト追加画面を作ってみましょう。  
`lib/main.dart` を以下のように書き換えましょう。

解説

- リスト追加画面用に `TodoAddPage` Widgetを追加
- リスト一覧画面からリスト追加画面に遷移する処理を追加
- リスト追加画面からリスト一覧画面に戻る処理を追加

ソースコード

```dart
import 'package:flutter/material.dart';

// --- 省略 ---

// リスト一覧画面用Widget
class TodoListPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text('リスト一覧画面'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // "push"で新規画面に遷移
          Navigator.of(context).push(
            MaterialPageRoute(builder: (context) {
              // 遷移先の画面としてリスト追加画面を指定
              return TodoAddPage();
            }),
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}

// リスト追加画面用Widget
class TodoAddPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: TextButton(
          // ボタンをクリックした時の処理
          onPressed: () {
            // "pop"で前の画面に戻る
            Navigator.of(context).pop();
          },
          child: Text('リスト追加画面（クリックで戻る）'),
        ),
      ),
    );
  }
}
```

`Navigator` や `MaterialPageRoute` などの新しいWidgetが登場していますが、  
ここでは、その様に書けば画面遷移ができるということを覚えておいてもらえればOKです 👍

この様に表示されていればOKです。

![](/images/todo-app/todo-app-list-to-add-page.png)

### 雛形が作成できました

お疲れさまでした 👏  
これでTodoアプリの雛形作成が完了です。

ほとんどコードを書いていないのに動きのあるアプリが作れましたね 🤩  
Flutterを使うと手軽にアプリが作れることが何となく実感できたんじゃないでしょうか。

この後も、リスト一覧画面・リスト追加画面を作り込んでいくので頑張って行きましょう 💪

### ソースコード

<iframe
    width="100%"
    height="500px"
    src="https://dartpad.dev/embed-flutter.html?null_safety=true&split=60&theme=dark&run=true&id=c8d4a0dec68b9b56fed8a03ea52a1a47">
</iframe>


## まとめ

- Todoアプリとしてリスト一覧・リスト追加機能を作る
- `Navigator`を使うことで画面遷移ができる

次は、Todoリスト一覧画面を作り込んでいきましょう 💪💪💪


## 参考情報

- https://flutter.dev/docs/cookbook/navigation/navigation-basics
- https://api.flutter.dev/flutter/widgets/Navigator-class.html
- https://api.flutter.dev/flutter/material/MaterialPageRoute-class.html
