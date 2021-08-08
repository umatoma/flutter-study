---
title: 'Google PlayにAndroidアプリを公開する'
description: 'Flutterで作ったAndroidアプリをGoogle Playに公開する方法を紹介'
slug: create-app-04
---

## Google PlayにAndroidアプリを公開する

ここではFlutterで作ったアプリを、  
Google PlayにAndroidアプリとして公開する方法を紹介していきます🤩

## 公開までの流れ

大きく分けて以下の4ステップでアプリを公開することができます。

1. アップロード用署名鍵を作る
1. アップロード用アプリをビルドする
1. Google Play Consoleに登録する
1. Google Play Consoleにアプリを登録する

それでは順番に詳しい手順を確認していきましょう💪

## アップロード用署名鍵を作る

Google Playで公開されているアプリには、  
`正しいアプリであることを証明するための署名`が付けられています。

`署名`自体の詳しい仕組みは割愛しますが、  
イメージとしては`書類に捺印`するのと同じようなものです。

書類に捺印することで、これは○○さんが捺印した正しい書類だと証明できますよね。  
同じ様にアプリに署名を付けることで、正しいアプリだと証明できるのです。

そして、`捺印するための印鑑`が必要なのと同じく、  
`署名するための署名鍵`が必要となるのです。

`アップロード用署名鍵`は以下のコマンドで作成することができます。  
👇を参考に作成してみましょう。

```bash
$ keytool -genkey -v -keystore ./key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
キーストアのパスワードを入力してください:
新規パスワードを再入力してください:
姓名は何ですか。
  [Unknown]:  Yamada Taro
組織単位名は何ですか。
  [Unknown]:
組織名は何ですか。
  [Unknown]:
都市名または地域名は何ですか。
  [Unknown]:
都道府県名または州名は何ですか。
  [Unknown]:  Tokyo
この単位に該当する2文字の国コードは何ですか。
  [Unknown]:  81
CN=Yamada Taro, OU=Unknown, O=Unknown, L=Unknown, ST=Tokyo, C=81でよろしいですか。
  [いいえ]:  はい

10,000日間有効な2,048ビットのRSAの鍵ペアと自己署名型証明書(SHA256withRSA)を生成しています
	ディレクトリ名: CN=Yamada Taro, OU=Unknown, O=Unknown, L=Unknown, ST=Tokyo, C=81
<key>の鍵パスワードを入力してください
	(キーストアのパスワードと同じ場合はRETURNを押してください):
[./key.jksを格納中]
```

❗️作成した署名鍵は失くさないように`大切に保管`しておきましょう。❗️  
❗️失くしてしまうとアップロード出来なくなってしまうので注意です❗️

## アップロード用アプリをビルドする

次は、作成した署名鍵を使って、アップロード用に`署名付きのアプリをビルド`していきます。  
署名付きアプリをビルドするための設定を追加していきましょう。

ますは、公開したいFlutterプロジェクト内に以下のファイルを設置します。  
`android/key.properties`
```text
storePassword=<パスワード>
keyPassword=<パスワード>
keyAlias=key
storeFile=/<保存した場所を指定>/key.jks
```
❗️パスワードを含んでいるのでGitHubなど、`誰でも見れる場所には公開しない`ように注意しましょう❗️

設置したファイルを元に署名するための設定も追記します。  
`android/app/build.gradle`
```xml
android {
    ...

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

これでビルドするための設定ができたので。  
以下のコマンドでアプリをビルドしましょう。

```bash
$ flutter build apk
...
✓ Built build/app/outputs/flutter-apk/app-release.apk (19.6MB).
```

これで、署名付きアプリのビルドは完了です🎉  
ビルドしたアプリは後でアップロードするので、消さないようにして下さいね。


## Google Play Consoleに登録する

以下のURLから Google Play Console に登録しましょう。  
※ 2020年6月時点では、登録料として 25$ 支払う必要があります。

https://play.google.com/apps/publish/signup/

![](/images/create-app/google-play-console-register.png)



## Google Play Consoleにアプリを登録する

Google Play Console に登録できたら、あとはアプリを登録していきましょう。

基本的にはサイドナビの ✅ が付いている項目に情報を登録していけばOKです。

![](/images/create-app/google-play-console-sidenav.png)

アプリのリリースでは製品版トラック・オープントラックなど複数種類ありますが、  
アプリを公開したい場合は `製品版トラック` にアプリを登録すればOKです。

`製品版として新しくリリース` の項目で先程ビルドした `アップロード用アプリ` を登録しましょう。

![](/images/create-app/google-play-console-upload.png)

最後に `製品版として公開を開始` を選択すれば完了です🎉  
※ アプリの内容によりますが、最短で数時間程度で審査が終了し公開されます。

## お疲れさまでした

アプリは無事アプリを公開できたでしょうか？  
この他にも様々なアプリを作ってみて、オリジナルアプリを公開してみましょう 💪

- <aa href="/create-app/top">アプリを作ってみる</aa>


## 参考情報

- https://flutter.dev/docs/deployment/android
- https://developer.android.com/studio/publish
- https://developer.android.com/studio/publish/app-signing