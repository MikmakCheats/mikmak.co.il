function isHTML(data){
	if (data!=null && data!="")
	{
    	data= data.toLowerCase();
	    	if (data.indexOf("embed")>=0 || data.indexOf("location.")>=0 || data.indexOf("object")>=0 || data.indexOf("img")>=0 || data.indexOf("http-equiv")>=0 || data.indexOf("iframe")>=0 || data.indexOf("window.")>=0 || data.indexOf("href")>=0 || data.indexOf("<!--")>=0)
    		return true;
	}
	return false;
}

function isTextFloat(data, floatLimit)
{
	if (data!=null && data!="")
	{
	    var counter=0;
		for (i=0; i< data.length; i++)
		{
			if (data.substring(i, i+1)==" " || data.substring(i, i+1)=="\n")
				counter=0;
				
			counter++;
			if (counter>floatLimit)	
				return true;
		}	
	}
	return false;
}

 function onSuccessLoginTalkback(userId, userName)
 {
    document.getElementById('talkbackError').style.display = 'none'; 
    document.forms["talkbackForm"].userName.value= userName;	 
    document.forms["talkbackForm"].content.focus();	    
 }

function submitTalkback(itemId)
{
	if (!loggedUser)
	{
	   displayLoginPopup(loginInfoTalkback, onSuccessLoginTalkback);				
	   return;
	}

 	var content= trim(document.forms["talkbackForm"].content.value);
 	 	 	
	if (trim(document.getElementById('content').value).length < 3)
	{
		document.getElementById('talkbackError').style.display = '';
		document.getElementById('talkbackErrorMsg').innerHTML = 'יש למלא את תגובתך';
	}
	else if (content.length > 500)
	{
		document.getElementById('talkbackError').style.display = '';
		document.getElementById('talkbackErrorMsg').innerHTML = 'ניתן לכתוב תגובות באורך של עד 500 תווים';
	}
	else if (isHTML(content))
	{
		alert('בטוקבקים ' + 'HTML' + 'לא ניתן להזין קוד ');	
	}
	else if (isTextFloat(content,20))
	{
		alert(' !!!!!!! :לא ניתן להזין תו שחוזר על עצמו מספר רב של פעמים, לדוגמא');	
	}
	else
	{
	    var talkbackCount= document.forms["talkbackForm"].talkbackCount.value;
	    var ctg= document.forms["talkbackForm"].ctg.value;
	    var ctgId= document.forms["talkbackForm"].ctgId.value;
		document.getElementById('shoutboxSending').style.display = '';
		document.getElementById('shoutbox').style.display = 'none';		
		//document.getElementById("errMsgL").style.display='none';
		
		var objX = new XMLHttp();
		objX.post("/servlet/com.dic.vw.users.site.servletTokenFetch", null, "ajaxTalkback");
		objX.response= function(res, token) 
		{						
			var objX2= new XMLHttp();
			objX2.post("/servlet/com.dic.vw.talkback.site.servletAjaxAddTalkback",  "itemId=" + itemId + "&ctgId=" + ctgId + "&ctg=" + ctg + "&content=" + content + "&talkbackCount=" + talkbackCount, token);
			objX2.response= function(res) 
			{	
				talkbackSent(res);
			}		
			objX2.responseErr= function(statusCode, err) 
			{
				talkbackErr(err);
			}
		}
		objX.responseErr= function(statusCode, err) 
		{
			talkbackErr(err);
		}
	}
  }


function talkbackSent(res)
{
	if (res=='sessionTimeout')
	{
	   document.getElementById('shoutbox').style.display = '';
       document.getElementById('shoutboxSending').style.display = 'none';
	   document.getElementById('talkbackError').style.display = '';
	   document.getElementById('talkbackErrorMsg').innerHTML = 'יש להתחבר שוב לאתר. אנא התחבר ונסה שנית';
	   clearSession();
       document.forms["talkbackForm"].userName.value= "";	 	   
	   displayLoginPopup(loginInfoTalkback, onSuccessLoginTalkback);				
    } 
	else
	{
		document.getElementById('shoutboxSending').style.display = 'none';
		if (document.getElementById('shoutbox').style.display == 'none')
		  document.getElementById('shoutboxSent').style.display = '';
	  }
}

function talkbackErr(err)
{	
	document.getElementById('shoutbox').style.display = '';
	document.getElementById('shoutboxSending').style.display = 'none';
    alert('אופס! קרתה תקלה. אנא נסו שוב מאוחר יותר');	
}