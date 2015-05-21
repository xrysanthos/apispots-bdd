Feature: Swagger Petstore - Store
  
  As a client of the Petstore API
  I want to run tests
  In order to validate the Store operations

  Background: 
    Given a "Swagger" API definition at "http://petstore.swagger.io/v2/swagger.json"

  Scenario: Get the full store inventory
    Given an operation with Id "getInventory"
    When the request is executed
    Then response status is "ok"

  Scenario: Place an order for a pet
    Given an operation with Id "placeOrder"
    And request body
      """
      {
      "id": 1234,
      "petId": 1234,
      "quantity": 2
      }
      """
    And request type "application/json"
    When the request is executed
    Then response status is "ok"

  Scenario: Check if order is placed
    Given an operation with Id "getOrderById"
    And request path param "orderId" equals "1234"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute | value |
      | id        | 1234  |
      | petId     | 1234  |

      
  Scenario: Delete purchase order by ID
    Given an operation with Id "deleteOrder"
    And request path param "orderId" equals "1234"
    When the request is executed
    Then response status is "ok"

  Scenario: Check that order is deleted
    Given an operation with Id "getOrderById"
    And request path param "orderId" equals "1234"
    When the request is executed
    Then response code is "404"
