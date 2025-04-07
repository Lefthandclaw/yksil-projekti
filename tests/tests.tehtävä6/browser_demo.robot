*** Settings ***
Library     Browser     	    auto_closing_level=SUITE
Library     CryptoLibrary     variable_decryption=True 

*** Variables ***
${Username}    crypt:d33Dfz/koERCMBZ40A/RUo9WsdRvOtp9nqP7PeeZ/DL4eHrIL1JwVpbPKRRhMOnL6NYhSuMs5r2D
${Password}    crypt:w/eeq5HS652q/XOicGaTjFlpINW+ptGaxeCxSOOlABrpO5UO6KV78KaBrxOMztKUToBhKUt4YAyuAGL3

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://127.0.0.1:5500/frontend/index.html    
    Get Title      ==    Diary App 
    Type Text      [id="username"]        ${Username}    delay=0.1 s 
    Type Secret    [id="password"]    $Password      delay=0.1 s
    Click        xpath=//button[text()='Log In']

    Sleep       2s