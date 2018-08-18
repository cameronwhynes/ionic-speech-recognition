import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { SpeechRecognition } from "@ionic-native/speech-recognition";
import { Observable } from "rxjs/Observable";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  recording: false;
  recordedHistory: Array<string>;

  options = {
    language: "en",
    matches: 1,
    //String prompt,      // Android only
    //Boolean showPopup,  // Android only
    showPartial: false
  };

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private speech: SpeechRecognition,
    private platform: Platform
  ) {

    this.recordedHistory = new Array<string>();

    platform
      .ready()
      .then(source => {
        console.log(`Platform.ready() in home.ts. Source: ${source}`);
      })
      .catch(err => {
        console.log(`Platform.ready() in home.ts. ERROR: ${err}`);
      });
  }

  listenForSpeech(): void {
    this.speech.startListening().subscribe(
      data => {
        if (data.length > 0){
          this.recordedHistory.push(data[0]);
        }
        console.log(data);
    }, error => {
      console.error(error);
    });
  }

  async getSupportedLanguages():Promise<Array<string>> {
    try {
      const languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      return languages;
    }
    catch(e){
      console.error(e)
    }
  }

  async hasPermission():Promise<boolean>{
    try {
      const hasPermission = this.speech.hasPermission();
      console.log(hasPermission);
      return hasPermission;
    }
    catch(e){
      console.error(e);
    }
  }

  async getPermission():Promise<void>{
    try {
      const permission = this.speech.requestPermission();
      console.log(permission);
      return permission;
    }
    catch(e){
      console.error(e);
    }
  }

  async isSpeechSupported():Promise<boolean> {
    const isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }
}
