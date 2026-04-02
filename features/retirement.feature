Feature: Retirement Calculator Form Submission

  Scenario: Submit form with social security and adjusted default values
    Given the user is on the retirement calculator page
    When the user enters retirement details:
      | currentAge | retirementAge | currentIncome | spouseIncome | savings | contribution | increase | relationship |
      | 40         | 68            | 100000        | 75000        | 500000  | 10           | 0.25     | Married      |
    And the user selects social security income as "yes"
    Then additional social security fields should be displayed
    When the user enters social security override as "4000"
    And the user clicks on adjust default values
    And the user enters additional adjustment details:
      | additionalIncome | years | inflation | percentIncome | preReturn | postReturn |
      | 500              | 20    | yes       | 75            | 8         | 5          |
    Then the user clicks calculate final amount