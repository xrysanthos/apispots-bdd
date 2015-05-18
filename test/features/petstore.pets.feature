@dev
Feature: Swagger Petstore - Users
  
  As a client of the Petstore API
  I want to run tests
  In order to validate the Users API

  Background: 
    Given a "Swagger" API definition at "http://petstore.swagger.io/v2/swagger.json"
	
	
  Scenario: Create a new user
    Given an operation with Id "createUser"
    And request body
      """
      {
      "id": "12345",
      "username": "thechef",
      "firstName": "chris",
      "lastName": "spilio",
      "password": "thepass"
      }
      """
    And request type "application/json"
    When the request is executed
    Then response status is "ok"


  Scenario: Add a new pet to the store
    Given an operation with Id "addPet"
    And request body
      """
      {
      "id": "12345",
      "username": "thechef",
      "firstName": "chris",
      "lastName": "spilio",
      "password": "thepass"
      }
      """
    And request type "application/json"
    When the request is executed
    Then response status is "ok"




  Scenario: Delete the user
    Given an operation with Id "deleteUser"
    And request path param "username" equals "thechef"
    When the request is executed
    Then response status is "ok"
