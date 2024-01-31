	var timerCheck= 1000*60; 	

	checkPendingData();
	
	function checkPendingData()
	{
	    setTimeout(function() { checkPendingData(); }, timerCheck);		  

	    var lastDate= localStorage.getItem("pdate");

		if (lastDate==null)
		{
	      localStorage.setItem("pdate", new Date());
	      return;
		}
	    else
	    {
	      var diff = Math.abs(new Date(lastDate) - new Date());
	      var diffMinutes= Math.floor((diff/1000)/60);	     

	      if (diffMinutes<5)
	        return;	        	        	        	        
	    }
	    
		
		var params= "";
		
		for (var i = 0; i < localStorage.length; i++) 
		{		
		  var key= localStorage.key(i);

		  if (key.indexOf("p_")==0)
		  {
			  var value= localStorage.getItem(key);
			  
			  if (value!=null && value!="")
			    params+= key +"=" + value + "&"; 			   
			    
		      localStorage.removeItem(key);
		   }
		}		
		
		if (params!="")
		{
	      localStorage.setItem("pdate", new Date());
		  updatePendingData(params); 	            
		}		
	}
	
	function addPendingData(ctg, id, extra)	
	{
       var key= "p_" + ctg;
 	   var list= localStorage.getItem(key);
	   if (list!=null && list.indexOf("," + id + ",")>=0)
	     return;  
	   
	   if (list==null)
		  list= ",";	   

	   list= list + id + (extra!=null && extra!="" ? "-" + extra : "") + ",";
	   localStorage.setItem(key, list);
	}

	function updatePendingData(params)
	{
		var objX = new XMLHttp();
		objX.post("/servlet/com.dic.vw.users.site.servletTokenFetch", null, "ajaxPendingData");
		objX.response= function(res, token) 
		{						
			if (token!="")
			{
			    setTimeout(function() 
			    { 
					var objX2= new XMLHttp();
					objX2.post("/servlet/com.dic.vw.site.servletUpdatePendingData", params, token);
			    }, 250);		  
			}
		}
	}

	function showSurveyResults()
	{ 
		document.getElementById('surveyResults').style.display = '';
	}
	function showSurveyVoting()
	{ 
		document.getElementById('surveyVoting').style.display = '';
	}
	function hideSurveyResults()
	{ 
		document.getElementById('surveyResults').style.display = 'none';
	}
	function hideSurveyVoting()
	{ 
		document.getElementById('surveyVoting').style.display = 'none';
	}

	function surveyVote(id)
	{
		var arr = document.getElementsByName('answer');
		
		var answer = 0;
		for (var i = 0; i < arr.length; i++)
		{
			if (arr[i].checked)
			{
				answer = i + 1;
			}
		}
		
		if (answer==0)
		{ 
			alert('יש לבחור באחת האפשרויות');
		}
		else if (!isVote('', id, true, answer))
		{					   
		}
		else
			alert("ניתן להצביע רק פעם אחת");
	}
	

	function isVote(ctg, id, add, extra)
	{		
		var key= ctg + 'poll';		
		var list= localStorage.getItem(key);
		var exist= true;
	
		if (list==null || list.indexOf("," + id + ",")<0)
		  exist= false;

		if (!exist && add)
		{
			if (list==null)
		 	  list= ",";
	
			list=list + id + ",";
			localStorage.setItem(key, list);
   			addPendingData(key, id + "-" + extra); 	
	   }

	   return exist;
	}

	function increaseView(ctg, id)
	{		
		var key= ctg + 'Views';
		var views= localStorage.getItem(key);
		var exist= true;
	
		if (views==null || views.indexOf("," + id + ",")<0)
		  exist= false;
	
		if (!exist)
		{
			setTimeout(function()
			{ 
				if (views==null)
			 	  views= ",";

			    views=views+ id + ",";
			    localStorage.setItem(key, views);
				addPendingData(key, id, null); 						
			}, 1000);			
			
			//temp from 19/8/2020
			deleteCookie("galleryViews");
			deleteCookie("blogViews");		   
	   }
	   
	   return exist;
	}
		

	function isLikeExist(ctg, id, add)
	{
		var key= ctg + 'Likes';		
		var likes= localStorage.getItem(key);
		var exist= true;
	
		if (likes==null || likes.indexOf("," + id + ",")<0)
		  exist= false;

		if (add && !exist)
		{
			if (likes==null)
		 	  likes= ",";
	
			likes=likes + id + ",";
			localStorage.setItem(key, likes);
			addPendingData(key, id, null); 									
	   }
	   
	   return exist;
	}
	
	
	function MikLike(ctg, id)
	{
		if (isLikeExist(ctg, id, true)==false)
		{
			showLikeBtn(ctg, id);

			//temp from 19/8/2020
			deleteCookie("gallerylikes");
			deleteCookie("bloglikes");
		}
		else
		{
		  if (ctg=='g')
		    alert("ניתן להצביע לאותה יצירה פעם אחת ביום בלבד. תודה");
		  else
		    alert("ניתן להצביע פעם אחת בלבד. תודה");
		}
	}	

	function showLikeBtn(ctg, id)
	{
		if (isLikeExist(ctg, id, false))
		{
			if (document.getElementById('mikLikeCounterTextID').style.display=='none')
			{
				document.getElementById('likeBtnEna').style.display='';

				document.getElementById('hMikLike1').style.display=''; 
				document.getElementById('imgMikLike1').style.display=''; 

				document.getElementById('hMikLike2').style.display='none'; 
				document.getElementById('imgMikLike2').style.display='none'; 

				document.getElementById('imgMikLike1').src='/images/gallery/miklike_cut_h.png';

				document.getElementById('mikLikeCounterTextID').style.display=''; 
				document.getElementById('mikLikeCounterText').innerHTML='1'; 			
			}
			else
			{
				document.getElementById('likeBtnDis').style.display='';
				document.getElementById('likeBtnEna').style.display='none';
			}
		}
		else
		{
			document.getElementById('likeBtnEna').style.display='';
		}
	}	
	
