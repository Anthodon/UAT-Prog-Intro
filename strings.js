function validatepii()
{
    /*output message*/
    let output = document.getElementById("output");

    /*clear input*/
    output.innerHTML = " ";

    /*text inputs*/
    let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;
    let age = document.getElementById("age").value;
    let ssn = document.getElementById("ssn").value;
    let zip = document.getElementById("zip").value;

    /*combine first and last name*/
    let fullName = fName + " " + lName;

   /*check name length*/
    if (fullName.length > 20)
    {
        output.innerHTML += "Name too long! Max 20 characters.<br>";
        return false;
    }
    

    /*check ssn length and numerals*/
    if (ssn.length != 9 || isNaN(ssn))
    {
        output.innerHTML += "Invalid SSN! Must be 9 digits.<br>";
        return false;
    }

    /*check zip code length and numerals*/
    if (zip.length != 5 || isNaN(zip))
    {
        output.innerHTML += "Invalid zip code! Must be 5 digits.<br>";
        return false;
    }   

    /*secret message displayed after successful submission*/
    output.innerHTML =
    "Thank you for your compliance! <br>" +
    "We will put this to good use."

/*hard check againt true submission*/
return false;
    
}