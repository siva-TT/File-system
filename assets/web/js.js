
function HideConnectKeyboard() {

    var temp = document.getElementById('firstname');
    temp.blur();

    temp = document.getElementById('lastname');
    temp.blur();

    temp = document.getElementById('emailid');
    temp.blur();

    temp = document.getElementById('phoneno');
    temp.blur();

}

function HideEmailAuthKeyboard() {

    var temp = document.getElementById('emailid');
    temp.blur();
}

function HideMobileAuthKeyboard() {

    var temp = document.getElementById('phoneno');
    temp.blur();
}

function HideValidateKeyboard() {

    if(document.getElementById('memberid'))
    {
        var temp = document.getElementById('memberid');
        temp.blur();
    }  
}
function HideForgotKeyboard() {

    var temp = document.getElementById('firstname');
    temp.blur();

    temp = document.getElementById('lastname');
    temp.blur();
}

function ValidateEmail(EmailID, ErrMsg)
{
    var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    if(EmailID.match(emailExp))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function GetCheckedValue(radioGroupID)
{
    if(!radioGroupID)
    {
        return '';
    }

    var radioLength = radioGroupID.length;

    if(radioLength == undefined)
    {
        if(radioGroupID.checked)
            return radioGroupID.value;
        else
            return '';
    }

    for(var i = 0; i < radioLength; i++) 
    {
        if(radioGroupID[i].checked) 
        {
            return radioGroupID[i].value;
        }
    }

    return '';
}

function CharacterFiltering(e)
{
    var unicode=e.charCode || e.keyCode;

    if (unicode!=8)
    { 
        if ((unicode == 94||unicode == 124 || unicode==126))
            return false;
    }
}

function Connect_Member(QString) {

    HideConnectKeyboard();

    QString = QString.replace(/\+/g,' ');

    var err_msg = '';

    var fnID = document.getElementById('firstname');
    var firstname = removeWhiteSpace(fnID.value);

    try 
    {
        if( firstname == '' || firstname.search(/[a-zA-Z]/) == -1)
        {
            fnID.value = removeWhiteSpace(firstname);
            err_msg = 'First name required to complete your registration. Please try again';
            return err_msg;
        }

        if(firstname.length<2 || firstname.length>16)
        {
            fnID.value = removeWhiteSpace(firstname);
            err_msg = 'Your firstname must be between 2 to 16 characters. Please try again';
            return err_msg;
        }

        fnID.value = removeWhiteSpace(firstname);

        if(firstname.search(/[.]/) != -1)
        {
            err_msg = 'Your firstname should not contain \'.\'';
            return err_msg;
        }

        var lastname = removeWhiteSpace(document.getElementById('lastname').value);

        if( lastname == '' || lastname.search(/[a-zA-Z]/) == -1)
        {
            document.getElementById('lastname').value = removeWhiteSpace(lastname);

            err_msg = 'Last name required to complete your registration. Please try again';
            return err_msg;
        }

        if(lastname.length<2 || lastname.length>16)
        {
            document.getElementById('lastname').value = removeWhiteSpace(lastname);
            err_msg = 'Your lastname must be between 2 to 16 characters. Please try again';
            return err_msg;
        }

        document.getElementById('lastname').value = removeWhiteSpace(lastname);

        if(lastname.search(/[.]/) != -1)
        {
            err_msg = 'Your lastname should not contain \'.\'';
            return err_msg;
        }

        var verify_date_pick = $('#date_pick').val();
        var verify_month_pick = $('#month_pick').val();
        var verify_year_pick = $('#year_pick').val();
        var datecheck = new Date();
        datecheck = datecheck.getFullYear() - 18;
        if(verify_date_pick=="" && verify_month_pick=="" && verify_year_pick=="")
        {
            err_msg = 'Date of birth required to complete your registration. Please try again';
            return err_msg;
        }
        else if(verify_date_pick=="")
        {
            err_msg = 'Please enter day in date of birth';
            return err_msg;
        }
        else if(verify_date_pick!="" && verify_date_pick>31)
        {
            err_msg = 'Please enter valid date of birth';
            return err_msg;
        }
        else if(verify_month_pick=="")
        {
            err_msg = 'Month of birth required to complete your registration. Please try again';
            return err_msg;
        }
        else if(verify_year_pick=="")
        {
            err_msg = 'Year of birth required to complete your registration. Please try again';
            return err_msg;
        }
        else if(verify_year_pick!="" && verify_year_pick<1900)
        {
            err_msg = 'Please enter valid date of birth';
            return err_msg;
        }
        else if(verify_year_pick!="" && verify_year_pick>datecheck)
        {
            err_msg = 'Invalid date of birth. Please try again';
            return err_msg;
        }
        else
        {
            var dateofbirth = verify_year_pick+"-"+verify_month_pick+"-"+verify_date_pick;
            var validdateofbirth = verify_month_pick+"/"+verify_date_pick+"/"+verify_year_pick;
            var dob = dateofbirth;

            if(isValidDateCheck(validdateofbirth)==false)
            {
                err_msg = 'Please select valid date of birth';
                return err_msg;
            }
            var validDOB = new Date(validdateofbirth);
            var currdateDOB = new Date();
            var getvalidyear = currdateDOB.getFullYear() - 18;
            currdateDOB.setFullYear(getvalidyear);
            if(validDOB.getTime() > currdateDOB.getTime())
            {
                err_msg = 'Invalid date of birth. Please try again';
                return err_msg;
            }
            document.getElementById('dob').value = dob;    
        }

        var postalcode = document.getElementById('postalcode').value;
        /*if( postalcode == '' )
        {
            err_msg = 'Postcode required to complete your registration. Please try again';            
            return err_msg;
        }*/
        if(postalcode!='' && postalcode.length < 4)
        {
            err_msg = 'Your Postcode must be 4 digits long. Please try again.';
            return err_msg;
        }

        var mobilenoID = document.getElementById('phoneno');
        var mobilenoVal = mobilenoID.value;
        var mobilenoLen = mobilenoVal.length;
        var checkplus = (mobilenoVal.match(/\+/g) || []).length;
        /*if(mobilenoVal=="")
        {
            err_msg = 'Mobile number required to complete your registration. Please try again';     
            return err_msg;
        }*/

        if (mobilenoVal != '')
        {
            if (mobilenoLen < 9)
            {
                err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';     
                return err_msg;
            }

            if (checkplus != 1 && checkplus != 0) 
            {
                err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';    
                return err_msg;
            }
            else
            {
                if (checkplus == 1) 
                {
                    if (mobilenoVal.substring(0, 1) != '+') 
                    {
                        err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';    
                        return err_msg;
                    }
                }
            }

            if (mobilenoLen == 9)
            {
                if (mobilenoVal.substring(0, 1) != 4)
                {
                    err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';   
                    return err_msg;
                }
            }
            else if (mobilenoLen == 10)
            {
                if (mobilenoVal.substring(0, 2) != 04)
                {
                    err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';     
                    return err_msg;
                }
            }
            else if (mobilenoLen == 11)
            {
                if (mobilenoVal.substring(0, 3) != 614)
                {
                    err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';     
                    return err_msg;
                }
            }
            else if (mobilenoLen == 12)
            {
                if (mobilenoVal.substring(0, 4) != '+614')
                {
                    err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';     
                    return err_msg;
                }
            }
        }

        var emailid = document.getElementById('emailid').value;

        if(emailid!='' && emailid.length > 0)
        {
            if(emailid.length>50)
            {   
                err_msg = 'Your email address can be up to 50 characters long. Please try again';
                return err_msg;
            }
            var res = ValidateEmail(emailid, 'Not a Valid \'Email ID\'');
            if(res == false)
            {
                err_msg = 'A valid email address required to complete your registration. Please try again';
                return err_msg;
            }
        }
    }
    catch(e) 
    {
        err_msg = 'cm js error: ' + e.message;
    }    
    finally 
    {
        if(err_msg.length == 0)
        {
            return '1' + '|' + QString;
        }
        else
        {
            return '0' + '|' + err_msg;  
        }
    }
}
function Email_Auth(QString) {

    HideEmailAuthKeyboard();

    QString = QString.replace(/\+/g,' ');

    var err_msg = '';

    try 
    {
        var emailid = document.getElementById('emailid').value;

        if(emailid=="")
        {
            err_msg = 'Email address required to complete your registration. Please try again';     
            return err_msg;
        }
        if(emailid!='' && emailid.length > 0)
        {
            if(emailid.length>50)
            {   
                err_msg = 'Your email address can be up to 50 characters long. Please try again';
                return err_msg;
            }
            var res = ValidateEmail(emailid, 'Not a Valid \'Email ID\'');
            if(res == false)
            {
                err_msg = 'A valid email address required to complete your registration. Please try again';
                return err_msg;
            }
        }

    }
    catch(e) 
    {
        err_msg = 'cm js error: ' + e.message;
    }    
    finally 
    {
        if(err_msg.length == 0)
        {
            return '1' + '|' + QString;
        }
        else
        {
            return '0' + '|' + err_msg;  
        }
    }
}
function MobileNum_Auth(QString) {

    HideMobileAuthKeyboard();

    QString = QString.replace(/\+/g,' ');

    var err_msg = '';

    try 
    {
        var mobilenoID = document.getElementById('phoneno');
        var mobilenoVal = mobilenoID.value;
        var mobilenoLen = mobilenoVal.length;
        var checkplus = (mobilenoVal.match(/\+/g) || []).length;
        if(mobilenoVal=="")
        {
            err_msg = 'Mobile number required to complete your registration. Please try again';     
            return err_msg;
        }

        if (mobilenoVal != '')
        {
            if (mobilenoLen < 9)
            {
                err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';     
                return err_msg;
            }

            if (checkplus != 1 && checkplus != 0) 
            {
                err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';    
                return err_msg;
            }
            else
            {
                if (checkplus == 1) 
                {
                    if (mobilenoVal.substring(0, 1) != '+') 
                    {
                        err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';    
                        return err_msg;
                    }
                }
            }

            if (mobilenoLen == 9)
            {
                if (mobilenoVal.substring(0, 1) != 4)
                {
                    err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';   
                    return err_msg;
                }
            }
            else if (mobilenoLen == 10)
            {
                if (mobilenoVal.substring(0, 2) != 04)
                {
                    err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';     
                    return err_msg;
                }
            }
            else if (mobilenoLen == 11)
            {
                if (mobilenoVal.substring(0, 3) != 614)
                {
                    err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';     
                    return err_msg;
                }
            }
            else if (mobilenoLen == 12)
            {
                if (mobilenoVal.substring(0, 4) != '+614')
                {
                    err_msg = 'Mobile number required to complete your registration. Please try again. E.g. 04XXXXXXXX';     
                    return err_msg;
                }
            }
        }
    }
    catch(e) 
    {
        err_msg = 'cm js error: ' + e.message;
    }    
    finally 
    {
        if(err_msg.length == 0)
        {
            return '1' + '|' + QString;
        }
        else
        {
            return '0' + '|' + err_msg;  
        }
    }
}
function phonenumbersonly(e)
{
    var ctl = document.getElementById('phoneno');
    var str = ctl.value;
    var unicode=e.charCode || e.keyCode;
    var startPos = ctl.selectionStart;

    var prefix = "04";
    ctl.onkeydown = function() {
        var startPos = ctl.selectionStart;
        var endPos = ctl.selectionEnd;  

        var key = event.keyCode || event.charCode;  
        if(key == 8) 
        {
            if(document.getElementById('phoneno').value.indexOf(prefix)==0 && document.getElementById('phoneno').value.length==2)
            {
                return false;
            }
            else if(document.getElementById('phoneno').value.indexOf(prefix)==0 && (startPos == 1 || startPos == 2))
            {
                return false;
            }
        }   
    };

    if (unicode!=8)
    {
        if(document.getElementById('phoneno').value.indexOf(prefix)!==0)
        {
            document.getElementById('phoneno').value = prefix + document.getElementById('phoneno').value;
        }
        if (unicode > 31 && (unicode < 48 || unicode > 57))
            return false;
    }
}
function setPrefix()
{
    var ctl = document.getElementById('phoneno');
    var prefix = "04";
    ctl.onkeydown = function() {
        var key = event.keyCode || event.charCode;  

        if((key == 8) && (document.getElementById('phoneno').value.indexOf(prefix)==0) && (document.getElementById('phoneno').value.length==2))
        {
            return false;
        }   
    };
    if(document.getElementById('phoneno').value.indexOf(prefix) !== 0 )
    {
        document.getElementById('phoneno').value = prefix + document.getElementById('phoneno').value;
    }
}
function checkPhonenumber()
{
    var prefix = "04";
    if((document.getElementById('phoneno').value.indexOf(prefix) == 0 && document.getElementById('phoneno').value.length <= 2) || (document.getElementById('phoneno').value.indexOf(prefix) == -1))
    {
        document.getElementById('phoneno').value = "";
    }
}
function DaysInMonth(Y, M) {
    with (new Date(Y, M, 1, 12)) {
        setDate(0);
        return getDate();
    }
}
function datediff(date1, date2) {
    var y1 = date1.getFullYear(), m1 = date1.getMonth(), d1 = date1.getDate(),
    y2 = date2.getFullYear(), m2 = date2.getMonth(), d2 = date2.getDate();
    if (d1 < d2) {
        m1--;
        d1 += DaysInMonth(y2, m2);
    }
    if (m1 < m2) {
        y1--;
        m1 += 12;
    }
    return [y1 - y2, m1 - m2, d1 - d2];
}
function calculateAge(udob)
{
    var curdate =   new Date();
    var curday  =   curdate.getDate();
    var curmon  =   1+curdate.getMonth();
    var curyear =   curdate.getFullYear();

    var userdate    =   udob;
    var userdate1   =   userdate.split("-");
    var calday  =   userdate1[2];
    var calmon  =   userdate1[1];
    var calyear =   userdate1[0];

    if(curday == calday &&  curmon==calmon && curyear==calyear)
    {
        return '';
    }
    else
    {
        if(parseFloat(calyear)>parseFloat(curyear))
        {   
            return '';
        }
        else if(parseFloat(calyear)==parseFloat(curyear) && parseFloat(calmon)>parseFloat(curmon))
        {   
            return '';
        }
        else if(parseFloat(calyear)==parseFloat(curyear) && parseFloat(calmon)==parseFloat(curmon) && parseFloat(calday)>parseFloat(curday))
        {   
            return '';
        }
        else
        {
            var curd = new Date(curyear,curmon-1,curday);
            var cald = new Date(calyear,calmon-1,calday);

            var diff =  Date.UTC(curyear,curmon-1,curday,0,0,0) - Date.UTC(calyear,calmon-1,calday,0,0,0);

            var dife = datediff(curd,cald);
            var nYear   =   dife[0];
            var nMon    =   dife[1];
            var nDay    =   dife[2];

            if(nYear<18)
            {
                return '';
            }               
        }
    }
}
function UnEscapeQueryString (QString)
{
    QString = QString.replace(/\+/g,' ');

    return unescape(QString);
}

function SetValue(vID,Val,enable)
{
    document.getElementById(vID).value = Val;

    if(enable==1)
    {
        document.getElementById(vID).readOnly = false;
    }
    else
    {
        document.getElementById(vID).readOnly = true;
    }
}

function Validate_Member(QString) {

    var pagenameCheck = document.getElementById('pageCheck').value;
    if (pagenameCheck == "register_as_GUEST") {
        HideForgotKeyboard();
        var fnID = document.getElementById('firstname');
        var firstname = removeWhiteSpace(fnID.value);
    } else if (pagenameCheck == "register_as_MEMBER") {
        HideValidateKeyboard();
    }

    QString = QString.replace(/\+/g,' ');

    var err_msg = '';    
    var err_code = '0';

    try 
    {   
        if (pagenameCheck == "register_as_GUEST") {

            if( firstname == '' || firstname.search(/[a-zA-Z]/) == -1)
            {
                fnID.value = removeWhiteSpace(firstname);
                err_msg = 'First name required to complete your registration. Please try again';
                return err_msg;
            }

            if(firstname.length<2 || firstname.length>16)
            {
                fnID.value = removeWhiteSpace(firstname);
                err_msg = 'Your firstname must be between 2 to 16 characters. Please try again';
                return err_msg;
            }

            fnID.value = removeWhiteSpace(firstname);

            if(firstname.search(/[.]/) != -1)
            {
                err_msg = 'Your firstname should not contain \'.\'';
                return err_msg;
            }

            var lastname = removeWhiteSpace(document.getElementById('lastname').value);

            if( lastname == '' || lastname.search(/[a-zA-Z]/) == -1)
            {
                document.getElementById('lastname').value = removeWhiteSpace(lastname);

                err_msg = 'Last name required to complete your registration. Please try again';
                return err_msg;
            }

            if(lastname.length<2 || lastname.length>16)
            {
                document.getElementById('lastname').value = removeWhiteSpace(lastname);
                err_msg = 'Your surname must be between 2 to 16 characters. Please try again';
                return err_msg;
            }

            document.getElementById('lastname').value = removeWhiteSpace(lastname);

            if(lastname.search(/[.]/) != -1)
            {
                err_msg = 'Your surname should not contain \'.\'';
                return err_msg;
            }
        } else if (pagenameCheck == "register_as_MEMBER") {
            var memberid = document.getElementById('memberid').value;

            if( memberid == '' )
            {
                err_msg = 'Member number required to complete your registration (tip: it\'s printed on the front of your member card)';
                err_code = 'e1';
                return err_msg;        
            }
        }

        var verify_date_pick = $('#date_pick').val();
        var verify_month_pick = $('#month_pick').val();
        var verify_year_pick = $('#year_pick').val();
        var datecheck = new Date();
        datecheck = datecheck.getFullYear() - 18;
        if(verify_date_pick=="" && verify_month_pick=="" && verify_year_pick=="")
        {
            err_msg = 'Date of birth required to complete your registration. Please try again'; 
            return err_msg;
        }
        else if(verify_date_pick=="")
        {
            err_msg = 'Please enter day in date of birth';
            return err_msg;
        }
        else if(verify_date_pick!="" && verify_date_pick>31)
        {
            err_msg = 'Please enter valid date of birth';
            return err_msg;
        }
        else if(verify_month_pick=="")
        {
            err_msg = 'Month of birth required to complete your registration. Please try again';                     
            return err_msg;
        }
        else if(verify_year_pick=="")
        {
            err_msg = 'Year of birth required to complete your registration. Please try again';
            return err_msg;
        }
        else if(verify_year_pick!="" && verify_year_pick<1900)
        {
            err_msg = 'Please enter valid date of birth';
            return err_msg;
        }
        else if(verify_year_pick!="" && verify_year_pick>datecheck)
        {
            err_msg = 'Invalid date of birth. Please try again';
            return err_msg;
        }
        else
        {
            var dateofbirth = verify_year_pick+"-"+verify_month_pick+"-"+verify_date_pick;
            var validdateofbirth = verify_month_pick+"/"+verify_date_pick+"/"+verify_year_pick;
            var dob = dateofbirth;

            if(isValidDateCheck(validdateofbirth)==false)
            {
                err_msg = 'Please select valid date of birth';
                return err_msg;
            }
            var validDOB = new Date(validdateofbirth);
            var currdateDOB = new Date();
            var getvalidyear = currdateDOB.getFullYear() - 18;
            currdateDOB.setFullYear(getvalidyear);
            if(validDOB.getTime() > currdateDOB.getTime())
            {
                err_msg = 'Invalid date of birth. Please try again';
                return err_msg;
            }
            document.getElementById('dob').value = dob;    
        }

        if (pagenameCheck == "register_as_GUEST") {
            var postalcode = document.getElementById('postalcode').value;
            if( postalcode == '' )
            {
                err_msg = 'Postcode required to complete your registration. Please try again';
                err_code = 'e4';
                return err_msg;
            }
            if(postalcode != '' && postalcode.length < 4)
            {
                err_msg = 'Your Postcode must be 4 digits long. Please try again';
                err_code = 'e5';
                return err_msg;
            }
        }
        else if (pagenameCheck == "register_as_MEMBER") {
            var postalcode = document.getElementById('postalcode').value;
            if( postalcode == '' )
            {
                err_msg = 'Postcode required to complete your registration. Please try again';
                err_code = 'e4';
                return err_msg;
            }
            else if(postalcode.length < 4)
            {
                err_msg = 'Your Postcode must be 4 digits long. Please try again';
                err_code = 'e5';
                return err_msg;
            }
            if(postalcode != '' && postalcode.length < 4)
            {
                err_msg = 'Your Postcode must be 4 digits long. Please try again';
                err_code = 'e5';
                return err_msg;
            }
        }
    }
    catch(e) 
    {
        err_msg = 'vm js error: ' + e.message;
    }    
    finally 
    {
        if(err_msg.length == 0)
        {
            return '1' + '|' + QString;
        }
        else
        {
            return err_code + '|' + err_msg;
        }
    }
}

function isValidDateCheck(dString) {
    var dRe = /^(\d{1,2})([\-\/])(\d{1,2})\2(\d{4}|\d{2})$/;

    if (!dRe.exec(dString)) {
        return false; 
    }         
    dString.replace(/-/g,"/"); 

    var date = new Date(dString);
    if (!isNaN(date)) {
        var parts = dString.split("/");
        var dd = parseInt(parts[1],10);
        var mm = parseInt(parts[0],10)-1;
        var yyyy = parseInt(parts[2],10);
        return dd===date.getDate() && mm === date.getMonth() && yyyy===date.getFullYear();
    }
    return false;
}

function checkMarketing()
{
    if(document.getElementById('marketingflag').checked == true)
    {
        document.getElementById('marketing').value = 1;
    }
    else
    {
        document.getElementById('marketing').value = 0;
    }
}
function removeWhiteSpace(e) {
    while (e.substring(0, 1) == " ") {
        e = e.substring(1, e.length)
    }
    while (e.substring(e.length - 1, e.length) == " ") {
        e = e.substring(0, e.length - 1)
    }
    return e
}

function numbersonly(e)
{
    var unicode=e.charCode || e.keyCode;
    if (unicode!=8)
    {
        if (unicode > 31 && (unicode < 48 || unicode > 57))
            return false;
    }
}

function alphawithsinglequote(evt) 
{
    var charCode = evt.which || event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 127 || charCode == 8 || charCode == 32 || charCode == 39) {
        return true;
    }
    else {
        return false;
    }
}
function Initializing()
{
    var d   =   new Date();
    var cday    =   d.getDate();
    var cmon    =   d.getMonth();
    var cyear   =   d.getFullYear();
    document.getElementById("dob").setAttribute("max",cyear+'-'+cmon+'-'+cday);
}
function PatronDetails(details)
{
    if(details=="")
    {
        isMemberID_check = 1;
        $('.navigationlink').hide();
    }
    else
    {
        var mem_details = JSON.parse(details);
        var isMemberID_check = 0;
        if(mem_details.isSignIN == null || mem_details.isSignIN == undefined || mem_details.isSignIN == "")
        {
            isMemberID_check = 1;
            $('.navigationlink').hide();
        }
        else {

            if(mem_details.isMemberID != null && mem_details.isMemberID != undefined && mem_details.isMemberID != "")
            {
                isMemberID_check = mem_details.isMemberID;
            }
        }
        if(mem_details.isMemberID == null || mem_details.isMemberID == undefined || mem_details.isMemberID == "")
        {
            isMemberID_check = 1;
            $('.navigationlink').hide();
        }
    }
    if (isMemberID_check == 1) {
        $('#pageCheck').val("register_as_MEMBER");
        $('#register_GUEST').hide();
        $('#register_MEMBER').show();
        if(mem_details.MemberID != null && mem_details.MemberID != undefined && mem_details.MemberID != "")
        {
            if(document.getElementById("memberid"))
            {
                document.getElementById("memberid").value = mem_details.MemberID; 
                document.getElementById("memberid").readOnly = true; 
                document.getElementById("memberid").setAttribute("style", "color:#999999;");
                document.getElementById("memberid").setAttribute("data-readonly", "readonly");
            } 
        }
    }
    else
    {
        $('#pageCheck').val("register_as_GUEST");
        $('#register_MEMBER').hide();
        $('#register_GUEST').show();
        if(mem_details.FirstName != null && mem_details.FirstName != undefined && mem_details.FirstName != "")
        {    
            if(document.getElementById("firstname"))
            {
                document.getElementById("firstname").value = mem_details.FirstName; 
                document.getElementById("firstname").readOnly = true;
                document.getElementById("firstname").setAttribute("style", "color:#999999;");
                document.getElementById("firstname").setAttribute("data-readonly", "readonly");
            } 
        }
        if(mem_details.LastName != null && mem_details.LastName != undefined && mem_details.LastName != "")
        {    
            if(document.getElementById("lastname"))
            {
                document.getElementById("lastname").value = mem_details.LastName; 
                document.getElementById("lastname").readOnly = true; 
                document.getElementById("lastname").setAttribute("style", "color:#999999;");
                document.getElementById("lastname").setAttribute("data-readonly", "readonly");
            } 
        }
    }

    if(mem_details.DOB != null && mem_details.DOB != undefined && mem_details.DOB != "" )
    {
        if (document.getElementById("dob")) {
            document.getElementById("dob").value = mem_details.DOB; 
        }
        var inputDate = mem_details.DOB;
        var date = inputDate.split('-'); 
        if(date[2]!="")
        {
            dd = date[2].toString();
            if (dd.length === 1)
            {
                dd = "0" + dd;
            }
        }
        if(date[1]!="")
        {
            mm = date[1].toString();
            if (mm.length === 1)
            {
                mm = "0" + mm;
            }
        }
        if(date[0]!="")
        { 
            yy = date[0].toString();
            if (yy.length === 1) {
                yy = "0" + yy;
            } 
        }

        if(document.getElementById("date_pick")){
            document.getElementById("date_pick").value=dd;
            document.getElementById("date_pick").readOnly = true;
            document.getElementById("date_pick").setAttribute("style", "color:#999999;");
            document.getElementById("date_pick").setAttribute("data-readonly", "readonly");
        }
        if(document.getElementById("month_pick")){
            document.getElementById("month_pick").value=mm;
            document.getElementById("month_pick").disabled = true;
            document.getElementById("month_pick").setAttribute("style", "color:#999999;");
            document.getElementById("month_pick").setAttribute("data-readonly", "readonly");
        }    
        if(document.getElementById("year_pick")){
            document.getElementById("year_pick").value=yy;
            document.getElementById("year_pick").readOnly = true;
            document.getElementById("year_pick").setAttribute("style", "color:#999999;");
            document.getElementById("year_pick").setAttribute("data-readonly", "readonly");
        }
    }

    if(mem_details.PostalCode != null && mem_details.PostalCode != undefined && mem_details.PostalCode != "")
    {    
        if(document.getElementById("postalcode"))
        {
            document.getElementById("postalcode").value = mem_details.PostalCode;
            document.getElementById("postalcode").readOnly = true;
            document.getElementById("postalcode").setAttribute("style", "color:#999999;");
            document.getElementById("postalcode").setAttribute("data-readonly", "readonly");
        } 
    }

    if(mem_details.Email != null && mem_details.Email != undefined && mem_details.Email != "")
    {    
        if(document.getElementById("emailid"))
        {
            document.getElementById("emailid").value = mem_details.Email;
            document.getElementById("emailid").readOnly = true;
            document.getElementById("emailid").setAttribute("style", "color:#999999;");
            document.getElementById("emailid").setAttribute("data-readonly", "readonly");
        } 
    }
    if(mem_details.MobilePhone != null && mem_details.MobilePhone != undefined && mem_details.MobilePhone != "")
    {    
        if(document.getElementById("phoneno"))
        {
            var mobile_phone = mem_details.MobilePhone.replace('+61','0');
            document.getElementById("phoneno").value = mobile_phone; 
            document.getElementById("phoneno").readOnly = true; 
            document.getElementById("phoneno").setAttribute("style", "color:#999999;");
            document.getElementById("phoneno").setAttribute("data-readonly", "readonly");
        } 
    }
    if(mem_details.Gender != null && mem_details.Gender != undefined && mem_details.Gender != "")
    {
        if(mem_details.Gender=='M')
        {
            if(document.getElementById("gender_m"))
            {
                document.getElementById("gender_m").checked = true;
            }
            if(document.getElementById("gender_f"))
            {
                document.getElementById("gender_f").disabled = true;
                document.getElementsByClassName("checkmark")[0].style.background = "#999999";
                document.getElementsByClassName("checkmark")[1].style.background = "#999999";
                
            }
        }
        else if(mem_details.Gender=='F')
        {
            if(document.getElementById("gender_f"))
            {
                document.getElementById("gender_f").checked = true;
            }
            if(document.getElementById("gender_m"))
            {
                document.getElementById("gender_m").disabled = true;
                document.getElementsByClassName("checkmark")[0].style.background = "#999999";
                document.getElementsByClassName("checkmark")[1].style.background = "#999999";
            }
        }
    }

    if(mem_details.isNMC != null || mem_details.isNMC != undefined && mem_details.isNMC != "")
    {
        var isNMCMember =  mem_details.isNMC;
        if(isNMCMember==1)
        {
            $('#notamember').show();
            $('.custom_tnc').show();
        }  
    }

    if(mem_details.isJoin != null && mem_details.isJoin != undefined && mem_details.isJoin != "")
    {

        var isJoin_block =  mem_details.isJoin;

        if(isJoin_block==1)
        {
            $('#joinBlock').show();
        } else {
            $('#joinBlock').hide();
        }
    }
}

