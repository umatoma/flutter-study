---
title: 'Cloud Firestore概要'
description: 'Cloud Firestoreの概要を紹介'
slug: firebase-03
---

## このページのゴール

- Cloud Firestoreの概要を知る
- Cloud Firestoreの設定を行う
- Cloud Firestoreの仕組みを知る


## Cloud Firestore

![](/images/firebase/cloud-firestore-logo.svg)


### Cloud Firestoreとは

Cloud Firestore は  
**アプリのデータを保存・同期**する仕組みを提供するデータベースです ✨

アプリのデータを簡単に保存・取得したり、  
複数の端末でデータを同期する機能が簡単に作れます。


## Firebaseプロジェクト作成・設定

### Firebase プロジェクト作成

Cloud FirestoreはFirebaseの機能の１つです。  
まずは、Firebaseのプロジェクトを作成しCloud Firestoreが使える状態にしましょう。

<table>
    <tbody>
        <tr>
            <td><a href="https://console.firebase.google.com/" target="_blank">Firebaseコンソール</a>からプロジェクト作成</td>
            <td width="50%"><img src="/images/firebase/firebase-project-create-1.png" /></td>
        </tr>
        <tr>
            <td>プロジェクト名を入力し続行</td>
            <td width="50%"><img src="/images/firebase/firebase-project-create-2.png" /></td>
        </tr>
        <tr>
            <td>続行</td>
            <td width="50%"><img src="/images/firebase/firebase-project-create-3.png" /></td>
        </tr>
        <tr>
            <td>地域と利用規約を確認しプロジェクト作成</td>
            <td width="50%"><img src="/images/firebase/firebase-project-create-4.png" /></td>
        </tr>
        <tr>
            <td>準備ができたら続行</td>
            <td width="50%"><img src="/images/firebase/firebase-project-create-6.png" /></td>
        </tr>
        <tr>
            <td>プロジェクトが作成できました 🎉🎉🎉</td>
            <td width="50%"><img src="/images/firebase/firebase-project-create-7.png" /></td>
        </tr>
    </tbody>
</table>


### Cloud Firestoreの機能を有効化

プロジェクトが作成できたら、次はCloud Firestoreの機能を有効化してみましょう。  
ここでは、アクセス制限の無いテストモードで設定してみます。

<table>
    <tbody>
        <tr>
            <td>サイドナビの「開発 → Database」を選択</td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-setup-1.png" /></td>
        </tr>
        <tr>
            <td>「データベースの作成」を選択</td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-setup-2.png" /></td>
        </tr>
        <tr>
            <td>
                「テストモードで開始」を選択し次へ<br/>
                <br/>
                ❗️注意事項❗️<br/>
                今回は試すことが目的なので、<br/>
                アクセス制限の無いテストモードを選択しています。
            </td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-setup-3.png" /></td>
        </tr>
        <tr>
            <td>
                ロケーション「asia-northeast1」を選択し完了<br/>
            </td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-setup-4.png" /></td>
        </tr>
        <tr>
            <td>Cloud Firestoreが使えるようになりました 🎉🎉🎉</td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-setup-5.png" /></td>
        </tr>
    </tbody>
</table>


## Cloud Firestoreの仕組み

Cloud Firestoreはデータベースです。

他のデータベースでも同じことですが、  
専用の形式（データモデル）に従ってデータを保存する必要があります。

実装を始める前に  
Cloud Firestoreのデータモデルに関して紹介していきます 💪


### データモデル

Cloud Firestoreでデータを保存する時は、大きく３つの要素を指定することになります。

1. データ
    - フィールドと値のペアを複数持っている（オブジェクト）
1. ドキュメント
    - 1つの`データ`を持っている
    - ドキュメントのIDを指定する必要がある
1. コレクション
    - 複数の`ドキュメント`を持っている
    - コレクションのIDを指定する必要がある

文章で書くと少し難しく感じますが、図で表すとこんな感じになります。  
ツリー構造状にデータを保存できるんですね 👀

