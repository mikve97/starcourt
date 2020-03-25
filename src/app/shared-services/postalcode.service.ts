import {Injectable} from "@angular/core";
import {HttpClientService} from "./http-client.service";

@Injectable({
  providedIn: 'root'
})

export class PostalcodeService {
  constructor(private httpService: HttpClientService) {
  }

  checkPostalCode(pc: string){
    return this.httpService.onGet('/order/checkPostalCode/' + pc);
  }


}
