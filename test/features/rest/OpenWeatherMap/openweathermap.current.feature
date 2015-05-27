Feature: OpenWeatherMap API - Current weather data
  
  As a client of the OpenWeatherMap API
  I want to run tests
  In order to validate 'Current weather data' operations

  Background: 
    Given a "REST" API definition at "http://api.openweathermap.org/data/2.5"

  Scenario: Get current weather data for one location and by city name
    Given endpoint "/weather" and method "get"
    And request query param "q" equals "London,UK"
    And request type "application/json"
    When the request is executed
    Then response status is "ok"
	
  @dev	
  Scenario: Get current weather data for one location and by geographic coordinates
    Given endpoint "/weather" and method "get"
    And request query params
      | param | value |
      | lat   | 35    |
      | lon   | 139   |
    And request type "application/json"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute | value      |
      | coord.lat | 35         |
      | coord.lon | 139        |
      | name      | 'Shuzenji' |

   