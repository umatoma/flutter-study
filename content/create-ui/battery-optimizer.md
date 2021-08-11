---
title: 'Battery Optimizer'
description: 'Flutterを使ったUIの作成方法を紹介'
image: '/images/banner/battery_optimizer_banner.png'
slug: create-ui-04
---

![](/images/banner/battery_optimizer_banner.png)

## 今回作成するUI

今回作成するUIは👇をベースに考えています。

- [Mobile Digital Wellbeing Application by Umar Abdul Azis](https://dribbble.com/shots/11372128-Mobile-Digital-Wellbeing-Application)


## 完成イメージ

以下のような画面を作ってみましょう。

今回は大きく分けて5つの要素に分かれています。

1. AppBar
2. Optimizer一覧
3. インジケータ
4. アプリ一覧
5. 最適化ボタン

それでは、各要素ごとにUIを作ってみましょう。

<table>
    <tbody>
        <tr>
            <td width="50%">
                <img src="/images/create-ui/battery-optimizer.png" />
            </td>
            <td width="50%">
                <img src="/images/create-ui/battery-optimizer-widgets.png" />
            </td>
        </tr>
    </tbody>
</table>

![](/images/create-ui/battery-optimizer-overview.svg)


## 共通部分・AppBar

まずはじめに、インジケータやアプリ一覧などを表示する土台となる部分を作り、  
`AppBar` を配置しましょう。

```dart
import 'dart:math'; // 後でインジケータの実装に使う
import 'package:flutter/material.dart';

const kColorPurple = Color(0xFF8337EC);
const kColorPink = Color(0xFFFF006F);
const kColorIndicatorBegin = kColorPink;
const kColorIndicatorEnd = kColorPurple;
const kColorTitle = Color(0xFF616161);
const kColorText = Color(0xFF9E9E9E);
const kElevation = 4.0;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData.light().copyWith(
        primaryColor: Colors.white,
        primaryTextTheme: TextTheme(
          headline6: TextStyle(color: kColorTitle),
        ),
        backgroundColor: Colors.white,
      ),
      home: BatteryOptimizerPage(),
    );
  }
}

/* BatteryOptimizer画面 */

class BatteryOptimizerPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      appBar: AppBar(
        title: Text('Battery Optimizer'),
        centerTitle: false,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            /* ここにWidgetを並べていく */
          ],
        ),
      ),
    );
  }
}
```

## Optimizer一覧

次にOptimizer一覧の部分を作っていきましょう。

Optimizer一覧には４つのボタンを横に並べていきます。  
ここでは、画面の横幅が足りず右側にはみ出してしまいそうなので、  
`SingleChildScrollView` を使い、横方向にスクロールできるようにしてみましょう。

```dart
class _OptimizerButton extends StatelessWidget {
  final String text;

  const _OptimizerButton({
    Key? key,
    required this.text,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        primary: Colors.white,
        padding: EdgeInsets.symmetric(horizontal: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),
      onPressed: () {},
      child: Text(
        text,
        style: TextStyle(color: kColorTitle, fontSize: 12),
      ),
    );
  }
}

class OptimizerButtons extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8),
        child: Row(
          children: [
            SizedBox(width: 16),
            _OptimizerButton(text: 'Battery Optimizer'),
            SizedBox(width: 16),
            _OptimizerButton(text: 'Connection Optimizer'),
            SizedBox(width: 16),
            _OptimizerButton(text: 'Memory Optimizer'),
            SizedBox(width: 16),
            _OptimizerButton(text: 'Storage Optimizer'),
            SizedBox(width: 16),
          ],
        ),
      ),
    );
  }
}
```


## インジケータ

次にインジケータの部分を作っていきましょう。

インジケータは大きく分けて２つの要素で構成することができそうです。

1. 白丸＋テキスト
2. 円を描くようにに並んだ線

`白丸＋テキスト` の部分は `Container` と `Text` を使えば簡単に作れてしまいそうです。

では、`円を描くように並んだ線` の部分はどの様に作ればよいでしょうか？  
複雑な描画が必要な時は `CustomPaint` を使ってUIを描いていくことができます。

具体的な描画処理の部分を見ていきましょう。  
大まかなイメージとしては `0時の方向から時計回りに少しずつ角度をずらして線を複数描いていく` 感じです。

線を引く際は `canvas.drawLine()` を使います、これは点と点を結ぶように線を描いてくれるものです。  
そして、角度をずらした際の点の座標は、`sin`、`cos` を使って計算できますね。  
（高校数学の記憶を呼び覚ましましょう）  
後は角度を少しずつずらして、1つ1つ点の座標を計算し線を描いていけばOKです。

注意事項としては、  
Flutterでは3時の方向から時計回りに進むよう角度が設定されているので、  
0時の方向から開始する時は-90°回転させるような計算を含める必要があります。

![](/images/create-ui/battery-optimizer-draw-line.svg)

https://www.youtube.com/watch?v=kp14Y4uHpHs

```dart
class _BatteryLevelIndicatorPainter extends CustomPainter {
  final double percentage; // バッテリーレベルの割合
  final double textCircleRadius; // 内側に表示される白丸の半径

  _BatteryLevelIndicatorPainter({
    required this.percentage,
    required this.textCircleRadius,
  });

  @override
  void paint(Canvas canvas, Size size) {
    for (int i = 1; i < (360 * percentage); i += 5) {
      final per = i / 360.0;
      // 割合（0~1.0）からグラデーション色に変換
      final color = ColorTween(
        begin: kColorIndicatorBegin,
        end: kColorIndicatorEnd,
      ).lerp(per)!;
      final paint = Paint()
        ..color = color
        ..style = PaintingStyle.stroke
        ..strokeWidth = 4;

      final spaceLen = 16; // 円とゲージ間の長さ
      final lineLen = 24; // ゲージの長さ
      final angle = (2 * pi * per) - (pi / 2); // 0時方向から開始するため-90度ずらす

      // 円の中心座標
      final offset0 = Offset(size.width * 0.5, size.height * 0.5);
      // 線の内側部分の座標
      final offset1 = offset0.translate(
        (textCircleRadius + spaceLen) * cos(angle),
        (textCircleRadius + spaceLen) * sin(angle),
      );
      // 線の外側部分の座標
      final offset2 = offset1.translate(
        lineLen * cos(angle),
        lineLen * sin(angle),
      );

      canvas.drawLine(offset1, offset2, paint);
    }
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}

class BatteryLevelIndicator extends StatelessWidget {
  final percentage = 0.7;
  final size = 164.0;

  @override
  Widget build(BuildContext context) {
    return CustomPaint(
      painter: _BatteryLevelIndicatorPainter(
        percentage: percentage,
        textCircleRadius: size * 0.5,
      ),
      child: Container(
        padding: const EdgeInsets.all(64),
        child: Material(
          color: Colors.white,
          elevation: kElevation,
          borderRadius: BorderRadius.circular(size * 0.5),
          child: Container(
            width: size,
            height: size,
            child: Center(
              child: Text(
                '${percentage * 100}%',
                style: TextStyle(color: kColorPink, fontSize: 48),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
```


## アプリ一覧

次にアプリ一覧の部分を作っていきましょう。  
ここは、特に難しいことはなく、`ListTile` などを使ってUIを作っていけばOKですね。

https://www.youtube.com/watch?v=l8dj0yPBvgQ

```dart
class _HorizontalBorder extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 1,
      margin: EdgeInsets.symmetric(horizontal: 16),
      color: Colors.grey[200],
    );
  }
}

class _AppColumn extends StatelessWidget {
  final String name;
  final Icon icon;
  final String percentage;

  const _AppColumn({
    Key? key,
    required this.name,
    required this.icon,
    required this.percentage,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: icon,
      title: Text(
        name,
        style: TextStyle(color: kColorText),
      ),
      trailing: Text(
        percentage,
        style: TextStyle(color: kColorText),
      ),
    );
  }
}

class AppsDrainage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        ListTile(
          leading: ClipOval(
            child: Container(
              color: kColorPurple,
              child: Icon(Icons.apps, color: Colors.white),
            ),
          ),
          title: Text(
            'Apps Drainage',
            style: TextStyle(color: kColorTitle),
          ),
          subtitle: Text(
            'Show the most draining energy application',
            style: TextStyle(color: kColorText),
          ),
        ),
        Material(
          color: Colors.white,
          elevation: kElevation,
          borderRadius: BorderRadius.circular(16),
          child: Column(
            children: [
              _AppColumn(
                icon: Icon(Icons.sms, color: Colors.indigo),
                name: 'SMSApp',
                percentage: '75%',
              ),
              _HorizontalBorder(),
              _AppColumn(
                icon: Icon(Icons.live_tv, color: Colors.red),
                name: 'MovieApp',
                percentage: '60%',
              ),
              _HorizontalBorder(),
              _AppColumn(
                icon: Icon(Icons.place, color: Colors.green),
                name: 'MapApp',
                percentage: '35%',
              ),
              _HorizontalBorder(),
              _AppColumn(
                icon: Icon(Icons.local_grocery_store, color: Colors.orange),
                name: 'ShoppingApp',
                percentage: '35%',
              ),
              _HorizontalBorder(),
              _AppColumn(
                icon: Icon(Icons.train, color: Colors.black),
                name: 'TrainApp',
                percentage: '15%',
              ),
            ],
          ),
        ),
      ],
    );
  }
}
```


## 最適化ボタン

次は、最適化ボタンの部分を作っていきましょう。  
ボタンを表示すればOKですね、さくっと作ってしまいましょう。

```dart
class OptimizeNow extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 24),
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          primary: kColorPurple,
          padding: EdgeInsets.symmetric(horizontal: 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
          ),
        ),
        onPressed: () {},
        child: Text('Optimize Now', style: TextStyle(color: Colors.white)),
      ),
    );
  }
}
```


## 作成したWidgetを表示

最後に、作成したOptimizer一覧・インジケータ・アプリ一覧・最適化ボタンのWidgetを表示しましょう。  
最初に作成した、土台部分に組み込めばOKです。

```dart
class BatteryOptimizerPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).backgroundColor,
      appBar: AppBar(
        title: Text('Battery Optimizer'),
        centerTitle: false,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            OptimizerButtons(),
            BatteryLevelIndicator(),
            AppsDrainage(),
            OptimizeNow(),
          ],
        ),
      ),
    );
  }
}
```


## お疲れさまでした

UIは無事作成できたでしょうか？  
この他にも様々なUIを作ってみて、Flutterで複雑なUIが表現できるように頑張りましょう 💪

- [UIを作ってみる](/create-ui/top)


### ソースコード

- [battery_optimizer](https://github.com/umatoma/flutter-study-samples/tree/master/battery_optimizer)
