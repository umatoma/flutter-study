---
title: 'アニメーション基礎'
description: 'Flutterでアニメーションを実装するための基礎知識を紹介'
slug: create-ui-06
---

## アニメーション

ここでは、Flutterでアニメーションを実装するための基礎知識を学んでいきます。

### アニメーションを使ってみる

まずは、簡単な方法でアニメーションの機能を使ってみたいと思います。  
👇のサンプルでは、**四角いボックスが大きくなるアニメーション**になっています。

コードを見てもらうと、  
とても簡単にアニメーションを実装できてしまっていることが分かりますね🤩

この様に**Flutterではアニメーションが簡単に実装できる**ようになっていて、  
**基礎知識をしっかりと理解していれば凝ったアニメーションも実装できる**ようになれるのです💪


```run-dartpad
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      debugShowCheckedModeBanner: false,
      home: MyWidget(),
    );
  }
}

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  double size = 100;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            size = 200;
          });
        },
        child: Icon(Icons.play_arrow),
      ),
      body: Center(
        child: AnimatedContainer(
          duration: Duration(seconds: 1),
          width: size,
          height: size,
          color: Colors.blue,
        ),
      ),
    );
  }
}
```

### アニメーション基礎知識

アニメーション基礎知識は👇の3ステップに分けて紹介していきます。

1. Animated系Widgetを使ったお手軽アニメーション
    - 簡単なアニメーションを実装できる方法を紹介
2. Transition系Widgetを使った制御するアニメーション
    - 細かい制御を含めたアニメーションを実装できる方法を紹介
3. アニメーション全体像まとめ
    - アニメーションに関する情報を最後に整理

それでは早速アニメーションの基礎知識を学んでいきましょう💪


## Animated系Widgetを使ったお手軽アニメーション

### 利用シーン

とりあえず手軽にアニメーションを使いたい、  
そんな時は、Animated系Widgetを使うと良いでしょう。

Animated系Widgetでは**アニメーションの動作時間のみ指定できる**ので、  
とりあえずアニメーションが開始されればOKなものであればこれで十分です。

具体的な例としては、  
**ボタンを押したらアニメーションを動かす**場合などが当てはまるでしょう。


### Widget一覧

- AnimatedAlign
- AnimatedContainer
- AnimatedDefaultTextStyle
- AnimatedOpacity
- AnimatedPadding
- AnimatedPhysicalModel
- AnimatedPositioned
- AnimatedPositionedDirectional
- AnimatedTheme
- AnimatedCrossFade
- AnimatedSize
- AnimatedSwitcher

### 使い方

Animated系Widgetは、大きく2つの要素を指定することで動作します。

1. アニメーションの動作時間
2. 変化させたいプロパティ（width, height, padding などなど）

これら2つの要素を元に、  
`2. 変化させたいプロパティ` の `値が変化した時` に  
`1. アニメーションの動作時間` でアニメーション処理を実行してくれます🤩

では、具体的な書き方を見てみましょう。  
`横幅が2秒かけて変化するアニメーション`は以下のように書くことができます。

```dart
AnimatedContainer(
  duration: Duration(seconds: 2),
  width: width,
  height: 100,
)
```

この様に、Aniated系Widgetは  
手軽に使える便利なアニメーション用Widgetなのです⚡️

最後に、実際に動作する形で全体的な使い方を確認してみましょう。

```run-dartpad
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      debugShowCheckedModeBanner: false,
      home: MyWidget(),
    );
  }
}

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  double width = 50;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            // 値を変化させる
            width = 200;
          });
        },
        child: Icon(Icons.play_arrow),
      ),
      body: Center(
        child: AnimatedContainer(
          // 1.アニメーションの動作時間
          duration: Duration(seconds: 2),
          // 2.変化させたいプロパティ
          width: width,
          height: 100,
          color: Colors.blue,
        ),
      ),
    );
  }
}
```

何種類かのAnimated系Widgetがありますが、  
ここでは `AnimatedContainer` の使い方を中心に説明していきました。

この他のAnimated系Widgetに関しても基本的な仕組み・使い方は同じなので  
色々と使ってみましょう👍



## Transition系Widgetを使った制御するアニメーション

### 利用シーン

アニメーションの再生・停止・繰り返しを制御したい。  
アニメーションの動きにメリハリをつけたい。  
そんな時は、Transition系Widgetを使うと良いでしょう。

Transition系Widgetでは**アニメーションの動きを制御できる**ので、  
Animated系Widgetでは再現できない、もう少し凝ったアニメーションを作りたい時に使えます。

具体的な例としては、  
**ボタンを押したらアニメーションを停止したい**場合などが当てはまるでしょう。

### Widget一覧

- AlignTransition
- DecoratedBoxTransition
- DefaultTextStyleTransition
- PositionedTransition
- RelativePositionedTransition
- RotationTransition
- ScaleTransition
- SizeTransition
- SlideTransition
- FadeTransition

### 使い方

Transition系WidgetはAnimated系Widgetよりも細かい制御ができますが、  
制御するための仕組みを用意する必要があります。

