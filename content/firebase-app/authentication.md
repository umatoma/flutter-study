---
title: 'Authenticationでログイン'
description: 'チャットアプリにAuthenticationを使ったログイン機能を実装する方法を紹介'
slug: firebase-app-02
---

## このページのゴール

- チャットアプリにログイン機能を実装する
- チャットアプリにログアウト機能を実装する


## チャットアプリ全体像

機能一覧

- ✨ **メールアドレス・パスワードでログインできる** 👈
- ✨ **ログアウトできる** 👈
- ✨ チャットの投稿一覧を表示できる
- ✨ チャットに投稿できる
- ✨ チャットの投稿を削除できる

イメージ図

![](/images/firebase-app/about-firebase-app.svg)

❗️ 注意事項 ❗️

プロジェクト・雛形の作成が終わっていない場合は  
[Firebaseを使ったアプリ概要](/firebase-app/about-firebase-app)のページを確認しましょう。


## ログイン機能を実装する

それでは早速、ログイン機能の実装から始めてみましょう 🤩

[Authentication概要ページ](/firebase/authentication)でも紹介したように、  
FirebaseのAuthenticationを使ってログイン機能を実装していきます。

### Authentication初期設定

[Authentication概要ページ](/firebase/authentication)を参考に、  
`Authenticationの有効化` と `Webアプリ用セットアップ` を行いましょう。


### メールアドレス・パスワードでユーザー登録

まずは、`ログイン用フォーム`を設置し`ユーザー登録`が行えるようにしてみます。  
`lib/main.dart` の `LoginPage` Widget を以下のように書き換えましょう。

解説

- メールアドレス・パスワード入力用のフォームを作成
- メールアドレス・パスワードでユーザー登録
- ユーザー登録に成功したらチャット画面に遷移
- ユーザー登録に失敗したらエラーメッセージを表示
- 内容がよく分からない場合は以下のページをおさらいしてみましょう
    - [状態を持ったWidget](/widgets/state-widget)
    - [Todoリスト追加画面](/todo-app/add-page)
    - [Authentication概要](/firebase/authentication)

スクリーンショット

<table>
    <thead>
        <tr>
            <th>ログイン画面</th>
            <th>Authentication管理画面</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="25%"><img src="/images/firebase-app/chat-app-signup-form.png" /></td>
            <td width="75%"><img src="/images/firebase-app/chat-app-signup-user.png" /></td>
        </tr>
    </tbody>
</table>

ソースコード

```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';

void main() async {
  // 初期化処理を追加
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  runApp(ChatApp());
}

/* --- 省略 --- */

// ログイン画面用Widget
class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  // メッセージ表示用
  String infoText = '';
  // 入力したメールアドレス・パスワード
  String email = '';
  String password = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              // メールアドレス入力
              TextFormField(
                decoration: InputDecoration(labelText: 'メールアドレス'),
                onChanged: (String value) {
                  setState(() {
                    email = value;
                  });
                },
              ),
              // パスワード入力
              TextFormField(
                decoration: InputDecoration(labelText: 'パスワード'),
                obscureText: true,
                onChanged: (String value) {
                  setState(() {
                    password = value;
                  });
                },
              ),
              Container(
                padding: EdgeInsets.all(8),
                // メッセージ表示
                child: Text(infoText),
              ),
              Container(
                width: double.infinity,
                // ユーザー登録ボタン
                child: ElevatedButton(
                  child: Text('ユーザー登録'),
                  onPressed: () async {
                    try {
                      // メール/パスワードでユーザー登録
                      final FirebaseAuth auth = FirebaseAuth.instance;
                      await auth.createUserWithEmailAndPassword(
                        email: email,
                        password: password,
                      );
                      // ユーザー登録に成功した場合
                      // チャット画面に遷移＋ログイン画面を破棄
                      await Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) {
                          return ChatPage();
                        }),
                      );
                    } catch (e) {
                      // ユーザー登録に失敗した場合
                      setState(() {
                        infoText = "登録に失敗しました：${e.toString()}";
                      });
                    }
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

/* --- 省略 --- */

```


### メールアドレス・パスワードでログイン

ユーザー登録ができたので、  
次は登録したメールアドレス・パスワードでログインできるようにしてみます。  
`lib/main.dart` の `_LoginPageState` を以下のように書き換えましょう。

解説