![](/images/firebase/cloud-firestore-data-model.svg)


### 管理画面からデータを作成してみる

実際に試したほうが理解が深まると思うので、  
次のような構造のデータをFirestoreの管理画面から作成してみましょう 💪

```text
コレクション:users
  |
  ├- ドキュメント:id_abc
  |    |
  |    ├- データ:{name: "山田", age: 20}
  |    |
  |    └- サブコレクション:orders
  |         |
  |         ├- ドキュメント:id_123
  |         |    |
  |         |    └- データ:{price: 500, date: "2/15"}
  |         |
  |         └- ドキュメント:id_456
  |              |
  |              └- データ:{price: 300, date: "5/10"}
  |
  └- ドキュメント:id_def
       |
       └- データ:{name: "佐藤", age: 30}
```

<table>
    <tbody>
        <tr>
            <td>
                Firestoreの管理画面を開き<br/>
                「コレクションを開始」を選択
            </td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-test-data-01.png" /></td>
        </tr>
        <tr>
            <td>
                コレクションIDに「users」を入力し次へ<br/>
                <br/>
                ドキュメントIDに「id_abc」を入力<br/>
                フィールド「name」と「age」を追加し保存
            </td>
            <td width="50%">
                <img src="/images/firebase/cloud-firestore-test-data-02.png" /><br/>
                <img src="/images/firebase/cloud-firestore-test-data-03.png" />
            </td>
        </tr>
        <tr>
            <td>
                コレクション「users」と<br/>
                ドキュメント「id_abc」が作成できました 🎉<br/>
                <br/>
                もう一つドキュメントを追加してみます。<br/>
                「ドキュメントを追加」を選択
            </td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-test-data-04.png" /></td>
        </tr>
        <tr>
            <td>
                ドキュメントIDとフィールドを入力し保存<br/>
                <br/>
                コレクション「users」の中に<br/>
                2つのドキュメントが作成できました 🎉
            </td>
            <td width="50%">
                <img src="/images/firebase/cloud-firestore-test-data-05.png" /><br/>
                <img src="/images/firebase/cloud-firestore-test-data-06.png" />
            </td>
        </tr>
        <tr>
            <td>
                次は、ドキュメント「id_abc」の<br/>
                サブコレクションを作ります。<br/>
                <br/>
                「コレクションを開始」を選択
            </td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-test-data-07.png" /></td>
        </tr>
        <tr>
            <td>
                先ほどと同じ様に<br/>
                コレクションID・ドキュメントID・フィールドを<br/>
                入力し保存
            </td>
            <td width="50%">
                <img src="/images/firebase/cloud-firestore-test-data-08.png" /><br/>
                <img src="/images/firebase/cloud-firestore-test-data-09.png" />
            </td>
        </tr>
        <tr>
            <td>
                サブコレクション「orders」の中に<br/>
                もう1つドキュメントを追加
            </td>
            <td width="50%">
                <img src="/images/firebase/cloud-firestore-test-data-10.png" /><br/>
                <img src="/images/firebase/cloud-firestore-test-data-11.png" />
            </td>
        </tr>
        <tr>
            <td>
                完成です 🎉🎉🎉
            </td>
            <td width="50%"><img src="/images/firebase/cloud-firestore-test-data-12.png" /></td>
        </tr>
    </tbody>
</table>


## まとめ

- Cloud Firestoreはアプリのデータを保存・同期する仕組みを提供するデータベース
- Cloud Firestoreを使う際は事前に設定を行う必要がある
- Cloud Firestoreのデータモデルはデータ・ドキュメント・コレクションで成り立っている

次回は、Cloud Firestoreを実際に使って  
保存・取得・更新・削除の処理を実装していきます 💪💪💪


## 参考情報

- https://firebase.google.com/docs/firestore?hl=ja
- https://firebase.google.com/docs/firestore/data-model?hl=ja