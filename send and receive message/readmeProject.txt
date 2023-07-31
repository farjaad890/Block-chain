			Project read me File

# Metamask Signing message and verifing message react app

This app wil show us a working demonstration of how we sign message thrrough Metamask and how we verify the signed message.

#How to run the application.

1.Download the the file from git repository
2.intialize the project with npm.
3.When all the dependencies are installed run script `npm start`.

#How to use the application
1.The first page will prompt the user to connect to their metamask wallet. The application will not move forward unil the the wallet is connected.
2.once the metamask is  connected the user will directed to a form with two buttons sign-message and verify-message.
3.By default the user will be taken to sign message form.
4.In the input field of the sign message form the user writes its message and click on the sign to sign the form a metamask interface will open to and ask you to sign message.If the user signs the message a signed message hash will be generated.
5.in the input field of the verify message you will enter the the object of signed message which includes sender address, message and sign hash this wil verify the if the sender of the message os the same as the written in the object.
