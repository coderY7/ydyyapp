const audioTeam = [];
let audioStartSwitch = false;
const getAudioUrl = 'https://tsn.baidu.com/text2audio'; //百度 短文本在线合成 接口
/**
 * 浏览器调用语音合成接口
 * 请参考 https://ai.baidu.com/docs#/TTS-API/41ac79a6
 */

function getBDVoicToken() {
	return new Promise((rs, rj) => {
		uni.request({
			//此url请替换为自己申请的key
			// url: 'https://openapi.baidu.com/oauth/2.0/token',
			url: "https://aip.baidubce.com/oauth/2.0/token",
			method: 'POST', //建议使用post访问
			data: {
				"grant_type": "client_credentials",
				"client_id": "YIjGVDnyK7gZVmiMeYWGMA9y", //百度语音合成 应用的API Key
				"client_secret": "ofztGdS6QrYmpjcjjN23iNRtUL2R4yVE" //百度语音合成 应用的Secret Key
			},
			header: {
				"content-type": "application/x-www-form-urlencoded"
			},
			success: (res) => {
				console.log('访问成功');
				rs(res);
			},
			fail: (err) => {
				console.log('访问失败');
				rj(err);
			}
		})
	})
}

export default function openVoice(objs) { // 传入需转为语音的文本内容
	let lineUp = false;
	let returnAudio = false;
	if (typeof(objs) !== 'string') {
		if (objs && objs.lineUp === true) {
			lineUp = true;
		}
		if (objs && objs.returnAudio === true) {
			returnAudio = true;
		}
	}
	if (returnAudio) {
		return new Promise((resolve, reject) => {
			openVoiceFc(objs, returnAudio).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err)
			});
		})
	}


	if (lineUp = true) {
		audioTeam.push(objs);
	}
	console.log(audioTeam);
	if (!audioStartSwitch) {
		audioStartSwitch = true;
		openVoiceFc(objs);
	}
}

function openVoiceFc(objs, returnAudio) {
	console.log('准备获取语音tok');
	if (returnAudio) {
		return new Promise((resolve, reject) => {
			getBDVoicToken().then(res => {
				console.log('获取语音tok接口成功');
				if (res.data && res.data.access_token) {
					resolve(tts(objs, res.data.access_token, returnAudio));
				} else {
					console.log('获取语音tok接口为空');
					reject('获取语音tok接口为空');
				}
			}).catch(err => {
				console.log('获取语音tok接口失败');
				reject(err || '获取语音tok接口失败');
			})
		})
	} else {
		getBDVoicToken().then(res => {
			console.log('获取语音tok接口成功');
			if (res.data && res.data.access_token) {
				// console.log('token: ' + res.data.access_token);
				tts(objs, res.data.access_token);
			} else {
				console.log('获取语音tok接口为空');
			}
		}).catch(err => {
			console.log('获取语音tok接口失败');
		})
	}
}

function tts(objs, tok, returnAudio) {
	if (typeof(objs) == 'string')
		objs = {
			voiceSet: {
				tex: objs
			}
		};
	const data = {
		tok,
		cuid: tok,
		ctp: 1,
		lan: 'zh',
		...objs.voiceSet
	}
	if (returnAudio)
		return btts(data, objs.audioSet, objs.audioCallback, objs.lineUp, returnAudio);
	btts(data, objs.audioSet, objs.audioCallback, objs.lineUp, returnAudio);
}

function setAudioSet(options, audio) {
	if (options) {
		audio.volume = options.volume || 1;
		audio.startTime = options.startTime || 0;
		audio.loop = options.loop || false;
		// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO
		audio.obeyMuteSwitch = options.obeyMuteSwitch && typeof(options.obeyMuteSwitch) == 'boolean' ? options
			.obeyMuteSwitch :
			true; //支持微信小程序、百度小程序、头条小程序
		// #endif
	}
}

function btts(param, options, audioCallback, lineUp, returnAudio) {
	let audio = uni.createInnerAudioContext();
	uni._audio = audio
	setAudioSet(options, audio);
	// 序列化参数列表
	let fd = [];
	for (let k in param) {
		fd.push(k + '=' + encodeURIComponent(encodeURIComponent(param[k])));
	}
	audio.src = `${getAudioUrl}?${fd.join('&')}`;

	if (returnAudio) {
		audio.onEnded(() => {
			console.log('音频播放结束');
			audio.destroy(); //销毁音频实例
			audio = null;
		})
		audio.onError((e) => {
			if (audioCallback && audioCallback.onError && typeof(audioCallback.onError) == 'function')
				audioCallback.onError(e);
			console.log('音频播放错误 ', JSON.stringify(e));
			audio.destroy(); //销毁音频实例
			audio = null;
		})
		return audio;
	}
	audio.onPlay(() => {
		if (audioCallback && audioCallback.onPlay && typeof(audioCallback.onPlay) == 'function') audioCallback
			.onPlay();
	})
	audio.onPause(() => {
		if (audioCallback && audioCallback.onPause && typeof(audioCallback.onPause) == 'function') audioCallback
			.onPause();
	})
	audio.onWaiting(() => {
		if (audioCallback && audioCallback.onWaiting && typeof(audioCallback.onWaiting) == 'function')
			audioCallback.onWaiting();
	})
	audio.onStop(() => {
		if (audioCallback && audioCallback.onStop && typeof(audioCallback.onStop) == 'function') audioCallback
			.onStop();
	})
	audio.onTimeUpdate(() => {
		if (audioCallback && audioCallback.onTimeUpdate && typeof(audioCallback.onTimeUpdate) == 'function')
			audioCallback.onTimeUpdate();
	})
	audio.onSeeking(() => {
		if (audioCallback && audioCallback.onSeeking && typeof(audioCallback.onSeeking) == 'function')
			audioCallback.onSeeking();
	})
	audio.onSeeked(() => {
		if (audioCallback && audioCallback.onSeeked && typeof(audioCallback.onSeeked) == 'function')
			audioCallback.onSeeked();
	})
	audio.onEnded(() => {
		console.log('音频播放结束,销毁音频实例');
		audio.destroy(); //销毁音频实例
		audio = null;
		if (audioCallback && audioCallback.onEnded && typeof(audioCallback.onEnded) == 'function') audioCallback
			.onEnded();

		if (lineUp !== false) { // 删除已经播放对象 
			audioTeam.splice(0, 1);
			if (audioTeam.length > 0) {
				console.log('队列中');
				openVoiceFc(audioTeam[0]);
			} else {
				console.log('队列为零');
				audioStartSwitch = false;
			}
		}
	})
	audio.onError((e) => {
		if (audioCallback && audioCallback.onError && typeof(audioCallback.onError) == 'function') audioCallback
			.onError(e);
		console.log('音频播放错误: ' + JSON.stringify(e));
		console.log('销毁音频实例');
		audio.destroy(); //销毁音频实例
		audio = null;
	})
	audio.play();
}
