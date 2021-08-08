---
title: 'アプリ起動'
description: 'Flutterのプロジェクト作成とアプリ起動方法を紹介'
next: widgets/about-widget
slug: getting-started-03
---

## このページのゴール

- プロジェクトを作成する
- アプリを起動する


## Flutterプロジェクトを作成

### プロジェクト作成

コマンドラインからFlutterのプロジェクト雛形を簡単に作成できます。  
今回は `myapp` という名前のプロジェクトを作ってみましょう 😀

```bash
$ flutter create myapp
```

### ディレクトリ構造

プロジェクトとして生成されたファイル・ディレクトリの構造を簡単に紹介します。

- `lib`
    - メインのソースコード用ディレクトリ
    - **主にこの中にプログラムを追加していきます**
    - 中にある `main.dart` が最初に読み込まれるファイルです
- `web`
    - Webアプリ用ディレクトリ
    - Webアプリに依存したファイルを配置します
- `ios`
    - iOSアプリ用ディレクトリ
    - iOSアプリに依存したファイルを配置します
- `android`
    - Androidアプリ用ディレクトリ
    - Androidアプリに依存したファイルを配置します
- `pubspec.yaml`
    - 依存ライブラリ定義ファイル
    - 使用するライブラリを管理するファイルです
- `test`
    - テストコード用ディレクトリ
    - ユニットテスト用のファイルを配置します


## Null安全に対応させる

### Null安全とは？

簡単に言うと`null`になる可能性があるかをプログラムで表現できる感じです。  
この機能があることによって意図せず値に`null`が入ってきてしまうのを防ぎやすくなります。

```dart
String nullable; // 今まではnullが入る可能性があるかは動かすまで分からなかった
String? nullabe; // Null安全に対応させると、"?"でnullになる可能性があることを表現できる
```

### プロジェクトのNull安全を有効にする

用意されているコマンドを実行すればOKです。  
これを実行することでNull安全を有効にするためのコードの変更を自動的に行なってくれます。

```bash
$ ~/flutter/bin/dart migrate --apply-changes
Migrating /path/to/myapp

See https://dart.dev/go/null-safety-migration for a migration guide.

Analyzing project...
[--------------------------------------------------\]No analysis issues found.

Generating migration suggestions...
[--------------------------------------------------]

Compiling instrumentation information...
[--------------------------------------------------]

Applying changes:
  test/widget_test.dart (1 change)
  lib/main.dart (11 changes)
  pubspec.yaml (1 change)
  .dart_tool/package_config.json (1 change)

Applied 4 edits.
```

pubspec.yaml内のsdkが以下のように書き換わっているはずです 👀

```yaml
environment:
  sdk: '>=2.12.0 <3.0.0'
```


## アプリを起動する

作成した `myapp` プロジェクトのアプリを起動してみましょう。

### アプリの起動手段

アプリの起動は以下の2通りの方法があります。

- **VSCodeから起動する**
- **コマンドラインから起動する**

どちらの方法も使えるよう確認していきましょう 💪


### VSCodeでアプリ起動

VSCodeを起動し `File >> Open` から作成したプロジェクトのディレクトリ選択。  
プロジェクトを開いたら、右下のデバイス名をクリックし起動するデバイスを選択。  
今回は `chrome` を選択してみましょう。

![](/images/introduction/vscode-select-device.png)

最後に、ショートカット`F5`でアプリを起動してみましょう

![](/images/introduction/vscode-start-debugging.png)

指定したデバイスでアプリが起動できました 🤩

![](/images/introduction/vscode-android-emulator.png)

### コマンドラインでアプリ起動

`flutter devices` で起動しているデバイス一覧が確認できます。

```bash
$ flutter devices
3 connected devices:

AOSP on IA Emulator • emulator-5554 • android-x86    • Android 9 (API 28) (emulator)
Chrome              • chrome        • web-javascript • Google Chrome 81.0.4044.122
Web Server          • web-server    • web-javascript • Flutter Tools
```

`flutter run` でアプリを起動できます。  
今回は `chrome` を指定してアプリを起動してみましょう。

```bash
flutter run --device-id chrome
...
🔥  To hot restart changes while running, press "r". To hot restart (and refresh the browser), press "R".
For a more detailed help message, press "h". To quit, press "q".
```

指定したデバイスでアプリが起動できました 🤩

![](/images/introduction/vscode-android-emulator.png)


## まとめ

- コマンドラインからプロジェクトを作成できる
- VSCodeまたはコマンドラインからアプリを起動できる

無事アプリを起動できたでしょうか？ 🤔  
次は、様々なUIを作るためのWidgetについて紹介していきます 💪💪💪


## 参考情報

- https://flutter.dev/docs/get-started/test-drive?tab=vscode
- https://flutter.dev/docs/get-started/test-drive?tab=terminal
