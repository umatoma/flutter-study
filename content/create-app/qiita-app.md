---
title: 'Qiita App'
description: 'Flutterを使ったQiitaクライアントアプリの作成方法を紹介'
image: '/images/banner/qiita_app_banner.png'
slug: create-app-06
---

![](/images/banner/qiita_app_banner.png)


## 今回作成するアプリの概要

今回はQiitaクライアントアプリを作ってみたいと思います。  
Qiitaアカウントでログインでき、閲覧に対応したシンプルなアプリです。

それでは早速作っていきましょう💪

### 対応プラットフォーム
- Android
    - サンプルアプリ https://play.google.com/store/apps/details?id=dev.flutterstudy.qiitaapp
- iOS
    - サンプルアプリ 🚧準備中🚧

### 機能一覧
- Qiitaアカウントでログインできる
- 最新の投稿一覧が表示できる
- 投稿内容が表示できる
- ユーザー情報が表示できる

### 画面イメージ

<table>
    <tbody>
        <tr>
            <td width="25%">
                <img src="/images/create-app/qiita-app-screen-1.png" />
            </td>
            <td width="25%">
                <img src="/images/create-app/qiita-app-screen-2.png" />
            </td>
            <td width="25%">
                <img src="/images/create-app/qiita-app-screen-3.png" />
            </td>
            <td width="25%">
                <img src="/images/create-app/qiita-app-screen-4.png" />
            </td>
        </tr>
    </tbody>
</table>


## 設計

まずは、技術的な部分の設計を行っていきましょう。

### Qiita API v2