function splitDate(inputDate)
{
    var date = inputDate.split('-'); 
    if(date[2]!="")
    {
        dd = date[2].toString();
        if (dd.length === 1)
        {
            dd = "0" + dd;
        }
    }
    if(date[1]!="")
    {
        mm = date[1].toString();
        if (mm.length === 1)
        {
            mm = "0" + mm;
        }
    }
    if(date[0]!="")
    { 
        yy = date[0].toString();
        if (yy.length === 1) {
            yy = "0" + yy;
        } 
    }

    if(document.getElementById("date_pick1"))
    {
        document.getElementById("date_pick1").value=dd[0];
    }
    if(document.getElementById("date_pick2"))
    {
        document.getElementById("date_pick2").value=dd[1];
    }
    if(document.getElementById("month_pick1"))
    {
        document.getElementById("month_pick1").value=mm[0];
    }
    if(document.getElementById("month_pick2"))
    {
        document.getElementById("month_pick2").value=mm[1];
    }
    if(document.getElementById("year_pick1"))
    {
        document.getElementById("year_pick1").value=yy[0];
    }
    if(document.getElementById("year_pick2"))
    {
        document.getElementById("year_pick2").value=yy[1];
    }
    if(document.getElementById("year_pick3"))
    {
        document.getElementById("year_pick3").value=yy[2];
    }
    if(document.getElementById("year_pick4"))
    {
        document.getElementById("year_pick4").value=yy[3];
    } 
}

