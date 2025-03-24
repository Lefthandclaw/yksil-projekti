*** Settings ***
Library     Browser  

*** Keywords ***
Fill Web Form
    Type Text      [name="my-text"]        ${Username}    delay=0.1 s 
    Type Secret    [name="my-password"]    $Password    delay=0.1 s
    Type Text      [name="my-textarea"]    ${Message}     delay=0.1 s
