---
title: 'Providerで状態管理'
description: 'チャットアプリでProviderを使った状態管理を実装する方法を紹介'
slug: firebase-app-05
---

## このページのゴール

- Providerの概要と使い方を知る
- Providerを使いユーザー情報を管理する


## チャットアプリ全体像

### 機能一覧

- ✨ メールアドレス・パスワードでログインできる
- ✨ ログアウトできる
- ✨ チャットの投稿一覧を表示できる
- ✨ チャットに投稿できる
- ✨ チャットの投稿を削除できる

### イメージ図

![](/images/firebase-app/about-firebase-app.svg)

### ❗️ 注意事項 ❗️

プロジェクト・雛形の作成が終わっていない場合は  
<aa href="/firebase-app/about-firebase-app">Firebaseを使ったアプリ概要</aa>のページを確認しましょう。


## 状態管理

### 状態管理とは

まずは状態管理とは何であるかについて理解していきましょう。

<aa href="/widgets/about-widget">Widgetとは</aa>では、  
Flutterは**Widgetをツリー状に組み合わせUIを実現**することを紹介しましたね。

そして、<aa href="/widgets/state-widget">状態を持ったWidget</aa>では、  
**データを元にUIを作る**仕組みのことを**状態を持つ**と呼ぶことを紹介しましたね。


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
**様々なデータを元にアプリのUIを作っている**のです。

**様々なデータ**のことを**アプリの状態**と呼び、  
その**状態を扱いやすく管理する仕組み**のことを**状態管理**と言うのです。

状態管理を行っていないとデータの扱いが複雑になり、  
プログラムを書くのが大変になってしまうでしょう 😨😨😨

![](/images/provider/app-state.svg)


### Provider

<aa href="/widgets/state-widget">状態を持ったWidget</aa>でも紹介したように、  
`StatefulWidget` と `State` を使えば状態を元にUIを作ることは可能です。

ですが、様々なWidgetが組み合わさったUIになり、  
**状態が複雑になってしまうと、管理しきれなくなってしまう**のです。

そこで、登場するのが `provider` です。

- https://pub.dev/packages/provider

これを使うことで**複雑な状態も簡単に管理することができる**のです。


## Providerの使い方

次は、Providerの基本的な使い方を紹介していきます。

### Providerで出来ること

では、Providerを使うと具体的には何が出来るのでしょうか？

とてもシンプルで**親Widgetから子Widgetにデータを受け渡す**ことが出来るのです。  
データを渡す先は、**子Widgetであれば何処でもOK**です。

![](/images/provider/provider-state.svg)

### データの受け渡し

Providerの基本的なデータの受け渡し方法を確認していきましょう。  
使い方は簡単で、親Widgetと子Widgetでデータの受け渡し用の処理を追加するだけで良いのです。

解説

- 親Widgetで `Provider<T>.value()` を使い**データを渡す**
- 子Widgetで `Provider.of<T>()` を使い**データを受け取る**

ソースコード

```dart
// ChangeNotifierを継承すると変更可能なデータを渡せる
class CountData {
  int count = 0;
}

class ParentWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Provider<T>() で子Widgetにデータを渡す
    // ※ 渡すデータの クラス と <T> は揃えましょう
    return Provider<CountData>.value(
      // 渡すデータ
      create: (context) => CountData(),
      child: Container(
        child: ChildWidget(),
      ),
    );
  }
}

class ChildWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Provider.of<T>(context) で親Widgetからデータを受け取る
    // ※ 受け取るデータの クラス と <T> は揃えましょう
    final CountData data = Provider.of<CountData>(context);

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
  @override
  Widget build(BuildContext context) {
    // Provider<T>() で子Widgetにデータを渡す
    // ※ 渡すデータの クラス と <T> は揃えましょう
    return ChangeNotifierProvider<CountData>(
      // 渡すデータ
      create: (context) => CountData(),
      child: Container(
        child: ChildWidget(),
      ),
    );
  }
}

class ChildWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Provider.of<T>(context) で親Widgetからデータを受け取る
    // ※ 受け取るデータの クラス と <T> は揃えましょう
    final CountData data = Provider.of<CountData>(context);

    return Column(
      children: <Widget>[
        // 受け取ったデータを使いUI作成
        Text('count is ${data.count.toString()}'),
        ElevatedButton(
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


## Providerでユーザー情報を管理する

Providerの仕組みや使い方は理解できたでしょうか 🤔  
それでは、Providerを使いチャットアプリのユーザー情報を管理してみましょう 💪

### Providerをインストール

Providerをインストールしましょう。

- https://pub.dev/packages/provider

作成したFlutterプロジェクトの `pubspec.yaml` を開き、  
`dependencies` に使用するライブラリを追記します。

```yaml
# --- 省略 ---

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.3
  firebase_core: ^1.0.1
  firebase_auth: ^1.0.1
  cloud_firestore: ^1.0.1
  # *** ここを追記 ***
  provider: ^5.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter

