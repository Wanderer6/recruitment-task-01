# UI Tests for Ploom country-specific websites

## Running Tests
Run single test with 'npx playwright test --project=en-GB' or run all tests with npx playwright test

## Localization
To add another country-specific website just add another localization in 'localizations' folder and update 'localization.config.ts' file in 'configs' folder. The new project will be added automatically.

## Additional notes
Third test 'Verify links and images on product page' has alternative method to verify images but it only works on headed mode.
It would be best to use API to add product to cart in second test as a precondition.