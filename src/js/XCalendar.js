/*
* 原生js日历插件
* By Lance Tian
* 2017-03-20
*/

window.XCalendar = (function(){
	var XC = function (params){
		this.params = params || {};
		this.year = 1970;
		this.month = 1;
		this.date = 1;
		this.daysNum = 0;
		this.firstDatePos = 0;
		this.elm = '';
		this.init();
	}
	XC.prototype = {
		constructor: XC,
		init: function(){
			this.year = this.getCurrentYear();
			this.month = this.getCurrentMonth();
			this.date = this.getCurrentDate();
			this.el = this.params.el || 'body';  //容器 默认body
			// this.firstDatePos = this.getFirstDayPos();
			this.renderWrap();
			this.renderHtml();
			this.renderData();
			this.bindSwichMonthClick();
			console.log(1);
			console.log(this.year+'-'+ this.month +'-'+ this.date);
		},
		getCurrentFullDate: function(){
			return new Date();
		},
		getCurrentDate: function(){
			return this.getCurrentFullDate().getDate();
		},
		getCurrentYear: function(){
			return this.getCurrentFullDate().getFullYear();
		},
		getCurrentMonth: function(){
			return this.getCurrentFullDate().getMonth()+1;
		},
		getNewDate: function(newDate){
			return new Date(newDate).getDate(); 
		},
		getNewMonth: function(newDate){
			return new Date(newDate).getMonth()+1; 
		},
		getNewFullYear: function(newDate){
			return new Date(newDate).getFullYear(); 
		},
		getFirstDayPos: function(date){
			var newDate = new Date(date);
			var firstDate = newDate.getFullYear() + '-' + (newDate.getMonth()+1);
			return new Date(firstDate).getDay();
		},
		getDaysNum: function(month,year){
			if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
				console.log('31');
				return 31;
			}
			else if (month == 4 || month == 6 || month == 9 || month == 11){
				console.log('30')
				return 30;
			}
			else if (month == 2) {
                return year % 4 == 0 ? 29 : 28;
            }
		},
		lastDayPos: function(){
			var firstDayPos = this.getFirstDayPos(this.year+'-'+this.month+'-'+this.date);
			var maxDayNum = this.getDaysNum(this.month,this.year);
			return firstDayPos+maxDayNum;
		},
		renderWrap: function(){
			this.container = document.querySelector(this.el);
			this.calWrapDiv = document.createElement('div');  //创建
			this.calWrapDiv.className= "x_calendar_wrap";
		},
		renderHtml: function(){
					
			var lastDayPos = this.lastDayPos(); //每月最后一天位置
			var maxDaySquare = 0;  //最多方块数量-4周28块-5周35块-6周42块

			var _html = '';
			_html += '<div class="xc_header">'+
			'<div class="xc_header_date"></div>'+
			'<div class="xc_header_left"></div>'+
			'<div class="xc_header_right"></div>'+'</div>'+
			'<div class="xc_content">'+
			'<div class="xc_week_sec">'+
			'<div class="xc_week_day">日</div>'+
			'<div class="xc_week_day">一</div>'+
			'<div class="xc_week_day">二</div>'+
			'<div class="xc_week_day">三</div>'+
			'<div class="xc_week_day">四</div>'+
			'<div class="xc_week_day">五</div>'+
			'<div class="xc_week_day">六</div>'+
			'</div>'+
			'<div class="xc_days">';

			if(lastDayPos <=28){
				maxDaySquare = 28;
			}
			else if (lastDayPos > 28 && lastDayPos <= 35){
				maxDaySquare = 35;
			}
			else {
				maxDaySquare = 42;
			}
			
			for (var i=0; i<maxDaySquare; i++){
				_html += '<div class="xc_day_single"></div>';
			}

			_html += '</div>'+
			'</div>';

			this.calWrapDiv.innerHTML = _html;

			this.container.innerHTML = '';
			this.container.appendChild(this.calWrapDiv);

		},
		renderData: function(){
			var dayDivsList = document.querySelectorAll('.xc_day_single');
			var dataHtml = '';
			var firstDayPos = this.getFirstDayPos(this.year+'-'+this.month+'-'+this.date);
			// var maxDayNum = this.getDaysNum(this.month,this.year);
			var lastDayPos = this.lastDayPos();

			document.querySelector('.x_calendar_wrap .xc_header_date ').innerHTML = this.year + '年' + this.month + '月';
			for(var i =0; i<dayDivsList.length; i++){
				dayDivsList[i].innerHTML = '';
				var tempDiv = document.createElement('div');
				tempDiv.className = 'xc_day_date_num xc_day_single_child';
				
				if(i >= firstDayPos && i < lastDayPos){
					tempDiv.innerText = i-firstDayPos+1;
				}
				dayDivsList[i].appendChild(tempDiv);
				
			}

		},
		bindSwichMonthClick: function(){
			var oBtnLeft = document.querySelector('.xc_header_left');
			var oBtnRight = document.querySelector('.xc_header_right');
			var _self = this;
			oBtnRight.addEventListener('click',function(){
				
				_self.month++
				if(_self.month>12){
					_self.year++;
					_self.month = 1;
				}
				_self.renderHtml();
				_self.renderData();
				_self.bindSwichMonthClick();
			},false);
			oBtnLeft.addEventListener('click',function(){
				
				_self.month--
				if(_self.month<=0){
					_self.year--;
					_self.month = 12;
				}
				_self.renderHtml();
				_self.renderData();
				_self.bindSwichMonthClick();
			},false);

		},

	}



	return XC;
})();
