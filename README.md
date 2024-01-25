## Nest CLI 없이 프로젝트 셋업하기

1.package.json 생성, 5개의 dependencies 설치

cli 에 가서,

mkdir scratch

cd scratch

npm init -y (하면 package.json 생성된다.)

npm install @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 typescript@4.3.2

설치된 핵심 라이브러리 설명:

- nestjs/common:
  우리가 Nest 애플리케이션을 만들기 위해 사용할 대부분의 함수, 클래스 등은 common이라는 패키지에 있다. 많이 사용할것이다.

- platform-express: Nest 자체는 유입되는 요청을 처리하지 않는다. Nest는 외부의 어떤 구현물에 의존해서, HTTP 요청을 대신 처리하도록 한다. 그래서, Express.js 또는Fastify.js 를 사용하여 Express 와 Nest 간에 어댑터를 설치하여 둘이 함께 작동하도록 한다.
- reflect-metadata: 데코레이터와 관련된 라이브러리

- typescript: TypeScript 컴파일러를 설치하여 프로젝트를 JavaScript 코드로 트랜스파일 한다.

1. tsconfig.json 파일 생성
   ts 셋팅해준다.

```json
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "es2017",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

experimentalDecorators와 emitDecoratorMetadata는 Nest가 실제로 작동하도록 해주는 중요한 핵심개념.

2. nest module 과 controller 생성

모든 서버를 구축할때 기본적인 <요청-응답> 사이클은 같은 단계를 거친다. (중간에 인증, 인가가 들어갈수도 있다.)

NestJS는 이러한 단계들을 처리하는 다양한 도구를 제공한다. 주요 도구로는 "파이프", "가드", "컨트롤러", "서비스", 그리고 "모듈"이 있다.

1. **파이프(Pipe):** Nest에서는 파이프를 사용하여 유입되는 요청의 데이터를 검증할 수 있다. 예를 들어, 요청 본문의 데이터를 검증하는 데 사용될 수 있다.
2. **가드(Guard):** 가드는 요청이 인증된 사용자로부터 유입되는지를 확인하는 데 사용된다. 인증 또는 권한 부여를 담당한다.
3. **컨트롤러(Controller):** 컨트롤러에는 라우팅 로직이 포함되어 있다. 클라이언트의 요청을 특정 함수로 라우팅하여 처리한다.
4. **서비스(Service):** 서비스에는 비즈니스 로직이 포함되어 있다. 데이터베이스와 상호 작용하거나 다양한 작업을 수행할 수 있다.
5. **레파지토리(Repository):** 데이터베이스를 받아 그 파일을 나타내는 장소
6. **모듈(Module):** 모듈은 Nest 애플리케이션의 구성 단위이며, 관련된 컨트롤러, 서비스, 파이프, 가드 등을 그룹화한다.

controller, service, module, pipe, filter, guard, interceptor, repository 등이 있다.

모듈, 컨트롤러는 가장 간단하고 기본적인 앱을 만드는데 꼭 필요한것.

main.ts는 모든 Nest 프로젝트에서 맨 처음 실행되는 파일이 된다.

일반적으로는 모듈과 컨트롤러를 별도의 파일에서 만드는데, main.ts 파일 안에서 곧바로 모듈과 컨트롤러를 만들어 주었다.(나중에 다시 나눠줄거임)

컨트롤러를 만들기 위해 AppController 라는 이름의 class를 생성한다.

앞에 @ 기호를 넣은것을 데코레이터라고 부른다. 이것을 함수처럼 호출할것이다.

```tsx
//Controller 생성
import { Controller, Module, Get } from "@nestjs/common";

