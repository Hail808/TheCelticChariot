PURCHACE WITH NEW ACCOUNT TEST
This is a test for purchacing an item as a guest (no account)
A purchace is made by a user with no account. In order to pass, the purchace must be successful and the order made

Instructions:
    This test is verified to work on:
        -Google Chrome VER 141.0.7390.123
        -Python Ver 3.13
        -Selenium 4.38.0

    Before running test, make sure webhook and dev server are not already running

    To run test, in command line:
	    ./test-start.bat
	Or double click on test-start.bat
    This script will start the test program and start up the server and webhook

    The program will work automatically untill the Stripe page. 
    From here, follow the instructions in the command prompt for manually inputting test Adress and payment info.
        Please complete the shipping and payment manually in the browser.
        Use test name: test
        For the aress, type 1234 and autofill to 1234 Howe Av
        Use test card number: 4242 4242 4242 4242
        Expiry: 4/44   CVC: 444
        Uncheck 'Save my information for a faster checkout'
        Then click 'Pay' on the Stripe page.

    After you hit the 'Pay' button, the program will finish executing
    To close the program, hit ENTER and check consoule for output. Also make sure to close the dev server and webhook

