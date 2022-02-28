class ApiClient{

    static IsDebbuging=true;

    static get  BaseUrl(){
        var url='https://LaLuzDelAlma.es';
        if(ApiClient.IsDebbuging){
            url='http://localhost:8000';
        }

        return url;
    }
    static get GoogleLoginUrl(){
        return ApiClient.BaseUrl+"/login/google";
    }
    static get GetTokenUrl(){
        return ApiClient.BaseUrl+"/getToken";
    }


    static Login(){
        return new Promise((okey,error)=>{
            var token='';
            var pop;
            var data;
            var form;

            for(var i=0;i<15;i++)
                token+=Math.random().toString(36).substring(2, 8);
            console.log(token);
            localStorage.setItem('tokenOwn',token);

            data = {
                "tokenOwn": token,
               
              };
              
            form =ApiClient.getForm(ApiClient.GoogleLoginUrl, "_blank", data, "post");
            
            document.body.appendChild(form);
            pop=window.open('', "formpopup","width=900,height=590,toolbar=no,scrollbars=yes,resizable=no,location=0,directories=0,status=1,menubar=0,left=60,top=60");
            form.target = 'formpopup';
            form.submit();
            form.parentNode.removeChild(form);

            setTimeout(()=>ApiClient._LoginPop(pop,okey,error),500);
            
        
        }).then(r=>r).then(resp=>{
            console.log(resp);
            if(resp.Token){
              
                localStorage.setItem('Token',resp.Token);
                localStorage.setItem('RenovarToken',resp.RenovarToken);
                localStorage.setItem('Caduca','');
                       
            }
        }).catch(console.error);
    }
    static _LoginPop(pop,okey,error){
        var url=null;
        var jsonData=null;
        try{

        
        if(pop.closed){
            //envio la petición
            console.log('cerrado!');
            url=ApiClient.GetTokenUrl;
            jsonData={ TokenOwn:localStorage.getItem('tokenOwn')};
            console.log(jsonData);
            
            ApiClient.Send(url,jsonData).then(okey).catch(error);

            
        }else{
            console.log('abierto');
            setTimeout(()=>ApiClient._LoginPop(pop,okey,error),500);
        }
    }catch{

    }
   

    }
    static Send(url,data){

        var requestOptions = {
            method: 'POST',
            mode: 'no-cors', 
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify( data)
        };
        return fetch(url,requestOptions);
    }


    static getForm(url, target, values, method) {
        function grabValues(x) {
          var path = [];
          var depth = 0;
          var results = [];
      
          function iterate(x) {
            switch (typeof x) {
              case 'function':
              case 'undefined':
              case 'null':
                break;
              case 'object':
                if (Array.isArray(x))
                  for (var i = 0; i < x.length; i++) {
                    path[depth++] = i;
                    iterate(x[i]);
                  }
                else
                  for (var i in x) {
                    path[depth++] = i;
                    iterate(x[i]);
                  }
                break;
              default:
                results.push({
                  path: path.slice(0),
                  value: x
                })
                break;
            }
            path.splice(--depth);
          }
          iterate(x);
          return results;
        }
        var form = document.createElement("form");
        form.method = method;
        form.action = url;
        form.target = target;
      
        var values = grabValues(values);
      
        for (var j = 0; j < values.length; j++) {
          var input = document.createElement("input");
          input.type = "hidden";
          input.value = values[j].value;
          input.name = values[j].path[0];
          for (var k = 1; k < values[j].path.length; k++) {
            input.name += "[" + values[j].path[k] + "]";
          }
          form.appendChild(input);
        }
        return form;
      }
}