@Controller()
//이 Controller 데코레이터는 우리가 애플리케이션 안에서 컨트롤러 역할을 할 클래스를 생성하려 한다고 Nest에게 알려주고 있다
// 이 클래스는 유입되는 요청을 처리하고 라우팅 할 클래스.
class AppController {
  @Get()
  getRootRoute() {
    return "hi there!";
  }
}
```

애플리케이션의 루트 경로에 대한 GET 요청을 처리하고 싶어서 이 메서드(getRootRoute)를 추가했다. 누군가 이 애플리케이션에 요청을 할 때마다 그 요청을 이 메서드로 라우팅 할것이다.

그렇게 하기 위해서는 또 다른 헬퍼를 import 해야한다.

@Get() 데코레이터를 import 한다. GET이라는 HTTP 메서드를 갖고 유입되는 요청에 대응하는 라우트 핸들러를 만들 수 있다.

그 요청에 응답하기 위해 이 메서드에 어떤 값을 리턴하면 된다. 이 코드에서는 ’hi there!’. Nest 는 자동으로 이 문자열을 받아서 요청자에게 반환한다.

- Module 생성

@Module() 을 추가한다.

AppModule 이라는 클래스를 정의한다.

@Module() 데코레이터를 사용할 때 설정 옵션 또는 객체를 넣어줘야 한다.

그 객체에 우선 controllers 라는 key 값을 넣어준다. 우선 위의 코드에서는 AppController 하나만 있으니깐 그걸 넣어준다. [AppController]

이제 애플리케이션이 시작될 때마다 Nest는 이 AppModule을 확인하고 여기 나열된 모든 컨트롤러를 검색한다. 그리고 우리의 모든 컨트롤러 클래스의 인스턴스를 자동으로 생성할것이다.

그러고 나서 우리가 사용한 모든 데코레이터를 살펴보고, 우리가 사용한 이 모든 데코레이터에 대해 라우트 핸들러를 설정할 것

마지막으로, 애플리케이션이 시작될 때 마다 실행될 함수를 추가해야한다. 여기서는 bootstrap() 함수. (함수이름을 꼭 이렇게 지을 필요는 없지만 그냥 대부분 흔히 사용되는 이름이다.)

아래 코드:

module 을 만들어주고, AppController에 대해 AppModule에게 알려준다. 그리고, bootstrap 함수를 정의하고 곧바로 호출한다.

이 bootstrap 함수는 우리 애플리케이션의 인스턴스를 생성하고(여기서는 app), 유입되는 트래픽을 리스닝 하라고 할것이다. (app.listen(3000). 여기서는 1개의 경로를 지정했다.)

```tsx
@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 이부분이 Nest 애플리케이션의 인스턴스를 생성한 곳(app)

  await app.listen(3000); // 이 app이 우리 컴퓨터의 특정한 포트로 유입되는 트래픽을 리스닝하기 시작.
}
bootstrap();
```

여기서 만약 경로를 지정하지 않고, localhost:3000에 GET 요청을 하면, 여기에 있는 라우트 핸들러로 전달될 것이다. (여기서는 AppController의 getRootRoute.)

그러고 ‘hi there’ 문자열을 리턴하게 된다.

브라우저에서 테스트하기.

> npx ts-node-dev src/main.ts

이 명령어를 사용하는 이유는 Nest CLI 에서 시작하지 않아서 그렇다.CLI 로 설정하면 더 편리하게 사용가능

Nest 애플리케이션이 성공적으로 시작되었다는 메세지가 뜬다.

이렇게 하고 브라우저에서

[localhost:3000](http://localhost:3000) 주소로 들어가면

‘hi there!’ 뜬다.

main.ts 에 있던 controller 와 module을 각각 다른 파일로 분리해준다.

app.controller.ts 와 app.module.ts

분리 해주고 나서,

Controller 데코레이터에 (’/app’) 이라고 설정해주고, AppController 안에서 Get 데코레이터에(’/hi’) 라고 해주면,

요청 경로가 /app/hi 라고 했을 때 애플리케이션이 잘 작동하게 된다. (/app 이 기본값)

즉, @Controller() 데코레이터를 사용해서 상위수준의 라우팅 규칙을 제어한다.