まず、Flutterにおけるアニメーションは、  
`指定された時間で値を変化させ、値を元にUIを描画` することで成り立っています。

もう少し具体的に見てみましょう。  
`横幅が2秒かけて50から150に変化するアニメーション`を作る際には、  
以下のように時間に合わせて値が変化していくという事です。

- `0秒の時に横幅が50`
- `1秒の時に横幅が100`
- `2秒の時に横幅が150`

この処理を行う際に役割を大きく3つに分けることができます。

1. `指定された時間で値を変化させる`
2. `1の値をUIの描画に必要な任意の値に変換する`
3. `2で変換された値を元にUIを描画する`

そして、Transition系Widgetでは `1` と `2` の部分を自分で制御することで、  
アニメーションの動きを制御することが出来るのです。

あとは、`1` と `2` を制御するために必要な `AnimationController` と `Tween` を使って  
Transition系Widgetに値を渡していけばOKです。

```dart
controller = AnimationController(
  vsync: this, // おまじない
  duration: Duration(seconds: 2),
);

animation = Tween<double>(
  begin: 1.0, // アニメーション開始時のスケール
  end: 2.0, // アニメーション終了時のスケール
).animate(controller);

controller.forward(); // アニメーション再生

ScaleTransition(
  scale: animation, // あとはいい感じにやってくれる
  child: Container(
    width: 50,
    height: 50,
    color: Colors.blue,
  ),
)
```

![](/images/create-ui/animation-controller-tween-widget.svg)

最後に、実際に動作する形で全体的な使い方を確認してみましょう。

```run-dartpad
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(primarySwatch: Colors.blue),
      debugShowCheckedModeBanner: false,
      home: MyWidget(),
    );
  }
}

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget>
    with SingleTickerProviderStateMixin {
  late AnimationController controller;
  late Animation<double> animation;

  @override
  void initState() {
    super.initState();

    controller = AnimationController(
      vsync: this, // with SingleTickerProviderStateMixin を忘れずに
      duration: Duration(seconds: 2),
    );

    animation = Tween<double>(
      begin: 1.0, // アニメーション開始時のスケール
      end: 2.0, // アニメーション終了時のスケール
    ).animate(controller);
  }

  @override
  void dispose() {
    controller.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomAppBar(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            IconButton(
              onPressed: () {
                // アニメーション再生
                controller.forward();
              },
              icon: Icon(Icons.play_arrow),
            ),
            IconButton(
              onPressed: () {
                // アニメーション停止
                controller.stop();
              },
              icon: Icon(Icons.stop),
            ),
            IconButton(
              onPressed: () {
                // アニメーション繰り返し
                controller.repeat();
              },
              icon: Icon(Icons.loop),
            ),
          ],
        ),
      ),
      body: Center(
        child: ScaleTransition(
          scale: animation,
          child: Container(
            width: 50,
            height: 50,
            color: Colors.blue,
          ),
        ),
      ),
    );
  }
}
```

何種類かのTransition系Widgetがありますが、  
ここでは `ScaleTransition` の使い方を中心に説明していきました。

この他のTransition系Widgetに関しても基本的な仕組み・使い方は同じなので  
色々と使ってみましょう👍


## アニメーション全体像まとめ

アニメーションを実装するために大きく2種類の方法を紹介しました。

1. 手軽なAnimated系Widget
2. 制御できるTransition系Widget

もちろん、これら2種類の方法では対処しきれない複雑なアニメーションを実装したい時は、  
Animated系WidgetやTransition系Widgetの内部で使われている  
`Animation`・`Tween`・`AnimatedWidget`などを組み合わせて実現する必要があります。

ここでは詳細は割愛しますが、（※ 詳しい紹介は後日公開します）  
必要になった時は公式ドキュメントの情報を参考に使い方を学びましょう。  

- https://flutter.dev/docs/development/ui/animations/tutorial

https://www.youtube.com/watch?v=LKKgYpC-EPQ

この様に、Flutterにおけるアニメーション実装方法が沢山あって、  
とても難しいように感じてしまう所が敷居が高くなってしまっている要因でしょう😅

今回紹介した内容から分かるように、  
`ある程度簡単なアニメーションであれば簡単に実装できる`のです。  

複雑なアニメーションになるにつれて、実装も複雑になるのは仕方のないことですが、  
Transition系Widgetの所で学んだ`アニメーションの仕組みを理解していれば対応できる`はずです。

なので、アニメーションの複雑さに応じて、  
適切に手段を使い分けていきましょう💪

![](/images/create-ui/animation-method.svg)


## お疲れさまでした

アニメーションの事が何となく理解できたでしょうか？  
様々なアニメーションを作ってみて、Flutterで複雑なアニメーションが表現できるように頑張りましょう 💪

- <aa href="/create-ui/top">UIを作ってみる</aa>


## まとめ

- Animated系Widgetを使って手軽にアニメーションが実装できる
- Transition系Widgetを使ってアニメーションを制御できる
- 複雑なアニメーションを実装するためには基礎知識が重要となる
- アニメーションの複雑さに応じて手段を使い分ける
