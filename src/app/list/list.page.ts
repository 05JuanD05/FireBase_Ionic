import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../shared/services/auth/auth.service';
import { LoadingService } from '../shared/services/loading/loading.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public id: string = "";

  constructor(private readonly authServ: AuthService, private navCtrl: NavController, private readonly loadService: LoadingService) { }
  

  public async logOut(){
    await this.loadService.show();
    await this.authServ.logOut();
    await this.loadService.dismiss();
    this.navCtrl.navigateForward("/login");
  }

  async ngOnInit() {
    this.id = await this.authServ.getCurrentUid();
  }

}
