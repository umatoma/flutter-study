---
title: 'HostingでWebアプリ公開'
description: 'Hostingのを使ってチャットアプリを公開する方法を紹介'
slug: host-web-app-02
---

## このページのゴール

- Firebase Hostingを使ってチャットアプリを公開する


## チャットアプリ

Firebaseを使ったアプリのページでチャットアプリを作りましたね。

- <aa href="/firebase-app/about-firebase-app">Firebaseを使ったアプリ概要</aa>
- <aa href="/firebase-app/authentication">Authenticationでログイン</aa>
- <aa href="/firebase-app/firestore">Firestoreでデータ保存</aa>
- <aa href="/firebase-app/firestore-stream">Firestoreでリアルタイム更新</aa>
- <aa href="/firebase-app/provider">Providerで状態管理</aa>

ここでは、作成したチャットアプリを  
HostingでWebアプリとして公開してみましょう 💪


## HostingでWebアプリを公開する

### Hosting初期設定

<aa href="/host-web-app/hosting">Hosting概要ページ</aa>を参考に、  
`Hostingの機能を有効化`を行いましょう。

❗️注意事項❗️  
**チャットアプリと紐付いているプロジェクト**を選択するように注意しましょう。


### Webアプリをビルドする

Hostingにアップロードするためのファイルを生成します。  
`./build/web/` ディレクトリにファイルが生成されていればOKです。

```bash
$ flutter build web
Downloading Web SDK...                                              1.2s
Running "flutter pub get" in myapp...                               0.5s
Compiling lib/main.dart for the Web...                             20.9s

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

### Webアプリが公開できました

これで作成したチャットアプリを  
Webアプリとして公開することができましたね 🎉🎉🎉

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
            <td width="33%"><img src="/images/host-web-app/host-web-app-1.png" /></td>
            <td width="33%"><img src="/images/host-web-app/host-web-app-2.png" /></td>
            <td width="33%"><img src="/images/host-web-app/host-web-app-3.png" /></td>
        </tr>
    </tbody>
</table>


## お疲れさまでした

お疲れさまでした。

ここまでたどり着けた方は、  
**FlutterとFirebaseを組み合わせた、少し複雑なアプリ開発ができる状態**に  
なっていることでしょう 👏

もちろん、この他にも紹介しきれていない機能はたくさんあります。

ですが、**Flutterを使ったアプリ開発に入門してみるという、  
大きな一歩を踏み出せたことが大切**だと思います 🚀

今後も、**本格的なアプリ開発に必要な情報を更新していく予定**ですので、  
是非とも一緒にFlutterを使ったアプリ開発にチャレンジして行きましょう 💪💪💪
