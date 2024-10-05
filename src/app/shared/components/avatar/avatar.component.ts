import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {

  protected image = "https://ionicframework.com/docs/img/demos/avatar.svg";
  @Input() control = new FormControl("");
  @Input() onlyView = false;

  protected mimeType = "image/jpg";

  constructor(private readonly storageServi: StorageService) { }

  public async uploadFile(event: any){
    try{
      console.log(event.target.files[0]);
      const url = await this.storageServi.uploadFileyGetUrl(event.target.files[0]);
      console.log(url);
      this.control.setValue(url);
    }catch(error){
      console.log(error);
    }
  }

}
