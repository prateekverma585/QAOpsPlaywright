Feature: Ecommerce Validations
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "veenarecordsinc@gmail.com" and "KrishnaHari@123"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and Place the order
        Then Verify order id present in the OrderHistory