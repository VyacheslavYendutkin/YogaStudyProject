window.addEventListener('DOMContentLoaded', function(){

    'use strict';
    
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


//---------------------------------------------------------------

    function hideTabContent(a){
        for (let i = a; i < tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);

    function showTabContent(b){
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        };
    };

    info.addEventListener('click', function(event){
        let target = event.target;
        
        if (target && target.classList.contains('info-header-tab')){
            for (let i = 0; i < tab.length; i++){
                if (target == tab[i]){
                    
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                };
            };
        };
    });

    //Timer


    let deadLine ='2020-1-31';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000 * 60 * 60)));

        return{
            'total' : t,
            'hours' : hours,
            'minute' : minutes,
            'second' : seconds
        };
    };

    getTimeRemaining(deadLine);

    function setClock(id, endtime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minute = timer.querySelector('.minutes'),
            second = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

            
            
        function updateClock(){
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minute.textContent = t.minute;
            second.textContent = t.second;
            if (t.total <= 0 ){
                clearInterval(timeInterval);
                hours.textContent = '00';
                minute.textContent = '00';
                second.textContent = '00';
            };
        };
    };

    setClock('timer', deadLine);

    //Modal
    
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close =  document.querySelector('.popup-close');

    more.addEventListener('click', function(){
        overlay.style.display ='block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){
        overlay.style.display ='none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // class options{
    //     constructor(hieght = 10, width = "100%", bg, fontSize, textAlign){
    //         this.hieght = hieght;
    //         this.width = width;
    //         this.bg = bg;
    //         this.fontSize = fontSize;
    //         this.textAlign = textAlign;

    //         return hieght;
    //         return width;
    //         return bg;
    //         return fontSize;
    //         return textAlign;
    //     };

    //     div(){
    //         let block = document.createElement('DIV');
    //         console.log(block);
    //         console.log(this.hieght);
    //         block.classList.add = 'new-div';
    //         block.innerHTML = 'Любой текст';
    //         document.body.appendChild(block);
    //         block.style.cssText = `hieght: ${this.hieght}px; width: ${this.width}; background: ${this.bg}; 
    //         font-size: ${this.fontSize}px; text-align: ${this.textAlign}`;
    //     };
    // };

    let addDiv = new options(100, "100%" ,'yellow', 14, 'center');

    addDiv.div();

    //---------------------------------------------------------------

    let message = {
        loading: "Загрузка",
        succses: "Спасибо, скоро мы с вами свяжемся",
        failure: "Что-то пошло не так"
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div'),
        connectForm = document.getElementById('form'),
        emailInput = connectForm.getElementsByTagName('input')[0],
        phoneInput = connectForm.getElementsByTagName('input')[1];

    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event){
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key){
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(JSON);

        request.addEventListener('readystatechange', function(){
            if(request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            }else if(request.readyState === 4 && request.status == 200){
                statusMessage.innerHTML = message.succses;
            }else{
                statusMessage.innerHTML = message.failure;
            };
        });

        for (let i = 0; i < input.length; i++){
            input[i].value = '';
        }
    });

//Мы свяжемся с вами!

    connectForm.addEventListener('submit', function(event){
        event.preventDefault();
        connectForm.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(connectForm);
        let obj = {};
        formData.forEach(function(value, key){
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(JSON);

        request.addEventListener('readystatechange', function(){
            if(request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            }else if(request.readyState === 4 && request.status == 200){
                statusMessage.innerHTML = message.succses;
            }else{
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < emailInput.length; i++){
            input[i].value = '';
        }
        for (let i = 0; i < phoneInput.length; i++){
            input[i].value = '';
        }
    });
});