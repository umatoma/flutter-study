---
title: 'Riverpodで状態管理'
description: 'チャットアプリでRiverpodを使った状態管理を実装する方法を紹介'
next: host-web-app/hosting
slug: firebase-app-06
---

## このページのゴール

- Riverpodの概要と使い方を知る
- Riverpodを使いユーザー情報を管理する


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
[Firebaseを使ったアプリ概要](/firebase-app/about-firebase-app)のページを確認しましょう。


## 状態管理

### 状態管理とは

まずは状態管理とは何であるかについて理解していきましょう。

[Widgetとは](/widgets/about-widget)では、  
Flutterは**Widgetをツリー状に組み合わせUIを実現**することを紹介しましたね。

そして、[状態を持ったWidget](/widgets/state-widget)では、  
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


### Riverpod

[状態を持ったWidget](/widgets/state-widget)でも紹介したように、  
`StatefulWidget` と `State` を使えば状態を元にUIを作ることは可能です。

ですが、様々なWidgetが組み合わさったUIになり、  
**状態が複雑になってしまうと、管理しきれなくなってしまう**のです。

そこで、登場するのが `riverpod` です。

- https://pub.dev/packages/flutter_riverpod

これを使うことで**複雑な状態も簡単に管理することができる**のです。


## Riverpodの使い方

次は、Riverpodの基本的な使い方を紹介していきます。

### Riverpodで出来ること

では、Riverpodを使うと具体的には何が出来るのでしょうか？

とてもシンプルで**任意のWidgetにデータを受け渡す**ことが出来るのです。  

![](/images/firebase-app/riverpod-state.svg)

### データの受け渡し

基本的なデータの受け渡し方法を確認していきましょう。  
使い方は簡単で、親Widgetと子Widgetでデータの受け渡し用の処理を追加するだけで良いのです。

解説

- 最初のWidgetを `ProviderScope()` の子Widgetとし、データの受け渡しが可能な状態にする
- `StateProvider` を使い**受け渡すデータを定義する**
- `ConsumerWidget` を使い**データを受け取る**

ソースコード

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// StateProviderを使い受け渡すデータを定義する
// ※ Providerの種類は複数あるが、ここではデータを更新できるStateProviderを使う
final countProvider = StateProvider((ref) {
  return 0;
});

void main() {
  runApp(
    // Riverpodでデータを受け渡しが可能な状態にするために必要
    ProviderScope(
      child: MaterialApp(
        title: 'Flutter Demo',
        home: MyWidget(),
      ),
    ),
  );
}

// ConsumerWidgetを使うとbuild()からデータを受け取る事ができる
class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, ScopedReader watch) {
    // watch()を使いデータを受け取る
    // 値は.stateに入っている
    final count = watch(countProvider).state;

    return Scaffold(
      body: Center(
        child: Text('count is $count'),
      ),
    );
  }
}
```

### 受け渡すデータを更新する

受け渡すデータを更新する方法も確認していきましょう。

こちらも難しいことはなく、  
`context.read(countProvider).state` に更新したい値を代入すればOKです。

解説

- `context.read(countProvider).state += 1;` の様に更新したい値を代入すればOK
- 更新された値は自動的に反映される

ソースコード

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final countProvider = StateProvider((ref) {
  return 0;
});

void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: SampleWidget(),
    );
  }
}

class SampleWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, ScopedReader watch) {
    // 値が更新されたら自動的に反映される
    final count = watch(countProvider).state;

    return Scaffold(
      body: Center(
        child: Text('count is $count'),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // context.read(countProvider).state に値を代入することで更新できる
          // また、ボタンタップ時などは context.read() を使うことで無駄な再描画を減らせる
          context.read(countProvider).state += 1;
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
```

### riverpodとproviderどちらを使ったほうが良いのか？

1つ前で紹介した `provider` でも状態管理を行うことができます。  
では、どちらのパッケージを使って状態管理を行ったほうが良いのでしょうか 🤔