Qiitaに関する情報を扱うには、公式で提供されている [Qiita API v2](https://qiita.com/api/v2/docs) を利用すればOKです。

認証認可の仕様を確認してみると、API利用時のヘッダーにアクセストークンを含める必要がありますね。  
また、アクセストークンには有効期限がなく、定期的に更新する必要はなさそうです。

よって、ログイン時にアプリ内にアクセストークンを保存し、  
アクセストークンを保持していればログイン済みと判断するような認証状態の管理で十分そうです。

アクセストークンの発行方法も確認してみると、  
Qiitaログイン画面からリダイレクトされたURLにアクセストークン発行コードが含まれていて、  
それをアプリ側で受け取れるようにする必要がありますね。

リダイレクトURLから発行コードをアプリで受け取るための実現方法はいくつかありますが、  
今回は Android の [Deep Link](https://developer.android.com/training/app-links/deep-linking) 、iOS の [Custom URL Scheme](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app) を使って対応したいと思います。

![](/images/create-app/qiita-app-access-token.svg)

### ソフトウェアアーキテクチャ

ある程度、ソフトウェアアーキテクチャの設計も行ってみましょう。

先程の [Qiita API v2](https://qiita.com/api/v2/docs) の内容から、  
アプリ側での認証状態の管理はアクセストークンの有無のみで判断できそうなので、  
今回はProviderを使うようなアプリ全体での状態管理はいらないでしょう。

なので、ソフトウェアアーキテクチャとしては3層に分けたシンプルなもので行きたいと思います。  
RepositoryからWidgetがModelを取得し、そのModelを元にUIを構築するイメージです。

- Widget：UIを描画する
- Model：アプリで利用するデータを扱う
- Repository：APIとのやり取りを行う

![](/images/create-app/qiita-app-architecture.svg)


## Qiitaアプリケーション登録

次に [Qiita API v2](https://qiita.com/api/v2/docs) を使うための設定を行いましょう。

特に難しいことはなく、自身のQiitaアカウントでログインし、  
[アプリケーション設定画面](https://qiita.com/settings/applications)からアプリケーションを登録すればOKです。

「リダイレクト先のURL」に登録する値は、  
Android の [Deep Link](https://developer.android.com/training/app-links/deep-linking) 、iOS の [Custom URL Scheme](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app) に対応する値となります。

紹介するアプリでは `qiitaapp://dev.flutterstudy.qiitaapp/oauth/authorize/callback` としていますが、  
必要に応じて変更してもらってもOKです。

![](/images/create-app/qiita-app-register-app.png)


## 実装

これで実装するための準備が整いました🤩  
それでは順番に進めていきましょう💪

### プロジェクト作成

プロジェクト作成時のオプションとして `--org` を指定することができます。  
これを指定することでアプリ固有のIDを変更することができます。

例：`flutter create qiitaapp --org dev.flutterstudy` → ID `dev.flutterstudy.qiitaapp`

AndroidやiOSのアプリはアプリを識別するための固有のIDをそれぞれ持っていて、  
アプリを公開する際には他のアプリのIDと同じにならないようにする必要があるのです。

なので、❗️自身でアプリを公開する際はIDを別の値に設定❗️して下さい。

```bash
$ flutter create qiitaapp --org dev.flutterstudy
```

### ログイン

次にログイン周りの機能を作っていきましょう。

大まかな処理内容は👇のような感じになります。

1. Qiitaログイン用のURLをWebブラウザで開く
1. リダイレクトURLからアクセストークン発行コードを受け取る
1. アクセストークン発行APIに発行コードを付与してリクエスト
1. アクセストークンを受け取りローカルに保存
1. 投稿一覧画面に遷移

![](/images/create-app/qiita-app-login-flow.svg)

Webブラウザを起動する処理は [url_launcher パッケージ](https://pub.dev/packages/url_launcher) を使うと簡単に実装できます。  
また、APIリクエストを行う処理は [http パッケージ](https://pub.dev/packages/http) を使って実装してみましょう。

ここで、少し難しく感じるのが「リダイレクトURLからアクセストークン発行コードを受け取る」処理でしょう。

Android の [Deep Link](https://developer.android.com/training/app-links/deep-linking) と iOS の [Custom URL Scheme](https://developer.apple.com/documentation/uikit/inter-process_communication/allowing_apps_and_websites_to_link_to_your_content/defining_a_custom_url_scheme_for_your_app) 自体に関する詳細な説明は割愛しますが、  
Qiitaアプリケーション登録の際に設定した「リダイレクト先のURL」でアプリが起動できるように、  
AndroidとiOSそれぞれの設定を追加してあげればOKです。

そして、[uni_links パッケージ](https://pub.dev/packages/uni_links) を使えば  
プログラム上で値を受け取る処理も簡単に実装できます。

android/app/src/main/AndroidManifest.xml
```xml
...
<activity>
    ...
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data
            android:scheme="qiitaapp"
            android:host="dev.flutterstudy.qiitaapp" />
    </intent-filter>
</activity>
...
```

Xcode
![](/images/create-app/qiita-app-ios-custom-scheme-url.png)

👇のソースコードを参考に、実装してみましょう💪

- [lib/screens/sign_in_screen.dart](https://github.com/umatoma/flutter-study-samples/blob/master/qiitaapp/lib/screens/sign_in_screen.dart)


### 最新の投稿一覧

次に最新の投稿一覧周りの機能を作っていきましょう。

[Qiita API v2](https://qiita.com/api/v2/docs) の投稿一覧APIにリクエストする際は、  
保存したアクセストークンを付与するようにしましょう。

以下のように、`Authorization` ヘッダーに付与すればOKですね。
`Authorization: Bearer 1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd`

この投稿一覧APIでは1リクエスト辺りに取得できる件数に限りがあるので、  
投稿一覧のリストが一番下まで到達したら次のページを読み込むようにしてみましょう。

そこで登場するのが、`NotificationListener` と `ScrollNotification` です。  
これらを組み合わせることで `ListView` が一番下までスクロールされたことを検知することが出来るのです。

使い方も簡単で、検知したい `ListView` を `NotificationListener` でラップしてあげればOKです。  
後は `onNotification` で通知を受け取り次ページを読み込めば良いですね。

```dart
NotificationListener<ScrollNotification>(
  onNotification: (notification) {
    if (notification.metrics.extentAfter == 0.0) {
      // 次のページを読み込む
    }
  },
  child: ListView(),
)
```

https://www.youtube.com/watch?v=cAnFbFoGM50

👇のソースコードを参考に、実装してみましょう💪

- [lib/screens/item_list_screen.dart](https://github.com/umatoma/flutter-study-samples/blob/master/qiitaapp/lib/screens/item_list_screen.dart)


### 投稿内容

次に投稿内容周りの機能を作っていきましょう。

[Qiita API v2](https://qiita.com/api/v2/docs) の投稿一覧APIから、  
投稿内容のHTMLが取得できるのでこれを画面に表示すればOKですね。

今回は [flutter_html パッケージ](https://pub.dev/packages/flutter_html) を使ってHTMLを描画してみましょう。

👇のソースコードを参考に、実装してみましょう💪

- [lib/screens/item_screen.dart](https://github.com/umatoma/flutter-study-samples/blob/master/qiitaapp/lib/screens/item_screen.dart)


### プロフィール

次にプロフィール周りの機能を作っていきましょう。

一覧画面のユーザーアイコン・右上のプロフィールメニューをタップしたら  
プロフィール画面に遷移するようにしてみましょう。

👇のソースコードを参考に、実装してみましょう💪

- [lib/screens/user_screen.dart](https://github.com/umatoma/flutter-study-samples/blob/master/qiitaapp/lib/screens/user_screen.dart)


### ログイン状態管理

最後にログイン状態管理周りの機能を作っていきましょう。

まだログアウトする機能が無いので、まずはログアウト機能を実装してみましょう。  
右上のプロフィールアイコンをタップしたら、ログアウトメニューを出すこととしましょう。

設計時に「アクセストークンを保持していればログイン済みと判断する」としましたね。  
なので、ログアウト時には保存しているアクセストークンを削除することとしましょう。  
また、アクセストークンを無効化するAPIも提供されているので、それもリクエストしておきましょう。

そして、アプリが起動する度にログイン画面が出てしまうのは使い勝手が悪いので、  
ログイン済みだったら投稿一覧画面を表示し、  
未ログインだったらログイン画面を表示するようにしてみましょう。

これは、アプリ起動時にアクセストークンを保持していたら投稿一覧画面を表示し、  
アクセストークンを保持していなかったらログイン画面を表示するようにすればOKですね。

👇のソースコードを参考に、実装してみましょう💪

- [lib/main.dart](https://github.com/umatoma/flutter-study-samples/blob/master/qiitaapp/lib/main.dart)


## お疲れさまでした

アプリは無事作成できたでしょうか？  
この他にも様々なアプリを作ってみて、Flutterで本格的なアプリが開発できるように頑張りましょう 💪

- <aa href="/create-app/top">アプリを作ってみる</aa>


### ソースコード

- [qiitaapp](https://github.com/umatoma/flutter-study-samples/tree/master/qiitaapp)

