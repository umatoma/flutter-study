---
title: 'Firebaseを使ったアプリ概要'
description: '作成していくFirebaseを使ったアプリの概要を紹介'
slug: firebase-app-01
---

## このページのゴール

- Firebaseを使ったアプリの概要を知る
- Firebaseを使ったアプリの雛形を作成する


## Firebaseを使ったアプリ

ここからは、今まで学んだFlutterとFirebaseの知識をフル活用して  
アプリを作っていきましょう。

まずは、作成するアプリの概要を紹介します。


### アプリ概要

機能一覧

- ✨ メールアドレス・パスワードでログインできる
- ✨ ログアウトできる
- ✨ チャットの投稿一覧を表示できる
- ✨ チャットに投稿できる
- ✨ チャットの投稿を削除できる

画面一覧

- ログイン画面
- チャット画面
- 投稿画面

イメージ図

![](/images/firebase-app/about-firebase-app.svg)

作るアプリのイメージは掴めましたか？ 🤔  
さっそく、プロジェクトの作成から始めましょう 🚀🚀🚀


## Firebase初期設定

### Firebaseプロジェクト作成

今回はFirebaseを使ったアプリの開発になるので、  
<aa href="/firebase/authentication">Authentication概要ページ</aa>を参考に、`Firebaseプロジェクト作成` を行いましょう。

プロジェクト名は `mychatapp` としておきましょう 👀


## アプリの雛形作成

アプリの雛形として、プロジェクトと各画面のベースを作成していきます。

- ログイン画面
- チャット画面
- 投稿画面


### ❗️ 注意事項 ❗️  
AuthenticationやFirestoreの設定が簡単なWebアプリで開発を進めていきます。  
起動するデバイスは `Chrome` を選択して下さい。


### プロジェクト作成

<aa href="/getting-started/run-app/">アプリ起動のページ</aa> で説明したのと同じように、  
まずはアプリ用のプロジェクトを作成しましょう。

```bash
$ flutter create mychatapp
...
In order to run your application, type:

  $ cd mytodoapp
  $ flutter run

Your application code is in mychatapp/lib/main.dart.
```

うまく作成できたでしょうか？  
念の為 VSCode で作成したプロジェクトを開き、Webアプリを起動できることを確認しましょう。  

![](/images/todo-app/todo-app-open-project.png)

![](/images/todo-app/todo-app-run-app.png)


### 各画面を作成

`lib/main.dart`を開き、空の画面を作るため、以下のように書き換えましょう。

解説

- アプリ起動時に最初に表示するWidgetとして `MyChatApp` を指定
- トップ画面に表示するWidgetとして`LoginPage` を指定
- チャット画面 `ChatPage` から ログイン画面 `LoginPage` に遷移できる
- ログイン画面 `LoginPage` から チャット画面 `ChatPage` に遷移できる
- チャット画面 `ChatPage` から 投稿画面 `AddPostPage` に遷移できる
- `pushReplacement()` を使うと現在の画面を破棄して別の画面に遷移できる

スクリーンショット

<table>
    <thead>
        <tr>
            <th>ログイン画面</th>
            <th>チャット画面</th>
            <th>投稿画面</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="33%"><img src="/images/firebase-app/chat-app-login-page.png" /></td>
            <td width="33%"><img src="/images/firebase-app/chat-app-chat-page.png" /></td>
            <td width="33%"><img src="/images/firebase-app/chat-app-add-post-page.png" /></td>
        </tr>
    </tbody>
</table>

ソースコード

```dart
import 'package:flutter/material.dart';

void main() {
  // 最初に表示するWidget
  runApp(ChatApp());
}

class ChatApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // アプリ名
      title: 'ChatApp',
      theme: ThemeData(
        // テーマカラー
        primarySwatch: Colors.blue,
      ),
      // ログイン画面を表示
      home: LoginPage(),
    );
  }
}

// ログイン画面用Widget
class LoginPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            ElevatedButton(
              child: Text('ログイン'),
              onPressed: () async {
                // チャット画面に遷移＋ログイン画面を破棄
                await Navigator.of(context).pushReplacement(
                  MaterialPageRoute(builder: (context) {
                    return ChatPage();
                  }),
                );
              },
            )
          ],
        ),
      ),
    );
  }
}

// チャット画面用Widget
class ChatPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('チャット'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.close),
            onPressed: () async {
              // ログイン画面に遷移＋チャット画面を破棄
              await Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) {
                  return LoginPage();
                }),
              );
            },
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
class AddPostPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('チャット投稿'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('戻る'),
          onPressed: () {
            // 1つ前の画面に戻る
            Navigator.of(context).pop();
          },
        ),
      ),
    );
  }
}
```


### 雛形が作成できました

お疲れさまでした 👏  
これでアプリの雛形作成が完了です。

ほとんどコードを書いていないのに動きのあるアプリが作れましたね 🤩  
Flutterを使うと手軽にアプリが作れることが改めて実感できたんじゃないでしょうか。

この後も、各画面の機能を作り込んでいくので頑張っていきましょう 💪


## まとめ

- AuthenticationやFirestoreを使いチャットアプリを作成していく
- `pushReplacement()` を使うと現在の画面を破棄して別の画面に遷移できる

次は、ログイン機能を作り込んでいきましょう 💪💪💪

