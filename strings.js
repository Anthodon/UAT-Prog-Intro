function validatepii()
{
    /*output message*/
    let output = document.getElementById("output");

    /*clears output message*/
    output.innerHTML = " ";

    /*text inputs*/
    let namef = document.getElementById("namef").value;
    let namel = document.getElementById("namel").value;
    let age = document.getElementById("age").value;
    let ssn = document.getElementById("ssn").value;
    let zip = document.getElementById("zip").value;

    /*marks only the text forms for palindrome check*/
    let palinput = [
        /*allows validation message for form fields*/
        document.getElementById("namef"),
        document.getElementById("namel")
    ];


    /*runs check for each palinput field*/
    for (let i = 0; i < palinput.length; i++){
        /*removes validiation errors before assessment*/
        palinput[i].setCustomValidity("");

        /*checks text of current field, removes spaces, converts all to lowercase to homogenize characyers*/
        let cleanstring = palinput[i].value.replaceAll(" ", "").toLowerCase();
        /*text assumed to contain palindrome until verified otherwise*/
        let palincheck = true;

        /*character checker, halved due to first and last letter checking*/
        for (let j = 0; j < cleanstring.length / 2; j++){
            /*compares first and last letters for match, then proceeds inward*/
            if (cleanstring[j] != cleanstring[cleanstring.length - 1 - j]){
                /*if letters do not match, palincheck is unflagged*/
                palincheck = false;
                /*because any instance of non matching letters passes the palindrome check, loop is broken upon deflagging*/
                break;
            }
        }
        /*checks palincheck results, ignores technical violation of single letter names being palindromes*/
        if (cleanstring.length > 1 && palincheck == true){
            /*validation error sent if palindrome found*/
            palinput[i].setCustomValidity("Palindrome found. Please try again.");

            /*sends validation message to the first field with a palindrome*/
            palinput[i].reportValidity();
            return false;
        }
    }


    /*combine first and last name*/
    let namefull = namef + " " + namel;

   /*check name length*/
    if (namefull.length > 20)
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
    output.innerHTML +=
    "Thank you for your compliance! <br>" +
    "We will put this to good use."

    /*hard check againt true submission*/
    return false;
}