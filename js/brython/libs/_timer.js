$module =  {

    __name__ : 'timer',

    clear_interval : function(int_id){window.clearInterval(int_id)},
    
    clear_timeout : function(timeout_id){window.clearTimeout(timeout_id)},

    set_interval : function(func,interval){
        return int(window.setInterval(func,interval))
    },

    set_timeout : function(func,interval){window.setTimeout(func,interval)},
    
    request_animation_frame: function(func){
        return int(window.requestAnimationFrame(func))},
    
    cancel_animation_frame: function(int_id){window.cancelAnimationFrame(int_id)},

}