# --- 省略 ---
```

VSCodeのFlutterプラグインを使っている場合は、  
ファイルを保存すれば `pubspec.yaml` を元に自動的にライブラリをインストールしてくれるはずです。

もし、上手くインストールしてくれない場合は、以下のコマンドでもインストールできます。

```bash
$ flutter pub get
```

### ユーザー情報を管理する

あと少しです、頑張っていきましょう 💪

Providerを使ってユーザー情報の受け渡しを行いましょう。  
`lib/main.dart` を以下のように書き換えましょう。

解説

- `ChangeNotifierProvider<UserState>.value()` を使い変更可能なデータを渡す
- `Provider.of<UserState>()` でデータを受け取る
- 引数からユーザー情報を渡す処理が不要になった 🤩

ソースコード

```dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// 更新可能なデータ
class UserState extends ChangeNotifier {
  User? user;

  void setUser(User newUser) {
    user = newUser;
    notifyListeners();
  }
}

void main() {
  // 最初に表示するWidget
  runApp(ChatApp());
}

class ChatApp extends StatelessWidget {
  // ユーザーの情報を管理するデータ
  final UserState userState = UserState();

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<UserState>(
      create: (context) => UserState(),
      child: MaterialApp( /* --- 省略 --- */ ),
    );
  }
}

