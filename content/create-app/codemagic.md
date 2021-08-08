---
title: 'Codemagicでテスト・ビルド・配信を自動化'
description: 'Flutterを使ったアプリのテスト・ビルド・配信をCodemagicを使って自動化する方法を紹介'
slug: create-app-05
---

## Codemagic

Codemagicを使うとFlutterで作ったアプリの  
テスト・ビルド・配信などを簡単に自動化することができます。

https://codemagic.io/

> Build, test and deliver mobile apps in record time  
> Continuous integration and continuous delivery for Flutter and mobile app projects

![](/images/create-app/codemagic/codemagic-screen-image.png)


## Flutterプロジェクト登録

GitHubアカウントでログインすると、自分のリポジトリが自動的に認識されます。  
難しい登録は必要なく、これで準備は完了です👍

![](/images/create-app/codemagic/codemagic-register-1.png)


## テスト自動化

デフォルト設定で自動でテストが行われるようになっています。

![](/images/create-app/codemagic/codemagic-test-1.png)


## ビルド自動化

デフォルト設定で自動でビルドがが行われるようになっています。  
設定画面から以下のような設定を変更することができます。

- FlutterのVer.
- XcodeのVer.
- CocoaPodsのVer.
- プロジェクトファイルの場所
- ビルド対象のプラットフォーム
- ビルドモード
- ビルドパラメータ

![](/images/create-app/codemagic/codemagic-build-1.png)


## 配信自動化（Android）

<table>
    <tbody>
        <tr>
            <td width="50%">
                署名鍵を作成し登録
            </td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-android-2.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">
                Google Play 配信設定ファイルを作成し登録
            </td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-android-3.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">設定が有効になればOK</td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-android-4.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">リリースモードでビルド</td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-android-1.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">
                処理を開始すると自動的にアプリをビルドし<br/>
                Google Play Consoleにアプリを登録してくれる
            </td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-android-5.png" />
            </td>
        </tr>
    </tbody>
</table>

### Android署名鍵の作成方法

- <aa href="/create-app/publish-android">Androidアプリを公開する</aa>
- [Android code signing - Codemagic Docs](https://docs.codemagic.io/code-signing/android-code-signing/)

### Google Play 配信設定ファイルの作成方法

- Google Play Console を開く
- 設定 > APIアクセス
- サービスアカウントを作成
    - 「Service Accounts > サービスアカウントユーザー」をロールとして選択
- キーを作成
    - 「JSON」を選択
- ダウンロードしたJSONファイルをcodemagicの設定画面から登録

<table>
    <tbody>
        <tr>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-google-play-1.png" />
            </td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-google-play-5.png" />
            </td>
        </tr>
    </tbody>
</table>

- [Google Play - Codemagic Docs](https://docs.codemagic.io/publishing/publishing-to-google-play/)


## 配信自動化（iOS）

<table>
    <tbody>
        <tr>
            <td width="50%">
                ユーザー設定からAppleDeveloperと連携登録
            </td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-app-store-1.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">
                署名の設定を登録<br/>
                理由がなければ「Automatic」で設定するのが簡単です
            </td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-app-store-2.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">
                App Store Connect の設定を登録
            </td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-app-store-3.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">設定が有効になればOK</td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-app-store-4.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">リリースモードでビルド</td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-app-store-5.png" />
            </td>
        </tr>
        <tr>
            <td width="50%">
                処理を開始すると自動的にアプリをビルドし<br/>
                App Store Connect にアプリを登録してくれる
            </td>
            <td width="50%">
                <img src="/images/create-app/codemagic/codemagic-app-store-6.png" />
            </td>
        </tr>
    </tbody>
</table>

### app ID 確認方法

- App Store Connect を開く
- マイApp > Appを選択
- App情報の「Apple ID」が「app ID」

### App Store Connect 接続用パスワードの作成方法

- [Apple ID のアカウント管理画面](https://appleid.apple.com/account/manage)を開く
- セキュリティ > App用パスワード > パスワードを生成

## 配信自動化（Web）

作成中です 🙇‍♂️

## 参考情報

- https://docs.codemagic.io/