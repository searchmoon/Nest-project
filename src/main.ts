import { Controller, Module, Get } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

@Controller()
//이 Controller 데코레이터는 우리가 애플리케이션 안에서 컨트롤러 역할을 할 클래스를 생성하려 한다고 Nest에게 알려주고 있습니다
// 이 클래스는 유입되는 요청을 처리하고 라우팅 할 클래스.
class AppController {
  @Get()
  getRootRoute() {
    return "hi there!";
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);
}
bootstrap();
