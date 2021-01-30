// 通过选择器获取元素
// 如果元素有一个返回node
// 如果元素有多个返回Nodelist 
function $(selector){
	if(document.querySelectorAll(selector).length === 1){
		return document.querySelectorAll(selector)[0];
	}
	return document.querySelectorAll(selector);
}
// 返回16进制随机颜色值字符串
function getRandomColor(){
	var arr = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
	var result = "#";
	for(var i = 0; i < 6;i++){
		var index = Math.floor(Math.random() * 16)
		result = result + arr[index];
	}
	return result;
}
// 为NodeList绑定事件 
function bindEvent(list,event,fn){
	for(var i = 0; i < list.length;i++){
		list[i][event] = fn;
	}
}
// 返回随机数字+字符验证码
// 参数n代表验证的位数
function verifyCode(n){
	let count = n || 4;
	let arr = ["q","a","z","x","s","w","e","d","c","v","f","r","t","g","b","n","h","y","u","j","m","k","i","o","l","p","0","1","2","3","4","5","6","7","8","9"];
	let result = "";
	for(let i = 0; i < count ;i++){
		var index = Math.floor(Math.random() * arr.length)
		result = result + arr[index];
	}
	return result;
}
// 淡出动画
// obj:Node节点
// speed:执行速度，默认值是0.02
// callback：可选，回调函数
function fadeOut(obj,speed,callback){
	if(speed === "slow"){s = 0.02};
	if(speed === "normal" || speed === undefined){s = 0.03};
	if(speed === "fast"){s = 0.04};
	obj.style.opacity = 1;
	let fadeOut = setInterval(()=>{
		let o = parseFloat(obj.style.opacity);
		if(o <= 0){
			clearInterval(fadeOut);
			obj.remove();
			// 回调函数
			if(callback){callback()}
			return;
		}
		obj.style.opacity = o - s;
	},16)
}
function fadeIn(obj,speed,callback){
	if(speed === "slow"){s = 0.02};
	if(speed === "normal" || speed === undefined){s = 0.03};
	if(speed === "fast"){s = 0.04};
	obj.style.opacity = 0;
	obj.style.display = "block";
	let fadeOut = setInterval(()=>{
		let o = parseFloat(obj.style.opacity);
		if(o >= 1){
			clearInterval(fadeOut);
			// 回调函数
			if(callback){callback()}
			return;
		}
		obj.style.opacity = o + s;
	},16)
}

// 操作cookie的增删查改

let cookie = {
	// 写入/修改cookie
	set(key,value,day){
		let d = new Date();
		d.setDate(d.getDate() + day)
		document.cookie = key + "=" + value + ";expires="+d;
	},
	// 读取cookie
	get(key){
		let arr = document.cookie.split("; ")
		var result = {}
		arr.forEach(item=>{
			let key = item.split("=")[0];
			let value = item.split("=")[1];
			result[key]=value;
		})
		return key?result[key]:result;
	},
	// 删除cookie
	remove(key){
		if(this.get(key)){
			document.cookie = key + "=18;expires=" + new Date('1999-09-09');
			return true;
		}
		else{
			return false;
		}
	}
}