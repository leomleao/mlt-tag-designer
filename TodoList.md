# TodoList

- [ ] release

## HomePage

### `HomePageContactForm`

- [x] Develop form
- [x] Add modal message
- [ ] Develop form with input for order
- [x] Validation for telefone number
- [ ] Develop conection with back end to receive e-mails
- [ ] HomeContactForm.js:86

### `HomePage`

- [x] Correct line style
- [x] When home page shortcut in the footer is clicked, scroll up

### `LoadingPage`

- [x] Nothing to Change

### `LoginPage`

- [x] Add back button
- [x] Add loading gif when login is clicked
- [ ] Validate email to send password
- [ ] Login when user not found
- [ ] check validation to create new user
- [ ] network connection error
- [ ] auth/popup-closed-by-user

### `RegisterPage`

- [x] Add back button
- [x] Add login with Google Button
- [x] Add button to redirect to login
- [ ] Handle error: case 'auth/email-already-in-use': redirect to login page
- [ ] Check add addresses function
- [ ] Validate all addresses
- [x] Add loading gif when register is clicked
- [ ] check validation to create new user

## TagConstructorPages

- [x] Save the cart to cookie
- [ ] Make responsive (do later)

### `TagConstructor`

- [x] Save the tag to cookie
- [x] Clear button need to reflect in the inputs
- [x] Add button to go to cart
- [x] Make tag class

### `TagSummary`

- [x] Fix Qtd input width
- [ ] Some kind of loyalty or recomendation with discount accumulative
- [ ] Add button to Edit the tag

### `TagShipping`

- [x] clear code
- [ ] `<p>you must be logged in</p>` alert even if logged
- [x] Validate all addresses
- [x] Make address class
- [x] Add registrered post option

### `TagPayment`

- [ ] clear code
- [ ] summary needs to show shipping fee also
- [ ] create pay pal function
- [ ] create credit card function
- [ ] setup the client-id=CLIENT_ID and currency=--- in the html sdk
- [ ] onShippingChange change shipping address

### `TagSubmitted`

- [ ] clear code
- [ ] showing blank page
- [ ] fire the e-mail and backend connection when procces is closed

## UserProfilePages

### `UserProfile`

- [x] input width must be responsive to input value

### `UserAddresses`

- [x] showing blank page
- [ ] add new address via modal form
- [x] Validate all addresses
- [x] 'autocomplete' prop for the inputs

### `UserOrders`

- [ ] clear code
- [ ] show order details
- [ ] support button redirect to contact us form with orders details
- [ ] remove delete button

### `firestore`

- [ ] update all rules, current rules allow all read and writes
- [x] tranform useFirestore to class

### `Data bank`

- [ ] Order = {tags: [], totalPrice: 000, addressToShip: {}, userUid: '', userName: ''}

## Notes:

### `Errors`

- [ ] (100) signInAnonymously need to be tested

### `Components`

- [ ] validation in AddressCard
- [ ] Componets use local styles, except input, textarea, slider

### firebase

- https://www.youtube.com/watch?v=zQyrwxMPm88
- https://www.youtube.com/watch?v=q5J5ho7YUhA