`provider`, `riverpod` 共に同じ方がメインで開発しているパッケージです。  
また、`riverpod` は `provider` の課題点を解消した後継となるパッケージでもあります。

ですので、今後は `riverpod` を採用しておいたほうが良いかもしれません。  
※ `provider` を採用すること自体に問題はないので、`provider`の方が使いやすければそのまま使い続けてもOKです 👍


## Riverpodでユーザー情報を管理する

Riverpodの仕組みや使い方は理解できたでしょうか 🤔  
それでは、Riverpodを使いチャットアプリのユーザー情報を管理してみましょう 💪

### Riverpodをインストール

Riverpodをインストールしましょう。

- https://pub.dev/packages/flutter_riverpod

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
  flutter_riverpod: ^0.14.0+3

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

### ユーザー情報・入力情報・エラー情報を管理する

あと少しです、頑張っていきましょう 💪

Riverpodを使ってユーザー情報の受け渡しを行いましょう。  
`lib/main.dart` を以下のように書き換えましょう。

解説

- `StateProvider` を使い変更可能なデータを渡す
- `StreamProvider` を使いStreamも扱うことができる
- `.autoDispose` を付けることで値を自動的にリセットできる
- 引数からユーザー情報を渡す処理が不要になった 🤩

ソースコード

```dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// ユーザー情報の受け渡しを行うためのProvider
final userProvider = StateProvider((ref) {
  return FirebaseAuth.instance.currentUser;
});

// エラー情報の受け渡しを行うためのProvider
// ※ autoDisposeを付けることで自動的に値をリセットできます
final infoTextProvider = StateProvider.autoDispose((ref) {
  return '';
});

// メールアドレスの受け渡しを行うためのProvider
// ※ autoDisposeを付けることで自動的に値をリセットできます
final emailProvider = StateProvider.autoDispose((ref) {
  return '';
});

// パスワードの受け渡しを行うためのProvider
// ※ autoDisposeを付けることで自動的に値をリセットできます
final passwordProvider = StateProvider.autoDispose((ref) {
  return '';
});

// メッセージの受け渡しを行うためのProvider
// ※ autoDisposeを付けることで自動的に値をリセットできます
final messageTextProvider = StateProvider.autoDispose((ref) {
  return '';
});

// StreamProviderを使うことでStreamも扱うことができる
// ※ autoDisposeを付けることで自動的に値をリセットできます
final postsQueryProvider = StreamProvider.autoDispose((ref) {
  return FirebaseFirestore.instance
      .collection('posts')
      .orderBy('date')
      .snapshots();
});

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();

  runApp(
    // Riverpodでデータを受け渡しできる状態にする
    ProviderScope(
      child: ChatApp(),
    ),
  );
}

class ChatApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ChatApp',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginPage(),
    );
  }
}

// ConsumerWidgetでProviderから値を受け渡す
class LoginPage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, ScopedReader watch) {
    // Providerから値を受け取る
    final infoText = watch(infoTextProvider).state;
    final email = watch(emailProvider).state;
    final password = watch(passwordProvider).state;

    return Scaffold(
      body: Center(
        child: Container(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextFormField(
                decoration: InputDecoration(labelText: 'メールアドレス'),
                onChanged: (String value) {
                  // Providerから値を更新
                  context.read(emailProvider).state = value;
                },
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'パスワード'),
                obscureText: true,
                onChanged: (String value) {
                  // Providerから値を更新
                  context.read(passwordProvider).state = value;
                },
              ),
              Container(
                padding: EdgeInsets.all(8),
                child: Text(infoText),
              ),
              Container(
                width: double.infinity,
                child: ElevatedButton(
                  child: Text('ユーザー登録'),
                  onPressed: () async {
                    try {
                      final FirebaseAuth auth = FirebaseAuth.instance;
                      final result = await auth.createUserWithEmailAndPassword(
                        email: email,
                        password: password,
                      );
                      // ユーザー情報を更新
                      context.read(userProvider).state = result.user;

                      await Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) {
                          return ChatPage();
                        }),
                      );
                    } catch (e) {
                      // Providerから値を更新
                      context.read(infoTextProvider).state =
                          "登録に失敗しました：${e.toString()}";
                    }
                  },
                ),
              ),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                child: OutlinedButton(
                  child: Text('ログイン'),
                  onPressed: () async {
                    try {
                      final FirebaseAuth auth = FirebaseAuth.instance;
                      await auth.signInWithEmailAndPassword(
                        email: email,
                        password: password,
                      );
                      await Navigator.of(context).pushReplacement(
                        MaterialPageRoute(builder: (context) {
                          return ChatPage();
                        }),
                      );
                    } catch (e) {
                      // Providerから値を更新
                      context.read(infoTextProvider).state =
                          "ログインに失敗しました：${e.toString()}";
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

// ConsumerWidgetでProviderから値を受け渡す
class ChatPage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, ScopedReader watch) {
    // Providerから値を受け取る
    final User user = watch(userProvider).state!;
    final AsyncValue<QuerySnapshot> asyncPostsQuery = watch(postsQueryProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('チャット'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.close),
            onPressed: () async {
              await FirebaseAuth.instance.signOut();
              await Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (context) {
                  return LoginPage();
                }),
              );
            },
          ),
        ],
      ),
      body: Column(
        children: [
          Container(
            padding: EdgeInsets.all(8),
            child: Text('ログイン情報：${user.email}'),
          ),
          Expanded(
            // StreamProviderから受け取った値は .when() で状態に応じて出し分けできる
            child: asyncPostsQuery.when(
              // 値が取得できたとき
              data: (QuerySnapshot query) {
                return ListView(
                  children: query.docs.map((document) {
                    return Card(
                      child: ListTile(
                        title: Text(document['text']),
                        subtitle: Text(document['email']),
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
              },
              // 値が読込中のとき
              loading: () {
                return Center(
                  child: Text('読込中...'),
                );
              },
              // 値の取得に失敗したとき
              error: (e, stackTrace) {
                return Center(
                  child: Text(e.toString()),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () async {
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

// ConsumerWidgetでProviderから値を受け渡す
class AddPostPage extends ConsumerWidget {
  @override
  Widget build(BuildContext context, ScopedReader watch) {
    // Providerから値を受け取る
    final user = watch(userProvider).state!;
    final messageText = watch(messageTextProvider).state;

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
              TextFormField(
                decoration: InputDecoration(labelText: '投稿メッセージ'),
                keyboardType: TextInputType.multiline,
                maxLines: 3,
                onChanged: (String value) {
                  // Providerから値を更新
                  context.read(messageTextProvider).state = value;
                },
              ),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                child: ElevatedButton(
                  child: Text('投稿'),
                  onPressed: () async {
                    final date = DateTime.now().toLocal().toIso8601String();
                    final email = user.email;
                    await FirebaseFirestore.instance
                        .collection('posts')
                        .doc()
                        .set({
                      'text': messageText,
                      'email': email,
                      'date': date
                    });
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


## Riverpodを使った状態管理

お疲れさまでした。  
これでRiverpodを使った状態管理は完了です 🎉🎉🎉

Providerに続きRiverpodでも状態管理を行うことができるようになりましたね 👍


## 入門 Riverpod

より詳しくRiverpodを使った状態管理を理解するための書籍を公開していますので、よかったらご利用下さい。

- **入門 Riverpod**
  - [Zenn](https://zenn.dev/umatoma/books/bd010486772aff)
  - [Amazon](https://www.amazon.co.jp/dp/B09754L28H/ref=nosim?tag=flt0c-22)

<p style="max-width: 320px;">
    <img src="/images/banner/book_riverpod_banner.png" />
</p>


## まとめ

- Riverpodを使って状態管理ができる

次回からは、今回作ったチャットアプリをWebアプリとして公開する方法を紹介していきます 💪💪💪


## 参考情報

- https://pub.dev/packages/provider
