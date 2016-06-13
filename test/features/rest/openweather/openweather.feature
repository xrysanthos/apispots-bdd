Feature: OpenWeatherMap API - Current weather data

  As a client of the OpenWeatherMap API
  I want to run tests
  In order to validate 'Current weather data' operations

  Background:
    Given a "REST" API definition at "http://api.openweathermap.org/data/2.5"
    And security query param "appid" equals "[your API key]"

  Scenario: Get current weather data for one location and by city name

    Given endpoint "/weather" and method "get"
    And request query param "q" equals "London,UK"
    And request type "application/json"
    When the request is executed
    Then response status is "ok"
