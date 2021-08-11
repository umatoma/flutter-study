---
title: '音楽・動画を再生する'
description: 'Flutterを使った音楽・動画の再生方法を紹介'
slug: create-app-03
---

## 音楽・動画を再生する

ここでは、音楽や動画の再生方法を紹介していきたいと思います。

### 音楽・動画再生用ライブラリ

音楽や動画を再生するには  
Flutter公式から提供されている `video_player` パッケージを使うと実現することができます。

- [video_player | Flutter Package](https://pub.dev/packages/video_player)

### ライブラリを追加する

利用するライブラリは `pubspec.yaml` で指定することができます。  
ライブラリを使う場合は忘れずに設定しましょう 👀

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.3

  # 利用するライブラリを追加
  video_player: ^2.0.2
```

### アプリ内に音楽・動画ファイルを配置する

アプリ内に埋め込むファイルは `pubspec.yaml` で指定することができます。  
ファイルを埋め込む場合は忘れずに設定しましょう 👀

```yaml
assets:
  - assets/ # ディレクトリ単位で指定する場合
  - images/a_dot_burr.jpeg # ファイル単位で指定する場合
```

それでは具体的な使い方を確認していきましょう。


## 動画を再生する

動画を再生する場合、大きく2つの要素を扱う必要があります。

- `VideoPlayerController`
    - 動画の読み込み・再生・停止などを制御してくれる
- `VideoPlayer`
    - VideoPlayerControllerを元に画面に動画を表示してくれるWidget


ますは、`VideoPlayerController`を使って動画を読み込み初期化する処理を行います。

```dart
class VideoPlayerPage extends StatefulWidget {
  @override
  _VideoPlayerPageState createState() => _VideoPlayerPageState();
}

class _VideoPlayerPageState extends State<VideoPlayerPage> {
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.asset('assets/video.mp4');
    _controller.initialize().then((_) {
      // 最初のフレームを描画するため初期化後に更新
      setState(() {});
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

    @override
  Widget build(BuildContext context) {
      ...
  }
}
```

初期化処理が終わったら、  
`VideoPlayerController`と`VideoPlayer`を使って動画を表示すればOKです。

また、動画の再生・停止などは`VideoPlayerController`から制御できます。

```dart
Scaffold(
  body: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children: [
      AspectRatio(
        aspectRatio: _controller.value.aspectRatio,
        // 動画を表示
        child: VideoPlayer(_controller),
      ),
      Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          IconButton(
            onPressed: () {
              // 動画を最初から再生
              _controller
                  .seekTo(Duration.zero)
                  .then((_) => _controller.play());
            },
            icon: Icon(Icons.refresh),
          ),
          IconButton(
            onPressed: () {
              // 動画を再生
              _controller.play();
            },
            icon: Icon(Icons.play_arrow),
          ),
          IconButton(
            onPressed: () {
              // 動画を一時停止
              _controller.pause();
            },
            icon: Icon(Icons.pause),
          ),
        ],
      ),
    ],
  ),
)
```


## 音楽を再生する

音楽を再生する場合も動画を再生するときと基本的には同じです。  
ただし、音楽は画面に表示する物が無いので `VideoPlayer` は不要ですね。

```dart
class AudioPlayerPage extends StatefulWidget {
  @override
  _AudioPlayerPageState createState() => _AudioPlayerPageState();
}

class _AudioPlayerPageState extends State<AudioPlayerPage> {
  late VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.asset('assets/audio.mp3');
    _controller.initialize().then((_) {
      setState(() {});
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: EdgeInsets.all(16),
            child: Icon(Icons.music_video, size: 256),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              IconButton(
                onPressed: () {
                  _controller
                      .seekTo(Duration.zero)
                      .then((_) => _controller.play());
                },
                icon: Icon(Icons.refresh),
              ),
              IconButton(
                onPressed: () {
                  _controller.play();
                },
                icon: Icon(Icons.play_arrow),
              ),
              IconButton(
                onPressed: () {
                  _controller.pause();
                },
                icon: Icon(Icons.pause),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
```

## プログレスバーを表示する

音楽や動画の進捗を表すためのプログレスバーも  
ライブラリで提供されているので簡単に実装することができます。

```dart
VideoProgressIndicator(
  _controller,
  allowScrubbing: true,
),
```

## 現在の再生時間を表示する

現在の再生時間を表示するには `VideoPlayerController` の更新を検知して、  
その時の値を表示してあげればOKですね。

- 更新を検知：`controller.addListener(() { })`
- 現在の再生時間：`controller.value.position`
- ファイルの合計時間：`controller.value.duration`

```dart
class _ProgressText extends StatefulWidget {
  final VideoPlayerController controller;

  // VideoPlayerControllerを受け取れるようにする
  const _ProgressText({
    Key? key,
    required this.controller,
  }) : super(key: key);

  @override
  __ProgressTextState createState() => __ProgressTextState();
}

class __ProgressTextState extends State<_ProgressText> {
  VoidCallback _listener;

  __ProgressTextState() {
    _listener = () {
      // 検知したタイミングで再描画する
      setState(() {});
    };
  }

  @override
  void initState() {
    super.initState();
    // VideoPlayerControllerの更新を検知できるようにする
    widget.controller.addListener(_listener);
  }

  @override
  void deactivate() {
    widget.controller.removeListener(_listener);
    super.deactivate();
  }

  @override
  Widget build(BuildContext context) {
    // 現在の値を元にUIを表示する
    final String position = widget.controller.value.position.toString();
    final String duration = widget.controller.value.duration.toString();
    return Text('$position / $duration');
  }
}
```


## お疲れさまでした

使い方が理解できたでしょうか？  
この他にも様々な機能を作ってみて、Flutterで本格的なアプリが開発できるように頑張りましょう 💪

- [アプリを作ってみる](/create-app/top)


## サンプルコード

- [media_player](https://github.com/umatoma/flutter-study-samples/tree/master/media_player)
    - [video_player_page](https://github.com/umatoma/flutter-study-samples/blob/master/media_player/lib/video_player_page.dart)
    - [audio_player_page](https://github.com/umatoma/flutter-study-samples/blob/master/media_player/lib/audio_player_page.dart)

<table>
    <tbody>
        <tr>
            <td width="50%">
                <a href="/create-app/qiita-app">
                    <img src="/images/create-app/media-player-video.png" />
                </a>
            </td>
            <td width="50%">
                <a href="/create-app/qiita-app">
                    <img src="/images/create-app/media-player-audio.png" />
                </a>
            </td>
        </tr>
    </tbody>
</table>