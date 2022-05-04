# 查找算法

- 线性查找：一个个找；实现简单；太慢
- [二分查找](https://stackblitz.com/edit/tl-binary-search?file=index.ts)：有序；简单；插入特别慢
- HASH：查询快；占用空间；不太适合存储大规模数据
- [二叉查找树](https://stackblitz.com/edit/tl-binary-sort-tree?file=index.ts)：插入和查询很快（log(N)）；无法存大规模数据，复杂度退化
- 平衡树：解决 bst 退化的问题，树是平衡的；节点非常多的时候，依然树高很高
- 多路查找树：一个父亲多个孩子节点（度）；节点过多树高不会特别深
- 多路平衡查找树 B-Tree

