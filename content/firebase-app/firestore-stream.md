---
title: 'Firestoreでリアルタイム更新'
description: 'チャットアプリにFirestoreを使ったリアルタイム更新機能を実装する方法を紹介'
slug: firebase-app-04
---

## このページのゴール

- チャットアプリで投稿一覧をリアルタイム更新できるようにする


## チャットアプリ全体像

### 機能一覧

- ✨ メールアドレス・パスワードでログインできる
- ✨ ログアウトできる
- ✨ **チャットの投稿一覧を表示できる** 👈
- ✨ チャットに投稿できる
- ✨ チャットの投稿を削除できる

### イメージ図

![](/images/firebase-app/about-firebase-app.svg)

### ❗️ 注意事項 ❗️

プロジェクト・雛形の作成が終わっていない場合は  
[Firebaseを使ったアプリ概要](/firebase-app/about-firebase-app)のページを確認しましょう。


## Firestoreリアルタイム更新

### リアルタイム更新とは

Firestoreでは指定したドキュメント・ドキュメント一覧の変更を検知し、  
**リアルタイムに情報を更新できる機能**があるのです。

イメージとしては、こんな感じ👇です。  
**メッセージを投稿すると、自動的に投稿一覧を最新の情報に更新**できるのです。

![](/images/firebase-app/chat-app-firestore-stream.svg)


## 投稿一覧をリアルタイム更新

前回実装したチャット機能の以下2つを改善してみましょう。

- メッセージを投稿した後に、画面に表示されないの
- 削除ボタンを押した後に、画面から消えない


### リアルタイム更新機能を使うには

では、どのようにすればリアルタイム更新を実装できるのでしょうか？  
方法は簡単で **`getDocuments()` の代わりに `snapshots()` を使えばよい**のです。

```dart
// 今まで使ってた方法
final Future<QuerySnapshot> future =
    Firestore.instance.collection('posts').get()

// リアルタイム更新を使う方法
final Stream<QuerySnapshot> stream =
    Firestore.instance.collection('posts').snapshots()
```

あまり違いがないように見えますが、それぞれ**返ってくる値の型が異なっています**ね。  
なので、その型にあわせて **`FutureBuilder` ではなく `StreamBuilder` を使う**ことになります。

```dart
FutureBuilder<QuerySnapshot>(
    future: Firestore.instance.collection('posts').get(),
    builder: (context, snapshot) { /* ListView作成 */ }
)

StreamBuilder<QuerySnapshot>(
    stream: Firestore.instance.collection('posts').snapshots(),
    builder: (context, snapshot) { /* この中は同じ */ }
)
```

### リアルタイム更新機能を使ってみる

リアルタイム更新機能の使い方は理解できましたか？  
それでは早速、リアルタイム更新機能を使って実装を改善してみましょう。

`lib/main.dart` の `ChatPage` Widgetを以下のように書き換えましょう。

解説

- `getDocuments()` の代わりに `snapshots()` を使う
- メッセージを投稿したり削除したりすると、投稿一覧も更新される

ソースコード

```dart
// チャット画面用Widget
class ChatPage extends StatelessWidget {
  /* --- 省略 --- */
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar( /* --- 省略 --- */ ),
      body: Column(
        children: <Widget>[
          Container( /* --- 省略 --- */ ),
          Expanded(
            // StreamBuilder
            // 非同期処理の結果を元にWidgetを作れる
            child: StreamBuilder<QuerySnapshot>(
              // 投稿メッセージ一覧を取得（非同期処理）
              // 投稿日時でソート
              stream: FirebaseFirestore.instance
                  .collection('posts')
                  .orderBy('date')
                  .snapshots(),
              builder: (context, snapshot) { /* --- 省略 --- */ },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton( /* --- 省略 --- */ ),
    );
  }
}
```

### チャット機能が改善できました

お疲れさまでした 🎉  
Firestoreのリアルタイム更新機能を使って機能の改善ができましたね ✨

次回は、`Provider` と呼ばれるライブラリを使って、  
アプリケーション全体で使用するデータを効率的に扱う方法を紹介していきます。


## まとめ

- Firestoreのリアルタイム更新機能を使うとドキュメントの変更を検知できる
- 投稿一覧をリアルタイムに更新できるようにした

さあ、次回で最後です頑張っていきましょう 💪💪💪
