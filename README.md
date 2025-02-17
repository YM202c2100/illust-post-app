# イラストコンペティションアプリ
現時点ではデプロイしていないので以下にアプリの説明を記しています。

![スクリーンショット 2025-01-16 234041](https://github.com/user-attachments/assets/a2b89b28-3328-4f05-9fc8-83677e5aecf5)

# 概要
* コンテストにイラストを投稿し、他のユーザーからの評価をもとにレーティングを調整することでランク付けを⾏うアプリケーション
* フロントエンドとバックエンドの連携を学ぶために作成

# コンテストの流れ
以下にコンテストへの参加から結果発表までの流れを記します。
## 1.コンテストに応募
応募期間中にこの画面からファイルを投稿する。\
現時点ではファイル名をデータベースに格納し、ファイルはローカルのファイルシステムにて保存しています。

![スクリーンショット 2025-01-16 235628](https://github.com/user-attachments/assets/52c552ee-3db7-4a84-8d73-69ca636b6a0e)

## 2.他の作品を比較して審査
作品を投稿したユーザーは、審査期間中に他のユーザーの作品を審査する権利が3回分与えられます。\
審査の仕方は二つの作品から好きな方を選ぶ形式で、自身のレートと同程度の作品が優先して表示されます。

![スクリーンショット 2025-01-16 235442](https://github.com/user-attachments/assets/6e36bf68-e8c2-49c9-ac16-9539e0363eac)

## 3.結果発表
投稿したコンテストについて、自身の作品・TOP3の作品・自身のレートより少し高いレートの3作品が表示されます。\
参加していないコンテストに関しては、結果を閲覧することはできません。

![スクリーンショット 2025-01-17 000618](https://github.com/user-attachments/assets/b3e02453-d6c0-47ff-8e7a-f5ec8008fe63)
(ページ数が多いので、一つの画像にまとめています。)
