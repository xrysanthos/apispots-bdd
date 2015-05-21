Feature: Swagger Petstore - Users
  
  As a client of the Petstore API
  I want to run tests
  In order to validate the Pets operations

  Background: 
    Given a "Swagger" API definition at "http://petstore.swagger.io/v2/swagger.json"

  Scenario: Add a new pet to the store
    Given an operation with Id "addPet"
    And request body
      """
      {
      "id": "1234",
      "category": {
      "name": "test-category"
      },
      "name": "doggie",
      "photoUrls": [
      "http://cdn.sheknows.com/articles/2013/04/Puppy_2.jpg"
      ],
      "tags": [
      {
      "name": "puppy"
      }
      ]
      }
      """
    And request type "application/json"
    When the request is executed
    Then response status is "ok"

  Scenario: Update an existing pet
    Given an operation with Id "updatePet"
    And request body
      """
      {
      "id": "1234",
      "name": "woofie"
      }
      """
    And request type "application/json"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute | value  |
      | name      | woofie |

  Scenario: Find pet by Id
    Given an operation with Id "getPetById"
    And request path param "petId" equals "1234"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute | value  |
      | name      | woofie |

  Scenario: Update a pet in the store with form data
    Given an operation with Id "updatePetWithForm"
    And request type "application/x-www-form-urlencoded"
    And request path param "petId" equals "1234"
    And request form params
      | param  | value   |
      | name   | max     |
    When a request is executed
    Then response status is "ok"
    
  Scenario: Find pet by Id
    Given an operation with Id "getPetById"
    And request path param "petId" equals "1234"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute | value |
      | name      | max   |

  Scenario: Delete a pet
    Given an operation with Id "deletePet"
    And request path param "petId" equals "1234"
    When the request is executed
    Then response status is "ok"
         
  Scenario: Check pet is deleted
    Given an operation with Id "getPetById"
    And request path param "petId" equals "1234"
    When the request is executed
    Then response code is "404"
    