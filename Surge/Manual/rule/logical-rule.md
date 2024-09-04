# 逻辑规则

使用逻辑运算法则来组合多个规则以应对复杂的情况。你可以将逻辑规则包含在另一个逻辑规则中。


#### AND 规则

如果所有的子规则都匹配，则规则匹配。

```
AND,((#Rule1), (#Rule2), (#Rule3)...), Policy
```

例子：
```
AND,((SRC-IP,192.168.1.110), (DOMAIN, example.com)),DIRECT
```

#### OR规则

如果有任何子规则匹配，则规则匹配。

`OR,((#Rule1), (#Rule2), (#Rule3)...), Policy`.

例子：
```
OR,((SRC-IP,192.168.1.110), (SRC-IP,192.168.1.111)),DIRECT
```

#### NOT规则

反转原始规则的评估结果。

```
NOT,((#Rule1)),policy
```


例子：
```
AND,((NOT,(SRC-IP,192.168.1.110)),(DOMAIN, example.com)),DIRECT
```