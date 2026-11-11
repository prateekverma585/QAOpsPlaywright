Feature: Login Error Validations
    @Validation
    Scenario Outline: Validate Login
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify error message is displayed


        Examples:
        |username               |    password               |
        |prateekverma@gmail.com |   Narayan@123             |
        |hello@gmail.com        |   yes@123                 |

