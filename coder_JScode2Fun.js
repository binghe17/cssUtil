
/*
 * 标题： 《 JS代码格式 转 函数使用方式 》
 * 内容： 线性嵌套; 有限循环, 无限循环, 异常处理, 条件控制, 条件比较, 变量赋值;
 * 日期： #2018-06-10   @zun.
 */

//线性嵌套函数
function runInFun(){
	this.runList = [];
	this.runIndex =0;
	this.add = function (runFun){
		this.runList.push(runFun);
		return this;
	}
	this.next = function(){
		index = ++this.runIndex;
		this.runList[index]();
	}
	this.run = function(index){
		index = index || 0;
		if(index>= 0 && index < this.runList.length ) this.runIndex = index;
		this.runList[index]();
	}
}


y=new runInFun();
y.add(function(){//0
	console.log('1');
	y.next();
	console.log('3');
})
.add(function(){//1
	console.log('2.1');
	y.next();
	console.log('--------')
	y.run(2);
	console.log('--------')
	console.log('2.3');
})
.add(function(){//2
	console.log("2.2.1");
	y.next();
})
.add(function(){//3
	console.log("2.2.2");
	y.run(4)
})
y.add(function(){//4
	console.log("aaaa");
});
y.run();

//result: 
	// 1
	// 2.1
	// 2.2.1
	// 2.2.2
	// aaaa
	// --------
	// 2.2.1
	// 2.2.2
	// aaaa
	// --------
	// 2.3
	// 3

console.log('===============')

y2=new runInFun();
y2.add(function(){//0
	console.log('1');
	if(true)  y2.next();
	console.log('3');
})
.add(function(){//1
	console.log('2.1');
	if(true)  y2.next();
	console.log('2.3');
})
.add(function(){//2
	console.log("2.2.1");
	for(var i=0; i <5; i++){
		if(i==2) y2.run(3);
		else y2.run(4);
	}
})
.add(function(){//3
	console.log("aaaa");
})
.add(function(){//4
	console.log("---");
})
y2.run();

//result:
	// 1
	// 2.1
	// 2.2.1
	// ---
	// ---
	// aaaa
	// ---
	// ---
	// 2.3
	// 3


//===============================



//有限循环函数（开始序号， 循环次数， 执行循环体，是否时减序循环）
function forFun(startNum, Count, runFun, type){//type减减
	if(type) {//i--
		for(var i = startNum; i > startNum - Count; i-- ){
			runFun(i);
		}
	}else{//i++
		for(var i = startNum; i < startNum + Count; i++){
			runFun(i);
		}
	}
}


forFun(1, 3, function(x){
	forFun(5,3, function(y){
		console.log('x:'+x +', y:'+ y);
	},true);
	console.log('---------');
});
//result:
	// x:1, y:5
	// x:1, y:4
	// x:1, y:3
	// ---------
	// x:2, y:5
	// x:2, y:4
	// x:2, y:3
	// ---------
	// x:3, y:5
	// x:3, y:4
	// x:3, y:3
	// ---------



//无限循环函数（数组或对象， 执行循环体）
function forEachFun(arr, runFun){//type减减
	for(var k in arr ){
		runFun(k, arr[k]);
	}
}

var arr = ['aaaa','bbbb',3333];
var obj = {'a':1111, 'b':2222, 'c':33333}
forEachFun(arr, function(i, v){
	console.log('index:'+v +', value:'+ v);
});
console.log('--------------------------');
forEachFun(obj, function(k, v){
	console.log('key:'+k +', value:'+ v);
});
//result:
	// index:aaaa, value:aaaa
	// index:bbbb, value:bbbb
	// index:3333, value:3333
	// --------------------------
	// key:a, value:1111
	// key:b, value:2222
	// key:c, value:33333






//=========================


//异常处理函数
function tryCatchFun(tryFun, catchFun){
	try{
		tryFun();
	}catch(e){
		catchFun(e);
	}
}


