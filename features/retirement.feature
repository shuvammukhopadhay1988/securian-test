Feature: Retirement Calculator Form Submission

Scenario Outline: Submit form with different social security selections
Given the user is on the retirement calculator page
When the user enters retirement details:
| currentAge | retirementAge | currentIncome | spouseIncome | savings | contribution | increase |
| <currentAge> | <retirementAge> | <currentIncome> | <spouseIncome> | <savings> | <contribution> | <increase> |
And the user selects social security income as "<ssIncome>" and override amount "<<ssOverride>>"
And the user clicks on adjust default values
And the user enters additional adjustment details:
| additionalIncome | years | inflation | inflationRate | percentIncome | preReturn | postReturn |
| <additionalIncome> | <years> | <inflation> | <inflationRate> | <percentIncome> | <preReturn> | <postReturn> |
Then the user clicks calculate final amount

Examples:
| currentAge | retirementAge | currentIncome | spouseIncome | savings | contribution | increase | ssIncome | ssOverride | additionalIncome | years | inflation | inflationRate | percentIncome | preReturn | postReturn |
| 40         | 68            | 100000        | 75000        | 500000  | 10           | 0.25     | yes      | 4000       | 500              | 20    | yes       | 3             | 75            | 8         | 5          |
| 40         | 68            | 100000        | 75000        | 500000  | 10           | 0.25     | no       | 0          | 500              | 20    | yes       | 3             | 75            | 8         | 5          |
