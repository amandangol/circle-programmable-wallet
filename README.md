(Currently facing 405 (Method Not Allowed) on two authAPIs. Works perfectly on localhost but issue persist on deployment. Trying to fix it )
**Project Writeup: Circle Wallet Application**

The Circle Wallet application is a robust and user-friendly platform designed to simplify the management of cryptocurrency wallets. With a focus on usability and security, the wallet application offers a range of core functionalities to meet the needs of both novice and experienced users.
![alt text](image.png)

### Core Functionalities:

**Wallet Creation:**
The Circle Wallet application simplifies the wallet creation process by allowing users to sign in with their Google account. This streamlined onboarding eliminates the need for complex setups and seed phrases. After signing in, users are prompted to set up a PIN and recovery questions through a modal, ensuring a secure account setup. Once the setup is complete, users are seamlessly redirected to the dashboard, where they can explore the various functionalities of the wallet. Additionally, users have the flexibility to choose between creating an EOA or SCA wallet type.

**Wallet Transfers:**
Upon selecting their preferred wallet type, users can either request tokens from the faucet, initiating an inbound transfer, or proceed to initialize an outbound transfer from one wallet address to another. This feature empowers users to manage their digital assets efficiently, facilitating both incoming and outgoing token transfers with ease.

**Wallet Recovery:**
In case users forget their PIN or wish to update it, the wallet application offers a convenient recovery option. Users can reset their PIN via the app's settings page, ensuring continued access to their wallets without compromising security. This feature provides peace of mind to users, knowing they can regain access to their accounts seamlessly.

### Other Features:

**Social Login:**
The integration of Google OAuth enables social login functionality within the wallet application. Users can sign in with their Google account, eliminating the need to remember separate login credentials. This feature enhances the user experience by providing a seamless authentication process, leveraging the @react-oauth/google library to facilitate Google authentication.

**Contacts:**
A personalized directory within the wallet, the Contacts feature allows users to maintain a list of frequently transacted individuals or entities. Instead of manually entering recipient details for each transaction, users can simply select contacts from their list, streamlining the transfer process. Contacts are managed through React Context API and utilize local storage to store contact information, ensuring accessibility and convenience for users.

### Integration Process:

To integrate the Contacts feature, the application utilizes a database to store contact information, including wallet addresses and associated labels. Users can add and delete contacts through the application interface, with changes reflected in real-time.

For the Social Logins feature, the application leverages OAuth authentication mechanisms provided by Google. Upon selecting the social login option, users are redirected to the respective platform for authentication. Once authenticated, users are granted access to their wallets, simplifying the login process.

## Snapshots:

![alt text](image-1.png)
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-4.png)
![alt text](image-5.png)
![alt text](image-6.png)
