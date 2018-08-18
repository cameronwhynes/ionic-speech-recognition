import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import {
  SpeechRecognition,
  SpeechRecognitionListeningOptionsAndroid,
  SpeechRecognitionListeningOptionsIOS
} from "@ionic-native/speech-recognition";
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
  speechHistory: Array<string> = [];
  
  iosOptions: SpeechRecognitionListeningOptionsIOS = {
    language: "en-US",
    matches: 1,
    showPartial: false
  };

  androidOptions: SpeechRecognitionListeningOptionsAndroid = {
    language: "en-US",
    matches: 1,
    prompt: "Speak into your device",      // Android only
    //Boolean showPopup,  // Android only
    showPartial: false
  };

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private speech: SpeechRecognition,
    private platform: Platform
  ) {
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

    let speechOptions = {};
    if (this.platform.is('android')) {
      speechOptions = this.androidOptions;
    }
    else if (this.platform.is('ios'))
    {
      speechOptions = this.iosOptions;
    }

    this.speech.startListening(speechOptions).subscribe(
      data => {
        if (data.length > 0) {
          this.speechHistory.push(data[0]);
        }
        console.log(data);
      },
      error => {
        console.error(error);
      }
    );
  }

  async getSupportedLanguages(): Promise<Array<string>> {
    try {
      const languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      return languages;
    } catch (e) {
      console.error(e);
    }
  }

  async hasPermission(): Promise<boolean> {
    try {
      const hasPermission = this.speech.hasPermission();
      console.log(hasPermission);
      return hasPermission;
    } catch (e) {
      console.error(e);
    }
  }

  async getPermission(): Promise<void> {
    try {
      const permission = this.speech.requestPermission();
      console.log(permission);
      return permission;
    } catch (e) {
      console.error(e);
    }
  }

  async isSpeechSupported(): Promise<boolean> {
    const isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad HomePage");
  }
}
