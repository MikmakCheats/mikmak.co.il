document.write('<script type="text/javascript" src="/js/talkbacks.js"></script>');

function validateCRM(content)
{
 	var content= trim(content);
 	var bOK= true;
 	
	if (content.length < 10)
	{
		alert('יש למלא את תוכן הפנייה');
		bOK= false;
	}
	else if (content.length > 1000)
	{
		alert('לא ניתן להזין יותר מ-1000 תווים');
		bOK= false;
	}
	else if (isHTML(content))
	{
		alert('HTML' + 'לא ניתן להזין טאגים של ');	
		bOK= false;
	}
	else if (isTextFloat(content, 20))
	{
		alert(' !!!!!!! :לא ניתן להזין תו שחוזר על עצמו מספר רב של פעמים, לדוגמא');	
		bOK= false;
	}
	
	return bOK;
}