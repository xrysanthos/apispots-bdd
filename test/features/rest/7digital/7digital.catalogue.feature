Feature: 7digital API - Catalogue
  
  As a client of the 7digital API
  I want to run tests
  In order to validate the Catalogue API operations

  Background: 
    Given a "REST" API definition at "http://api.7digital.com/1.2"
    And security query param "oauth_consumer_key" equals "7d9wh7e3jzaf"

  @dev	
  Scenario: Browse artists
    Given endpoint "/artist/browse" and method "get"
    And request query param "letter" equals "a"
    And request type "application/json"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute              | value |
      | status                 | 'ok'  |
      | artists.artist[0].name | 'A'   |

  Scenario: Artist chart
    Given endpoint "/artist/chart" and method "get"
    And request query param "period" equals "week"
    And request query param "toDate" equals "20150101"
    And request type "application/json"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute    | value                       |
      | chart.toDate | '2015-01-01T00:00:00+00:00' |

  Scenario: Artist details
    Given endpoint "/artist/details" and method "get"
    And request query param "artistId" equals "1"
    And request type "application/json"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute   | value   |
      | artist.name | 'Keane' |

  Scenario: Artist releases
    Given endpoint "/artist/releases" and method "get"
    And request query param "artistId" equals "1"
    And request type "application/json"
    When the request is executed
    Then response status is "ok"
    And response body has attributes
      | attribute                  | value               |
      | releases.releases[0].title | 'The Best Of Keane' |
