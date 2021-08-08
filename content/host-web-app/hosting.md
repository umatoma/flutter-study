---
title: 'Hosting概要'
description: 'Hostingの概要や使い方を紹介'
slug: host-web-app-01
---

## このページのゴール

- Firebase Hostingの概要と使い方を知る


## Firebase Hosting

![](/images/firebase/firebase-hosting-logo.svg)

### Hostingとは

Hosting は  
**Webアプリを配信**するための機能を提供するものです ✨

Webアプリを簡単にデプロイし、  
素早くWebアプリを公開することができます。


## Firebaseプロジェクト作成・設定

### Firebase プロジェクト作成

HostingはFirebaseの機能の１つです。  
まずは、Firebaseのプロジェクトを作成しHostingが使える状態にしましょう。

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


### Hostingの機能を有効化

プロジェクトが作成できたら、次はHostingの機能を有効化してみましょう。

<table>
    <tbody>
        <tr>
            <td>
                サイドナビの「開発 → Hosting」を選択<br/>
                「始める」を選択
            </td>
            <td width="50%"><img src="/images/host-web-app/hosting-setup-1.png" /></td>
        </tr>
        <tr>
            <td>
                コマンドラインツールをインストール<br/>
                インストールが完了したら「次へ」を選択<br/>
                <br/>
                <code className="language-bash">
                    npm install -g firebase-tools
                </code>
                <br/>
                ❗️npmが使えない場合❗️<br/>
                <br/>
                <code className="language-bash">
                    curl -sL firebase.tools | bash
                </code>
            </td>
            <td width="50%"><img src="/images/host-web-app/hosting-setup-2.png" /></td>
        </tr>
        <tr>
            <td>
                コマンドラインツールを使って<br/>
                プロジェクトの初期設定を行います
            </td>
            <td width="50%"><img src="/images/host-web-app/hosting-setup-3.png" /></td>
        </tr>
        <tr>
            <td>
                ログイン用のコマンドを実行すると<br/>
                認証画面が表示されるので、<br/>
                アカウントを選択しログイン<br/>
                <br/>
                <code className="language-bash">
                    firebase login
                </code>
            </td>
            <td width="50%">
                <img src="/images/host-web-app/hosting-setup-4-1.png" /><br/>
                <img src="/images/host-web-app/hosting-setup-4-2.png" /><br/>
                <img src="/images/host-web-app/hosting-setup-4-3.png" /><br/>
                <img src="/images/host-web-app/hosting-setup-4-4.png" /><br/>
            </td>
        </tr>
        <tr>
            <td>
                <strong>作成したプロジェクトのディレクトリに移動</strong>し<br/>
                プロジェクト開始用のコマンドを実行<br/>
                <br/>
                <code className="language-bash">
                    firebase init
                </code>
                <br/>
                ガイドに従って情報を選択・入力していく<br/>
                <br/>
                <ul>
                    <li>「Hosting」を選択しEnter</li>
                    <li>「Use an existing project」を選択しEnter</li>
                    <li>使用するプロジェクトを選択しEnter</li>
                    <li>「? What do you want to use as your public directory?」に 「build/web」 を入力</li>
                    <li>「? Configure as a single-page app (rewrite all urls to /index.html)?」に 「N」 を入力</li>
                </ul>
            </td>
            <td width="50%"><img src="/images/host-web-app/hosting-setup-5.png" /></td>
        </tr>
        <tr>
            <td>
                プロジェクトの初期設定が完了したら<br/>
                「次へ」を選択
            </td>
            <td width="50%"><img src="/images/host-web-app/hosting-setup-6.png" /></td>
        </tr>
        <tr>
            <td>
                ここでの作業は一旦スキップして<br/>
                「コンソールに進む」を選択
            </td>
            <td width="50%"><img src="/images/host-web-app/hosting-setup-7.png" /></td>
        </tr>
        <tr>
            <td>Hosting機能が使えるようになりました 🎉🎉🎉</td>
            <td width="50%"><img src="/images/host-web-app/hosting-setup-8.png" /></td>
        </tr>
    </tbody>
</table>


## Flutterプロジェクト作成・設定

無事、Hostingを使うための準備はできたでしょうか？  
次は、Flutter側の準備も進めていきましょう。


### Flutterプロジェクト作成

<aa href="/getting-started/run-app">アプリ起動のページ</aa>で紹介したのと同じ様に、  
Flutterのプロジェクトを作成し開発できる状態にしましょう。

```bash
$ flutter create myapp
```


### Webアプリ用セットアップ

Hostingの機能のみを使用する場合は特に設定は必要ありません。

**AuthenticataionやCloud Firestoreを使う場合**は、  
以前紹介した方法で**設定を行う必要がある**ので注意しましょう 👀

- <aa href="/firebase/authentication">Authentication概要</aa>
- <aa href="/firebase/cloud-firestore-try">Cloud Firestoreを使ってみる</aa>


## HostingでWebアプリを公開してみる

Hostingを使ってWebアプリを公開してみましょう。

### Webアプリをビルドする

Hostingにアップロードするためのファイルを生成します。  
`./build/web/` ディレクトリにファイルが生成されていればOKです。

```bash
$ flutter build web
Downloading Web SDK...                                              1.2s
Running "flutter pub get" in myapp...                               0.3s
Compiling lib/main.dart for the Web...                             16.8s

$ ls ./build/web/
assets                    flutter_service_worker.js index.html                main.dart.js.map
favicon.png               icons                     main.dart.js              manifest.json
```

### Webアプリをアップロードする

次に生成したWebアプリのファイルをHostingにアップロードします。  
インストールしたコマンドラインツールを使って行います。

```bash
$ firebase deploy

=== Deploying to 'myapp-xxxxx'...

i  deploying hosting
i  hosting[myapp-xxxxx]: beginning deploy...
i  hosting[myapp-xxxxx]: found 13 files in build/web
✔  hosting[myapp-xxxxx]: file upload complete
i  hosting[myapp-xxxxx]: finalizing version...
✔  hosting[myapp-xxxxx]: version finalized
i  hosting[myapp-xxxxx]: releasing new version...
✔  hosting[myapp-xxxxx]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/myapp-xxxxx/overview
Hosting URL: https://myapp-xxxxx.firebaseapp.com
```

### Webアプリを開く

アップロードした時にWebアプリのURLが表示されていますね。  
`Hosting URL: https://myapp-xxxxx.firebaseapp.com`

そのURLを開くと、Webアプリが公開されてますね 🎉🎉🎉

![](/images/host-web-app/hosting-web-app-url.png)

URLが分からなくなってしまった時は、  
Hostingの管理画面から確認しましょう。

![](/images/host-web-app/hosting-web-app-console.png)


## まとめ

- HostingはWebアプリを配信するための機能を提供するもの
- Hostingを使う際は事前に設定を行う必要がある
- コマンドラインツールを使い簡単にWebアプリを公開できる

次回は、Hostingを使って以前作ったチャットアプリを  
Webアプリとして公開してみましょう 💪💪💪
