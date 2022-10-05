import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { KEYUTIL, KJUR, stob64, hextorstr } from 'jsrsasign'
declare var qz: any;

@Injectable({
  providedIn: 'root'
})
export class QzTrayService {

  constructor() {
    qz.security.setCertificatePromise(function (resolve, reject) {

      //Alternate method 2 - direct
      resolve(

        "-----BEGIN CERTIFICATE-----\n" +
        "MIIDTDCCAjQCCQCbXtAyCy/HnjANBgkqhkiG9w0BAQsFADBnMQswCQYDVQQGEwJJ\n" +
        "TjELMAkGA1UECAwCUEIxCzAJBgNVBAcMAlBCMQswCQYDVQQKDAJQQjELMAkGA1UE\n" +
        "CwwCUEIxCjAIBgNVBAMMASoxGDAWBgkqhkiG9w0BCQEWCWtrQGtrLmNvbTAgFw0y\n" +
        "MDA3MjUwOTMwNTRaGA8yMDUyMDExODA5MzA1NFowZzELMAkGA1UEBhMCSU4xCzAJ\n" +
        "BgNVBAgMAlBCMQswCQYDVQQHDAJQQjELMAkGA1UECgwCUEIxCzAJBgNVBAsMAlBC\n" +
        "MQowCAYDVQQDDAEqMRgwFgYJKoZIhvcNAQkBFglra0Bray5jb20wggEiMA0GCSqG\n" +
        "SIb3DQEBAQUAA4IBDwAwggEKAoIBAQDBOJDxDkVcRBGFEV+3tTrfKTlZeHIFKY/K\n" +
        "L7WneXYruolisyd1zNEL6eERy7EvCwbnVBeT0DFRnskwEShe2oQV2f3Asm6yfa33\n" +
        "+xQMH2dyXpob76E5k169AF9WPGQaVF3/7OodRsKGooNRZzhMW4HRrPhpb2EFV6aF\n" +
        "CzKPXXU0qU5lVd0INmgfcu1EiIflAVYpVs/hwrSjVZa+xKziIP/XmMqc5uvWDHWl\n" +
        "FCwEm0onO+03A4tP8f6nYrd8A1s9ah+3F0bAH2+oD7mT9C2aZKglX5yQpuSuZoun\n" +
        "Ug+fM1FU4L26VdOvae6aEccdPAj4IzI5Li+IOCAFZZx/DZrMAsR9AgMBAAEwDQYJ\n" +
        "KoZIhvcNAQELBQADggEBAJjurrUsYCv54DnXgHPo1qKJLLUgZ+kp+k3uW1lsYC6w\n" +
        "QvFazeLnFXdmf4TR+Knjuqulpu09CEvObnJ/w7xDAVYQvIG/gja33cOYfLM1wVVi\n" +
        "raT/OnfqevR5etmG4K5DgVCiovpVb9ANA5Xh2RL7juF8aCvX+U/TrT+slsFY4fv/\n" +
        "LjWJjhgO0jgMp5mzEV5sHff8t/oZZhJ/q6v7hjDlbzlb7EePau2x1EH0fvxCNFW4\n" +
        "fs3d/pq+a+I1J/oV/rzuAP+VZru/+rafbPKTxjWBCCW4EbSr2ATmfMgisxQ4fdYx\n" +
        "gMT4SLEKXppzKYxCk4wmR5q/DEAEL+MSF6XWMAYKa5I=\n" +
        "-----END CERTIFICATE-----"

      );
    });

    // qz.security.setSignatureAlgorithm("SHA512"); // Since 2.1

    // DANGER:  Don't leak qz issued private keys!
    var privateKey = "-----BEGIN PRIVATE KEY-----\n" +
      "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBOJDxDkVcRBGF\n" +
      "EV+3tTrfKTlZeHIFKY/KL7WneXYruolisyd1zNEL6eERy7EvCwbnVBeT0DFRnskw\n" +
      "EShe2oQV2f3Asm6yfa33+xQMH2dyXpob76E5k169AF9WPGQaVF3/7OodRsKGooNR\n" +
      "ZzhMW4HRrPhpb2EFV6aFCzKPXXU0qU5lVd0INmgfcu1EiIflAVYpVs/hwrSjVZa+\n" +
      "xKziIP/XmMqc5uvWDHWlFCwEm0onO+03A4tP8f6nYrd8A1s9ah+3F0bAH2+oD7mT\n" +
      "9C2aZKglX5yQpuSuZounUg+fM1FU4L26VdOvae6aEccdPAj4IzI5Li+IOCAFZZx/\n" +
      "DZrMAsR9AgMBAAECggEAaA5skEUdOWk2/jCzGZ4yDEiJKBPjY8BUPZCgBYc2Cqq0\n" +
      "nkDZOWmKEx5rJUhLLYiEuUPiRqpSRSB8PLSgxyRrCdGSBJqTXvCsJeZDj5vB/CfS\n" +
      "WsUcUIN6+9IdhbWUO1HAJbmTAx0+WX9ftREfko+dRCwgw7dFyri/Ztr26ZptKmQr\n" +
      "y8SsTjIfgud/iTH42b1jcc/CnNZPtuiyHt91vdPSzlXObO8mpXylYMO4BqDx5Nir\n" +
      "G/bB/zid1teHzXhTrOe/9MT2UZQ6V/Qmcj1V+2EdTFpDL0BTQ8BNahqeZZUwcJDE\n" +
      "p86Nge0CQ0bKOHTpZyob0o9SnYWOK0NunprzRrM3QQKBgQDiS2HHCBOwJWkbE24u\n" +
      "2diF+PfcXqoDzie4/1JtkX+4QNY2ohrmuxHa+s20HUQf8+h7utxrtlzU4dsn1JNP\n" +
      "iMI7JOphkw3Tw8BLsC91NNZGqxrkIcxoBsChJl9vuqUZ0W9Hgrag/723p4aTbYJm\n" +
      "++RrMIh7/ZuGhNCACP77SxaThQKBgQDalcAX5QT7ZX8tXIoi4Kri6I3OCXNw1bLM\n" +
      "W3+Ag2gapV0n9RHjJ7EiyTIUqSSmD3JfN2gOR3DyXCDZU48U8AHI429xstw5jKvv\n" +
      "iI1Cb/qCR/oSfoY2s/P0JdD62TMkvlihxto3XlC4K9K5QVXXkpT0Z+tIEdAk652r\n" +
      "xdFy+HRSmQKBgAJo/x+ZjGwh2d659EB3fYDfx/QG5hSoS3AC+CPGmu+hcSafz12J\n" +
      "vITyiuJSNXmJpX473UEgbhiuVyEzeGYudLMgj4Z+hHUu7otf0wGSkH2sMNshKQYq\n" +
      "nD6bJAUSndOKkX7Xe453atPb6ukDD5J9OE+T8sAvUUq7e2UBs4WFpTXpAoGBAJin\n" +
      "Jn1Jgv4y9utuCkarUoyfTpFKxmVRyMmxSM0ueGDLhdBm9XQHf0zE6AXHzoFunjhj\n" +
      "EHeQaw/HSWWdVnqP1x89vtHP0L8cP+NMISL54yBjNgD+farsZ/3k/xqA35fUmz94\n" +
      "CWPLqWHFsSeRumqPwxkhDg7J6ewu5HFW+JxraYlZAoGBAIEjlVAwSz4wrShXb+ZL\n" +
      "zs4cAnBUduxTUeu6OlMiEl7Yf/EKrDY+t4Pg5QOAIplnlvA3moOm7t00YCpc5Ur+\n" +
      "bTCpBtOrFiQ879xsNnol1AE6E2a+yLjik4akNgpAllwcmEl+Nz1GQjFgm5l4pvC5\n" +
      "hFnlrLAkwy2QSxc14M2mqabW\n" +
      "-----END PRIVATE KEY-----";

    qz.security.setSignaturePromise(function (toSign) {
      return function (resolve, reject) {
        try {
          var pk = KEYUTIL.getKey(privateKey);
          var sig = new KJUR.crypto.Signature({ "alg": "SHA1withRSA" });
          sig.init(pk);
          sig.updateString(toSign);
          var hex = sig.sign();

          resolve(stob64(hextorstr(hex)));
        } catch (err) {
          reject(err);
        }
      };
    });
  }

  // Get the list of printers connected
  getPrinters(): Observable<string[]> {
    return Observable
      .fromPromise(
        qz.websocket.connect().then(() => qz.printers.find())
      )
      .map((printers: string[]) => printers);
  }

  // Get the SPECIFIC connected printer
  getPrinter(printerName: string): Observable<string> {
    return Observable
      .fromPromise(
        qz.websocket.connect()
          .then(() => qz.printers.find(printerName))
      )
      .map((printer: string) => printer);
  }

  // Print data to chosen printer
  printData(printer: string, data: any): Observable<any> {
    const config = qz.configs.create(printer); return Observable.fromPromise(qz.print(config, data))
      .map((anything: any) => anything);
  }

  // Disconnect QZ Tray websocket
  removePrinter(): void {
    qz.websocket.disconnect();
  }
}
