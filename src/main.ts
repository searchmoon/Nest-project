import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 이부분이 Nest 애플리케이션의 인스턴스를 생성한 곳(app)

  await app.listen(3000); // 이 app이 우리 컴퓨터의 특정한 포트로 유입되는 트래픽을 리스닝하기 시작.
}
bootstrap();
