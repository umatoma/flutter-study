---
title: '画面遷移アニメーション'
description: 'Flutterで画面遷移アニメーションをカスタマイズする方法を紹介'
slug: recipe-02
---

ここでは、Flutterで画面遷移アニメーションをカスタマイズする方法を紹介していきます。  
例えば、スライドインやフェードアウトなど画面遷移する時のアニメーションを指定したい場面があるでしょう。  
そのような、UI・UXを意識したアプリ開発に役立ててください。

## PageRouteBuilder

画面遷移時は以下のように、MaterialPageRoute / CupertinoPageRoute を使う事が多いでしょう。   
しかし、これらは Android / iOS の作法に沿ったデザインが適用されているため、アニメーション等はカスタマイズできません。

```dart
Navigator.of(context).push(
  MaterialPageRoute(
    builder: (context) { return Page2(); },
  ),
);

Navigator.of(context).push(
  CupertinoPageRoute(
    builder: (context) { return Page2(); },
  ),
);
```

そこで、画面遷移のアニメーション等をカスタマイズしたい場合は `PageRouteBuilder` を使うことで対応できます。  
基本的な使い方は簡単で、表示する画面のWidgetと遷移時のアニメーションを指定すればOKです。

```dart
Navigator.of(context).push(
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) {
      // 表示する画面のWidget
      return Page2();
    },
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      // 遷移時のアニメーションを指定
      final Offset begin = Offset(0.0, 1.0);
      final Offset end = Offset.zero;
      final Tween<Offset> tween = Tween(begin: begin, end: end);
      final Animation<Offset> offsetAnimation = animation.drive(tween);
      return SlideTransition(
        position: offsetAnimation,
        child: child,
      );
    },
  ),
);
```

アニメーションの基本的な使い方は[「アニメーション基礎」](/create-ui/animation)で紹介しているます。  
基礎知識を身に着けたい場合はこちらをご覧ください。

## スライドイン（左右）

```dart
Navigator.of(context).push(
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) {
      return Page2();
    },
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final Offset begin = Offset(1.0, 0.0); // 右から左
      // final Offset begin = Offset(-1.0, 0.0); // 左から右
      final Offset end = Offset.zero;
      final Animatable<Offset> tween = Tween(begin: begin, end: end)
          .chain(CurveTween(curve: Curves.easeInOut));
      final Animation<Offset> offsetAnimation = animation.drive(tween);
      return SlideTransition(
        position: offsetAnimation,
        child: child,
      );
    },
  ),
);
```



## スライドイン（上下）

```dart
Navigator.of(context).push(
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) {
      return Page2();
    },
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final Offset begin = Offset(0.0, 1.0); // 下から上
      // final Offset begin = Offset(0.0, -1.0); // 上から下
      final Offset end = Offset.zero;
      final Animatable<Offset> tween = Tween(begin: begin, end: end)
          .chain(CurveTween(curve: Curves.easeInOut));
      final Animation<Offset> offsetAnimation = animation.drive(tween);
      return SlideTransition(
        position: offsetAnimation,
        child: child,
      );
    },
  ),
);
```

## フェードイン

```dart
Navigator.of(context).push(
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) {
      return Page2();
    },
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final double begin = 0.0;
      final double end = 1.0;
      final Animatable<double> tween = Tween(begin: begin, end: end)
          .chain(CurveTween(curve: Curves.easeInOut));
      final Animation<double> doubleAnimation = animation.drive(tween);
      return FadeTransition(
        opacity: doubleAnimation,
        child: child,
      );
    },
  ),
);
```

## ブラックアウト・ホワイトアウト

ブラックアウト・ホワイトアウトの様に連続したアニメーションの場合は、Intervalで指定した区間のみアニメーションを適用することで再現できます。

```dart
Navigator.of(context).push(
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) {
      return Page2();
    },
    transitionDuration: Duration(seconds: 3),
    reverseTransitionDuration: Duration(seconds: 3),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final color = ColorTween(
        begin: Colors.transparent,
        end: Colors.black, // ブラックアウト
        // end: Colors.white, // ホワイトアウト
      ).animate(CurvedAnimation(
        parent: animation,
        // 前半
        curve: Interval(
          0.0,
          0.5,
          curve: Curves.easeInOut,
        ),
      ));
      final opacity = Tween<double>(
        begin: 0.0,
        end: 1.0,
      ).animate(CurvedAnimation(
        parent: animation,
        // 後半
        curve: Interval(
          0.5,
          1.0,
          curve: Curves.easeInOut,
        ),
      ));
      return AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return Container(
            color: color.value,
            child: Opacity(
              opacity: opacity.value,
              child: child,
            ),
          );
        },
        child: child,
      );
    },
  ),
);
```

## ワイプ

ClipPathを使うことで任意の形でWidgetをくり抜くことができます。  
これを使いWidgetを四角形でくり抜きワイプを表現できます。

```dart
Navigator.of(context).push(
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) {
      return Page2();
    },
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final opacity = Tween<double>(
        begin: 0.0,
        end: 1.0,
      ).animate(CurvedAnimation(
        parent: animation,
        curve: Curves.easeInOut,
      ));
      return AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return ClipPath(
            clipper: WipeClippter(opacity.value),
            child: child,
          );
        },
        child: child,
      );
    },
  ),
);

class WipeClippter extends CustomClipper<Path> {
  const WipeClippter(this.progress) : super();

  final double progress;

  @override
  Path getClip(Size size) {
    return Path()
      ..addRect(Rect.fromCenter(
        center: Offset(size.width / 2, size.height / 2),
        width: size.width * progress,
        height: size.height,
      ))
      ..close();
  }

  @override
  bool shouldReclip(covariant CustomClipper oldClipper) {
    return true;
  }
}
```
