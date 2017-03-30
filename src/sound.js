/**
 * Created by kale on 2016/11/18.
 */

var Sound = {
    silence:false,
    _eatEffect:0,
    playBackgroundMusic:function(){
        if(!Sound.silence)
            cc.audioEngine.playMusic("res/sounds/background_1.mp3", true);
    },
    // playEat:function(){
    //     if(!Sound.silence)
    //     {
    //         //先停止之前播放的吃音效，否则会因为连续播放过多而报错
    //         if(Sound._eatEffect)
    //             cc.audioEngine.stopEffect(Sound._eatEffect);
    //         Sound._eatEffect = cc.audioEngine.playEffect("res/sounds/eat.mp3", false);
    //     }
    // },
    stop:function(){
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    },
    setMusic:function (volume) {
      cc.audioEngine.setMusicVolume(volume);
    },
    toggleOnOff:function(){
        if(Sound.silence){
            Sound.silence = false;
            cc.audioEngine.setEffectsVolume(1);
            cc.audioEngine.setMusicVolume(1);
        }
        else{
            Sound.silence = true;
            cc.audioEngine.setEffectsVolume(0);
            cc.audioEngine.setMusicVolume(0);
        }
    }
};
