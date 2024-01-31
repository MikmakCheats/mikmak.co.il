XMLHttp = function() 
{
	var self = this;
	try
	{    
		// Firefox, Opera 8.0+, Safari    
		self.xmlHttp = new XMLHttpRequest();    
	}
	catch (e)
	{    
		// Internet Explorer    
		try
		{      
			self.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");      
		}
		catch (e)
		{      
			try
			{        
				self.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");        
			}
			catch (e)
			{        
				alert("Your browser does not support AJAX!");       
				return false;       
			}
		}    
	}  
}

/*
XMLHttp.prototype.head = function(url) 
{
	var self = this;
  self.xmlHttp.open('HEAD', url, true);
  self.xmlHttp.onreadystatechange = function() 
  {
	 self.processRequest();
	}
  self.xmlHttp.send(null);
}*/


XMLHttp.prototype.get = function(url) 
{
	var self = this;
  self.xmlHttp.open('GET', url, true);
  self.xmlHttp.onreadystatechange = function() 
  {
	 self.processRequest();
	}
  self.xmlHttp.send(null);
}


XMLHttp.prototype.post= function(url, params, token) 
{
	var self = this;
	if (token==undefined || token==null) 
	{
	   metaT= document.getElementsByTagName('meta')['cToken'];
	   token= metaT==undefined  ? null : metaT.content;	
	}
	
	self.xmlHttp.open("POST", url, true);
	self.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	if (token!=undefined && token!=null)
      self.xmlHttp.setRequestHeader("cToken", token);
	
    self.xmlHttp.onreadystatechange = function() 
    {
		self.processRequest();
	}
    self.xmlHttp.send(params);
}


XMLHttp.prototype.processRequest = function() 
{
  var self = this;
  
  if (self.xmlHttp.readyState == 4) 
  {
		if (self.xmlHttp.status != 200) 
		{
		    self.responseErr(self.xmlHttp.status, "error");
		} 
		else 
		{
			if (self.xmlHttp.getResponseHeader("content-type") == null)
				self.resp = 'null';
			else if (self.xmlHttp.getResponseHeader("content-type").indexOf('text/xml') >= 0) 
				self.resp = 'xml';
			else if (self.xmlHttp.getResponseHeader("content-type").indexOf('text/html') >= 0 || self.xmlHttp.getResponseHeader("content-type").indexOf('text/plain') >= 0) 
				self.resp = 'text';
			else 
				self.resp = 'unknown content type';

			var token= self.xmlHttp.getResponseHeader('cToken');
			if (token!=null)
			{
		      self.response(self.xmlHttp.responseText, token);
		    }
		    else 
		    {
		       try
		       {
		          self.response(self.xmlHttp.responseText);
		       }
		       catch(err) {}
		    }
		}
  }
}
	