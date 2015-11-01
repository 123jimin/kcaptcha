KCaptcha
==========
Captcha reader using ConvNetJS.

Usage
-------

```
$ ./read.js captcha1.jpg
ULBLDV 0.9759
$ ./read.js captcha2.jpg
KYFBWN 0.8858
$ ./read.js captcha3.jpg
QGGQZQ 0.4274
```

공백을 사이에 두고 앞에 캡챠 텍스트가, 뒤에 정확도가 나옵니다.

참고로 캡챠의 특정 위치에 있는 이미지 부분 6곳을 이용해 6글자를 인식하는 방식이라,
정확도가 상당히 낮을 때도 있지만, 많은 경우에는 그럭저럭 인식합니다.
