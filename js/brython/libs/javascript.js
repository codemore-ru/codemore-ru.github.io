$module = (function(){
// transforms a Javascript constructor into a Python function
// that returns instances of the constructor, converted to Python objects
function $applyToConstructor(constructor, argArray) {
    var args = [null].concat(argArray);
    var factoryFunction = constructor.bind.apply(constructor, args);
    return new factoryFunction();
}

$JSConstructorDict = {
    __class__:$type,
    __name__:'JSConstructor'
}

$JSConstructorDict.__call__ = function(self){
    // this.js is a constructor
    // it takes Javascript arguments so we must convert
    // those passed to the Python function
    var args = []
    for(var i=1;i<arguments.length;i++){
        var arg = arguments[i]
        if(arg && (arg.__class__===$JSObjectDict || arg.__class__===$JSConstructorDict)){
            args.push(arg.js)
        }
        else if(isinstance(arg,dict)){
            var obj = new Object()
            for(var j=0;j<arg.$keys.length;j++){
                obj[arg.$keys[j]]=arg.$values[j]
            }
            args.push(obj)
        }else{args.push(arg)}
    }
    var res = $applyToConstructor(self.js,args)
    // res is a Javascript object
    return JSObject(res)
}

$JSConstructorDict.__mro__ = [$JSConstructorDict,$ObjectDict]

function JSConstructor(obj){
    return {
        __class__:$JSConstructorDict,
        js:obj
    }
}
JSConstructor.__class__ = $factory
JSConstructor.$dict = $JSConstructorDict

// JSObject : wrapper around a native Javascript object
function $JSObject(js){
    this.js = js
    this.$dict = js
    this.__class__ = $JSObjectDict
    this.__str__ = function(){return "<object 'JSObject' wraps "+this.js+">"}
    this.toString = this.__str__
}

$JSObjectDict = {
    __class__:$type,
    __name__:'JSObject',
    toString:function(){return '(JSObject)'}
}

$JSObjectDict.__bool__ = function(self){
    return (new Boolean(self.js)).valueOf()
}

$JSObjectDict.__getattribute__ = function(obj,attr){
    if(obj.js===null){return $ObjectDict.__getattribute__(None,attr)}
    if(attr==='__class__'){return $JSObjectDict}
    if(obj['get_'+attr]!==undefined){
        var res = obj['get_'+attr]
        if(typeof res==='function'){
            return (function(obj){
                return function(){return obj['get_'+attr].apply(obj,arguments)}
              })(obj)
        }
        return obj['get_'+attr]
    }else if(obj.js[attr] !== undefined){
        if(typeof obj.js[attr]=='function'){
            var res = function(){
                var args = [],arg
                for(var i=0;i<arguments.length;i++){
                    arg = arguments[i]
                    if(arg && (arg.__class__===$JSObjectDict || arg.__class__===$JSConstructorDict)){
                        args.push(arg.js)
                    }else{
                        args.push(arg)
                    }
                }
                var res = obj.js[attr].apply(obj.js,args)
                if(typeof res == 'object'){return JSObject(res)}
                else if(res===undefined){return None}
                else{return $JS2Py(res)}
            }
            res.__repr__ = function(){return '<function '+attr+'>'}
            res.__str__ = function(){return '<function '+attr+'>'}
            return res
        }else{
            return $JS2Py(obj.js[attr])
        }
    }else if(obj.js===window && attr==='$$location'){
        // special lookup because of Firefox bug 
        // https://bugzilla.mozilla.org/show_bug.cgi?id=814622
        return $Location()
    }
    
    var res
    // search in classes hierarchy, following method resolution order
    var mro = [$JSObjectDict,$ObjectDict]
    for(var i=0;i<mro.length;i++){
        var v=mro[i][attr]
        if(v!==undefined){
            res = v
            break
        }
    }
    if(res!==undefined){
        if(typeof res==='function'){
            // res is the function in one of parent classes
            // return a function that takes obj as first argument
            return function(){
                var args = [obj],arg
                for(var i=0;i<arguments.length;i++){
                    arg = arguments[i]
                    if(arg && (arg.__class__===$JSObjectDict || arg.__class__===$JSConstructorDict)){
                        args.push(arg.js)
                    }else{
                        args.push(arg)
                    }
                }
                return res.apply(obj,args)
            }
        }
        return $JS2Py(res)
    }else{
        // XXX search __getattr__
        throw AttributeError("no attribute "+attr+' for '+this)
    }

}

$JSObjectDict.__getitem__ = function(self,rank){
    try{return getattr(self.js,'__getitem__')(rank)}
    catch(err){
        console.log('err in JSObject.__getitem__ : '+err)
        throw AttributeError(self+' has no attribute __getitem__')
    }
}

$JSObjectDict.__iter__ = function(self){ // for iterator protocol
    var res = {
        __class__:JSObject,
        __getattr__:function(attr){return res[attr]},
        __iter__:function(){return res},
        __next__:function(){
            res.counter++
            if(res.counter<self.js.length){return self.js[res.counter]}
            else{throw StopIteration("StopIteration")}
        },
        __repr__:function(){return "<JSObject iterator object>"},
        __str__:function(){return "<JSObject iterator object>"},
        counter:-1
    }
    return res
}

$JSObjectDict.__len__ = function(self){
    try{return getattr(self.js,'__len__')()}
    catch(err){
        console.log('err in JSObject.__len__ : '+err)
        throw AttributeError(this+' has no attribute __len__')
    }
}

$JSObjectDict.__mro__ = [$JSObjectDict,$ObjectDict]

$JSObjectDict.__setattr__ = function(self,attr,value){
    if(isinstance(value,JSObject)){
        self.js[attr]=value.js
    }else{
        self.js[attr]=value
    }
}

function JSObject(obj){
    if(obj===null){return new $JSObject(obj)}
    if(obj.__class__===$ListDict){
        // JS arrays not created by list() must be wrapped
        if(obj.__brython__){return obj}
        else{return new $JSObject(obj)}
    }
    if(obj.__class__!==undefined && (typeof obj!=='function')){return obj}
    return new $JSObject(obj)
}
JSObject.__class__ = $factory
JSObject.$dict = $JSObjectDict

return {JSObject:JSObject,JSConstructor:JSConstructor}
})()