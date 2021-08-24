---
title: 'ローカルにデータを保存'
description: 'Flutterでローカルにデータを保存する方法を紹介'
slug: recipe-03
---

## ローカルにデータを保存

Flutterでローカルにデータを保存する方法は、主に以下のような選択肢があります。

- テキストや画像ファイルを直接保存する
- SharedPreferenceやNSUserDefaultsを使ってキーと値のペアを保存する
- SQLiteなどDBとして保存する

### SQLite

SQLiteはMySQLの様にSQLを使って操作できるデータベースです。  
同じ形式のデータを大量に保存する場合など、JSONなど単一のデータとして扱うことが難しい場合などに使う事が多いでしょう。

- [SQLirte](https://www.dbonline.jp/sqlite/)

### SharedPreferences

SharedPreferenceやNSUserDefaultsを使うと、アプリ固有のキーと値のペアを保存できます。  
比較的小さいデータであるアプリ設定などを保存する場合に使うことが多いでしょう。

- [SharedPreference](https://developer.android.com/training/data-storage/shared-preferences?hl=ja)
- [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults)

### どっちを使えば良い？

明確な決まりはありませんが、以下のような基準で判断すると良いでしょう。

- SQLiteを使うべき場合
    - データ数が比較的多い場合
- SharedPreferencesを使うべき場合
    - キーと値のペアを保存すればOKな場合
    - 値がテキストやJSONなど比較的小さいデータで済む場合

また、パスワードなどデータを安全に保存したい場合は後述する `flutter_secure_storage` を使うことで、暗号化したデータを保存できます。

## sqflite:^2.0.0

`sqflite`パッケージを使うことでSQLiteを扱うことができます。

- [sqflite](https://pub.dev/packages/sqflite)

### 初期化

データベースのファイル名を指定することで初期化処理を行うことができます。  
また、onCreate内に処理を書くことでデータベース作成時に任意の処理を実行できます。  
テーブル作成などを行うと良いでしょう。

```dart
Database db = await openDatabase(
  'example.db',
  version: 1, // onCreateを指定する場合はバージョンを指定する
  onCreate: (db, version) async {
    await db.execute(
      'CREATE TABLE IF NOT EXISTS posts ('
      '  id INTEGER PRIMARY KEY AUTOINCREMENT,'
      '  content TEXT,'
      '  created_at INTEGER'
      ')',
    );
  },
);
```

### データを保存

`db.insert()` を使うことでデータを保存できます。

```dart
await db.insert(
  'posts', // テーブル名
  {
    'content': 'HELLO', // カラム名: 値
    'created_at': DateTime.now().millisecondsSinceEpoch,
  },
);
```

### データを取得

`db.query()` を使うことでデータを保存できます。

```dart
await db.query(
  'posts',
  where: 'content = ?',
  whereArgs: ['OK'], // "?"に代入する値
  orderBy: 'created_at DESC', // ソート順
  limit: 3, // 取得件数
);
```

### データを更新

`db.update()` を使うことでデータを更新できます。

```dart
await db.update(
  'posts',
  {
    'content': 'OK',
  },
  where: 'content = ?',
  whereArgs: ['HELLO'], // "?"に代入する値
);
```

### データを削除

`db.delete()` を使うことでデータを削除できます。

```dart
await db.delete(
  'posts',
  where: 'id = ?',
  whereArgs: [1], // "?"に代入する値
);
```

### データの件数を取得

`Sqflite.firstIntValue()` を使うことで最初の値を数値として取得できます。  
これと `COUNT()` を含めたクエリを組み合わせることでデータの件数を取得できます。

```dart
final int? count = Sqflite.firstIntValue(
  await db.rawQuery('SELECT COUNT(*) FROM posts'),
);
```

もしくは、`db.query()` の `columns` に `COUNT()` を指定することでも取得できます。

```dart
final rows = await db.query('posts', columns: ['COUNT(*) as cnt']);
final count = rows.first['cnt'] as int;
```


## shared_preferences:^2.0.5

`shared_preferences`パッケージを使うことでSharedPreferenceやNSUserDefaultsを扱えます。

- [shared_preferences](https://pub.dev/packages/shared_preferences)

### データを保存

```dart
final SharedPreferences prefs = await SharedPreferences.getInstance();
await prefs.setString('KEY_STRING', 'HELLO'); // 文字列
await prefs.setBool('KEY_BOOL', true); // true/false
await prefs.setInt('KEY_INT', 99999); // int
await prefs.setDouble('KEY_DOUBLE', 1.2345); // double
```

### データを取得

```dart
final SharedPreferences prefs = await SharedPreferences.getInstance();
final String? vString = prefs.getString('KEY_STRING');
final bool? vBool = prefs.getBool('KEY_BOOL');
final int? vInt = prefs.getInt('KEY_INT');
final double? vDouble = prefs.getDouble('KEY_DOUBLE');

// 初期値を記述したい場合は ?? (if null) を使うと便利です
final String vString = prefs.getString('KEY_STRING') ?? 'DEFAULT';
```

#### データを削除

```dart
final SharedPreferences prefs = await SharedPreferences.getInstance();
await prefs.remove('KEY_STRING');
```


## flutter_secure_storage: ^4.2.0

`flutter_secure_storage`パッケージを使うことでデータを暗号化した上で安全に保存できます。

- [flutter_secure_storage](https://pub.dev/packages/flutter_secure_storage)

### データを保存

```dart
final storage = FlutterSecureStorage();
await storage.write(key: 'KEY_PASSWORD', value: 'MY_PASSWORD');
```

### データを取得

```dart
final storage = FlutterSecureStorage();
final String? password = await storage.read(key: 'KEY_PASSWORD');
```

### データを削除

```dart
final storage = FlutterSecureStorage();
await storage.remove(key: 'KEY_PASSWORD');
```