- メールアドレス・パスワードでログイン
- ログインに成功したらチャット画面に遷移
- ログインに失敗したらエラーメッセージを表示

スクリーンショット

<table>
    <thead>
        <tr>
            <th>ログイン画面</th>
            <th>チャット画面</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="50%"><img src="/images/firebase-app/chat-app-login-form.png" /></td>
            <td width="50%"><img src="/images/firebase-app/chat-app-after-login.png" /></td>
        </tr>
    </tbody>
</table>

ソースコード

```dart
class _LoginPageState extends State<LoginPage> {
   /* --- 省略 --- */ 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextFormField( /* --- 省略 --- */ ),
              TextFormField( /* --- 省略 --- */ ),
              Container( /* --- 省略 --- */ ),
              Container( /* --- 省略 --- */ ),
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
                      await auth.signInWithEmailAndPassword(
                        email: email,
                        password: password,
                      );
                      // ログインに成功した場合
                      // チャット画面に遷移＋ログイン画面を破棄
                      await Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) {
                          return ChatPage();
                        }),
                      );
                    } catch (e) {
                      // ログインに失敗した場合
                      setState(() {
                        infoText = "ログインに失敗しました：${e.toString()}";
                      });
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
```


### ユーザー情報を表示

ユーザー登録・ログインができるようになったので、  
次はログインしたユーザーの情報を表示してみます。  
`lib/main.dart` の  `_LoginPageState` と `ChatPage` Widget を以下のように書き換えましょう。

解説

- `ChatPage` の引数からユーザー情報を渡す
- `ChatPage` に渡されたユーザー情報を元にメールアドレスを表示

スクリーンショット

<table>
    <thead>
        <tr>
            <th>ログイン画面</th>
            <th>チャット画面</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="50%"><img src="/images/firebase-app/chat-app-login-form.png" /></td>
            <td width="50%"><img src="/images/firebase-app/chat-app-user-info.png" /></td>
        </tr>
    </tbody>
</table>

ソースコード

```dart
// ログイン画面用Widget
class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  /* --- 省略 --- */

  @override
  Widget build(BuildContext context) {
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
                      // ユーザー登録に成功した場合
                      // チャット画面に遷移＋ログイン画面を破棄
                      await Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) {
                          return ChatPage(result.user!);
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
                      // ログインに成功した場合
                      // チャット画面に遷移＋ログイン画面を破棄
                      await Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) {
                          return ChatPage(result.user!);
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
  // 引数からユーザー情報を受け取れるようにする
  ChatPage(this.user);
  // ユーザー情報
  final User user;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(/* --- 省略 --- */),
      body: Center(
        // ユーザー情報を表示
        child: Text('ログイン情報：${user.email}'),
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
```


## ログアウト機能を実装する

ログイン後にユーザー情報の表示もできましたね 👍  
では、最後にログアウト機能を実装してみます。  
`lib/main.dart` の `ChatPage` Widget を以下のように書き換えましょう。

解説

- `FirebaseAuth.instance.signOut()` でログアウト処理が行える
    - 内部で保持しているログイン情報等が初期化される
    - 現時点ではログアウト時はこの処理を呼び出せばOKと、思うぐらいで大丈夫です

ソースコード

```dart
// チャット画面用Widget
class ChatPage extends StatelessWidget {

  /* --- 省略 --- */

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('チャット'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () async {
              // ログアウト処理
              // 内部で保持しているログイン情報等が初期化される
              // （現時点ではログアウト時はこの処理を呼び出せばOKと、思うぐらいで大丈夫です）
              await FirebaseAuth.instance.signOut();
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
      body: Center(
        // ユーザー情報を表示
        child: Text('ログイン情報：${user.email}'),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () async {
          /* --- 省略 --- */
        },
      ),
    );
  }
}
```

## ログイン機能完成

お疲れさまでした。  
ログイン機能の実装が完成しました 🎉

決して難しいことはなく、  
ログイン機能を実装する際には何を使うか知っていれば良いのです。


## ソースコード

全体のソースコードを確認したい時は [こちら](https://gist.github.com/umatoma/d1fb82d277c159628f044a4c8514d469) からどうぞ。 


## まとめ

- ユーザー登録・ログイン・ログアウト機能を実装した
- Widgetの引数からデータを渡すことができる
- `FirebaseAuth.instance.signOut()` でログアウト処理が行える

次は、Firestoreを使ったチャット機能周りを作り込んでいきましょう 💪💪💪