function numericFilter(id) {
    id.value = id.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');

} 
function oninput_alphawithsinglequote(e,limit) 
{
    var newid = document.getElementById(e.id);
    var startPos = newid.selectionStart;
    var endPos = newid.selectionEnd; 
    var charCode = e.value.charCodeAt(startPos-1);
    var single ="";
    if (charCode=="8216" || charCode=="8217" || charCode=="96")
    {
        var single ="'";
    }
    var val  = single; 
    newid.setRangeText( val,startPos,endPos,newid.endPos);
    vals=  newid.value.replace(/[^a-zA-Z' ]/g, '').replace(/(\..*)\./g, '$1');
    newid.value =  vals.slice(0, limit); 
}

function oninput_alphawithsinglequote_bc(e,limit) 
{
    val = val .replace(/[^a-zA-Z' ]/g, '').replace(/(\..*)\./g, '$1');    
    e.value =  val.slice(0, limit); 
} 

function showhidekeypad(idval)
{
    var read_only = document.getElementById(idval).getAttribute("data-readonly"); 
    if(read_only=='readonly')
    {
        document.getElementById(idval).blur();
    }
}
function popup_terms(id)
{
    if(id=="OPEN")
    {
        if(document.getElementById("termsconditon"))
        {
            $('body').addClass('body_overflow');
            document.getElementById("termsconditon").style.display="block";
        } 
    }
    else
    {
        if(document.getElementById("termsconditon"))
        {
            $('body').removeClass('body_overflow');
            document.getElementById("termsconditon").style.display="none";  
        } 

    }
}

$(document).ready(function()
{
    $('input[type="date"]').click(function() {
        var inputDate = new Date(this.value);
        splitDates(inputDate);
    });

    $('input[type="date"]').change(function() {
        var inputDate = new Date(this.value);
        splitDates(inputDate);
    });
    $('input[type="text"]#dob').click(function() {
        var inputDate = new Date(this.value);
        splitDates(inputDate);
    });
});
function splitDates(inputDate)
{
    if (!isNaN(inputDate)) {

        var dd = inputDate.getDate();
        var mm = inputDate.getMonth() + 1;
        dd = dd.toString();
        if (dd.length === 1) {
            dd = "0" + dd;
        }
        mm = mm.toString();
        if (mm.length === 1) {
            mm = "0" + mm;
        }
        var yy = inputDate.getFullYear().toString();

        $('#date_pick').val(dd);
        $('#month_pick').val(mm);
        $('#year_pick').val(yy);

    } else {
        $('#date_pick').val('');
        $('#month_pick').val('');
        $('#year_pick').val('');
    }
}

function goSubmit(url)
{
    top.location.href=url;
}

var sUserAgent = navigator.userAgent,
isMobile = 
{
    Android: sUserAgent.match(/Android|Silk/i),
    iOS: sUserAgent.match(/iPhone|iPad|iPod/i),
    Windows: sUserAgent.match(/IEMobile/i)
};
isMobile.other = !(isMobile.Android || isMobile.iOS || isMobile.Windows);

if(isMobile.iOS)
{

}
else if(isMobile.Android)
{
    $('#dob').attr('type','text');
    $('#dob').attr('readonly','readonly');
    $('#dob').attr('data-readonly','readonly');

    var dStartDate = new Date();
    var dStartY = dStartDate.getFullYear() - 18;
    var dStartM = dStartDate.getMonth();
    var dStartD = dStartDate.getDate();
    dStartDate = new Date(dStartY,dStartM,dStartD);
    var oAP1;
    var inc=1;
    $("#dob").AnyPicker(
    {
        mode: "datetime",
        inputDateTimeFormat: "yyyy-MM-dd",
        dateTimeFormat: "dd/MMM/yyyy",
        maxRows: 200,
        maxValue: dStartDate,
        onShowPicker: function()
        {
            if(inc==1)
            {
                oAP1 = this;
                oAP1.setSelectedDate(dStartDate);
                splitDates(dStartDate);
            }
            inc++;
            document.getElementById('dob').blur();
        },
        onSetOutput: function(sOutput, oSelectedValues)
        {
            var input_Date = new Date(oSelectedValues['date']);
            splitDates(input_Date);
        },
        buttonClicked: function(btnAction)
        {
            if(btnAction.toUpperCase()=='CLEAR')
            {
                $('#date_pick').val('');
                $('#month_pick').val('');
                $('#year_pick').val('');
            }
        }
    });
}
