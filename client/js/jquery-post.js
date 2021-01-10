let getTiming = setInterval(()=>{
    if(getTiming) clearInterval()

    let title = $('#title').val()
    let content = $('#content').val()
    
    if(title && content){
        $('#submit').css('animation', 'scale .8s alternate infinite')
    } else{
        $('#submit').css('animation', 'none')
    }
}, 300)