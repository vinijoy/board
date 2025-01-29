import * as Crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GeneralUtil {
  decryptAES(data: string, key: string = process.env.SECURE_AES_KEY) {
    const dataArray = data.split(':');
    const iv = Buffer.from(dataArray.shift(), 'hex');
    const encryptedData = Buffer.from(dataArray.join(':'), 'hex');

    const decipher = Crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    const decrypted = decipher.update(encryptedData);

    return Buffer.concat([decrypted, decipher.final()]).toString();
  }

  uuid() {
    const s4 = () => {
      const random = Math.floor((1 + Math.random()) * 0x10000);
      return random.toString(16).substring(1);
    };

    return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  }
}
