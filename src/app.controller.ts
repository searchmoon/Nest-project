import { Controller, Get } from "@nestjs/common";

@Controller()
// 이 Controller 데코레이터는 우리가 애플리케이션 안에서 컨트롤러 역할을 할 클래스를 생성하려 한다고 Nest에게 알려주고 있습니다
// 이 클래스는 유입되는 요청을 처리하고 라우팅 할 클래스.
export class AppController {
  @Get("/hi")
  getRootRoute() {
    return "hi there!";
  }

  @Get("/bye")
  getByeThere() {
    return "bye there!";
  }
}
