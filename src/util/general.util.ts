import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneralUtil {
  uuid() {
    const s4 = () => {
      const random = Math.floor((1 + Math.random()) * 0x10000);
      return random.toString(16).substring(1);
    };

    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }
}