// ログイン画面用Widget
class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  
  /* --- 省略 --- */

  @override
  Widget build(BuildContext context) {
    // ユーザー情報を受け取る
    final UserState userState = Provider.of<UserState>(context);

    return Scaffold(
      body: Center(
        child: Container(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              /* --- 省略 --- */
              Container(
                width: double.infinity,
                // ユーザー登録ボタン
                child: ElevatedButton(
                  child: Text('ユーザー登録'),
                  onPressed: () async {
                    try {
                      // メール/パスワードでユーザー登録
                      final FirebaseAuth auth = FirebaseAuth.instance;
                      final result = await auth.createUserWithEmailAndPassword(
                        email: email,
                        password: password,
                      );
                      // ユーザー情報を更新
                      userState.setUser(result.user!);
                      // ユーザー登録に成功した場合
                      // チャット画面に遷移＋ログイン画面を破棄
                      await Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) {
                          return ChatPage();
                        }),
                      );
                    } catch (e) {
                      /* --- 省略 --- */
                    }
                  },
                ),
              ),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                // ログイン登録ボタン
                child: OutlinedButton(
                  child: Text('ログイン'),
                  onPressed: () async {
                    try {
                      // メール/パスワードでログイン
                      final FirebaseAuth auth = FirebaseAuth.instance;
                      final result = await auth.signInWithEmailAndPassword(
                        email: email,
                        password: password,
                      );
                      // ユーザー情報を更新
                      userState.setUser(result.user!);
                      // ログインに成功した場合
                      // チャット画面に遷移＋ログイン画面を破棄
                      await Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) {
                          return ChatPage();
                        }),
                      );
                    } catch (e) {
                      /* --- 省略 --- */
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// チャット画面用Widget
class ChatPage extends StatelessWidget {
  ChatPage();

  @override
  Widget build(BuildContext context) {
    // ユーザー情報を受け取る
    final UserState userState = Provider.of<UserState>(context);
    final User user = userState.user!;

    return Scaffold(
      /* --- 省略 --- */
      body: Column(
        children: [
          Container(
            padding: EdgeInsets.all(8),
            child: Text('ログイン情報：${user.email}'),
          ),
          Expanded(
            // Stream
            // 非同期処理の結果を元にWidgetを作れる
            child: StreamBuilder<QuerySnapshot>(
              // 投稿メッセージ一覧を取得（非同期処理）
              // 投稿日時でソート
              stream: FirebaseFirestore.instance
                  .collection('posts')
                  .orderBy('date')
                  .snapshots(),
              builder: (context, snapshot) {
                // データが取得できた場合
                if (snapshot.hasData) {
                  final List<DocumentSnapshot> documents = snapshot.data!.docs;
                  // 取得した投稿メッセージ一覧を元にリスト表示
                  return ListView(
                    children: documents.map((document) {
                      return Card(
                        child: ListTile(
                          title: Text(document['text']),
                          subtitle: Text(document['email']),
                          // 自分の投稿メッセージの場合は削除ボタンを表示
                          trailing: document['email'] == user.email
                              ? IconButton(
                                  icon: Icon(Icons.delete),
                                  onPressed: () async {
                                    // 投稿メッセージのドキュメントを削除
                                    await FirebaseFirestore.instance
                                        .collection('posts')
                                        .doc(document.id)
                                        .delete();
                                  },
                                )
                              : null,
                        ),
                      );
                    }).toList(),
                  );
                }
                /* --- 省略 --- */
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () async {
          // 投稿画面に遷移
          await Navigator.of(context).push(
            MaterialPageRoute(builder: (context) {
              return AddPostPage();
            }),
          );
        },
      ),
    );
  }
}

// 投稿画面用Widget
class AddPostPage extends StatefulWidget {
  AddPostPage();

  @override
  _AddPostPageState createState() => _AddPostPageState();
}

class _AddPostPageState extends State<AddPostPage> {
  
  /* --- 省略 --- */

  @override
  Widget build(BuildContext context) {
    // ユーザー情報を受け取る
    final UserState userState = Provider.of<UserState>(context);
    final User user = userState.user!;

    return Scaffold(
      appBar: AppBar(
        title: Text('チャット投稿'),
      ),
      body: Center(
        child: Container(
          padding: EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              /* --- 省略 --- */
              Container(
                width: double.infinity,
                child: ElevatedButton(
                  child: Text('投稿'),
                  onPressed: () async {
                    final date =
                        DateTime.now().toLocal().toIso8601String(); // 現在の日時
                    final email = user.email; // AddPostPage のデータを参照
                    // 投稿メッセージ用ドキュメント作成
                    await FirebaseFirestore.instance
                        .collection('posts') // コレクションID指定
                        .doc() // ドキュメントID自動生成
                        .set({
                      'text': messageText,
                      'email': email,
                      'date': date
                    });
                    // 1つ前の画面に戻る
                    Navigator.of(context).pop();
                  },
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}

```


## チャットアプリ完成

お疲れさまでした。  
これでチャットアプリの完成です 🎉🎉🎉

FirebaseやProviderを使った、  
少しな複雑なアプリを作り上げることができましたね 👍

本格的なアプリを作る上での大切な要素を知ることができたと思います。

- Authenticationを使ったログイン機能
- Firestoreを使ったデータ管理
- Providerを使った状態管理

この他にも、Googleログイン機能やチャットルーム作成機能を付け足してみてもらえると  
更に理解が深まるので、ぜひチャレンジして見て下さい 💪💪💪

### ソースコード

全体のソースコードを確認したい時は [こちら](https://gist.github.com/umatoma/59e2bc2f70c94917f817d9cfedca897e) からどうぞ。 


## 作って学ぶ、FlutterとFirebaseを使ったアプリ開発

FlutterとFirebaseを使ったアプリ開発を、さらにレベルアップするための書籍を公開していますので、よかったらご利用下さい。

- **作って学ぶ、FlutterとFirebaseを使ったアプリ開発**
  - [Zenn](https://zenn.dev/umatoma/books/1f4cb2404f3fa9)
  - [Amazon](https://www.amazon.co.jp/dp/B096T3YMZ3/ref=nosim?tag=flt0c-22)

<p style="max-width: 320px;">
    <img src="/images/banner/book_banner.png" />
</p>


## まとめ

- Providerを使うと状態管理ができる
- チャットアプリ完成
- 機能追加にチャレンジしてみると理解が深まる

次は、Riverpodというパッケージを使った場合の状態管理も試してみます 💪


## 参考情報

- https://pub.dev/packages/provider
