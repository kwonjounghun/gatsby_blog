---
path: /study/babel-1
label: Study
category: Babel
date: 2018-12-11T08:14:23.359Z
title: Babel을 접하다.
thumbnail: /assets/sub06_contents02.jpg
Public: false
---
# Babel이란?

Babel이란 Javascript 컴파일러이다. 최신 버전의 Javascript문접을 구형 브라우저에서도 동작 할 수 있는 문접으로 변환시켜주는 도구이다.

ES6, ES7과 같이 ES5이하 문법의 문제점을 보안하고 강화된 최신 Javascript문법으로 개발을 하여 생산성을 높일 수 있다.

> 예를들면 let, const classes, template strigns, arrow function등등 위 예시에 대한 자세한 설명 추가 필요.

Babel을 쓰는 이유가 단지 최신문법을 쓰기 위해서만은 아니다.
개발자들이 개발할 당시 가독성을 위해 맞춰놓은 코드 컨벤션은 사실 컴퓨터한테는 무의미한 공백의 향연이다. 위와같은 공백을 조금이라도 줄임으로써 용량을 줄일 수 있는데 이런 행위를 Minify라고 한다.

또한 내가 쓰는 변수명 함수이름등과 같이 개발코드의 적나라한 노출은 보안의 문제가될 수 도 있기때문에 코드를 암호화하는 작업을 진행하는데 이를 Uglify라 한다.

이런 다양한 기능을 이용하여 Javascript 코드를 관리할 수 있게 도와주는 도구가 Babel이다.

이런 코드가(이미지) > 이렇게(이미지) 변하게 도와주느게 Babel

## babel-polyfill

하지만 babel에다 코드만 띡 하고 던진다고 모든게 척척 해결되지는 않는다.
babel이 내가 원하는 작업을 수행할 수 있게 여러가지 모듈을 붙여줘야한다.
babel은 사용자가 설정한 설정값대로 문법을 변환해주는 역할만 할 뿐이다. polyfill은 프로그램이 처음 시작될 때 현재 브라우저에서 지원하지 않는 문법을 검사해서 구형 브라우저에서도 돌아갈 수 있게 미리 구현해 놓은 문법으로 대체해주는 역할을 한다. babel은 컴파일-타임에 실행되고 babel-poltyfill은 런-타임에 실행된다.

## .babelrc

## babel-cli