tryCatchFun(function(){
	throw 'aaaa'; //报错，输出结果2222
	console.log('tryCatchFun------1111');//上面个一行不注释时，输出结果1111
}, function(){
	console.log('tryCatchFun-----2222');
});




//==================

//条件控制函数
function ifElseFun(condition, trueFun, falseFun){
	if(condition){
		trueFun();
	}else{
		falseFun();
	}
}

ifElseFun(false, function(){
	console.log('ifElseFun----true------1111');
}, function(){
	console.log('ifElseFun----false-------2222');
})



//===================

//条件比较函数
function conditionFun(compare1, compare2, sign){
	if( compare1 == undefined ||  compare2 == undefined){
		console.log('비교할 대상을 넣지 않음: ', compare1, compare2);
		return ;
	}
	sign = sign || '==';
	var signArr = {
		'=': 'eqFun', 
		'==': 'eqFun', 
		'===': 'eq2Fun', 
		'>': 'gtFun',
		'<': 'ltFun',
		'>=': 'geFun', 
		'<=': 'leFun', 
		'!=': 'neFun', 
		'!==': 'ne2Fun', 
		'<>': 'neFun' 
	}
	if( signArr[sign] == undefined || sign ==''){
		console.log('틀린부호 입력: ', sign);
		return ;
	}

	function eqFun(compare1, compare2){		var rs = (compare1 == compare2) ? true : false; return rs;}
	function eq2Fun(compare1, compare2){ 	var rs = (compare1 === compare2) ? true : false; return rs; }
	function gtFun(compare1, compare2){ 		var rs = (compare1 > compare2) ? true : false; return rs; }
	function ltFun(compare1, compare2){ 		var rs = (compare1 < compare2) ? true : false; return rs; }
	function geFun(compare1, compare2){ 		var rs = (compare1 >= compare2) ? true : false; return rs; }
	function leFun(compare1, compare2){ 		var rs = (compare1 <= compare2) ? true : false; return rs; }
	function neFun(compare1, compare2){ 		var rs = (compare1 != compare2) ? true : false; return rs; }
	function ne2Fun(compare1, compare2){ 	var rs = (compare1 !== compare2) ? true : false; return rs; }

	//console.log(signArr[sign], compare1, sign, compare2);
	return eval(signArr[sign])(compare1, compare2);
}

console.log(conditionFun(2, 2)); // ==  true
console.log(conditionFun('2', 2)); // ==  true
console.log(conditionFun('2', 2,'===')); // ===  false




//=========================

//变量赋值函数
function varFun(name, value){//nodejs版
	var reg=/^(?![0-9]+$)[A-Za-z_.][A-Za-z_0-9.]{0,}$/
	if(!reg.test(name)){
		console.log('非法的文件名定义： ', name)
		return;
	}

	//console.log(typeof value, name, value);
	if(typeof value == 'string'){

		//判断是不是合法的json格式
		function isJSON (str) {
			try{
				JSON.parse(str);
				return true;
			}catch(e){
				return false;
			}
		}

		if(isJSON(value)){
			//console.log('----------isjson')
			value =  "JSON.parse("+ JSON.stringify(value) +")";
		}else{
			value = "'"+value+"'";
		}
	} 
	else if(typeof value == 'function') value= value.toString();
	else if(typeof value == 'object'){
		if(value.constructor.name=='Array') value = 'eval("['+ value+']")';
		else value =  "JSON.parse('"+ JSON.stringify(value) +"')";
	}

	eval(name +' = '+ value);
}
// function varFun(name, value){ //浏览器版
// 	window[name] =value; 
// }



varFun('num', 12.333);//数字
console.log(num)

varFun('obj', '{}');//对象
console.log(obj)
varFun('obj.aa',"123412341afasdfasd");//二维索引数组
console.log(obj.aa)

varFun('aaa', function(){//函数
	console.log('----------')
});
console.log(aaa); aaa();

varFun('bbb', [1,'2',"3",4]);//关联数组
console.log(bbb, bbb.constructor.name)

varFun('ccc', {a:111, b:"bbbb", c:'cccc'});//索引数组
console.log(ccc.a, ccc.constructor.name)

