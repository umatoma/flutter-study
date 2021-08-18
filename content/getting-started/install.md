---
title: 'Flutterをインストールする'
description: 'Flutterのインストール方法を紹介'
slug: getting-started-01
---

## このページのゴール
- Flutterをインストールする
- Web開発環境を設定する
- iOS開発環境を設定する（任意）
- Android開発環境を設定する（任意）

## インストール・環境設定の流れ

それでは、Flutterを使うための準備を進めていきましょう 🔧🔧🔧

### ステップ

1. Flutterをインストール
1. Web開発環境を設定
1. iOS開発環境を設定（任意）
1. Android開発環境を設定（任意）


## 1. Flutterをインストール

### ❗️注意事項❗️

- 本サイトでは基本的に**Macを使用することを前提**としています。

### Flutterをダウンロードしホームディレクトリに保存

<a
    className="btn-link"
    href="https://storage.googleapis.com/flutter_infra/releases/stable/macos/flutter_macos_2.0.1-stable.zip">
    flutter_macos_2.0.1-stable.zip
</a>

### ダウンロードしたファイルを解凍

![](/images/getting-started/flutter-unzip.png)

### Flutterにパスを通す

ログインシェルの設定ファイルにパスの情報を追記

```text
// bash を使っている場合
// .bash_profile に以下を追記
export PATH="$PATH:$HOME/flutter/bin"

// zsh を使っている場合
// .zprofile に以下を追記
export PATH="$PATH:$HOME/flutter/bin"
```

※ 使っているシェルを確認する方法

```bash
$ echo $SHELL
/bin/zsh
```


### Flutterにパスが通っているか確認

バージョン情報が表示されればOK 👍

```bash
$ flutter --version
Flutter 2.0.1 • channel stable • https://github.com/flutter/flutter.git
Framework • revision c5a4b4029c (8 days ago) • 2021-03-04 09:47:48 -0800
Engine • revision 40441def69
Tools • Dart 2.12.0
```


## 2. Web開発環境を設定

### Chromeをインストール

<a
    className="btn-link"
    href="https://www.google.com/chrome/">
    https://www.google.com/chrome/
</a>

### 正しく設定できてるか確認

`flutter doctor`で設定状況が確認できます。  
Chromeのところに ✅ が入っていればOK 👍

```bash
$ flutter doctor
...
[✓] Chrome - develop for the web
...
```


## 3. iOS開発環境を設定（任意）

### ❗️注意事項❗️
設定が簡単なWebアプリで動作確認を行っていくため、  
スキップしてもOKです 👍

### Xcodeをインストール

<a
    className="btn-link"
    href="https://apps.apple.com/us/app/xcode/id497799835">
    https://apps.apple.com/us/app/xcode/id497799835
</a>

### コマンドラインツールを設定

```bash
$ sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
$ sudo xcodebuild -license
```

### シミュレータを起動

```bash
$ open -a Simulator
```

### 正しく設定できてるか確認

`flutter doctor`で設定状況が確認できます。  
Xcodeのところに ✅ が入っていればOK 👍

```bash
$ flutter doctor
...
[✓] Xcode - develop for iOS and macOS
...
```


## 4. Android開発環境を設定（任意）

### ❗️注意事項❗️
設定が簡単なWebアプリで動作確認を行っていくため、  
スキップしてもOKです 👍

### Android Studioをインストール

<a
    className="btn-link"
    href="https://developer.android.com/studio">
    https://developer.android.com/studio
</a>

### エミュレータを作成

<table>
    <tbody>
        <tr>
            <td>Android Studio を起動し<br/>「Configure → AVD Manager」を選択</td>
            <td width="50%"><img src="/images/android-emulator-install-1.png" /></td>
        </tr>
        <tr>
            <td>「Create Virtual Device」を選択</td>
            <td width="50%"><img src="/images/android-emulator-install-2.png" /></td>
        </tr>
        <tr>
            <td>作成したいデバイスを選択し「Next」</td>
            <td width="50%"><img src="/images/android-emulator-install-3.png" /></td>
        </tr>
        <tr>
            <td>
                作成したいOSを選択し「Next」<br/>
                <br/>
                OSがインストールされていない場合は、<br/>
                「Download」からインストールできます。
            </td>
            <td width="50%"><img src="/images/android-emulator-install-4.png" /></td>
        </tr>
        <tr>
            <td>デバイス名を入力し「Finish」</td>
            <td width="50%"><img src="/images/android-emulator-install-5.png" /></td>
        </tr>
        <tr>
            <td>デバイス一覧に表示されていればOKです 👍</td>
            <td width="50%"><img src="/images/android-emulator-install-6.png" /></td>
        </tr>
    </tbody>
</table>

### エミュレータを起動

Android Studio を起動し `Configure >> AVD Manager` からエミュレータを起動

![](/images/android-emulator-launch.png)

### 正しく設定できてるか確認

`flutter doctor`で設定状況が確認できます。  
Android toolchainのところに ✅ が入っていればOK 👍

```bash
$ flutter doctor
...
[✓] Android toolchain - develop for Android devices (Android SDK version 29.0.2)
...
```


## まとめ

- Flutterをダウンロードしパスを通すことでインストール完了
- iOS/Android/Webの設定状況は `flutter doctor` で確認

環境設定お疲れさまでした。  
次はエディタの設定です、アプリを起動するまでもう少しなので頑張りましょう 💪


## 参考情報

- https://flutter.dev/docs/get-started/install/macos
